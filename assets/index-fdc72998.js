(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&u(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function a(r){const o=new Audio("inSqueak.wav"),i=new Audio("outSqueak.wav");function u(){r.innerHTML="Release",t(o,i)}function e(){r.innerHTML="Hold",t(i,o)}function t(s,c){c.pause();let d=c.currentTime>0?c.currentTime/c.duration:1;s.currentTime=s.duration-d*s.duration,s.play()}const n=()=>{r.innerHTML="Hold"};r.addEventListener("mousedown",()=>u()),r.addEventListener("mouseup",()=>e()),n()}document.querySelector("#app").innerHTML=`
  <div>
    <h1>Squeak!</h1>
    <div class="card">
       <button id="playSound" type="button"> </button>
    </div>
    
  </div>
`;a(document.querySelector("#playSound"));
