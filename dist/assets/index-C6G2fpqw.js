(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{name:`CSS Transitions`,level:`Basic`,type:`Playground`,description:`Start with hover, timing, transforms, and a small amount of polish.`,tags:[`CSS`,`Core`],code:`.chip {
  transition: transform 240ms cubic-bezier(.2,.8,.2,1);
}

.chip:hover {
  transform: translateY(-4px) scale(1.02);
}`},{name:`Keyframe Loop`,level:`Basic`,type:`Playground`,description:`Build a small repeated motion and make it respect reduced motion.`,tags:[`CSS`,`Loop`],code:`@media (prefers-reduced-motion: no-preference) {
  .orb {
    animation: float 1.6s ease-in-out infinite alternate;
  }
}

@keyframes float { to { transform: translateY(-18px); } }`},{name:`GSAP`,level:`Intermediate`,type:`Library`,description:`Timeline-first JavaScript animation for richer choreography and scroll work.`,tags:[`JavaScript`,`Timeline`],url:`https://gsap.com/docs/v3/`,code:`import { gsap } from 'gsap';

gsap.timeline()
  .from('.title', { y: 20, opacity: 0, duration: .45 })
  .from('.item', { y: 12, opacity: 0, stagger: .08 }, '-=.2');`},{name:`Motion for React`,level:`Intermediate`,type:`Library`,description:`Declarative layout, gestures, and presence animation for React interfaces.`,tags:[`React`,`Gesture`],url:`https://motion.dev/docs/react`,code:`import { motion } from 'motion/react';

export function SaveButton() {
  return <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: .97 }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  >Save</motion.button>;
}`},{name:`LottieFiles`,level:`Intermediate`,type:`Tool`,description:`Create, preview, optimize, and ship vector animation files to the web.`,tags:[`Lottie`,`Vector`],url:`https://developers.lottiefiles.com/`,code:`import { DotLottie } from '@lottiefiles/dotlottie-web';

new DotLottie({
  canvas: document.querySelector('#animation'),
  src: '/intro.lottie',
  autoplay: true,
  loop: true
});`},{name:`Scroll-driven CSS`,level:`Intermediate`,type:`Technique`,description:`Link a visual response to scroll without adding a JavaScript listener.`,tags:[`CSS`,`Scroll`],code:`.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 12% cover 34%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}`},{name:`Theatre.js`,level:`Advanced`,type:`Tool`,description:`An animation sequencer that makes complex timeline values editable.`,tags:[`Timeline`,`3D`],url:`https://www.theatrejs.com/docs/latest`,code:`import studio from '@theatre/studio';
import { getProject } from '@theatre/core';

studio.initialize();
const project = getProject('Scene');
const sheet = project.sheet('Intro');
sheet.sequence.play({ iterationCount: Infinity });`},{name:`Web Animations API`,level:`Advanced`,type:`Platform`,description:`Use browser-native keyframes when you need imperative control with no library.`,tags:[`Browser API`,`Core`],code:`element.animate(
  [
    { opacity: 0, transform: 'translateY(12px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }
);`}],t=[[`fliptheweb/motion-ui-design`,`Curated principles, software, video, and articles.`,`https://github.com/fliptheweb/motion-ui-design`],[`sergey-pimenov/awesome-web-animation`,`A practical directory of web animation libraries.`,`https://github.com/sergey-pimenov/awesome-web-animation`],[`darelova/Awesome-Design-Resources-List`,`Broader design library with motion, 3D, and sound.`,`https://github.com/darelova/Awesome-Design-Resources-List`],[`LottieFiles/motion-design-skill`,`Motion principles and a way of thinking about timing.`,`https://github.com/LottieFiles/motion-design-skill`]],n=`All`,r=e[0],i=document.querySelector(`#app`);i.innerHTML=`
  <div class="shell">
    <aside class="sidebar">
      <a class="brand" href="#top" aria-label="Motion Atlas home"><span class="brand-mark">M</span></a>
      <nav class="side-nav" aria-label="Main navigation">
        <p>Explore</p>
        <a class="nav-link active" href="#library">Animation</a>
        <a class="nav-link" href="#playground">Playground</a>
        <a class="nav-link" href="#sources">Sources</a>
        <p>Levels</p>
        <button class="nav-link level-link selected" data-level="All">All techniques</button>
        <button class="nav-link level-link" data-level="Basic">Basic</button>
        <button class="nav-link level-link" data-level="Intermediate">Intermediate</button>
        <button class="nav-link level-link" data-level="Advanced">Advanced</button>
      </nav>
      <div class="sidebar-note">
        <span class="mini-rule"></span>
        <strong>Learn motion in layers.</strong>
        <p>Principle first. Then a small implementation you can inspect and reuse.</p>
      </div>
    </aside>

    <main id="top">
      <header class="topbar">
        <div class="topbar-title"><strong>Motion Atlas</strong><span>Learn web animation by making it.</span></div>
        <div class="top-actions"><a href="https://github.com/ammarhisyamm" target="_blank" rel="noreferrer">GitHub profile</a><button id="theme-toggle" aria-label="Toggle theme">Theme</button></div>
      </header>

      <section class="intro" aria-labelledby="intro-title">
        <p class="eyebrow">A learning directory for motion on the web</p>
        <h1 id="intro-title">From your first hover<br>to directed choreography.</h1>
        <p>Explore practical techniques, official tools, and code you can take into your next interface.</p>
      </section>

      <section class="library" id="library" aria-labelledby="library-title">
        <div class="section-heading">
          <div><h2 id="library-title">Animation library</h2><span id="result-count">8 resources</span></div>
          <label class="search"><span>Search</span><input id="search" type="search" placeholder="CSS, scroll, React..." /></label>
        </div>
        <div class="resource-list" id="resource-list"></div>
      </section>

      <section class="playground" id="playground" aria-labelledby="playground-title">
        <div class="playground-copy"><p class="eyebrow">Inspect the building blocks</p><h2 id="playground-title">Try one, then copy it.</h2><p id="selected-description"></p><div class="tags" id="selected-tags"></div></div>
        <div class="code-panel"><div class="code-head"><span id="selected-name"></span><button id="copy-code">Copy code</button></div><pre><code id="code-output"></code></pre></div>
        <div class="demo-panel" aria-label="Live animation preview"><div class="demo-orb"></div><div class="demo-chip">Hover me</div><span>Live CSS preview</span></div>
      </section>

      <section class="sources" id="sources" aria-labelledby="sources-title">
        <div class="sources-heading"><h2 id="sources-title">Starting sources</h2><p>Four GitHub collections that shaped this first index.</p></div>
        <div class="source-grid">
          ${t.map(([e,t,n])=>`<a href="${n}" target="_blank" rel="noreferrer"><strong>${e}</strong><span>${t}</span><b>Open source</b></a>`).join(``)}
        </div>
      </section>
    </main>
  </div>
`;function a(e){let t=e.url?`<a class="row-action" href="${e.url}" target="_blank" rel="noreferrer">Open docs</a>`:`<button class="row-action select-resource" data-name="${e.name}">View code</button>`;return`<article class="resource-row ${r.name===e.name?`is-active`:``}">
    <button class="resource-main select-resource" data-name="${e.name}" aria-label="Select ${e.name}">
      <span class="resource-initial">${e.name.slice(0,1)}</span>
      <span class="resource-name"><strong>${e.name}</strong><small>${e.type} · ${e.level}</small></span>
      <span class="resource-description">${e.description}</span>
      <span class="row-tags">${e.tags.map(e=>`<i>${e}</i>`).join(``)}</span>
    </button>
    ${t}
  </article>`}function o(t=``){let r=t.toLowerCase().trim(),i=e.filter(e=>(n===`All`||e.level===n)&&(!r||`${e.name} ${e.type} ${e.level} ${e.tags.join(` `)}`.toLowerCase().includes(r)));document.querySelector(`#resource-list`).innerHTML=i.length?i.map(a).join(``):`<div class="empty-state"><strong>Nothing matched that search.</strong><span>Try CSS, React, scroll, or timeline.</span></div>`,document.querySelector(`#result-count`).textContent=`${i.length} resource${i.length===1?``:`s`}`,document.querySelectorAll(`.select-resource`).forEach(e=>e.addEventListener(`click`,()=>s(e.dataset.name)))}function s(t,n=!0){r=e.find(e=>e.name===t)||e[0],document.querySelector(`#selected-name`).textContent=r.name,document.querySelector(`#selected-description`).textContent=r.description,document.querySelector(`#selected-tags`).innerHTML=r.tags.map(e=>`<span>${e}</span>`).join(``),document.querySelector(`#code-output`).textContent=r.code,o(document.querySelector(`#search`).value),n&&document.querySelector(`#playground`).scrollIntoView({behavior:document.documentElement.dataset.reduceMotion?`auto`:`smooth`,block:`center`})}document.querySelector(`#search`).addEventListener(`input`,e=>o(e.target.value)),document.querySelectorAll(`.level-link`).forEach(e=>e.addEventListener(`click`,()=>{n=e.dataset.level,document.querySelectorAll(`.level-link`).forEach(t=>t.classList.toggle(`selected`,t===e)),o(document.querySelector(`#search`).value)})),document.querySelector(`#copy-code`).addEventListener(`click`,async e=>{await navigator.clipboard.writeText(r.code),e.target.textContent=`Copied`,window.setTimeout(()=>{e.target.textContent=`Copy code`},1400)}),document.querySelector(`#theme-toggle`).addEventListener(`click`,()=>document.body.classList.toggle(`dark`)),window.matchMedia(`(prefers-reduced-motion: reduce)`).matches&&(document.documentElement.dataset.reduceMotion=`true`),s(r.name,!1);