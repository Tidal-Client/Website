/*
Copyright (c) 2026 Tidal Client (iitzrob). All rights reserved.
This website and its source code are proprietary. You may view them in a browser, but you may not copy, modify, redistribute, publish, or create derivative works from any part of them without written permission from the owner.
You may not feed this code or its content into any AI or machine-learning tool to rewrite, modify, clone, or train on it. Unauthorized use may be reported and removed under copyright law (DMCA).
Tidal Client is not affiliated with Mojang or Microsoft.
*/
// ===== DOWNLOAD SWITCH =====
// true  = Download buttons work and always fetch the newest .exe from the latest release of iitzrob/tidal-releases
// false = Download buttons are disabled and show the message below
var DOWNLOAD=false;
var DOWNLOAD_MSG='Coming soon'; // or 'Down for maintenance'
// ===========================
(function(){
var B=document.body,R=B.getAttribute('data-root')||'',PG=B.getAttribute('data-page')||'home',SINGLE=B.hasAttribute('data-single'),
DL='https://github.com/iitzrob/tidal-releases/releases/latest',DC='https://discord.gg/tkkUmYyhgn';
var LOGO='<path d="M10 32C8 18 22 8 38 12C27 13 20 21 22 30C24 38 33 40 40 35" stroke="#22d3ee" stroke-width="3"/><path d="M14 36C20 42 32 42 38 36" stroke="#0e7490" stroke-width="2"/>';
function U(p){if(SINGLE)return '#'+p;return p==='home'?(R||'./'):R+p+'/'}
var load=document.getElementById('load');B.removeChild(load);
var wrap=document.createElement('div');wrap.id='wrap';
while(B.firstChild)wrap.appendChild(B.firstChild);
var nav=document.createElement('nav');
nav.innerHTML='<a class="brand" href="'+U('home')+'" data-n><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round">'+LOGO+'</svg>Tidal</a><div class="nlinks"><a href="'+U('download')+'" data-n data-k="download">Download</a><a href="'+U('help')+'" data-n data-k="help">Help</a></div><div class="links"><a class="btn sm" data-dc>Discord</a><a class="btn pri" href="'+U('download')+'" data-n>Download</a></div>';
var foot=document.createElement('footer');foot.className='ft';
foot.innerHTML='<div><div class="b"><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round">'+LOGO+'</svg>Tidal</div><p>Not affiliated with Mojang or Microsoft.</p></div><div><h6>PRODUCT</h6><a href="'+U('download')+'" data-n>Download</a></div><div><h6>HELP</h6><a href="'+U('help')+'" data-n>Help</a><a data-dc>Discord</a></div><div><h6>LEGAL</h6><a href="'+U('terms')+'" data-n>Terms</a><a href="'+U('privacy')+'" data-n>Privacy</a></div>';
wrap.insertBefore(nav,wrap.firstChild);wrap.appendChild(foot);
var cv=document.createElement('canvas');cv.id='bg';
B.appendChild(cv);B.appendChild(wrap);B.appendChild(load);
function links(){document.querySelectorAll('[data-dl]').forEach(function(a){if(!DOWNLOAD){a.removeAttribute('href');a.textContent=DOWNLOAD_MSG;a.classList.add('off');return}a.href=DL;a.rel='noopener'});
if(DOWNLOAD)fetch('https://api.github.com/repos/iitzrob/tidal-releases/releases/latest').then(function(r){return r.json()}).then(function(j){var x=(j.assets||[]).filter(function(a){return /\.exe$/i.test(a.name)})[0];if(!x)return;var v=(j.tag_name||'').replace(/^v/i,'');document.querySelectorAll('[data-dl]').forEach(function(a){a.href=x.browser_download_url;a.removeAttribute('target');if(v)a.textContent=a.textContent.replace(/ \(v.*\)$/,'')+' (v'+v+')'})}).catch(function(){});
document.querySelectorAll('[data-dc]').forEach(function(a){a.href=DC;a.target='_blank';a.rel='noopener'})}
links();
function mark(){nav.querySelectorAll('[data-k]').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-k')===PG)})}
function ph(img){var d=document.createElement('div');d.className='ph';d.textContent='Screenshot: '+(img.alt||'in game');img.replaceWith(d)}
document.querySelectorAll('img.shot').forEach(function(im){if(im.complete&&!im.naturalWidth)ph(im);else im.addEventListener('error',function(){ph(im)})});
function showPg(){if(!SINGLE){mark();return}
  var h=(location.hash||'#home').slice(1);if(!document.querySelector('main[data-pg="'+h+'"]'))h='home';PG=h;
  document.querySelectorAll('main[data-pg]').forEach(function(m){m.classList.toggle('on',m.getAttribute('data-pg')===h)});mark();scrollTo(0,0)}
showPg();
load.innerHTML='<svg viewBox="0 0 48 48" fill="none"><defs><clipPath id="fc"><rect id="fr" x="0" y="48" width="48" height="48"/></clipPath></defs><g opacity=".2" stroke="#22d3ee" stroke-width="3" stroke-linecap="round"><path d="M10 32C8 18 22 8 38 12C27 13 20 21 22 30C24 38 33 40 40 35"/><path d="M14 36C20 42 32 42 38 36" stroke-width="2"/></g><g clip-path="url(#fc)" stroke-linecap="round"><path d="M10 32C8 18 22 8 38 12C27 13 20 21 22 30C24 38 33 40 40 35" stroke="#22d3ee" stroke-width="3"/><path d="M14 36C20 42 32 42 38 36" stroke="#0e7490" stroke-width="2"/></g></svg><small>Loading Tidal</small>';
var fr=document.getElementById('fr'),busy=false;
function run(D,done,hide){
  load.classList.remove('gone');var t0=performance.now();
  (function f(n){var p=Math.min(1,(n-t0)/D);fr.setAttribute('y',48-48*(1-Math.pow(1-p,2)));
    if(p<1)requestAnimationFrame(f);else{done&&done();if(hide)setTimeout(function(){load.classList.add('gone')},100)}})(t0);
}
document.addEventListener('click',function(e){
  var o=e.target.closest&&e.target.closest('[data-dl]');if(o&&!DOWNLOAD){e.preventDefault();return}
  var a=e.target.closest&&e.target.closest('a[data-n]');if(!a||busy||e.ctrlKey||e.metaKey||e.shiftKey)return;
  e.preventDefault();busy=true;
  if(SINGLE){run(450,function(){location.hash=a.getAttribute('href').slice(1);showPg();setTimeout(function(){load.classList.add('gone');busy=false},120)},false)}
  else run(450,function(){location.href=a.href},false);
});
addEventListener('pageshow',function(e){if(e.persisted){busy=false;load.classList.add('gone')}});
// captcha
var ok=false;try{ok=localStorage.getItem('tidal_ok')==='1'}catch(e){}
function icon(k){var s={fin:'<path d="M6 40C14 36 18 22 22 6C30 18 36 30 42 40Z" fill="#67e8f9"/><path d="M4 42C12 39 20 44 26 42C32 40 38 44 44 41" stroke="#0e7490" stroke-width="2.5" fill="none" stroke-linecap="round"/>',shell:'<path d="M8 36C8 20 16 10 24 10C32 10 40 20 40 36Z" fill="#8aa6b2"/><path d="M24 10V36M16 14L18 36M32 14L30 36" stroke="#04131d" stroke-width="1.8"/>',boat:'<path d="M24 8L38 28H24Z" fill="#e8f1f4"/><path d="M8 32H40L34 40H14Z" fill="#8aa6b2"/>',fish:'<ellipse cx="22" cy="24" rx="14" ry="8" fill="#8aa6b2"/><path d="M34 24L44 14V34Z" fill="#8aa6b2"/><circle cx="14" cy="22" r="1.8" fill="#04131d"/>'};return '<svg viewBox="0 0 48 48">'+s[k]+'</svg>'}
if(ok){run(500,null,true)}else{
  load.classList.add('gone');
  var cap=document.createElement('div');cap.id='cap';
  cap.innerHTML='<div class="capbox"><h3>Verify you’re human</h3><p id="capsub">One quick check before you enter.</p><div id="s1" class="chk"><div class="box" id="cb"></div><span>I’m not a robot</span></div><div id="s2" hidden><p style="margin-bottom:12px">Tap the shark fin.</p><div class="tiles" id="tiles"></div></div><div id="capmsg"></div></div>';
  document.body.appendChild(cap);
  var pass=function(){try{localStorage.setItem('tidal_ok','1')}catch(e){}cap.remove();run(500,null,true)};
  var step2=function(){
    document.getElementById('s1').hidden=true;document.getElementById('s2').hidden=false;document.getElementById('capsub').textContent='Almost done.';
    var o=['shell','boat','fish'].sort(function(){return Math.random()-.5}).slice(0,2);o.splice(Math.floor(Math.random()*3),0,'fin');
    var t=document.getElementById('tiles');t.innerHTML='';
    o.forEach(function(k){var d=document.createElement('div');d.className='tile';d.innerHTML=icon(k);
      d.addEventListener('click',function(){if(k==='fin')pass();else{document.getElementById('capmsg').textContent='Not quite, try again.';setTimeout(step2,500)}});t.appendChild(d)});
  };
  document.getElementById('s1').addEventListener('click',function(){var cb=document.getElementById('cb');if(cb.className!=='box')return;cb.className='box spin';
    setTimeout(function(){cb.className='box ok';cb.textContent='✓';setTimeout(step2,350)},900)});
}
// background
var c=cv.getContext('2d'),W,H,dpr,t=0,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var Ls=[{b:.40,a:7,l:150,s:.5,p:0,c:'#082838'},{b:.50,a:10,l:210,s:.4,p:2,c:'#0a3347'},{b:.62,a:13,l:280,s:.34,p:4,c:'#0d4156'},{b:.74,a:15,l:340,s:.28,p:1,c:'#115168'}];
function wy(i,x){var o=Ls[i];return o.b*H+o.a*Math.sin(x/o.l+t*o.s+o.p)+o.a*.4*Math.sin(x/(o.l*.45)+t*o.s*1.7)}
function rs(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;c.setTransform(dpr,0,0,dpr,0,0)}
rs();addEventListener('resize',rs);
var boats=[{i:0,x:.2*W,v:6,s:.7},{i:1,x:.7*W,v:-9,s:1},{i:2,x:.4*W,v:5,s:1.3}];
var fins=[{i:2,x:.15*W,v:22,s:1},{i:3,x:.8*W,v:-30,s:1.35},{i:1,x:.55*W,v:-14,s:.7}];
function boat(b){var y=wy(b.i,b.x),ang=Math.atan2(wy(b.i,b.x+6)-wy(b.i,b.x-6),12),s=b.s*(W<600?.8:1);
  c.save();c.translate(b.x,y+2);c.rotate(ang*.8);c.scale(s*(b.v<0?-1:1),s);
  c.fillStyle='rgba(232,244,248,.85)';c.beginPath();c.moveTo(0,-4);c.lineTo(0,-34);c.lineTo(15,-8);c.closePath();c.fill();
  c.fillStyle='rgba(138,166,178,.75)';c.beginPath();c.moveTo(-3,-26);c.lineTo(-3,-6);c.lineTo(-13,-6);c.closePath();c.fill();
  c.fillStyle='#0b1f2b';c.beginPath();c.moveTo(-18,-4);c.lineTo(20,-4);c.lineTo(14,6);c.lineTo(-13,6);c.closePath();c.fill();c.restore()}
function fin(f){var y=wy(f.i,f.x),s=f.s*(W<600?.8:1),d=f.v<0?-1:1;
  c.save();c.translate(f.x,y+3);c.scale(d*s,s);
  c.fillStyle='rgba(7,24,34,.95)';c.beginPath();c.moveTo(-12,0);c.quadraticCurveTo(-2,-6,2,-26);c.quadraticCurveTo(10,-10,16,0);c.closePath();c.fill();
  c.strokeStyle='rgba(180,230,240,.28)';c.lineWidth=1.2;c.beginPath();c.ellipse(-4,2,26,3,0,0,Math.PI*2);c.stroke();
  c.beginPath();c.ellipse(-22,2,14,2,0,0,Math.PI*2);c.stroke();c.restore()}
var last=0;
function draw(n){var dt=Math.min(.05,(n-last)/1000||0);last=n;if(!reduce)t+=dt;
  var g=c.createLinearGradient(0,0,0,H*.45);g.addColorStop(0,'#030d15');g.addColorStop(1,'#0a2a3b');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(var i=0;i<4;i++){
    c.fillStyle=Ls[i].c;c.beginPath();c.moveTo(0,H);for(var x=0;x<=W+8;x+=8)c.lineTo(x,wy(i,x));c.lineTo(W,H);c.closePath();c.fill();
    c.strokeStyle='rgba(160,225,240,.07)';c.lineWidth=1;c.beginPath();for(var x2=0;x2<=W+8;x2+=8){x2?c.lineTo(x2,wy(i,x2)):c.moveTo(x2,wy(i,x2))}c.stroke();
    boats.forEach(function(b){if(b.i===i)boat(b)});fins.forEach(function(f){if(f.i===i)fin(f)});
  }
  var sy=H*.9;c.fillStyle='#1d2a2b';c.beginPath();c.moveTo(0,H);
  for(var xb=0;xb<=W+8;xb+=8)c.lineTo(xb,sy+Math.sin(xb/120+t*.3)*5+Math.sin(xb/37)*1.5);c.lineTo(W,H);c.closePath();c.fill();
  c.strokeStyle='rgba(220,245,250,.22)';c.lineWidth=2;c.beginPath();
  for(var xf=0;xf<=W+8;xf+=8){var yy=sy+Math.sin(xf/120+t*.3)*5-4+Math.sin(xf/60-t*.8)*2;xf?c.lineTo(xf,yy):c.moveTo(xf,yy)}c.stroke();
  if(!reduce)[boats,fins].forEach(function(a){a.forEach(function(o){o.x+=o.v*dt;if(o.v>0&&o.x>W+60)o.x=-60;if(o.v<0&&o.x<-60)o.x=W+60})});
  requestAnimationFrame(draw)}
requestAnimationFrame(draw);
})();
