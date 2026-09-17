<?php
declare(strict_types=1);
$home=getenv('HOME')?:'/home/ixmedia1';$configFile=$home.'/.6ixmedia-admin/config.php';if(!is_file($configFile)){http_response_code(503);exit;}$c=require $configFile;
header('Content-Type: application/json; charset=utf-8');header('Cache-Control: public, max-age=60');header('X-Content-Type-Options: nosniff');header('Access-Control-Allow-Origin: https://6ixmediasa.com');
try{$pdo=new PDO(sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4',$c['db_host'],$c['db_name']),$c['db_user'],$c['db_pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
$projects=$pdo->query("SELECT title,slug,category,tagline,about,services_json,tech_json,year,industry,cover_image,shots_json,docs_json,featured,seo_title,seo_description,sort_order,updated_at FROM projects WHERE status='published' ORDER BY featured DESC,sort_order ASC,id ASC")->fetchAll();
$platforms=$pdo->query("SELECT slug,name,what_label,h1,lead,meta_title,meta_description,price,price_note,features_json,audience,deliverables_json,faqs_json,docs_json,sort_order,updated_at FROM platforms WHERE status='published' ORDER BY sort_order ASC,id ASC")->fetchAll();
$posts=$pdo->query("SELECT title,slug,excerpt,content,cover_image,published_at,seo_title,seo_description,updated_at FROM posts WHERE status='published' ORDER BY published_at DESC,id DESC")->fetchAll();
$decode=function(array &$rows,array $fields){foreach($rows as &$r)foreach($fields as $f)$r[$f]=json_decode((string)($r[$f]??'[]'),true)?:[];};
$decode($projects,['services_json','tech_json','shots_json','docs_json']);$decode($platforms,['features_json','deliverables_json','faqs_json','docs_json']);
echo json_encode(['generated_at'=>gmdate('c'),'projects'=>$projects,'platforms'=>$platforms,'posts'=>$posts],JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
}catch(Throwable $e){http_response_code(500);echo json_encode(['error'=>'server_error']);}
