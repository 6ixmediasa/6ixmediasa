<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { fwrite(STDERR, "CLI only.\n"); exit(1); }
$home=getenv('HOME')?:'/home/ixmedia1';
$configFile=$home.'/.6ixmedia-admin/config.php';
if(!is_file($configFile)){fwrite(STDERR,"Admin config missing.\n");exit(1);} $c=require $configFile;
$pdo=new PDO(sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4',$c['db_host'],$c['db_name']),$c['db_user'],$c['db_pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]);
function tableExists(PDO $pdo,string $table):bool{$q=$pdo->prepare('SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=?');$q->execute([$table]);return (bool)$q->fetchColumn();}
function columnExists(PDO $pdo,string $table,string $column):bool{$q=$pdo->prepare('SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND COLUMN_NAME=?');$q->execute([$table,$column]);return (bool)$q->fetchColumn();}
if(!tableExists($pdo,'projects')){throw new RuntimeException('projects table is missing; run the original admin installer first.');}
$columns=[
 'tagline'=>'TEXT NULL',
 'about'=>'LONGTEXT NULL',
 'services_json'=>'LONGTEXT NULL',
 'tech_json'=>'LONGTEXT NULL',
 'year'=>'VARCHAR(10) NULL',
 'industry'=>'VARCHAR(190) NULL',
 'shots_json'=>'LONGTEXT NULL',
 'docs_json'=>'LONGTEXT NULL',
 'sort_order'=>'INT NOT NULL DEFAULT 0'
];
foreach($columns as $name=>$definition){if(!columnExists($pdo,'projects',$name)){$pdo->exec('ALTER TABLE `projects` ADD COLUMN `'.str_replace('`','',$name).'` '.$definition);echo "Added projects.$name\n";}}
$pdo->exec("CREATE TABLE IF NOT EXISTS `platforms` (
 `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 `slug` VARCHAR(190) NOT NULL UNIQUE,
 `name` VARCHAR(190) NOT NULL,
 `what_label` VARCHAR(190) NULL,
 `h1` VARCHAR(255) NOT NULL,
 `lead` TEXT NULL,
 `meta_title` VARCHAR(255) NULL,
 `meta_description` VARCHAR(500) NULL,
 `price` VARCHAR(80) NULL,
 `price_note` VARCHAR(255) NULL,
 `features_json` LONGTEXT NULL,
 `audience` TEXT NULL,
 `deliverables_json` LONGTEXT NULL,
 `faqs_json` LONGTEXT NULL,
 `docs_json` LONGTEXT NULL,
 `status` ENUM('draft','published') NOT NULL DEFAULT 'published',
 `sort_order` INT NOT NULL DEFAULT 0,
 `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX(`status`), INDEX(`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
if(columnExists($pdo,'projects','client_id')){$pdo->exec('UPDATE `projects` SET `client_id`=NULL WHERE `client_id` IS NOT NULL');}
$required=['tagline','about','services_json','tech_json','year','industry','shots_json','docs_json','sort_order'];
foreach($required as $col){if(!columnExists($pdo,'projects',$col))throw new RuntimeException("Migration verification failed: projects.$col missing");}
if(!tableExists($pdo,'platforms'))throw new RuntimeException('Migration verification failed: platforms table missing');
echo "CMS v4 schema ready.\n";
