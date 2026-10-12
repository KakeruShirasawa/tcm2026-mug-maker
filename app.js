(function(){
'use strict';
/* ------------------------------------------------------------------ data */
const COLORS=[
{id:'rot',de:'Rot',jp:'公式レッド',hex:'#AE1329'},
{id:'stechpalme',de:'Stechpalme',jp:'ヒイラギの実',hex:'#C8262D'},
{id:'paprika',de:'Paprika',jp:'パプリカ',hex:'#D84A2F'},
{id:'karmin',de:'Karmin',jp:'カーマイン',hex:'#9B1B30'},
{id:'granat',de:'Granat',jp:'ガーネット',hex:'#7D1F2A'},
{id:'bordeaux',de:'Bordeaux',jp:'ボルドー',hex:'#6C1A33'},
{id:'babyrosa',de:'Babyrosa',jp:'ベビーピンク',hex:'#F4C2CE'},
{id:'rosa',de:'Rosa',jp:'ローズピンク',hex:'#E88FA6'},
{id:'pfingstrose',de:'Pfingstrose',jp:'ピオニー',hex:'#D9607F'},
{id:'himbeere',de:'Himbeere',jp:'ラズベリー',hex:'#B8295A'},
{id:'koralle',de:'Koralle',jp:'コーラル',hex:'#EE7C6B'},
{id:'altrosa',de:'Altrosa',jp:'ドライローズ',hex:'#C08A92'},
{id:'vanille',de:'Vanille',jp:'バニラ',hex:'#F5E6B8'},
{id:'zitrone',de:'Zitrone',jp:'レモン',hex:'#F2D64E'},
{id:'honig',de:'Honig',jp:'ハニー',hex:'#E8AE45'},
{id:'senf',de:'Senf',jp:'マスタード',hex:'#CF9F2A'},
{id:'aprikose',de:'Aprikose',jp:'アプリコット',hex:'#F4B183'},
{id:'mandarine',de:'Mandarine',jp:'マンダリン',hex:'#EF8A3A'},
{id:'eisblau',de:'Eisblau',jp:'アイスブルー',hex:'#A9CBE6'},
{id:'himmelblau',de:'Himmelblau',jp:'スカイブルー',hex:'#5EA6DC'},
{id:'koenigsblau',de:'Königsblau',jp:'ロイヤルブルー',hex:'#2A4A9E'},
{id:'nacht',de:'Nachtblau',jp:'公式ネイビー',hex:'#323696'},
{id:'petrol',de:'Petrol',jp:'ペトロール',hex:'#1F5664'},
{id:'mitter',de:'Mitternacht',jp:'ミッドナイト',hex:'#1C2140'},
{id:'minze',de:'Minze',jp:'ミント',hex:'#9AD6C2'},
{id:'pistazie',de:'Pistazie',jp:'ピスタチオ',hex:'#B7CE7E'},
{id:'smaragd',de:'Smaragd',jp:'エメラルド',hex:'#1E7A60'},
{id:'tanne',de:'Tanne',jp:'フォレストグリーン',hex:'#1F5A40'},
{id:'lavendel',de:'Lavendel',jp:'ラベンダー',hex:'#B9A8DC'},
{id:'pflaume',de:'Pflaume',jp:'プラム',hex:'#6A3466'},
{id:'elfenbein',de:'Elfenbein',jp:'アイボリー',hex:'#F1E8D5'},
{id:'schnee',de:'Schneeweiß',jp:'スノーホワイト',hex:'#F7F7F4'},
{id:'milchkaffee',de:'Milchkaffee',jp:'ミルクティー',hex:'#CBA986'},
{id:'terra',de:'Terrakotta',jp:'テラコッタ',hex:'#B0583A'},
{id:'schoko',de:'Schokolade',jp:'ショコラ',hex:'#4A2C22'},
{id:'anthrazit',de:'Anthrazit',jp:'アンスラサイト',hex:'#2E3033'}];
const FIG={
 cat:'ねこ', angel:'天使', gnome:'ノーム', reindeer:'ブレーメンの音楽隊', boots:'ブーツとプレゼント', pyramid_g:'ピラミッド（緑の星）',
 gingerbread:'ジンジャーブレッド', snowman:'雪だるま', santa:'サンタクロース', nutcracker:'くるみ割り人形', train:'木の汽車', pyramid_r:'ピラミッド（赤の星）',
 bird:'ことり', matryoshka:'マトリョーシカ', tophat:'シルクハットの雪だるま', wolfhood:'赤ずきんとオオカミ', cinderella:'シンデレラ', snowwhite:'白雪姫', dwarfs:'七人の小人'};
const ORDER=['santa','snowman','gingerbread','nutcracker','angel','gnome','cat','reindeer','boots','train','pyramid_g','pyramid_r','bird','matryoshka','tophat','wolfhood','cinderella','snowwhite','dwarfs'];
const FLOAT={angel:true};
const PRESET={red:{c:'rot',s:['cat','angel','gnome','reindeer','boots','pyramid_g']},
              navy:{c:'nacht',s:['gingerbread','snowman','santa','nutcracker','train','pyramid_r']}};
const ROMAN=['I','II','III','IV','V','VI'];
const SLOT_MAX=[[540,640],[540,640],[540,640],[540,640],[430,430],[520,700]];
const WW=4096,WH=1170;

const st={color:'rot',slots:PRESET.red.s.slice(),pat:Array(6).fill('orig'),sel:0};
/* colour patterns for the figures: replace red / green / light camel / dark camel, keep white & details */
const KEYS={R:[176,34,52],G:[58,115,57],CL:[209,164,107],CD:[176,128,77]};
/* colour variations chosen per figure (what suits each character), recolouring R / G / CL / CD families */
const CV={red:'#B1222F',green:'#2F7A46',blue:'#2E4FA0',sky:'#5DA3D9',yellow:'#E3B22C',pink:'#E07A9B',gold:'#C99A3E',white:'#F1ECE3',white2:'#D9D0C3',gray:'#7C828F',purple:'#6B4A9A'};
const ORIGDOT={santa:['#B1222F'],snowman:['#B1222F'],gingerbread:['#C9935A'],nutcracker:['#B1222F','#C9935A'],angel:['#2F7A46'],gnome:['#2F7A46'],
 cat:['#2F7A46','#D1A46B'],reindeer:['#D1A46B','#2F7A46'],boots:['#2F7A46'],pyramid_g:['#D1A46B','#2F7A46'],pyramid_r:['#D1A46B','#B1222F'],train:['#B1222F','#D1A46B'],
 bird:['#2F7A46','#D1A46B'],matryoshka:['#2F7A46','#D1A46B'],tophat:['#2F7A46'],wolfhood:['#2F7A46','#D1A46B'],cinderella:['#2F7A46','#D1A46B'],snowwhite:['#2F7A46','#D1A46B'],dwarfs:['#2F7A46']};
const V=(id,jp,m)=>({id,jp,m});
/* the same 10 colours for every figure; each figure decides which part takes the colour */
const hexRgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const shade=(h,f)=>'#'+hexRgb(h).map(v=>Math.round(v*f).toString(16).padStart(2,'0')).join('');
const COMMON=[['red','赤',CV.red],['green','緑',CV.green],['blue','青',CV.blue],['sky','水色',CV.sky],['yellow','黄色',CV.yellow],
  ['pink','ピンク',CV.pink],['purple','紫',CV.purple],['gold','金',CV.gold],['white','白','#E9E0D1'],['brown','茶','#7A4E35']];
const MAINFAM={santa:['R'],snowman:['R'],nutcracker:['R'],train:['R'],pyramid_r:['R'],angel:['G'],gnome:['G'],cat:['G'],boots:['G'],pyramid_g:['G'],bird:['G'],matryoshka:['G'],tophat:['G'],wolfhood:['G'],cinderella:['G'],snowwhite:['G'],dwarfs:['G'],
  gingerbread:['CL','CD'],reindeer:['CL','CD']};
const EXTRA={
 cat:[V('wcat','白ねこ',{CL:'#F1ECE3',CD:'#D8CFC2'}),V('bcat','黒ねこ',{CL:'#3A3436',CD:'#2A2527'})],
 reindeer:[V('rsaddle','赤い鞍',{G:CV.red}),V('bsaddle','青い鞍',{G:CV.blue})],
 pyramid_g:[V('wwood','白木',{CL:'#F1ECE3',CD:'#D8CFC2'}),V('dwood','くるみ材',{CL:'#8A5A35',CD:'#6A4226'})],
 pyramid_r:[V('wwood','白木',{CL:'#F1ECE3',CD:'#D8CFC2'}),V('dwood','くるみ材',{CL:'#8A5A35',CD:'#6A4226'})],
 train:[V('rbody','赤い車体',{CL:CV.red,CD:'#8A1A26',R:CV.yellow})]};
const VARIANTS={};
Object.keys(MAINFAM).forEach(k=>{VARIANTS[k]=COMMON.map(([id,jp,hex])=>{const m={};MAINFAM[k].forEach((f,i)=>m[f]=i?shade(hex,.8):hex);return V(id,jp,m);}).concat(EXTRA[k]||[]);});
const getVar=(k,p)=>(p&&p!=='orig'&&VARIANTS[k]&&VARIANTS[k].find(v=>v.id===p))||V('orig','オリジナル',null);
const varDots=(k,v)=>v.m?Object.values(v.m).slice(0,2):ORIGDOT[k];

/* ------------------------------------------------------------------ helpers */
const $=s=>document.querySelector(s);
const load=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=src;});
const ground=x=>A.snowtop[Math.max(0,Math.min(A.snowtop.length-1,Math.round(x/8)))];

/* ------------------------------------------------------------------ images */
let IM={},WRAP,FOOT,charSamples={},outlineCache={};
async function loadAll(){
  WRAP=await load(A.wrap);FOOT=await load(A.foot);
  await Promise.all(Object.keys(A.chars).map(async k=>{IM[k]=await load(A.chars[k].src);sample(k);}));
}
function sample(k){ // small pixel sample for contrast checks
  const c=document.createElement('canvas'),w=48,h=Math.round(48*IM[k].height/IM[k].width);
  c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(IM[k],0,0,w,h);
  const d=x.getImageData(0,0,w,h).data,px=[];for(let i=0;i<d.length;i+=4)if(d[i+3]>200)px.push([d[i],d[i+1],d[i+2]]);
  charSamples[k]=px;
}
/* colour science for light glazes */
const lin=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};
const lum=hex=>{const [r,g,b]=hexRgb(hex);return .2126*lin(r)+.7152*lin(g)+.0722*lin(b);};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const mix=(a,b,t)=>{const p=hexRgb(a),q=hexRgb(b);return '#'+p.map((v,i)=>Math.round(v+(q[i]-v)*t).toString(16).padStart(2,'0')).join('');};
function glazeLook(hex){ // how decorations adapt so they stay visible on this glaze
  const white=ratio('#FFFFFF',hex),gold=ratio('#D1A46B',hex);
  return {decor:white<2.3?mix(hex,'#2B1F2E',.5):null,          // snowflakes, dots, stars
          gold:gold<1.7?'#8A6427':null,                         // pillars, arches, logo
          snowEdge:white<1.9,                                   // faint edge on the snow
          outline:white<2.3?mix(hex,'#2B1F2E',.42):'#F4F1EA'};  // figure rim colour
}
const VAR={};
function variant(k,p){ // recoloured figure (+ pixel sample + thumbnail), cached
  const key=k+'|'+p;if(VAR[key])return VAR[key];
  const pat=getVar(k,p);
  if(!pat.m)return VAR[key]={img:IM[k],px:charSamples[k],thumb:A.chars[k].src,key};
  const im=IM[k],c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
  const D=x.getImageData(0,0,c.width,c.height),d=D.data,tg={};
  for(const f in pat.m)tg[f]=hexRgb(pat.m[f]);
  // 1) which colour family each pixel belongs to (W = white details such as icing or eyes)
  const W=c.width,H=c.height,N=W*H,FAM=Object.assign({},KEYS,{W:[250,250,248]}),FK=Object.keys(FAM),fam=new Int8Array(N).fill(-1);let opaque=0;
  for(let p=0;p<N;p++){const i=p*4;if(d[i+3]<40)continue;opaque++;const r=d[i],g=d[i+1],b=d[i+2];
    let best=-1,bd=62;FK.forEach((f,j)=>{const q=FAM[f],dd=Math.hypot(r-q[0],g-q[1],b-q[2]);if(dd<bd){bd=dd;best=j;}});fam[p]=best;}
  const recol=(i,f)=>{const q=KEYS[f],t=tg[f],lq=q[0]*.3+q[1]*.59+q[2]*.11,lp=d[i]*.3+d[i+1]*.59+d[i+2]*.11,k2=lp/lq; // keep the original shading
    return [Math.min(255,t[0]*k2),Math.min(255,t[1]*k2),Math.min(255,t[2]*k2)];};
  // 2) split each family into connected parts; large parts (hats, clothes, bodies) take the new colour
  const minArea=Math.max(90,opaque*.006),comp=new Int32Array(N).fill(-1),stack=new Int32Array(N),parts=[];
  for(let p=0;p<N;p++){if(fam[p]<0||comp[p]>=0)continue;const f=fam[p],id=parts.length,list=[];let sp=0;stack[sp++]=p;comp[p]=id;
    while(sp){const q=stack[--sp];list.push(q);const x0=q%W;
      if(x0>0&&comp[q-1]<0&&fam[q-1]===f){comp[q-1]=id;stack[sp++]=q-1;}
      if(x0<W-1&&comp[q+1]<0&&fam[q+1]===f){comp[q+1]=id;stack[sp++]=q+1;}
      if(q>=W&&comp[q-W]<0&&fam[q-W]===f){comp[q-W]=id;stack[sp++]=q-W;}
      if(q<N-W&&comp[q+W]<0&&fam[q+W]===f){comp[q+W]=id;stack[sp++]=q+W;}}
    parts.push({f:FK[f],list,big:list.length>=minArea});}
  const big=new Uint8Array(N),d0=new Uint8ClampedArray(d);
  parts.forEach(pt=>{if(!pt.big||!tg[pt.f])return;pt.list.forEach(q=>{const i=q*4,v=recol(i,pt.f);d[i]=v[0];d[i+1]=v[1];d[i+2]=v[2];big[q]=1;});});
  // 3) small parts (eyes, mouths, buttons, stars, icing): keep each one as readable as it is on the original artwork
  const lin1=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};
  const relL=a=>.2126*lin1(a[0])+.7152*lin1(a[1])+.0722*lin1(a[2]);
  const cr=(a,b)=>{const x=relL(a),y=relL(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  const tune=(col,sur,target)=>{ // same hue, pushed darker (on light ground) or lighter (on dark ground) until it reads
    const dark=relL(sur)>.25,to=dark?[62,38,28]:[255,248,236];for(let f=.1;f<=1.001;f+=.05){const v=col.map((c,j)=>c+(to[j]-c)*f);if(cr(v,sur)>=target)return v;}
    return dark?[40,28,24]:[255,250,240];};
  parts.forEach((pt,id)=>{if(pt.big&&!(pt.f==='W'&&pt.list.length<minArea*6))return;
    const nb=new Map();let orr=0,og=0,ob=0;
    for(const q of pt.list){const i=q*4;orr+=d0[i];og+=d0[i+1];ob+=d0[i+2];const x0=q%W;
      for(const o of [-1,1,-W,W]){const n=q+o;if(n<0||n>=N||(o===-1&&x0===0)||(o===1&&x0===W-1))continue;const cid=comp[n];if(cid===id||cid<0)continue;
        const j=n*4;let e=nb.get(cid);if(!e){e=[0,0,0,0,0,0,0];nb.set(cid,e);}e[0]+=d[j];e[1]+=d[j+1];e[2]+=d[j+2];e[3]++;e[4]+=d0[j];e[5]+=d0[j+1];e[6]+=d0[j+2];}}
    if(!nb.size)return;let top=null;nb.forEach(e=>{if(!top||e[3]>top[3])top=e;});   // the area this part mostly sits on
    const L=pt.list.length,sur=[top[0]/top[3],top[1]/top[3],top[2]/top[3]],sur0=[top[4]/top[3],top[5]/top[3],top[6]/top[3]],orig=[orr/L,og/L,ob/L];
    const target=Math.min(1.8,cr(orig,sur0)*.9);      // how well it read on the original artwork
    const paint=(fn)=>pt.list.forEach(q=>{const i=q*4,v=fn(i);d[i]=v[0];d[i+1]=v[1];d[i+2]=v[2];});
    let cand=null;
    if(tg[pt.f]){cand=[0,0,0];pt.list.forEach(q=>{const v=recol(q*4,pt.f);cand[0]+=v[0]/L;cand[1]+=v[1]/L;cand[2]+=v[2]/L;});
      paint(i=>recol(i,pt.f));if(cr(cand,sur)>=target)return;             // the chosen colour always shows
      if(relL(cand)>.55&&L<minArea*1.5){paint(i=>{const v=recol(i,pt.f),t=relL(v)/Math.max(.01,relL(cand));return [96,66,46].map(c=>Math.max(0,Math.min(255,c*Math.min(1.25,t))));});} // pale eyes / buttons on a pale ground: draw them in the dark ink of the artwork
      // too close to its surroundings: keep the chosen colour and draw a fine contrasting outline around it
      const line=tune(sur,cand,3.4).map(Math.round),inP=new Set(pt.list),r1=new Set();
      for(const q of pt.list){const x0=q%W;for(const o of [-1,1,-W,W]){const n=q+o;if(n<0||n>=N||(o===-1&&x0===0)||(o===1&&x0===W-1)||inP.has(n)||d[n*4+3]<60)continue;r1.add(n);}}
      const r2=new Set();r1.forEach(q=>{const x0=q%W;for(const o of [-1,1,-W,W]){const n=q+o;if(n<0||n>=N||(o===-1&&x0===0)||(o===1&&x0===W-1)||inP.has(n)||r1.has(n)||d[n*4+3]<60)continue;r2.add(n);}});
      r1.forEach(q=>{const i=q*4;d[i]=line[0];d[i+1]=line[1];d[i+2]=line[2];});
      const r3=new Set();r2.forEach(q=>{const x0=q%W;for(const o of [-1,1,-W,W]){const n=q+o;if(n<0||n>=N||(o===-1&&x0===0)||(o===1&&x0===W-1)||inP.has(n)||r1.has(n)||r2.has(n)||d[n*4+3]<60)continue;r3.add(n);}});
      r2.forEach(q=>{const i=q*4;d[i]=line[0];d[i+1]=line[1];d[i+2]=line[2];});
      r3.forEach(q=>{const i=q*4;for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]*.5+line[k]*.5);});
      return;}
    else if(cr(orig,sur)>=target){paint(i=>[d0[i],d0[i+1],d0[i+2]]);return;} // untouched part that still reads well
    const base=cand||orig,fixed=tune(base,sur,Math.max(target,2.6)),k=fixed.map((v,j)=>v-base[j]);
    paint(i=>{const v=cand?recol(i,pt.f):[d0[i],d0[i+1],d0[i+2]];return v.map((c,j)=>Math.max(0,Math.min(255,c+k[j])));});});
  // 3b) where a recoloured area now blends into the part next to it (e.g. a white coat against a white beard),
  //     draw a fine line inside the recoloured area along that border, as the original artwork does with its tan outlines
  { const LW=Math.max(4,Math.round(Math.max(W,c.height)/80)),seed=[],dist=new Int16Array(N).fill(-1);
    const px=(a,i)=>[a[i],a[i+1],a[i+2]],NC=parts.length,mN=new Float64Array(NC*4),mO=new Float64Array(NC*3);
    for(let q=0;q<N;q++){const id=comp[q];if(id<0)continue;const i=q*4;mN[id*4]+=d[i];mN[id*4+1]+=d[i+1];mN[id*4+2]+=d[i+2];mN[id*4+3]++;mO[id*3]+=d0[i];mO[id*3+1]+=d0[i+1];mO[id*3+2]+=d0[i+2];}
    const mean=(arr,st,id)=>{const n=mN[id*4+3]||1;return [arr[id*st]/n,arr[id*st+1]/n,arr[id*st+2]/n];},pair=new Map();
    const lost=(A,B)=>{const key=A*NC+B;let v=pair.get(key);if(v===undefined){v=parts[B].list.length>=30&&cr(mean(mN,4,A),mean(mN,4,B))<1.45&&cr(mean(mO,3,A),mean(mO,3,B))>=1.7;pair.set(key,v);}return v;};
    for(let p=0;p<N;p++){if(!big[p])continue;const x0=p%W,A=comp[p];let hit=false;
      for(const o of [-1,1,-W,W]){if((o===-1&&x0<6)||(o===1&&x0>W-7))continue;   // look across thin outlines (up to 6px) to the next area
        for(let st=1;st<=6;st++){const q=p+o*st;if(q<0||q>=N||d[q*4+3]<120)break;const B=comp[q];if(B===A)break;if(B<0)continue;
          if(lost(A,B))hit=true;break;}
        if(hit)break;}
      if(hit){seed.push(p);dist[p]=0;}}
    if(seed.length){let fr=seed,lum=0;seed.forEach(p=>lum+=relL(px(d,p*4)));lum/=seed.length;
      const line=lum>.3?[146,100,60]:[246,238,224];
      for(let r=1;r<LW+1&&fr.length;r++){const nx=[];for(const p of fr){const x0=p%W;for(const o of [-1,1,-W,W]){const q=p+o;if(q<0||q>=N||(o===-1&&x0===0)||(o===1&&x0===W-1))continue;
        if(!big[q]||dist[q]>=0)continue;dist[q]=r;nx.push(q);}}fr=nx;}
      for(let p=0;p<N;p++){const r=dist[p];if(r<0)continue;const a=r<LW-1?1:r<LW?.6:.25,i=p*4;for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]*(1-a)+line[k]*a);}}}
  // 4) soften anti-aliased edges next to recoloured areas
  for(let p=0;p<N;p++){if(big[p]||d[p*4+3]===0||fam[p]>=0)continue;const x0=p%W;let nb=-1;
    for(const o of [-1,1,-W,W]){const q=p+o;if(q<0||q>=N||(o===-1&&x0===0)||(o===1&&x0===W-1))continue;if(big[q]){nb=q;break;}}
    if(nb<0)continue;const i=p*4,j=nb*4;for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]*.45+d[j+k]*.55);}
  x.putImageData(D,0,0);
  const sc=document.createElement('canvas'),w=48,h=Math.round(48*c.height/c.width);sc.width=w;sc.height=h;const sx=sc.getContext('2d');sx.drawImage(c,0,0,w,h);
  const sd=sx.getImageData(0,0,w,h).data,px=[];for(let i=0;i<sd.length;i+=4)if(sd[i+3]>200)px.push([sd[i],sd[i+1],sd[i+2]]);
  const tc=document.createElement('canvas'),tw=120,th=Math.round(120*c.height/c.width);tc.width=tw;tc.height=th;tc.getContext('2d').drawImage(c,0,0,tw,th);
  return VAR[key]={img:c,px,thumb:tc.toDataURL('image/png'),key};
}
function needsOutline(v,hex,look){
  const b=hexRgb(hex),px=v.px;if(!px||!px.length)return false;
  let n=0,w=0;for(const p of px){if(Math.hypot(p[0]-b[0],p[1]-b[1],p[2]-b[2])<78)n++;if(p[0]>215&&p[1]>215&&p[2]>205)w++;}
  return n/px.length>0.16||(look.decor&&w/px.length>0.2);
}
function outlined(v,col){ // figure with a thin rim, cached per colour
  const key=v.key+col;if(outlineCache[key])return outlineCache[key];
  const im=v.img,r=7,c=document.createElement('canvas');c.width=im.width+r*2;c.height=im.height+r*2;
  const x=c.getContext('2d');
  for(let a=0;a<24;a++){const t=a/24*Math.PI*2;x.drawImage(im,r+Math.cos(t)*r,r+Math.sin(t)*r);}
  x.globalCompositeOperation='source-in';x.fillStyle=col;x.fillRect(0,0,c.width,c.height);
  x.globalCompositeOperation='source-over';x.drawImage(im,r,r);
  return outlineCache[key]={c,r};
}
/* split the printed band into gold / white decor / snow so each can be recoloured */
let LAY=null;
function splitLayers(){
  const mk=()=>{const c=document.createElement('canvas');c.width=WW;c.height=WH;return c;};
  const src=mk(),sx=src.getContext('2d');sx.drawImage(WRAP,0,0,WW,WH);const D=sx.getImageData(0,0,WW,WH),d=D.data;
  const G=new ImageData(WW,WH),W=new ImageData(WW,WH),S=new ImageData(WW,WH);
  for(let y=0;y<WH;y++)for(let x=0;x<WW;x++){const i=(y*WW+x)*4,a=d[i+3];if(!a)continue;
    const r=d[i],g=d[i+1],b=d[i+2],white=r>196&&g>196&&b>190&&Math.max(r,g,b)-Math.min(r,g,b)<40;
    const T=white?(y>ground(x)-10?S:W):G;T.data[i]=r;T.data[i+1]=g;T.data[i+2]=b;T.data[i+3]=a;}
  const g=mk(),w=mk(),sn=mk();g.getContext('2d').putImageData(G,0,0);w.getContext('2d').putImageData(W,0,0);sn.getContext('2d').putImageData(S,0,0);
  LAY={gold:g,decor:w,snow:sn};
}
const tintCache={};
function tinted(canvas,col,key){const k=key+col;if(tintCache[k])return tintCache[k];
  const c=document.createElement('canvas');c.width=canvas.width;c.height=canvas.height;const x=c.getContext('2d');
  x.drawImage(canvas,0,0);x.globalCompositeOperation='source-in';x.fillStyle=col;x.fillRect(0,0,c.width,c.height);return tintCache[k]=c;}
/* ------------------------------------------------------------------ texture compositing */
const wrapC=document.createElement('canvas');wrapC.width=WW;wrapC.height=WH;const wx=wrapC.getContext('2d');
const footC=document.createElement('canvas');footC.width=2048;footC.height=241;const fx=footC.getContext('2d');
const innerC=document.createElement('canvas');innerC.width=2048;innerC.height=512;const ix=innerC.getContext('2d');
let outlinedNow=new Set();
function compose(){
  const hex=COLORS.find(c=>c.id===st.color).hex;
  const look=glazeLook(hex);
  wx.fillStyle=hex;wx.fillRect(0,0,WW,WH);
  wx.drawImage(look.gold?tinted(LAY.gold,look.gold,'g'):LAY.gold,0,0);
  wx.drawImage(look.decor?tinted(LAY.decor,look.decor,'w'):LAY.decor,0,0);
  if(look.snowEdge){wx.save();wx.shadowColor='rgba(70,50,60,.32)';wx.shadowBlur=14;wx.shadowOffsetY=-3;wx.drawImage(LAY.snow,0,0);wx.restore();}
  wx.drawImage(LAY.snow,0,0);
  outlinedNow=new Set();
  st.slots.forEach((k,i)=>{
    if(!k)return;const m=A.chars[k],[mw,mh]=SLOT_MAX[i];
    const {s,cx}=fitSlot(k,i,Math.min(1,mw/m.w,mh/m.h)),w=m.w*s,h=m.h*s,g=ground(cx);
    const bottom=g+m.sink*s,x=cx-w/2,y=bottom-h;
    if(FLOAT[k]){ // soft shadow on the snow, as on the original angel
      const sg=wx.createRadialGradient(cx,g+38,4,cx,g+38,w*.34);sg.addColorStop(0,'rgba(60,40,50,.22)');sg.addColorStop(1,'rgba(60,40,50,0)');
      wx.save();wx.fillStyle=sg;wx.beginPath();wx.ellipse(cx,g+38,w*.34,w*.07,0,0,7);wx.fill();wx.restore();
    }
    const v=variant(k,st.pat[i]);
    if(needsOutline(v,hex,look)){const o=outlined(v,look.outline);const sc=w/m.w;wx.drawImage(o.c,x-o.r*sc,y-o.r*sc,o.c.width*sc,o.c.height*sc);outlinedNow.add(k);}
    else wx.drawImage(v.img,x,y,w,h);
    if(!FLOAT[k]) drift(cx,bottom,w,look.snowEdge);
  });
  // foot band
  fx.fillStyle=hex;fx.fillRect(0,0,2048,241);fx.drawImage(look.decor?tinted(FOOT,look.decor,'f'):FOOT,0,(241-168)/2,2048,168);
  if(tex){tex.body.needsUpdate=true;tex.foot.needsUpdate=true;mats.glaze.color.set(hex).convertSRGBToLinear();}
}
/* keep figures off the "Tokyo Christmas Market 2026" lettering: shrink and/or nudge sideways until no word is touched */
const LOGO_U=3150/4096;const LOGO_BOX=[2850,420,3440,990],CELL=8,LOGO_PAD=18;let logoGrid=null;
function getLogoGrid(){ // occupancy grid of the gold lettering (from the gold layer), grown by LOGO_PAD
  if(logoGrid)return logoGrid;const [L,T,R,Bt]=LOGO_BOX,W=R-L,H=Bt-T,c=document.createElement('canvas');c.width=W;c.height=H;
  const x=c.getContext('2d');x.drawImage(LAY.gold,-L,-T);const d=x.getImageData(0,0,W,H).data,gw=Math.ceil(W/CELL),gh=Math.ceil(H/CELL),g=new Uint8Array(gw*gh);
  for(let y=0;y<H;y++)for(let xx=0;xx<W;xx++)if(d[(y*W+xx)*4+3]>80)g[Math.floor(y/CELL)*gw+Math.floor(xx/CELL)]=1;
  const r=Math.ceil(LOGO_PAD/CELL),o=new Uint8Array(gw*gh);
  for(let j=0;j<gh;j++)for(let i=0;i<gw;i++)if(g[j*gw+i])for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){const a=i+di,b=j+dj;if(a>=0&&b>=0&&a<gw&&b<gh)o[b*gw+a]=1;}
  return logoGrid={g:o,gw,gh};}
const profCache={};
function profile(k){ // left/right edge of the figure for each of 48 horizontal bands (0..1 of the image)
  if(profCache[k])return profCache[k];const im=variant(k,'orig').img,W=im.width,H=im.height;
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,W,H).data;
  const B=48,pr=[];for(let b=0;b<B;b++){let l=W,r=-1;for(let y=Math.floor(b*H/B);y<Math.floor((b+1)*H/B);y++)for(let xx=0;xx<W;xx++)if(d[(y*W+xx)*4+3]>60){if(xx<l)l=xx;if(xx>r)r=xx;}
    pr.push(r<0?null:[l/W,(r+1)/W]);}
  return profCache[k]=pr;}
function hitsLogo(k,s,cx){const m=A.chars[k],w=m.w*s,h=m.h*s,bottom=ground(cx)+m.sink*s,x0=cx-w/2,y0=bottom-h,pr=profile(k),B=pr.length;
  for(let b=0;b<B;b++){const e=pr[b];if(!e)continue;const ya=y0+b*h/B,yb=y0+(b+1)*h/B,xa=x0+e[0]*w,xb=x0+e[1]*w;
    const [L,T,R,Bt]=LOGO_BOX;if(xb<L||xa>R||yb<T||ya>Bt)continue;const {g,gw,gh}=getLogoGrid();
    const i0=Math.max(0,Math.floor((xa-L)/CELL)),i1=Math.min(gw-1,Math.floor((xb-L)/CELL)),j0=Math.max(0,Math.floor((ya-T)/CELL)),j1=Math.min(gh-1,Math.floor((yb-T)/CELL));
    for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++)if(g[j*gw+i])return true;}
  return false;}
const fitMemo={};
function fitSlot(k,i,s0){const key=k+'|'+i;if(fitMemo[key])return fitMemo[key];const c0=A.slots[i];
  const shifts=[0,-20,20,-40,40,-60,60,-80,80,-100,100,-120,120];
  for(let s=s0;s>=s0*.4;s*=.95)for(const dx of shifts){if(!hitsLogo(k,s,c0+dx))return fitMemo[key]={s,cx:c0+dx};}
  return fitMemo[key]={s:s0*.4,cx:c0};}
function drift(cx,bottom,w,edge){ // small mound of snow in front of the feet
  const hw=Math.max(70,w*.46),top=bottom-26;
  wx.save();wx.fillStyle='#FFFFFF';wx.shadowColor=edge?'rgba(70,50,60,.3)':'rgba(255,255,255,.9)';wx.shadowBlur=edge?12:10;if(edge)wx.shadowOffsetY=-3;
  wx.beginPath();wx.moveTo(cx-hw-40,bottom+60);
  wx.bezierCurveTo(cx-hw-10,top+18,cx-hw*.55,top-4,cx-hw*.2,top+6);
  wx.bezierCurveTo(cx,top-10,cx+hw*.35,top+2,cx+hw*.55,top+4);
  wx.bezierCurveTo(cx+hw*.85,top+6,cx+hw+10,top+22,cx+hw+40,bottom+60);
  wx.lineTo(cx+hw+40,WH);wx.lineTo(cx-hw-40,WH);wx.closePath();wx.fill();wx.restore();
}
function drawInner(){
  ix.fillStyle='#F3EEE3';ix.fillRect(0,0,2048,512);
  ix.save();ix.translate(2048,0);ix.scale(-1,1); // seen from inside → mirror
  // the lettering sits on the far inner wall, straight behind the front logo (read over the rim when the logo faces you)
  const u=2048*(1-((LOGO_U+.5)%1));ix.fillStyle='#2A2A2E';ix.textAlign='center';
  ix.font='400 46px Kalam, "Comic Sans MS", cursive';ix.fillText('2026',u,96);
  ix.font='400 44px Kalam, "Comic Sans MS", cursive';ix.fillText('Tokyo Christmas Market',u,150);
  ix.restore();if(tex)tex.inner.needsUpdate=true;
}

/* ------------------------------------------------------------------ three.js mug */
let renderer,scene,camera,mug,body,tex,mats,shadow;let rotY=0,velY=0,targetY=null,tilt=0.12;
const FH=0.635,BH=1.72,R=1,RF=0.858; // proportions from the official 3-view drawing
function lathe(prof,seg,y0,h){ // LatheGeometry with v mapped to height (so the print never bends round corners)
  const g=new THREE.LatheGeometry(prof.map(p=>new THREE.Vector2(p[0],p[1])),seg);
  const pos=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setY(i,Math.min(1,Math.max(0,(pos.getY(i)-y0)/h)));
  uv.needsUpdate=true;g.computeVertexNormals();return g;}
function arc(cx,cy,r,a0,a1,n){const o=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;o.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}return o;}
function initThree(){
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.NoToneMapping;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(26,1,0.1,100);
  // studio environment: soft boxes for the glaze reflections
  const env=new THREE.Scene();env.background=new THREE.Color(0x15151b);
  const box=(w,h,x,y,z,ry,int)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(int,int,int),side:THREE.DoubleSide}));m.position.set(x,y,z);m.rotation.y=ry;env.add(m);};
  box(1.6,9,-6,2,2,Math.PI/2.4,3.2);box(1.1,9,6,2,1,-Math.PI/2.4,1.8);box(9,9,0,9,0,0,.55);box(14,6,0,-3,-7,0,.2);box(3,3,2,4,8,Math.PI,.35);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.MeshBasicMaterial({color:new THREE.Color(.2,.2,.23)}));floor.rotation.x=-Math.PI/2;floor.position.y=-1;env.add(floor);
  const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(env,0.035).texture;
  const key=new THREE.DirectionalLight(0xffffff,.85);key.position.set(-4,6,6);scene.add(key);
  scene.add(new THREE.HemisphereLight(0xffffff,0x8d889a,.5));const fill=new THREE.DirectionalLight(0xfff4e6,.35);fill.position.set(5,2,4);scene.add(fill);

  const mk=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;};
  tex={body:mk(wrapC),foot:mk(footC),inner:mk(innerC)};
  const phys=o=>new THREE.MeshPhysicalMaterial(Object.assign({roughness:.42,metalness:0,clearcoat:.75,clearcoatRoughness:.05,envMapIntensity:1},o));
  mats={body:phys({map:tex.body}),foot:phys({map:tex.foot}),glaze:phys({color:0xAE1329}),
        cream:phys({color:new THREE.Color(0xF3EEE3).convertSRGBToLinear(),roughness:.34}),inner:phys({map:tex.inner,side:THREE.BackSide,roughness:.36}),
        bottom:new THREE.MeshStandardMaterial({color:new THREE.Color(0xE9E2D3).convertSRGBToLinear(),roughness:.9})};
  mug=new THREE.Group();scene.add(mug);
  const rb=.085,rt=.03,top=FH+BH;
  const bprof=[[RF+.004,FH],...arc(R-rb,FH+rb,rb,-Math.PI/2,0,10),...arc(R-rt,top-rt,rt,0,Math.PI/2,6)];
  body=new THREE.Mesh(lathe(bprof,192,FH,BH),mats.body);mug.add(body);
  const rf=.095;const fprof=[[RF-rf-.05,0],...arc(RF-rf,rf,rf,-Math.PI/2,0,10),[RF,FH-.004]];
  const foot=new THREE.Mesh(lathe(fprof,160,0,FH),mats.foot);mug.add(foot);
  const bot=new THREE.Mesh(new THREE.CircleGeometry(RF-rf-.04,96),mats.bottom);bot.rotation.x=Math.PI/2;bot.position.y=.002;mug.add(bot);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(.952,.022,20,192),mats.cream);rim.rotation.x=Math.PI/2;rim.position.y=FH+BH-.004;mug.add(rim);
  const inner=new THREE.Mesh(new THREE.CylinderGeometry(.932,.932,BH-.1,160,1,true),mats.inner);inner.position.y=FH+BH/2+.04;mug.add(inner);
  const innerBot=new THREE.Mesh(new THREE.CircleGeometry(.935,96),mats.cream);innerBot.rotation.x=-Math.PI/2;innerBot.position.y=FH+.2;mug.add(innerBot);
  // handle: D-shaped loop at the seam (u=0), like the real mug
  const y0=FH,pts=[[.95,.78],[1.28,.825],[1.56,.77],[1.68,.61],[1.68,.42],[1.58,.28],[1.3,.215],[.95,.245]].map(p=>new THREE.Vector3(0,y0+BH*p[1],p[0]));
  const handle=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts,false,'catmullrom',.5),160,.098,28,false),mats.glaze);mug.add(handle);
  // contact shadow
  const sc=document.createElement('canvas');sc.width=sc.height=256;const sx=sc.getContext('2d');
  const gr=sx.createRadialGradient(128,128,10,128,128,128);gr.addColorStop(0,'rgba(20,18,40,.55)');gr.addColorStop(.45,'rgba(20,18,40,.22)');gr.addColorStop(1,'rgba(20,18,40,0)');
  sx.fillStyle=gr;sx.fillRect(0,0,256,256);
  shadow=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.y=.001;scene.add(shadow);
  mug.position.x=0;
}
function frame(w,h){
  renderer.setSize(w,h,false);camera.aspect=w/h;
  const d=Math.max(8.1,2.05/(Math.tan(13*Math.PI/180)*(w/h)));camera.position.set(0,1.18+d*Math.sin(tilt),d*Math.cos(tilt));camera.lookAt(0,1.18,0);camera.updateProjectionMatrix();
}
let host=null;
function attach(el){host=el;el.appendChild(renderer.domElement);resize();}
function resize(){if(!host)return;const r=host.getBoundingClientRect();frame(Math.max(2,r.width),Math.max(2,r.height));}
window.addEventListener('resize',resize);
let last=performance.now(),idle=true;
function tick(t){
  const dt=Math.min(.05,(t-last)/1000);last=t;
  if(targetY!==null){const d=targetY-rotY;rotY+=d*Math.min(1,dt*6);if(Math.abs(d)<.002){rotY=targetY;targetY=null;}}
  else if(!dragging){rotY+=velY*dt;velY*=Math.pow(.04,dt);if(idle)rotY+=dt*.18;}
  mug.rotation.y=rotY;renderer.render(scene,camera);requestAnimationFrame(tick);
}
function faceSlot(i){ // bring niche i to the front
  const th=2*Math.PI*(A.slots[i]/WW);let t=-th;
  while(t-rotY>Math.PI)t-=2*Math.PI;while(t-rotY<-Math.PI)t+=2*Math.PI;targetY=t;idle=false;
}
/* drag to rotate, tap to pick a niche */
let dragging=false,px0=0,py0=0,moved=0,lastX=0,lastY=0,lastT=0;
const ray=new THREE.Raycaster();
function bindView(el){
  el.addEventListener('pointerdown',e=>{if(!$('#design').hidden){dragging=true;idle=false;targetY=null;px0=lastX=e.clientX;py0=lastY=e.clientY;moved=0;lastT=performance.now();el.setPointerCapture(e.pointerId);}});
  el.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-lastX,now=performance.now();
    rotY+=dx*.011;velY=dx*.011/Math.max(.008,(now-lastT)/1000);lastX=e.clientX;lastT=now;
    const dy=e.clientY-lastY;lastY=e.clientY;if(dy){tilt=Math.max(-.35,Math.min(1.3,tilt+dy*.006));resize();}moved=Math.max(moved,Math.hypot(e.clientX-px0,e.clientY-py0));});
  el.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;if(moved<6){velY=0;pick(e,el);}});
  el.addEventListener('pointercancel',()=>dragging=false);
}
function pick(e,el){
  const r=el.getBoundingClientRect();const v=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
  ray.setFromCamera(v,camera);const hit=ray.intersectObject(body)[0];if(!hit)return;
  const u=hit.uv.x*WW;let best=0,bd=1e9;A.slots.forEach((s,i)=>{const d=Math.abs(s-u);if(d<bd){bd=d;best=i;}});
  if(bd<330)selectSlot(best,true);
}

/* ------------------------------------------------------------------ UI */
function buildUI(){
  const chips=$('#chips');
  COLORS.forEach(c=>{const b=document.createElement('button');b.className='chip';b.setAttribute('aria-label',c.jp);b.innerHTML=`<i style="background:${c.hex}"></i>`;
    b.onclick=()=>{st.color=c.id;refresh();};chips.appendChild(b);});
  const figs=$('#figs');
  ORDER.forEach(k=>{const b=document.createElement('button');b.className='fig';b.dataset.k=k||'';
    b.innerHTML=k?`<div class="im"><img src="${A.chars[k].src}" alt=""></div><span>${FIG[k]}</span>`:`<div class="im"><div class="none"></div></div><span>なし</span>`;
    b.onclick=()=>{st.slots[st.sel]=k;st.pat[st.sel]='orig';refresh();};figs.appendChild(b);});
  const bar=$('#patbar');['pointerdown','pointerup','click'].forEach(ev=>bar.addEventListener(ev,e=>e.stopPropagation()));
  $('#clearSlot').onclick=()=>{st.slots[st.sel]=null;refresh();};
  const n=$('#niches');
  for(let i=0;i<6;i++){const b=document.createElement('button');b.className='niche';b.onclick=()=>selectSlot(i,true);n.appendChild(b);}
  document.querySelectorAll('.preset').forEach(b=>b.onclick=()=>{const p=PRESET[b.dataset.preset];st.color=p.c;st.slots=p.s.slice();st.pat=Array(6).fill('orig');refresh();faceSlot(st.sel);});
  $('#toPhoto').onclick=()=>step('photo');
  document.querySelectorAll('.steps button').forEach(b=>b.onclick=()=>step(b.dataset.step));
}
let patsFor=null;
function buildPats(k){ // variation buttons for the selected figure
  const pats=$('#pats');
  if(patsFor!==k){patsFor=k;pats.innerHTML='';
    [V('orig','オリジナル',null),...(VARIANTS[k]||[])].forEach(v=>{const b=document.createElement('button');b.className='pat';b.dataset.p=v.id;
      const d=varDots(k,v);b.style.background=d.length>1?`conic-gradient(${d[0]} 0 50%,${d[1]} 0)`:d[0];b.title=v.jp;b.setAttribute('aria-label',v.jp);
      b.onclick=()=>{st.pat[st.sel]=v.id;refresh();};pats.appendChild(b);});}
  pats.querySelectorAll('.pat').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===(st.pat[st.sel]||'orig')));
}
function selectSlot(i,face){st.sel=i;refreshUI();if(face)faceSlot(i);}
function refreshUI(){
  const c=COLORS.find(c=>c.id===st.color);
  document.querySelectorAll('.chip').forEach((b,i)=>b.setAttribute('aria-pressed',COLORS[i].id===st.color));
  $('#chipname').innerHTML=`<i>${c.de}</i>${c.jp}`;$('#gname').innerHTML=`<i>${c.de}</i>${c.jp}`;
  document.querySelectorAll('.niche').forEach((b,i)=>{const k=st.slots[i];b.setAttribute('aria-pressed',i===st.sel);
    b.innerHTML=`<span class="no">${ROMAN[i]}</span><span class="th">${k?`<img src="${variant(k,st.pat[i]).thumb}" alt="">`:''}</span><span class="nm">${k?FIG[k]:'なし'}</span>`;});
  const sk=st.slots[st.sel];$('#patbar').hidden=!sk;
  if(sk){buildPats(sk);$('#patname').innerHTML=`<b>${FIG[sk]}の色</b>${getVar(sk,st.pat[st.sel]).jp}`;}
  $('#slotsel').innerHTML=`<b>No. ${ROMAN[st.sel]}</b>${st.sel===4?'ロゴ横の小さな場所':st.sel===5?'ロゴ横の大きな場所':'アーチの下'}に置くキャラを選ぶ`;
  document.querySelectorAll('.fig').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.k||null)===st.slots[st.sel]));
  const o=[...outlinedNow].map(k=>FIG[k]);
  $('#contrastNote').textContent=o.length?`${o.join('、')}は地色と近い色なので、縁取りを付けて見やすくしています。`:'地色と同じ系統の色のキャラには、自動で縁取りが付いて見やすくなります。';
}
function refresh(){compose();refreshUI();}

/* ------------------------------------------------------------------ step II: photo */
const scene2=$('#scene'),layer=$('#mugLayer'),cam=$('#cam'),upImg=$('#upImg');
let bgMode='camera',stream=null,lp={x:50,y:66,s:34};
function step(s){
  document.querySelectorAll('.steps button').forEach(b=>b.setAttribute('aria-selected',b.dataset.step===s));
  $('#design').hidden=s!=='design';$('#photo').hidden=s!=='photo';
  if(s==='photo'){track('to_photo',design());shadow.visible=true;attach(layer);setBg(bgMode);placeLayer();rotY=-2*Math.PI*0.72;targetY=null;velY=0;idle=false;$('#rTurn').value=0;tilt=.21;$('#rTilt').value=12;drawFrameLive();}
  else{stopCam();tilt=.12;attach($('#view'));}
  window.scrollTo({top:0,behavior:'smooth'});
}
function placeLayer(){layer.style.left=lp.x+'%';layer.style.top=lp.y+'%';layer.style.width=lp.s+'%';resize();drawFrameLive();}
document.querySelectorAll('.ptabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.ptabs button').forEach(x=>x.setAttribute('aria-selected',x===b));setBg(b.dataset.bg);});
function setBg(m){
  bgMode=m;document.querySelectorAll('.ptabs button').forEach(x=>x.setAttribute('aria-selected',x.dataset.bg===m));stopCam();cam.hidden=m!=='camera';upImg.hidden=m!=='upload'||!upImg.src;
  $('#dropzone').hidden=!(m==='upload'&&!upImg.getAttribute('src'));$('#camnote').hidden=true;
  lp={x:50,y:62,s:window.innerWidth<700?56:36};fitScene();
  $('#rSize').value=lp.s;placeLayer();if(m==='camera')startCam();
}
async function startCam(){
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});cam.srcObject=stream;await cam.play();}
  catch(err){const n=$('#camnote');n.hidden=false;
    n.innerHTML='カメラを起動できませんでした。ブラウザの設定でカメラの利用を許可してください。カメラがない場合はこちらから選べます。<span class="camalt"><button data-go="upload">写真に合わせる</button></span>';
    n.querySelectorAll('button').forEach(b=>b.onclick=()=>setBg(b.dataset.go));}
}
function stopCam(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}}
/* the photo frame takes the shape of the chosen photo, so the whole picture is used (nothing cut off on phones) */
function fitScene(){const box=scene2.parentElement.clientWidth||scene2.clientWidth,phone=window.innerWidth<700;
  let ratio=phone?3/4:16/9;
  if(bgMode==='upload'&&upImg.getAttribute('src')&&upImg.naturalWidth)ratio=Math.max(9/16,Math.min(16/9,upImg.naturalWidth/upImg.naturalHeight));
  const maxH=window.innerHeight*(phone?.68:.78),w=Math.min(box,maxH*ratio);
  scene2.style.aspectRatio=String(ratio);scene2.style.width=Math.round(w)+'px';scene2.style.maxWidth='100%';scene2.style.margin='0 auto';
  requestAnimationFrame(()=>{placeLayer();});}
function loadPhoto(f){if(!f)return;const r=new FileReader();r.onload=()=>{upImg.onload=()=>{upImg.hidden=false;$('#dropzone').hidden=true;$('#rePhoto').hidden=false;
    lp={x:50,y:62,s:window.innerWidth<700?52:34};$('#rSize').value=lp.s;fitScene();};upImg.src=r.result;};r.readAsDataURL(f);}
$('#fileIn').addEventListener('change',e=>{loadPhoto(e.target.files[0]);e.target.value='';});
$('#fileIn2').addEventListener('change',e=>{loadPhoto(e.target.files[0]);e.target.value='';});
$('#rSize').addEventListener('input',e=>{lp.s=+e.target.value;placeLayer();});
$('#rTilt').addEventListener('input',e=>{tilt=(+e.target.value)*Math.PI/180;resize();});
let turn0=0;$('#rTurn').addEventListener('input',e=>{rotY=-2*Math.PI*0.72+(+e.target.value)*Math.PI/180;targetY=null;velY=0;});
(function(){ // move the mug: drag with the mouse or one finger anywhere on the photo. two fingers: pinch = size, twist = turn
  const r=()=>scene2.getBoundingClientRect(),clampPos=()=>{lp.x=Math.max(3,Math.min(97,lp.x));lp.y=Math.max(5,Math.min(97,lp.y));};
  const syncTurn=()=>{let deg=((rotY+2*Math.PI*.72)*180/Math.PI)%360;if(deg>180)deg-=360;if(deg<-180)deg+=360;$('#rTurn').value=Math.round(deg);};
  const skip=t=>t.closest&&t.closest('label,input,button,.camnote,.dropzone');
  // mouse / pen
  let m=null;
  scene2.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||skip(e.target))return;m={x:e.clientX,y:e.clientY,ox:lp.x,oy:lp.y};scene2.setPointerCapture(e.pointerId);scene2.classList.add('grabbing');});
  scene2.addEventListener('pointermove',e=>{if(!m||e.pointerType==='touch')return;const R=r();lp.x=m.ox+(e.clientX-m.x)/R.width*100;lp.y=m.oy+(e.clientY-m.y)/R.height*100;clampPos();placeLayer();});
  const mu=()=>{m=null;scene2.classList.remove('grabbing');};scene2.addEventListener('pointerup',mu);scene2.addEventListener('pointercancel',mu);
  scene2.addEventListener('wheel',e=>{if(skip(e.target))return;e.preventDefault();lp.s=Math.max(14,Math.min(80,lp.s*(e.deltaY<0?1.06:1/1.06)));$('#rSize').value=lp.s;placeLayer();},{passive:false});
  // touch (handled with touch events: works the same on iPhone Safari and Android Chrome)
  let t=null;
  const two=(a,b)=>({x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2,d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),ang:Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX)});
  const begin=e=>{const T=e.touches;if(T.length===1)t={n:1,x:T[0].clientX,y:T[0].clientY,ox:lp.x,oy:lp.y};
    else if(T.length>=2){const q=two(T[0],T[1]);t={n:2,x:q.x,y:q.y,d:q.d,ang:q.ang,ox:lp.x,oy:lp.y,os:lp.s,ry:rotY};}};
  scene2.addEventListener('touchstart',e=>{if(skip(e.target))return;e.preventDefault();begin(e);},{passive:false});
  scene2.addEventListener('touchmove',e=>{if(!t)return;e.preventDefault();const R=r(),T=e.touches;
    if(t.n===1&&T.length===1){lp.x=t.ox+(T[0].clientX-t.x)/R.width*100;lp.y=t.oy+(T[0].clientY-t.y)/R.height*100;}
    else if(t.n===2&&T.length>=2){const q=two(T[0],T[1]);lp.x=t.ox+(q.x-t.x)/R.width*100;lp.y=t.oy+(q.y-t.y)/R.height*100;
      lp.s=Math.max(14,Math.min(80,t.os*q.d/Math.max(20,t.d)));$('#rSize').value=lp.s;
      let da=q.ang-t.ang;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;rotY=t.ry+da*1.6;targetY=null;velY=0;syncTurn();}
    clampPos();placeLayer();},{passive:false});
  const tend=e=>{if(!t)return;if(e.touches.length)begin(e);else t=null;};
  scene2.addEventListener('touchend',tend);scene2.addEventListener('touchcancel',tend);
})();
/* ---- photo frame built from the mug's own artwork: gold pillars, arches, hanging stars, snow and the logo ---- */
let frameStyle='arch';
const PC={pillar:[728,100,112,800],arch:[835,180,528,208],dots:[452,30,30,300],star:[380,328,176,177],flake:[1205,345,120,120],
  words:[[3005,460,325,125],[2885,585,530,130],[2955,715,395,125],[3025,840,250,122]],snow:[0,860,4096,310]};
function piece(layer,r){const c=document.createElement('canvas');c.width=r[2];c.height=r[3];c.getContext('2d').drawImage(layer,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}
let FP=null;
function framePieces(){if(FP)return FP;const g=LAY.gold,w=LAY.decor,sn=LAY.snow;
  FP={pillar:piece(g,PC.pillar),arch:piece(g,PC.arch),dots:piece(g,PC.dots),star:piece(g,PC.star),flake:piece(w,PC.flake),snow:piece(sn,PC.snow),words:PC.words.map(r=>piece(g,r))};return FP;}
function goldGrad(x,x0,y0,x1,y1){const g=x.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#E9CF94');g.addColorStop(.35,'#C9A15C');g.addColorStop(.65,'#F2DDA6');g.addColorStop(1,'#A97C3E');return g;}
function archPath(x,x0,x1,yb,h){ // onion-dome arch like the one on the mug
  const w=x1-x0,cx=(x0+x1)/2;x.beginPath();x.moveTo(x0,yb);
  x.bezierCurveTo(x0+w*.05,yb-h*.62,x0+w*.2,yb-h*.66,cx-w*.12,yb-h*.74);
  x.bezierCurveTo(cx-w*.05,yb-h*.78,cx-w*.012,yb-h*.82,cx,yb-h);
  x.bezierCurveTo(cx+w*.012,yb-h*.82,cx+w*.05,yb-h*.78,cx+w*.12,yb-h*.74);
  x.bezierCurveTo(x1-w*.2,yb-h*.66,x1-w*.05,yb-h*.62,x1,yb);}
function snowBand(x,W,H,sh){ // soft rolling drift along the bottom
  let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const n=7,pts=[];for(let i=0;i<=n;i++)pts.push([W*i/n,H-sh*(.62+rnd()*.38)]);
  x.save();x.shadowColor='rgba(30,28,70,.28)';x.shadowBlur=sh*.18;x.shadowOffsetY=-sh*.04;
  x.beginPath();x.moveTo(-10,H+10);x.lineTo(-10,pts[0][1]);
  for(let i=0;i<n;i++){const [ax,ay]=pts[i],[bx,by]=pts[i+1],mx=(ax+bx)/2;x.bezierCurveTo(ax+(bx-ax)*.3,ay-sh*.18,mx,Math.min(ay,by)-sh*.16,mx,(ay+by)/2-sh*.08);x.bezierCurveTo(mx,(ay+by)/2,bx-(bx-ax)*.3,by-sh*.14,bx,by);}
  x.lineTo(W+10,H+10);x.closePath();
  const g=x.createLinearGradient(0,H-sh,0,H);g.addColorStop(0,'#FFFFFF');g.addColorStop(1,'#EEF0F7');x.fillStyle=g;x.fill();x.restore();
}
function drawPillar(x,P,X,Y,pw,ph,flip){ // keep the turned rings at natural proportion, stretch only the plain shaft
  const sw=PC.pillar[2],shh=PC.pillar[3],k=pw/sw,top=200,bot=110,mid=shh-top-bot;
  const th=top*k,bh=bot*k,mh=Math.max(0,ph-th-bh);
  x.save();if(flip){x.translate(X+pw,0);x.scale(-1,1);X=0;}
  x.drawImage(P.pillar,0,0,sw,top,X,Y,pw,th);
  x.drawImage(P.pillar,0,top,sw,mid,X,Y+th,pw,mh);
  x.drawImage(P.pillar,0,shh-bot,sw,bot,X,Y+th+mh,pw,bh);x.restore();
}
function jpLine(x,cx,cy,size,col,align){ // 東京クリスマスマーケット 2026 in the mincho of the page
  x.save();x.fillStyle=col;x.textAlign=align;x.textBaseline='middle';
  x.font=`600 ${Math.round(size)}px "Shippori Mincho B1","Hiragino Mincho ProN","Yu Mincho",serif`;
  if('letterSpacing' in x)x.letterSpacing=Math.round(size*.18)+'px';
  x.fillText('東京クリスマスマーケット 2026',cx,cy);x.restore();
}
function drawFrame(x,W,H,style){
  const P=framePieces(),u=Math.min(W,H),hex=COLORS.find(c=>c.id===st.color).hex;
  const snowH=u*.125;
  x.save();x.shadowColor='rgba(10,8,30,.5)';x.shadowBlur=u*.01;
  if(style==='arch'){
    const m=u*.018,pw=u*.042,ph=H-snowH*.55-m;
    drawPillar(x,P,m,m,pw,ph,false);drawPillar(x,P,W-m-pw,m,pw,ph,true);
    const ax0=m+pw*.5,ax1=W-m-pw*.5,yb=m+u*.085,ah=u*.06;
    archPath(x,ax0,ax1,yb,ah);x.lineWidth=Math.max(1.5,u*.0038);x.strokeStyle=goldGrad(x,ax0,0,ax1,0);x.lineCap='round';x.stroke();
    const ds=u*.0011,hang=(cx,len)=>{x.drawImage(P.dots,cx-PC.dots[2]*ds/2,0,PC.dots[2]*ds,len);x.drawImage(P.star,cx-PC.star[2]*ds/2,len-PC.star[3]*ds*.08,PC.star[2]*ds,PC.star[3]*ds);};
    hang(m+pw+u*.07,u*.1);hang(W-m-pw-u*.07,u*.1);
  } else {
    x.shadowBlur=0;const fs=u*.0008;
    [[u*.035,u*.035],[W-u*.035-PC.flake[2]*fs,u*.035]].forEach(p=>x.drawImage(P.flake,p[0],p[1],PC.flake[2]*fs,PC.flake[3]*fs));
    x.strokeStyle='rgba(209,164,107,.9)';x.lineWidth=Math.max(1.5,u*.0028);x.strokeRect(u*.018,u*.018,W-u*.036,H-u*.036);
  }
  x.restore();
  snowBand(x,W,H,snowH);
  const lc=ratio(hex,'#FFFFFF')>3?hex:'#1C2040',gap=u*.01;
  let lh=snowH*.26,tw=P.words.reduce((t,c)=>t+c.width*(lh/c.height),0)+gap*3;
  if(tw>W*.66){lh*=W*.66/tw;tw=W*.66;}
  let lx=(W-tw)/2;const ly=H-snowH*.5;
  P.words.forEach(c=>{const ww=c.width*(lh/c.height);x.drawImage(tinted(c,lc,'lw'+c.width),lx,ly-lh/2,ww,lh);lx+=ww+gap;});
  jpLine(x,W/2,H-snowH*.18,lh*.74,lc,'center');
}
const frameC=$('#frameC');
function drawFrameLive(){const r=scene2.getBoundingClientRect();if(!r.width||!LAY)return;const d=Math.min(2,window.devicePixelRatio||1);
  frameC.width=Math.round(r.width*d);frameC.height=Math.round(r.height*d);const x=frameC.getContext('2d');x.clearRect(0,0,frameC.width,frameC.height);
  if(frameStyle!=='none')drawFrame(x,frameC.width,frameC.height,frameStyle);}
document.querySelectorAll('#frames button').forEach(b=>b.onclick=()=>{frameStyle=b.dataset.f;document.querySelectorAll('#frames button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawFrameLive();});
window.addEventListener('resize',()=>{if(!$('#photo').hidden)drawFrameLive();});
function cover(ctx,src,sw,sh,w,h){const s=Math.max(w/sw,h/sh);ctx.drawImage(src,(w-sw*s)/2,(h-sh*s)/2,sw*s,sh*s);}
$('#shoot').onclick=()=>{
  const r=scene2.getBoundingClientRect(),W=1600,H=Math.round(1600*r.height/r.width),k=W/r.width;
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  x.fillStyle='#14182F';x.fillRect(0,0,W,H);
  if(bgMode==='camera'&&stream)cover(x,cam,cam.videoWidth,cam.videoHeight,W,H);
  else if(bgMode==='upload'&&upImg.getAttribute('src'))cover(x,upImg,upImg.naturalWidth,upImg.naturalHeight,W,H);
  renderer.render(scene,camera);const lr=layer.getBoundingClientRect();
  x.drawImage(renderer.domElement,(lr.left-r.left)*k,(lr.top-r.top)*k,lr.width*k,lr.height*k);
  if(frameStyle!=='none')drawFrame(x,W,H,frameStyle);
  else{x.fillStyle='rgba(243,232,210,.92)';x.font=`italic 500 ${Math.round(W*.022)}px "EB Garamond", serif`;x.textAlign='right';
  x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=8;x.fillText('Tokyo Christmas Market 2026',W-W*.025,H-W*.048);
  x.shadowColor='rgba(0,0,0,.5)';jpLine(x,W-W*.025,H-W*.022,W*.014,'rgba(243,232,210,.95)','right');}
  const url=c.toDataURL('image/png');$('#resultImg').src=url;$('#dl').href=url;$('#modal').classList.add('on');
  track('capture',Object.assign(design(),{frame:frameStyle,bg:bgMode}));
};
$('#mClose').onclick=()=>$('#modal').classList.remove('on');
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('on');});
$('#dl').addEventListener('click',()=>track('save',design()));
$('#share').onclick=async()=>{track('share',design());
  const text='東京クリスマスマーケット2026のマグカップメーカーで、オリジナルマグを作りました #東京クリスマスマーケット';
  try{const blob=await (await fetch($('#resultImg').src)).blob();const f=new File([blob],'mug.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text});return;}}catch(e){}
  const a=document.createElement('a');a.href='https://twitter.com/intent/tweet?text='+encodeURIComponent(text);a.target='_blank';a.rel='noopener';a.click();
};
$('#back').onclick=()=>step('design');
if(window.matchMedia('(pointer:coarse)').matches)$('#photoHint').textContent='1本指でマグを動かす。2本指で広げる・縮めると大きさ、ひねると向きが変わります。';


/* ------------------------------------------------------------------ landing */
const CFG=window.TCM_MUG||{};
const SHARE_URL=CFG.SHARE_URL||location.href.split('#')[0];
const SID=(()=>{try{let v=sessionStorage.getItem('tcm_mug_sid');if(!v){v=Math.random().toString(36).slice(2)+Date.now().toString(36);sessionStorage.setItem('tcm_mug_sid',v);}return v;}catch(e){return Math.random().toString(36).slice(2);}})();
function track(event,detail){ // usage log → GAS → spreadsheet (no photos are sent)
  if(!CFG.GAS_URL)return;
  try{fetch(CFG.GAS_URL,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({action:'log',env:CFG.ENV||'test',event,sessionId:SID,detail:detail||{},
      device:window.matchMedia('(pointer:coarse)').matches?'sp':'pc',ua:navigator.userAgent.slice(0,180)})}).catch(()=>{});}catch(e){}
}
const design=()=>({color:st.color,slots:st.slots.map(k=>k||'-').join('|'),pats:st.pat.join('|')});
const HERO=[
 {c:'rot',s:PRESET.red.s,p:['orig','orig','orig','orig','orig','orig'],t:'公式レッド'},
 {c:'nacht',s:PRESET.navy.s,p:['orig','orig','orig','orig','orig','orig'],t:'公式ネイビー'},
 {c:'babyrosa',s:['gingerbread','angel','snowman','santa','boots','pyramid_g'],p:['pink','pink','pink','pink','pink','red'],t:'ベビーピンク'},
 {c:'tanne',s:['cat','snowman','gnome','nutcracker','train','pyramid_r'],p:['wcat','yellow','red','white','yellow','yellow'],t:'フォレストグリーン'},
 {c:'zitrone',s:['santa','gingerbread','angel','reindeer','boots','pyramid_g'],p:['blue','yellow','sky','white','blue','blue'],t:'レモン'}];
let heroI=0,heroTimer=null,onLanding=true;
function applyLook(h){st.color=h.c;st.slots=h.s.slice();st.pat=h.p.slice();compose();}
function heroShow(i){heroI=i;const h=HERO[i];applyLook(h);const c=COLORS.find(c=>c.id===h.c);
  $('#heroCap').innerHTML=`<i>${c.de}</i>${h.t}`;$('#heroDots').innerHTML=HERO.map((_,j)=>`<b class="${j===i?'on':''}"></b>`).join('');}
function startHero(){clearInterval(heroTimer);heroTimer=setInterval(()=>heroShow((heroI+1)%HERO.length),3400);}
function snapshots(){ // render example mugs for the gallery with the live renderer
  const host=document.createElement('div');host.style.cssText='position:fixed;left:-9999px;top:0;width:520px;height:520px';document.body.appendChild(host);
  attach(host);const out=[];const keep=rotY,kt=tilt;tilt=.16;
  [HERO[1],HERO[2],HERO[3],HERO[4]].forEach((h,i)=>{applyLook(h);rotY=[-1.1,-2.3,-.6,-1.7][i];mug.rotation.y=rotY;renderer.render(scene,camera);out.push({src:renderer.domElement.toDataURL('image/png'),h});});
  rotY=keep;tilt=kt;host.remove();return out;
}
function buildLanding(){
  const g=snapshots();
  $('#gallery').innerHTML=g.map(x=>{const c=COLORS.find(c=>c.id===x.h.c);return `<figure><img src="${x.src}" alt="${x.h.t}のマグの作例"><figcaption><i>${c.de}</i>${x.h.t}</figcaption></figure>`;}).join('');
  $('#vchips').innerHTML=COLORS.slice(0,36).map(c=>`<i style="background:${c.hex}"></i>`).join('');
  $('#vfigs').innerHTML=['santa','angel','gingerbread','snowman','gnome'].map((k,i)=>`<img src="${variant(k,['orig','pink','pink','orig','yellow'][i]).thumb}" alt="">`).join('');
  const vf=$('#vframe'),vx=vf.getContext('2d');const gr=vx.createLinearGradient(0,0,0,225);gr.addColorStop(0,'#1C2558');gr.addColorStop(1,'#4A3A3A');vx.fillStyle=gr;vx.fillRect(0,0,300,225);
  if(g[0]){const im=new Image();im.onload=()=>{vx.drawImage(im,90,62,120,120);drawFrame(vx,300,225,'arch');};im.src=g[0].src;}
  const text='東京クリスマスマーケット2026の「クリスマスマグカップメーカー」で、オリジナルのマグを作ろう';
  $('#shareLinks').innerHTML=[['X','https://twitter.com/intent/tweet?text='+encodeURIComponent(text)+'&url='+encodeURIComponent(SHARE_URL)],
    ['Facebook','https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(SHARE_URL)],
    ['LINE','https://social-plugins.line.me/lineit/share?url='+encodeURIComponent(SHARE_URL)]].map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n}でシェア</a>`).join('');
}
function showLanding(){const was=onLanding;onLanding=true;if(!was&&window.__snow)window.__snow();$('#maker').hidden=true;$('#landing').hidden=false;stopCam();tilt=.1;idle=true;attach($('#heroMug'));heroShow(heroI);startHero();window.scrollTo({top:0});}
function openMaker(e){if(e)e.preventDefault();onLanding=false;clearInterval(heroTimer);$('#landing').hidden=true;$('#maker').hidden=false;
  st.color=PRESET.red.c;st.slots=PRESET.red.s.slice();st.pat=Array(6).fill('orig');st.sel=0;patsFor=null;compose();refreshUI();
  step('design');tilt=.12;rotY=-Math.PI/2+.42;idle=true;window.scrollTo({top:0});track('start');}
$('#startBtn').onclick=openMaker;$('#startBtn2').onclick=openMaker;$('#homeBtn').onclick=showLanding;
$('#toTop').onclick=e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});};
(function snow(){const c=$('#snowC'),x=c.getContext('2d');let W,H,fl=[];const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const size=()=>{const r=c.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);W=c.width=r.width*d;H=c.height=r.height*d;
    fl=Array.from({length:90},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.8+.6)*d,v:(Math.random()*.4+.2)*d,a:Math.random()*.5+.3,ph:Math.random()*6}));};
  size();window.addEventListener('resize',size);
  const f=t=>{x.clearRect(0,0,W,H);for(const p of fl){if(!reduce){p.y+=p.v;p.x+=Math.sin(t/1500+p.ph)*.25;if(p.y>H){p.y=-4;p.x=Math.random()*W;}}
    x.globalAlpha=p.a;x.fillStyle='#FFFFFF';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();}x.globalAlpha=1;if(onLanding&&!reduce)requestAnimationFrame(f);};
  requestAnimationFrame(f);window.__snow=()=>requestAnimationFrame(f);
})();

/* ------------------------------------------------------------------ boot */
(async function(){
  buildUI();await loadAll();
  try{await document.fonts.load('46px Kalam');await document.fonts.load('600 30px "Shippori Mincho B1"','東京クリスマスマーケット2026');}catch(e){}
  drawInner();splitLayers();initThree();compose();refreshUI();
  const mq=window.matchMedia('(max-width:600px)'),chips=$('#chips'),cb=$('#colorBlk');
  const bar=$('#patbar'),srow=document.querySelector('.stagerow');
  const place=()=>{if(mq.matches){$('#side').appendChild(chips);cb.hidden=true;srow.after(bar);}else{cb.insertBefore(chips,$('#chipname'));cb.hidden=false;$('#view').appendChild(bar);}resize();};
  place();mq.addEventListener?mq.addEventListener('change',place):mq.addListener(place);
  bindView($('#view'));$('#loading').remove();
  buildLanding();showLanding();rotY=-Math.PI/2+.42;requestAnimationFrame(tick);
  track('open',{ref:document.referrer.slice(0,120)});
  $('#loader').classList.add('done');setTimeout(()=>$('#loader').remove(),700);
})();
})();
