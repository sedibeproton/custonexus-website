/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('fs');
const p='app/constitution/page.tsx';
const s=fs.readFileSync(p,'utf8');
const regex=/<(\/)?([A-Za-z0-9_:-]+)\b[^>]*>/g;
let m; const stack=[];
while((m=regex.exec(s))){ const isClose=!!m[1]; const name=m[2]; const line=s.slice(0,m.index).split(/\r?\n/).length; if(!isClose){ stack.push({name,line}); } else { if(stack.length===0){ console.log('Unmatched close',name,'at line',line); process.exit(0);} const last=stack[stack.length-1]; if(last.name.toLowerCase()===name.toLowerCase()){ stack.pop(); } else { console.log('Mismatch: closing',name,'but top is',last.name,'at line',line); process.exit(0);} } }
if(stack.length){ console.log('Unclosed tag at end top:', stack[stack.length-1]); } else { console.log('All balanced'); }
