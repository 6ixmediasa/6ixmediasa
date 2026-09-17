<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$home=getenv('HOME')?:'/home/ixmedia1';
$configFile=$home.'/.6ixmedia-admin/config.php';
if(!is_file($configFile)){http_response_code(503);echo json_encode(['ok'=>false,'stage'=>'config_missing']);exit;}
try{
  $c=require $configFile;
  $pdo=new PDO(sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4',$c['db_host'],$c['db_name']),$c['db_user'],$c['db_pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
  $table=function(string $name)use($pdo):bool{$q=$pdo->prepare('SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=?');$q->execute([$name]);return(bool)$q->fetchColumn();};
  $column=function(string $table,string $name)use($pdo):bool{$q=$pdo->prepare('SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND COLUMN_NAME=?');$q->execute([$table,$name]);return(bool)$q->fetchColumn();};
  $required=['tagline','about','services_json','tech_json','year','industry','shots_json','docs_json','sort_order'];
  $missing=[];foreach($required as $col){if(!$column('projects',$col))$missing[]=$col;}
  $tables=['projects'=>$table('projects'),'platforms'=>$table('platforms'),'posts'=>$table('posts'),'media'=>$table('media')];
  $counts=[];foreach($tables as $name=>$exists){$counts[$name]=$exists?(int)$pdo->query("SELECT COUNT(*) FROM `$name`")->fetchColumn():null;}
  $published=['projects'=>$tables['projects']?(int)$pdo->query("SELECT COUNT(*) FROM projects WHERE status='published'")->fetchColumn():null,'platforms'=>$tables['platforms']?(int)$pdo->query("SELECT COUNT(*) FROM platforms WHERE status='published'")->fetchColumn():null,'posts'=>$tables['posts']?(int)$pdo->query("SELECT COUNT(*) FROM posts WHERE status='published'")->fetchColumn():null];
  $versionFile=$home.'/.6ixmedia-admin-version';$version=is_file($versionFile)?trim((string)file_get_contents($versionFile)):null;
  $ok=!in_array(false,$tables,true)&&count($missing)===0&&($counts['projects']??0)>=30&&($counts['platforms']??0)>=8;
  echo json_encode(['ok'=>$ok,'admin_version'=>$version,'tables'=>$tables,'missing_project_columns'=>$missing,'counts'=>$counts,'published'=>$published],JSON_UNESCAPED_SLASHES);
}catch(Throwable $e){http_response_code(500);echo json_encode(['ok'=>false,'stage'=>'database_or_schema_error','error_class'=>get_class($e)]);}
