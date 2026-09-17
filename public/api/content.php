<?php
declare(strict_types=1);

$home = getenv('HOME') ?: '/home/ixmedia1';
$configFile = $home . '/.6ixmedia-admin/config.php';
if (!is_file($configFile)) { http_response_code(503); exit; }
$config = require $configFile;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$key = $_SERVER['HTTP_X_6IXMEDIA_KEY'] ?? '';
if (!$key || !hash_equals((string)($config['content_api_key'] ?? ''), $key)) {
    http_response_code(401);
    echo json_encode(['error' => 'unauthorized']);
    exit;
}

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']),
        $config['db_user'],
        $config['db_pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
    $settings = [];
    foreach ($pdo->query('SELECT setting_key,value FROM settings') as $row) $settings[$row['setting_key']] = $row['value'];
    $clients = $pdo->query("SELECT id,name,slug,email,phone,website,status,notes,updated_at FROM clients WHERE status='active' ORDER BY name")->fetchAll();
    $projects = $pdo->query("SELECT p.*, c.name client_name, c.slug client_slug FROM projects p LEFT JOIN clients c ON c.id=p.client_id WHERE p.status='published' ORDER BY p.featured DESC, p.updated_at DESC")->fetchAll();
    $posts = $pdo->query("SELECT id,title,slug,excerpt,content,cover_image,published_at,seo_title,seo_description,updated_at FROM posts WHERE status='published' ORDER BY published_at DESC, id DESC")->fetchAll();
    echo json_encode(['generated_at'=>gmdate('c'),'settings'=>$settings,'clients'=>$clients,'projects'=>$projects,'posts'=>$posts], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error'=>'server_error']);
}
