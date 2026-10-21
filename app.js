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
var B=document.body,R=B.getAttribute('data-root')||'',PG=B.getAttribute('data-page')||'home',
DL='https://github.com/iitzrob/tidal-releases/releases/latest',DC='https://discord.gg/tkkUmYyhgn';
var LOGO='<defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7df3ff"/><stop offset="1" stop-color="#22a8f0"/></linearGradient></defs><path d="M10 32C8 18 22 8 38 12C27 13 20 21 22 30C24 38 33 40 40 35" stroke="url(#lg)" stroke-width="3.4"/><path d="M14 36C20 42 32 42 38 36" stroke="#0e7490" stroke-width="2.2"/>';
function U(p){return p==='home'?(R||'./'):R+p+'/'}
var ld=document.getElementById('load');if(ld)ld.remove();
var main=document.querySelector('main')||document.querySelector('.hero');
var nav=document.createElement('nav');
nav.innerHTML='<a class="brand" href="'+U('home')+'"><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round">'+LOGO+'</svg>Tidal</a><div class="nlinks"><a href="'+U('home')+'#features">Features</a><a href="'+U('home')+'#modules">Modules</a><a href="'+U('download')+'" data-k="download">Download</a><a href="'+U('help')+'" data-k="help">Help</a></div><div class="links"><a class="btn sm" data-dc>Discord</a><a class="btn sm pri" href="'+U('download')+'">Download</a></div>';
var foot=document.createElement('footer');foot.className='ft';
foot.innerHTML='<div><div class="b"><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round">'+LOGO.replace('lg','lg2').replace('url(#lg)','url(#lg2)')+'</svg>Tidal</div><p>A free Minecraft client with its own launcher. Not affiliated with Mojang or Microsoft.</p></div><div><h6>PRODUCT</h6><a href="'+U('download')+'">Download</a><a href="'+U('home')+'#features">Features</a><a href="'+U('home')+'#modules">Modules</a></div><div><h6>SUPPORT</h6><a href="'+U('help')+'">Help</a><a data-dc>Discord</a></div><div><h6>LEGAL</h6><a href="'+U('terms')+'">Terms</a><a href="'+U('privacy')+'">Privacy</a></div>';
B.insertBefore(nav,B.firstChild);
var sc=document.querySelector('script[src*="app.js"]');B.insertBefore(foot,sc);
nav.querySelectorAll('[data-k]').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-k')===PG)});
function onS(){nav.classList.toggle('solid',scrollY>30)}onS();addEventListener('scroll',onS,{passive:true});
// download buttons
document.querySelectorAll('[data-dl]').forEach(function(a){if(!DOWNLOAD){a.removeAttribute('href');a.textContent=DOWNLOAD_MSG;a.classList.add('off');return}a.href=DL;a.rel='noopener'});
if(DOWNLOAD)fetch('https://api.github.com/repos/iitzrob/tidal-releases/releases/latest').then(function(r){return r.json()}).then(function(j){var x=(j.assets||[]).filter(function(a){return /\.exe$/i.test(a.name)})[0];if(!x)return;var v=(j.tag_name||'').replace(/^v/i,'');document.querySelectorAll('[data-dl]').forEach(function(a){a.href=x.browser_download_url;if(v)a.textContent=a.textContent.replace(/ \(v.*\)$/,'')+' (v'+v+')'})}).catch(function(){});
document.querySelectorAll('[data-dc]').forEach(function(a){a.href=DC;a.target='_blank';a.rel='noopener'});
document.addEventListener('click',function(e){var o=e.target.closest&&e.target.closest('[data-dl]');if(o&&!DOWNLOAD)e.preventDefault()});
// reveal on scroll
var rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(n){io.observe(n)})}else rv.forEach(function(n){n.classList.add('in')});
})();
