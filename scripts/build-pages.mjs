import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const output=process.argv.includes('--docs')?'docs':'_site';
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});await cp('web',output,{recursive:true});
let html=await readFile('web/index.html','utf8');
html=html.replace(/(href|src)="\/(manifest\.webmanifest|icon\.svg|style\.css|app\.js|beginner\.css|beginner\.js)"/g,'$1="./$2"');
html=html.replace('<script src="./app.js"></script>','<script src="./config.js"></script><script src="./app.js"></script>');
await writeFile(output+'/config.js','window.FORGE_CONFIG = '+JSON.stringify({hosting:'github-pages',connectedAppUrl:'https://paul-forge-fit.exquisitetune16.chatgpt.site/'},null,2)+';\n');
const manifest=JSON.parse(await readFile('web/manifest.webmanifest','utf8'));manifest.id='./';manifest.start_url='./';manifest.scope='./';manifest.icons.forEach(icon=>icon.src='./'+icon.src.split('/').at(-1));await writeFile(output+'/manifest.webmanifest',JSON.stringify(manifest,null,2)+'\n');
const hash=s=>createHash('sha256').update(s).digest('hex').slice(0,12);
const names=['style.css','beginner.css','app.js','beginner.js','config.js','icon.svg','manifest.webmanifest'];
const assets=[];for(const name of names){const body=await readFile(output+'/'+name,'utf8');const url='./'+name+'?v='+hash(body);assets.push(url);html=html.replaceAll('"./'+name+'"','"'+url+'"')}
await writeFile(output+'/index.html',html);await writeFile(output+'/.nojekyll','');
const release=hash(html+assets.join('|'));
let sw=await readFile('web/sw.js','utf8');sw=sw.replace("+'v4'","+'"+release+"'");sw=sw.replace(/const SHELL=\[[^\]]*\]\.map\(path=>new URL\(path,BASE\)\.href\);/,'const SHELL='+JSON.stringify(['./','./index.html','./icon.svg',...assets])+'.map(path=>new URL(path,BASE).href);');
await writeFile(output+'/sw.js',sw);
console.log('Built GitHub Pages release '+release+' in '+output+'/');
