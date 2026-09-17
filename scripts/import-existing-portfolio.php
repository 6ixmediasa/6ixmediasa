<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "CLI only.\n");
    exit(1);
}

$home = getenv('HOME') ?: '/home/ixmedia1';
$configFile = $home . '/.6ixmedia-admin/config.php';
if (!is_file($configFile)) {
    fwrite(STDERR, "Admin config not found at {$configFile}.\n");
    exit(1);
}
$config = require $configFile;

$pdo = new PDO(
    sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']),
    $config['db_user'],
    $config['db_pass'],
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
);

$sourceUrl = 'https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/main/lib/projects.ts';
$ctx = stream_context_create([
    'http' => [
        'timeout' => 30,
        'user_agent' => '6ixMedia-Admin-Importer/1.0',
    ],
]);
$source = @file_get_contents($sourceUrl, false, $ctx);
if ($source === false || trim($source) === '') {
    fwrite(STDERR, "Could not download the current Next.js portfolio source.\n");
    exit(1);
}

$categoryMap = [
    'web' => 'Web Design',
    'shop' => 'E-Commerce',
    'app' => 'Mobile App',
    'webapp' => 'Web App',
    'soft' => 'Software',
    'logo' => 'Logo Design',
];

function tsString(string $block, string $field): string {
    $pattern = '/\\b' . preg_quote($field, '/') . '\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"/s';
    if (!preg_match($pattern, $block, $m)) return '';
    return stripcslashes($m[1]);
}

if (!preg_match_all('/\\{\\s*slug\\s*:\\s*"([^"]+)"\\s*,(.*?)^\\s*\\},?\\s*$/ms', $source, $matches, PREG_SET_ORDER)) {
    fwrite(STDERR, "No portfolio projects could be parsed from lib/projects.ts.\n");
    exit(1);
}

$upsertClient = $pdo->prepare(
    "INSERT INTO clients (name,slug,status,notes) VALUES (?,?, 'active', ?)\n" .
    "ON DUPLICATE KEY UPDATE name=VALUES(name), status='active', updated_at=NOW()"
);
$findClient = $pdo->prepare('SELECT id FROM clients WHERE slug = ? LIMIT 1');
$upsertProject = $pdo->prepare(
    "INSERT INTO projects (client_id,title,slug,category,summary,description,cover_image,project_pdf,status,completed_at,seo_title,seo_description)\n" .
    "VALUES (?,?,?,?,?,?,?,?, 'published', ?,?,?)\n" .
    "ON DUPLICATE KEY UPDATE client_id=VALUES(client_id), title=VALUES(title), category=VALUES(category), summary=VALUES(summary), description=VALUES(description), cover_image=VALUES(cover_image), project_pdf=VALUES(project_pdf), status='published', completed_at=VALUES(completed_at), seo_title=VALUES(seo_title), seo_description=VALUES(seo_description), updated_at=NOW()"
);

$projectCount = 0;
$clientCount = 0;
$seenClients = [];
$pdo->beginTransaction();
try {
    foreach ($matches as $match) {
        $slug = trim($match[1]);
        $block = $match[0];
        $name = tsString($block, 'name');
        if ($slug === '' || $name === '') continue;

        $tagline = tsString($block, 'tagline');
        $about = tsString($block, 'about');
        $year = tsString($block, 'year');
        $cover = tsString($block, 'cover');

        $category = '';
        if (preg_match('/\\bcategory\\s*:\\s*C\\.([a-zA-Z0-9_]+)/', $block, $cm)) {
            $category = $categoryMap[$cm[1]] ?? $cm[1];
        }

        // The original Next.js portfolio did not have a separate client table.
        // Seed one client per existing portfolio entry so every existing project
        // is immediately manageable in the new CMS. Contact details remain blank
        // until the real client record is enriched in the dashboard.
        $clientSlug = $slug;
        $notes = 'Imported from the existing 6ixMedia SA Next.js portfolio.';
        $upsertClient->execute([$name, $clientSlug, $notes]);
        if (!isset($seenClients[$clientSlug])) {
            $seenClients[$clientSlug] = true;
            $clientCount++;
        }
        $findClient->execute([$clientSlug]);
        $clientId = (int)$findClient->fetchColumn();

        $publicProjectDir = $home . '/public_html/projects/' . $slug;
        if ($cover === '' && is_file($publicProjectDir . '/cover.jpg')) {
            $cover = '/projects/' . $slug . '/cover.jpg';
        }
        $pdf = is_file($publicProjectDir . '/project.pdf')
            ? '/projects/' . $slug . '/project.pdf'
            : '';

        $completedAt = preg_match('/^\\d{4}$/', $year) ? $year . '-01-01' : null;
        $seoTitle = $name . ' | 6ixMedia SA';
        $seoDescription = $tagline !== '' ? $tagline : mb_substr($about, 0, 300);

        $upsertProject->execute([
            $clientId,
            $name,
            $slug,
            $category,
            $tagline,
            $about,
            $cover,
            $pdf,
            $completedAt,
            $seoTitle,
            $seoDescription,
        ]);
        $projectCount++;
    }

    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    fwrite(STDERR, "Import failed: " . $e->getMessage() . "\n");
    exit(1);
}

$dbProjects = (int)$pdo->query('SELECT COUNT(*) FROM projects')->fetchColumn();
$dbClients = (int)$pdo->query('SELECT COUNT(*) FROM clients')->fetchColumn();

echo "Existing portfolio import complete.\n";
echo "Imported/updated projects: {$projectCount}\n";
echo "Imported/updated clients: {$clientCount}\n";
echo "Database totals — projects: {$dbProjects}, clients: {$dbClients}\n";
