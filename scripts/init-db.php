<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { fwrite(STDERR, "CLI only.\n"); exit(1); }
$home = getenv('HOME') ?: '/home/ixmedia1';
$configFile = $home . '/.6ixmedia-admin/config.php';
if (!is_file($configFile)) { fwrite(STDERR, "Config not found.\n"); exit(1); }
$config = require $configFile;
$email = mb_strtolower(trim((string)getenv('ADMIN_EMAIL')));
$password = (string)getenv('ADMIN_PASSWORD');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { fwrite(STDERR, "Invalid admin email.\n"); exit(1); }
if (strlen($password) < 12) { fwrite(STDERR, "Admin password must be at least 12 characters.\n"); exit(1); }
$pdo = new PDO(sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4',$config['db_host'],$config['db_name']),$config['db_user'],$config['db_pass'],[
    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES=>false,
]);
$sql = [
"CREATE TABLE IF NOT EXISTS admins (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 email VARCHAR(190) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 last_login_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
"CREATE TABLE IF NOT EXISTS clients (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(190) NOT NULL,
 slug VARCHAR(190) NOT NULL UNIQUE,
 email VARCHAR(190) NULL,
 phone VARCHAR(80) NULL,
 website VARCHAR(500) NULL,
 status ENUM('active','inactive') NOT NULL DEFAULT 'active',
 notes TEXT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX(status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
"CREATE TABLE IF NOT EXISTS projects (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 client_id INT UNSIGNED NULL,
 title VARCHAR(190) NOT NULL,
 slug VARCHAR(190) NOT NULL UNIQUE,
 category VARCHAR(120) NULL,
 summary TEXT NULL,
 description LONGTEXT NULL,
 website_url VARCHAR(500) NULL,
 cover_image VARCHAR(500) NULL,
 project_pdf VARCHAR(500) NULL,
 status ENUM('draft','published') NOT NULL DEFAULT 'draft',
 featured TINYINT(1) NOT NULL DEFAULT 0,
 completed_at DATE NULL,
 seo_title VARCHAR(255) NULL,
 seo_description VARCHAR(500) NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_projects_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
 INDEX(status), INDEX(featured), INDEX(client_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
"CREATE TABLE IF NOT EXISTS posts (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(190) NOT NULL,
 slug VARCHAR(190) NOT NULL UNIQUE,
 excerpt TEXT NULL,
 content LONGTEXT NULL,
 cover_image VARCHAR(500) NULL,
 status ENUM('draft','published') NOT NULL DEFAULT 'draft',
 published_at DATETIME NULL,
 seo_title VARCHAR(255) NULL,
 seo_description VARCHAR(500) NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX(status), INDEX(published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
"CREATE TABLE IF NOT EXISTS media (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 file_name VARCHAR(255) NOT NULL,
 stored_name VARCHAR(255) NOT NULL UNIQUE,
 mime_type VARCHAR(120) NOT NULL,
 size_bytes BIGINT UNSIGNED NOT NULL,
 path VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
"CREATE TABLE IF NOT EXISTS settings (
 setting_key VARCHAR(120) PRIMARY KEY,
 value LONGTEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
"CREATE TABLE IF NOT EXISTS audit_log (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 admin_id INT UNSIGNED NULL,
 action VARCHAR(80) NOT NULL,
 entity_type VARCHAR(80) NOT NULL,
 entity_id BIGINT UNSIGNED NULL,
 ip_address VARCHAR(64) NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 INDEX(admin_id), INDEX(created_at),
 CONSTRAINT fk_audit_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
];
foreach ($sql as $statement) $pdo->exec($statement);
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO admins (email,password_hash) VALUES (?,?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)');
$stmt->execute([$email,$hash]);
$defaults=['site_name'=>'6ixMedia SA','public_site_url'=>'https://6ixmediasa.com'];
$stmt=$pdo->prepare('INSERT INTO settings (setting_key,value) VALUES (?,?) ON DUPLICATE KEY UPDATE value=VALUES(value)');
foreach($defaults as $k=>$v)$stmt->execute([$k,$v]);
echo "Database initialized and admin account created.\n";
