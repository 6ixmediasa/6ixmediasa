<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){exit(1);} $home=getenv('HOME')?:'/home/ixmedia1';$f=$home.'/.6ixmedia-admin/config.php';if(!is_file($f)){fwrite(STDERR,"Config missing.\n");exit(1);} $c=require $f;
$pdo=new PDO(sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4',$c['db_host'],$c['db_name']),$c['db_user'],$c['db_pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
$projects=(int)$pdo->query('SELECT COUNT(*) FROM projects')->fetchColumn();
$platforms=(int)$pdo->query('SELECT COUNT(*) FROM platforms')->fetchColumn();
$publishedProjects=(int)$pdo->query("SELECT COUNT(*) FROM projects WHERE status='published'")->fetchColumn();
$publishedPlatforms=(int)$pdo->query("SELECT COUNT(*) FROM platforms WHERE status='published'")->fetchColumn();
if($projects<30){fwrite(STDERR,"Expected at least 30 projects, found $projects.\n");exit(1);}if($platforms<8){fwrite(STDERR,"Expected at least 8 platforms, found $platforms.\n");exit(1);}if($publishedProjects<30||$publishedPlatforms<8){fwrite(STDERR,"Published content counts are incomplete.\n");exit(1);}
$adminRoot=$home.'/admin.6ixmediasa.com'; foreach(['index.php','api/published.php'] as $file){if(!is_file($adminRoot.'/'.$file)){fwrite(STDERR,"Missing admin file: $file\n");exit(1);}}
echo "CMS verification passed: $projects projects, $platforms platforms.\n";
