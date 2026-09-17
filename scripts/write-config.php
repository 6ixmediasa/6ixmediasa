<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { fwrite(STDERR, "CLI only.\n"); exit(1); }
$required=['DB_HOST','DB_NAME','DB_USER','DB_PASS','APP_KEY','CONTENT_API_KEY'];
foreach($required as $k){ if(getenv($k)===false){fwrite(STDERR,"Missing $k\n");exit(1);} }
$home=getenv('HOME')?:'/home/ixmedia1';
$dir=$home.'/.6ixmedia-admin';
if(!is_dir($dir) && !mkdir($dir,0700,true)){fwrite(STDERR,"Could not create config directory.\n");exit(1);} 
$config=[
 'db_host'=>(string)getenv('DB_HOST'),
 'db_name'=>(string)getenv('DB_NAME'),
 'db_user'=>(string)getenv('DB_USER'),
 'db_pass'=>(string)getenv('DB_PASS'),
 'app_key'=>(string)getenv('APP_KEY'),
 'content_api_key'=>(string)getenv('CONTENT_API_KEY'),
];
$file=$dir.'/config.php';
$content="<?php\nreturn ".var_export($config,true).";\n";
if(file_put_contents($file,$content,LOCK_EX)===false){fwrite(STDERR,"Could not write config.\n");exit(1);} 
chmod($file,0600);
echo "Config written to $file\n";
