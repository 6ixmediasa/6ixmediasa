import fs from 'node:fs';
const url='https://admin.6ixmediasa.com/api/published.php';
const target='lib/cms-content.json';
try{
  const r=await fetch(url,{headers:{'User-Agent':'6ixMedia-Static-Builder/1.0'},cache:'no-store'});
  if(!r.ok) throw new Error(`HTTP ${r.status}`);
  const data=await r.json();
  if(!data || !Array.isArray(data.projects) || !Array.isArray(data.platforms) || !Array.isArray(data.posts)) throw new Error('Invalid CMS payload');
  fs.writeFileSync(target,JSON.stringify(data,null,2)+'\n');
  console.log(`CMS snapshot: ${data.projects.length} projects, ${data.platforms.length} platforms, ${data.posts.length} posts`);
}catch(err){
  console.warn(`CMS unavailable; using committed fallback snapshot (${err.message})`);
}
