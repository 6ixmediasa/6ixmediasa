<?php
declare(strict_types=1);

$home = getenv('HOME') ?: '/home/ixmedia1';
$configFile = $home . '/.6ixmedia-admin/config.php';
if (!is_file($configFile)) {
    http_response_code(503);
    exit('6ixMedia Admin is not configured yet.');
}
$config = require $configFile;

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
session_name('sixmedia_admin');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $https,
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header("Permissions-Policy: camera=(), microphone=(), geolocation=()");
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'");

try {
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
} catch (Throwable $e) {
    http_response_code(503);
    exit('Database connection unavailable.');
}

function e(?string $v): string { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }
function redirect(string $url): never { header('Location: ' . $url); exit; }
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}
function verify_csrf(): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(419); exit('Invalid form token.');
    }
}
function logged_in(): bool { return !empty($_SESSION['admin_id']); }
function require_auth(): void { if (!logged_in()) redirect('/?route=login'); }
function slugify(string $text): string {
    $text = trim(mb_strtolower($text));
    $text = preg_replace('/[^a-z0-9]+/i', '-', $text) ?? '';
    return trim($text, '-') ?: bin2hex(random_bytes(4));
}
function audit(PDO $pdo, string $action, string $type, ?int $id = null): void {
    $stmt = $pdo->prepare('INSERT INTO audit_log (admin_id, action, entity_type, entity_id, ip_address) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$_SESSION['admin_id'] ?? null, $action, $type, $id, $_SERVER['REMOTE_ADDR'] ?? null]);
}
function flash(string $message): void { $_SESSION['flash'] = $message; }
function get_flash(): ?string { $m = $_SESSION['flash'] ?? null; unset($_SESSION['flash']); return $m; }

$route = $_GET['route'] ?? (logged_in() ? 'dashboard' : 'login');

if ($route === 'logout') {
    if (logged_in()) audit($pdo, 'logout', 'admin', (int)$_SESSION['admin_id']);
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'] ?? '', $p['secure'], $p['httponly']);
    }
    session_destroy();
    redirect('/?route=login');
}

if ($route === 'login') {
    if (logged_in()) redirect('/');
    $error = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        verify_csrf();
        $now = time();
        $_SESSION['login_attempts'] = array_values(array_filter($_SESSION['login_attempts'] ?? [], fn($t) => $t > $now - 900));
        if (count($_SESSION['login_attempts']) >= 10) {
            $error = 'Too many login attempts. Try again later.';
        } else {
            $_SESSION['login_attempts'][] = $now;
            $stmt = $pdo->prepare('SELECT * FROM admins WHERE email = ? LIMIT 1');
            $stmt->execute([mb_strtolower(trim($_POST['email'] ?? ''))]);
            $admin = $stmt->fetch();
            if ($admin && password_verify($_POST['password'] ?? '', $admin['password_hash'])) {
                session_regenerate_id(true);
                $_SESSION['admin_id'] = (int)$admin['id'];
                $_SESSION['admin_email'] = $admin['email'];
                $_SESSION['login_attempts'] = [];
                $pdo->prepare('UPDATE admins SET last_login_at = NOW() WHERE id = ?')->execute([$admin['id']]);
                audit($pdo, 'login', 'admin', (int)$admin['id']);
                redirect('/');
            }
            $error = 'Invalid email or password.';
        }
    }
    ?><!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>6ixMedia Admin</title><link rel="stylesheet" href="/assets/style.css"></head><body class="login-body"><main class="login-card"><div class="brand">6ixMedia SA</div><h1>Admin Dashboard</h1><p class="muted">Sign in to manage clients, projects and content.</p><?php if ($error): ?><div class="alert error"><?=e($error)?></div><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><label>Email<input type="email" name="email" required autocomplete="username"></label><label>Password<input type="password" name="password" required autocomplete="current-password"></label><button class="btn primary" type="submit">Sign in</button></form></main></body></html><?php
    exit;
}

require_auth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $action = $_POST['action'] ?? '';

    if ($action === 'save_client') {
        $id = (int)($_POST['id'] ?? 0);
        $data = [trim($_POST['name'] ?? ''), slugify($_POST['slug'] ?: ($_POST['name'] ?? '')), trim($_POST['email'] ?? ''), trim($_POST['phone'] ?? ''), trim($_POST['website'] ?? ''), $_POST['status'] === 'inactive' ? 'inactive' : 'active', trim($_POST['notes'] ?? '')];
        if ($id) {
            $pdo->prepare('UPDATE clients SET name=?, slug=?, email=?, phone=?, website=?, status=?, notes=?, updated_at=NOW() WHERE id=?')->execute([...$data, $id]);
        } else {
            $pdo->prepare('INSERT INTO clients (name,slug,email,phone,website,status,notes) VALUES (?,?,?,?,?,?,?)')->execute($data);
            $id = (int)$pdo->lastInsertId();
        }
        audit($pdo, 'save', 'client', $id); flash('Client saved.'); redirect('/?route=clients');
    }

    if ($action === 'delete_client') {
        $id = (int)($_POST['id'] ?? 0);
        $pdo->prepare('DELETE FROM clients WHERE id=?')->execute([$id]); audit($pdo, 'delete', 'client', $id); flash('Client deleted.'); redirect('/?route=clients');
    }

    if ($action === 'save_project') {
        $id = (int)($_POST['id'] ?? 0);
        $vals = [(int)($_POST['client_id'] ?? 0) ?: null, trim($_POST['title'] ?? ''), slugify($_POST['slug'] ?: ($_POST['title'] ?? '')), trim($_POST['category'] ?? ''), trim($_POST['summary'] ?? ''), trim($_POST['description'] ?? ''), trim($_POST['website_url'] ?? ''), trim($_POST['cover_image'] ?? ''), trim($_POST['project_pdf'] ?? ''), in_array($_POST['status'] ?? '', ['draft','published'], true) ? $_POST['status'] : 'draft', !empty($_POST['featured']) ? 1 : 0, $_POST['completed_at'] ?: null, trim($_POST['seo_title'] ?? ''), trim($_POST['seo_description'] ?? '')];
        if ($id) {
            $pdo->prepare('UPDATE projects SET client_id=?,title=?,slug=?,category=?,summary=?,description=?,website_url=?,cover_image=?,project_pdf=?,status=?,featured=?,completed_at=?,seo_title=?,seo_description=?,updated_at=NOW() WHERE id=?')->execute([...$vals,$id]);
        } else {
            $pdo->prepare('INSERT INTO projects (client_id,title,slug,category,summary,description,website_url,cover_image,project_pdf,status,featured,completed_at,seo_title,seo_description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)')->execute($vals);
            $id=(int)$pdo->lastInsertId();
        }
        audit($pdo,'save','project',$id); flash('Project saved.'); redirect('/?route=projects');
    }

    if ($action === 'delete_project') {
        $id=(int)($_POST['id']??0); $pdo->prepare('DELETE FROM projects WHERE id=?')->execute([$id]); audit($pdo,'delete','project',$id); flash('Project deleted.'); redirect('/?route=projects');
    }

    if ($action === 'save_post') {
        $id=(int)($_POST['id']??0); $status=in_array($_POST['status']??'',['draft','published'],true)?$_POST['status']:'draft';
        $vals=[trim($_POST['title']??''),slugify($_POST['slug']?:($_POST['title']??'')),trim($_POST['excerpt']??''),trim($_POST['content']??''),trim($_POST['cover_image']??''),$status,$status==='published'?($_POST['published_at']?:date('Y-m-d H:i:s')):null,trim($_POST['seo_title']??''),trim($_POST['seo_description']??'')];
        if($id){$pdo->prepare('UPDATE posts SET title=?,slug=?,excerpt=?,content=?,cover_image=?,status=?,published_at=?,seo_title=?,seo_description=?,updated_at=NOW() WHERE id=?')->execute([...$vals,$id]);}
        else{$pdo->prepare('INSERT INTO posts (title,slug,excerpt,content,cover_image,status,published_at,seo_title,seo_description) VALUES (?,?,?,?,?,?,?,?,?)')->execute($vals);$id=(int)$pdo->lastInsertId();}
        audit($pdo,'save','post',$id);flash('Post saved.');redirect('/?route=posts');
    }

    if ($action === 'delete_post') {
        $id=(int)($_POST['id']??0);$pdo->prepare('DELETE FROM posts WHERE id=?')->execute([$id]);audit($pdo,'delete','post',$id);flash('Post deleted.');redirect('/?route=posts');
    }

    if ($action === 'upload_media' && isset($_FILES['file'])) {
        $f=$_FILES['file'];
        if($f['error']!==UPLOAD_ERR_OK || $f['size']>15*1024*1024){flash('Upload failed or file exceeds 15 MB.');redirect('/?route=media');}
        $mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
        $allowed=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','application/pdf'=>'pdf'];
        if(!isset($allowed[$mime])){flash('Only JPG, PNG, WEBP and PDF files are allowed.');redirect('/?route=media');}
        $stored=bin2hex(random_bytes(16)).'.'.$allowed[$mime];
        $dir=__DIR__.'/uploads'; if(!is_dir($dir)) mkdir($dir,0755,true);
        if(!move_uploaded_file($f['tmp_name'],$dir.'/'.$stored)){flash('Could not store upload.');redirect('/?route=media');}
        $path='/uploads/'.$stored;
        $pdo->prepare('INSERT INTO media (file_name,stored_name,mime_type,size_bytes,path) VALUES (?,?,?,?,?)')->execute([$f['name'],$stored,$mime,$f['size'],$path]);
        audit($pdo,'upload','media',(int)$pdo->lastInsertId());flash('Media uploaded.');redirect('/?route=media');
    }

    if ($action === 'save_settings') {
        foreach (['site_name','public_site_url','company_email','company_phone'] as $key) {
            $pdo->prepare('INSERT INTO settings (setting_key,value) VALUES (?,?) ON DUPLICATE KEY UPDATE value=VALUES(value)')->execute([$key,trim($_POST[$key]??'')]);
        }
        audit($pdo,'save','settings');flash('Settings saved.');redirect('/?route=settings');
    }
}

$flash=get_flash();
function nav_active(string $name,string $route): string { return $name===$route?'active':''; }
?><!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>6ixMedia Admin</title><link rel="stylesheet" href="/assets/style.css"></head><body><div class="app"><aside class="sidebar"><div class="brand">6ixMedia SA</div><nav><a class="<?=nav_active('dashboard',$route)?>" href="/">Dashboard</a><a class="<?=str_starts_with($route,'client')?'active':''?>" href="/?route=clients">Clients</a><a class="<?=str_starts_with($route,'project')?'active':''?>" href="/?route=projects">Projects</a><a class="<?=str_starts_with($route,'post')?'active':''?>" href="/?route=posts">Blog</a><a class="<?=nav_active('media',$route)?>" href="/?route=media">Media</a><a class="<?=nav_active('settings',$route)?>" href="/?route=settings">Settings</a></nav><div class="sidebar-bottom"><span><?=e($_SESSION['admin_email']??'')?></span><a href="/?route=logout">Sign out</a></div></aside><main class="content"><?php if($flash):?><div class="alert success"><?=e($flash)?></div><?php endif;?>
<?php
if($route==='dashboard'){
    $counts=[];foreach(['clients','projects','posts','media'] as $t){$counts[$t]=(int)$pdo->query("SELECT COUNT(*) FROM $t")->fetchColumn();}
    ?><div class="page-head"><div><p class="eyebrow">Overview</p><h1>Dashboard</h1></div><a class="btn primary" href="/?route=project_edit">New project</a></div><div class="stats"><div class="stat"><span>Clients</span><strong><?=$counts['clients']?></strong></div><div class="stat"><span>Projects</span><strong><?=$counts['projects']?></strong></div><div class="stat"><span>Blog posts</span><strong><?=$counts['posts']?></strong></div><div class="stat"><span>Media files</span><strong><?=$counts['media']?></strong></div></div><section class="panel"><h2>Content workflow</h2><p class="muted">Manage content here. The publishing bridge to the Next.js production build will be connected after the dashboard is verified.</p></section><?php
}
elseif($route==='clients'){
    $rows=$pdo->query('SELECT * FROM clients ORDER BY updated_at DESC')->fetchAll();?><div class="page-head"><div><p class="eyebrow">CRM</p><h1>Clients</h1></div><a class="btn primary" href="/?route=client_edit">Add client</a></div><section class="panel table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Status</th><th></th></tr></thead><tbody><?php foreach($rows as $r):?><tr><td><strong><?=e($r['name'])?></strong><small><?=e($r['slug'])?></small></td><td><?=e($r['email'])?></td><td><span class="badge"><?=e($r['status'])?></span></td><td class="actions"><a href="/?route=client_edit&id=<?=$r['id']?>">Edit</a><form method="post" onsubmit="return confirm('Delete this client?')"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="delete_client"><input type="hidden" name="id" value="<?=$r['id']?>"><button class="link danger" type="submit">Delete</button></form></td></tr><?php endforeach;?></tbody></table></section><?php
}
elseif($route==='client_edit'){
    $id=(int)($_GET['id']??0);$r=['id'=>0,'name'=>'','slug'=>'','email'=>'','phone'=>'','website'=>'','status'=>'active','notes'=>''];if($id){$s=$pdo->prepare('SELECT * FROM clients WHERE id=?');$s->execute([$id]);$r=$s->fetch()?:$r;}?><div class="page-head"><div><p class="eyebrow">Client</p><h1><?=$id?'Edit client':'Add client'?></h1></div></div><form class="panel form-grid" method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="save_client"><input type="hidden" name="id" value="<?=$r['id']?>"><label>Name<input name="name" required value="<?=e($r['name'])?>"></label><label>Slug<input name="slug" value="<?=e($r['slug'])?>" placeholder="auto-generated"></label><label>Email<input type="email" name="email" value="<?=e($r['email'])?>"></label><label>Phone<input name="phone" value="<?=e($r['phone'])?>"></label><label>Website<input type="url" name="website" value="<?=e($r['website'])?>"></label><label>Status<select name="status"><option value="active" <?=$r['status']==='active'?'selected':''?>>Active</option><option value="inactive" <?=$r['status']==='inactive'?'selected':''?>>Inactive</option></select></label><label class="full">Notes<textarea name="notes" rows="7"><?=e($r['notes'])?></textarea></label><div class="full"><button class="btn primary">Save client</button></div></form><?php
}
elseif($route==='projects'){
    $rows=$pdo->query('SELECT p.*,c.name client_name FROM projects p LEFT JOIN clients c ON c.id=p.client_id ORDER BY p.updated_at DESC')->fetchAll();?><div class="page-head"><div><p class="eyebrow">Portfolio</p><h1>Projects</h1></div><a class="btn primary" href="/?route=project_edit">Add project</a></div><section class="panel table-wrap"><table><thead><tr><th>Project</th><th>Client</th><th>Status</th><th></th></tr></thead><tbody><?php foreach($rows as $r):?><tr><td><strong><?=e($r['title'])?></strong><small><?=e($r['category'])?></small></td><td><?=e($r['client_name'])?></td><td><span class="badge"><?=e($r['status'])?></span></td><td class="actions"><a href="/?route=project_edit&id=<?=$r['id']?>">Edit</a><form method="post" onsubmit="return confirm('Delete this project?')"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="delete_project"><input type="hidden" name="id" value="<?=$r['id']?>"><button class="link danger">Delete</button></form></td></tr><?php endforeach;?></tbody></table></section><?php
}
elseif($route==='project_edit'){
    $id=(int)($_GET['id']??0);$r=['id'=>0,'client_id'=>'','title'=>'','slug'=>'','category'=>'','summary'=>'','description'=>'','website_url'=>'','cover_image'=>'','project_pdf'=>'','status'=>'draft','featured'=>0,'completed_at'=>'','seo_title'=>'','seo_description'=>''];if($id){$s=$pdo->prepare('SELECT * FROM projects WHERE id=?');$s->execute([$id]);$r=$s->fetch()?:$r;}$clients=$pdo->query('SELECT id,name FROM clients ORDER BY name')->fetchAll();$media=$pdo->query('SELECT path,file_name,mime_type FROM media ORDER BY created_at DESC')->fetchAll();?><div class="page-head"><div><p class="eyebrow">Portfolio</p><h1><?=$id?'Edit project':'Add project'?></h1></div></div><form class="panel form-grid" method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="save_project"><input type="hidden" name="id" value="<?=$r['id']?>"><label>Title<input name="title" required value="<?=e($r['title'])?>"></label><label>Slug<input name="slug" value="<?=e($r['slug'])?>"></label><label>Client<select name="client_id"><option value="">— None —</option><?php foreach($clients as $c):?><option value="<?=$c['id']?>" <?=(string)$r['client_id']===(string)$c['id']?'selected':''?>><?=e($c['name'])?></option><?php endforeach;?></select></label><label>Category<input name="category" value="<?=e($r['category'])?>"></label><label class="full">Summary<textarea name="summary" rows="3"><?=e($r['summary'])?></textarea></label><label class="full">Description<textarea name="description" rows="10"><?=e($r['description'])?></textarea></label><label>Website URL<input type="url" name="website_url" value="<?=e($r['website_url'])?>"></label><label>Completed date<input type="date" name="completed_at" value="<?=e($r['completed_at'])?>"></label><label>Cover image<select name="cover_image"><option value="">— None —</option><?php foreach($media as $m)if(str_starts_with($m['mime_type'],'image/')):?><option value="<?=e($m['path'])?>" <?=$r['cover_image']===$m['path']?'selected':''?>><?=e($m['file_name'])?></option><?php endif;?></select></label><label>Project PDF<select name="project_pdf"><option value="">— None —</option><?php foreach($media as $m)if($m['mime_type']==='application/pdf'):?><option value="<?=e($m['path'])?>" <?=$r['project_pdf']===$m['path']?'selected':''?>><?=e($m['file_name'])?></option><?php endif;?></select></label><label>Status<select name="status"><option value="draft" <?=$r['status']==='draft'?'selected':''?>>Draft</option><option value="published" <?=$r['status']==='published'?'selected':''?>>Published</option></select></label><label class="checkbox"><input type="checkbox" name="featured" value="1" <?=$r['featured']?'checked':''?>> Featured project</label><label>SEO title<input name="seo_title" value="<?=e($r['seo_title'])?>"></label><label>SEO description<input name="seo_description" value="<?=e($r['seo_description'])?>"></label><div class="full"><button class="btn primary">Save project</button></div></form><?php
}
elseif($route==='posts'){
    $rows=$pdo->query('SELECT * FROM posts ORDER BY updated_at DESC')->fetchAll();?><div class="page-head"><div><p class="eyebrow">Publishing</p><h1>Blog</h1></div><a class="btn primary" href="/?route=post_edit">New post</a></div><section class="panel table-wrap"><table><thead><tr><th>Title</th><th>Status</th><th>Published</th><th></th></tr></thead><tbody><?php foreach($rows as $r):?><tr><td><strong><?=e($r['title'])?></strong><small><?=e($r['slug'])?></small></td><td><span class="badge"><?=e($r['status'])?></span></td><td><?=e($r['published_at'])?></td><td class="actions"><a href="/?route=post_edit&id=<?=$r['id']?>">Edit</a><form method="post" onsubmit="return confirm('Delete this post?')"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="delete_post"><input type="hidden" name="id" value="<?=$r['id']?>"><button class="link danger">Delete</button></form></td></tr><?php endforeach;?></tbody></table></section><?php
}
elseif($route==='post_edit'){
    $id=(int)($_GET['id']??0);$r=['id'=>0,'title'=>'','slug'=>'','excerpt'=>'','content'=>'','cover_image'=>'','status'=>'draft','published_at'=>'','seo_title'=>'','seo_description'=>''];if($id){$s=$pdo->prepare('SELECT * FROM posts WHERE id=?');$s->execute([$id]);$r=$s->fetch()?:$r;}$media=$pdo->query("SELECT path,file_name FROM media WHERE mime_type LIKE 'image/%' ORDER BY created_at DESC")->fetchAll();?><div class="page-head"><div><p class="eyebrow">Blog</p><h1><?=$id?'Edit post':'New post'?></h1></div></div><form class="panel form-grid" method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="save_post"><input type="hidden" name="id" value="<?=$r['id']?>"><label>Title<input name="title" required value="<?=e($r['title'])?>"></label><label>Slug<input name="slug" value="<?=e($r['slug'])?>"></label><label class="full">Excerpt<textarea name="excerpt" rows="3"><?=e($r['excerpt'])?></textarea></label><label class="full">Content<textarea name="content" rows="16"><?=e($r['content'])?></textarea></label><label>Cover image<select name="cover_image"><option value="">— None —</option><?php foreach($media as $m):?><option value="<?=e($m['path'])?>" <?=$r['cover_image']===$m['path']?'selected':''?>><?=e($m['file_name'])?></option><?php endforeach;?></select></label><label>Status<select name="status"><option value="draft" <?=$r['status']==='draft'?'selected':''?>>Draft</option><option value="published" <?=$r['status']==='published'?'selected':''?>>Published</option></select></label><label>Publish date<input type="datetime-local" name="published_at" value="<?=e($r['published_at']?date('Y-m-d\TH:i',strtotime($r['published_at'])):'')?>"></label><label>SEO title<input name="seo_title" value="<?=e($r['seo_title'])?>"></label><label class="full">SEO description<textarea name="seo_description" rows="3"><?=e($r['seo_description'])?></textarea></label><div class="full"><button class="btn primary">Save post</button></div></form><?php
}
elseif($route==='media'){
    $rows=$pdo->query('SELECT * FROM media ORDER BY created_at DESC')->fetchAll();?><div class="page-head"><div><p class="eyebrow">Assets</p><h1>Media</h1></div></div><form class="panel upload" method="post" enctype="multipart/form-data"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="upload_media"><input type="file" name="file" accept="image/jpeg,image/png,image/webp,application/pdf" required><button class="btn primary">Upload</button><small>JPG, PNG, WEBP or PDF · max 15 MB</small></form><div class="media-grid"><?php foreach($rows as $r):?><div class="media-card"><?php if(str_starts_with($r['mime_type'],'image/')):?><img src="<?=e($r['path'])?>" alt=""><?php else:?><div class="pdf-icon">PDF</div><?php endif;?><strong><?=e($r['file_name'])?></strong><small><?=number_format($r['size_bytes']/1024,1)?> KB</small><code><?=e($r['path'])?></code></div><?php endforeach;?></div><?php
}
elseif($route==='settings'){
    $s=[];foreach($pdo->query('SELECT setting_key,value FROM settings') as $row)$s[$row['setting_key']]=$row['value'];?><div class="page-head"><div><p class="eyebrow">System</p><h1>Settings</h1></div></div><form class="panel form-grid" method="post"><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="save_settings"><label>Site name<input name="site_name" value="<?=e($s['site_name']??'6ixMedia SA')?>"></label><label>Public site URL<input type="url" name="public_site_url" value="<?=e($s['public_site_url']??'https://6ixmediasa.com')?>"></label><label>Company email<input type="email" name="company_email" value="<?=e($s['company_email']??'')?>"></label><label>Company phone<input name="company_phone" value="<?=e($s['company_phone']??'')?>"></label><div class="full"><button class="btn primary">Save settings</button></div></form><?php
}
else{http_response_code(404);?><h1>Not found</h1><?php }
?></main></div></body></html>
