import './style.css';
import source from './motion-ui-design.md?raw';
import { animate, hover, stagger } from 'motion';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell">
    <header class="mobile-header"><a href="#introduction" class="logo">motion<span>atlas</span></a><button id="menu-toggle" aria-expanded="false">Menu</button></header>
    <aside class="sidebar" id="sidebar">
      <a href="#introduction" class="logo">motion<span>atlas</span></a>
      <div class="workspace-switch"><span class="workspace-dot"></span><span>Motion UI Design</span><kbd>v1.0</kbd></div>
      <nav class="docs-nav" aria-label="Documentation navigation">
        <p>Getting started</p>
        <a href="#introduction" class="active">Introduction</a>
        <a href="#how-to-use">How to use this library</a>
        <a href="#playground">Interactive playground</a>
        <p>Resource collection</p>
        <div id="section-nav"></div>
      </nav>
      <a class="source-link" href="https://github.com/fliptheweb/motion-ui-design" target="_blank" rel="noreferrer">View original repository <span>↗</span></a>
    </aside>
    <main class="content">
      <div class="utility-bar"><div class="breadcrumbs"><span>Resources</span><b>/</b><strong>Motion UI Design</strong></div><div class="utility-actions"><button id="copy-page">Copy page link</button><button id="theme-toggle">Theme</button></div></div>
      <article class="doc-page">
        <section id="introduction" class="intro section-block"><p class="overline">Resource collection</p><h1>Motion UI Design</h1><p class="lead">A local, searchable edition of the Motion UI Design collection for inspiration, tools, libraries, articles, and learning material.</p><div class="notice"><strong>Source note</strong><span>This site includes the complete curated list from the original repository. Entries remain linked to their original destinations.</span></div></section>
        <section id="how-to-use" class="section-block quickstart"><h2>How to use this library</h2><div class="steps"><div><span>1</span><p>Start with inspiration and articles to understand a motion pattern.</p></div><div><span>2</span><p>Choose a tool or library based on your output: prototype, CSS, JavaScript, or SVG.</p></div><div><span>3</span><p>Use helpers and performance references before placing animation in production.</p></div></div></section>
        <section class="motion-lab section-block" id="playground"><div class="lab-intro"><p class="overline">Interactive playground</p><h2>Learn it by running it.</h2><p>Small, production-oriented Motion examples. Change the values, run them, then copy the implementation.</p></div><div class="runtime-tabs" role="tablist"><button class="runtime-tab active" data-demo="spring" role="tab">Spring</button><button class="runtime-tab" data-demo="stagger" role="tab">Stagger</button><button class="runtime-tab" data-demo="hover" role="tab">Hover</button></div><div class="lab-grid"><section class="demo-stage"><div class="spring-demo demo-view"><div class="axis"><span></span></div><div id="spring-target" class="motion-square"></div></div><div class="stagger-demo demo-view" hidden><div class="stagger-item"></div><div class="stagger-item"></div><div class="stagger-item"></div><div class="stagger-item"></div></div><div class="hover-demo demo-view" hidden><button id="hover-target" class="hover-button">Move your pointer</button></div><div class="demo-actions"><button id="run-demo" class="primary-button">Run animation</button><span id="demo-status">Spring · responsive motion</span></div></section><section class="play-controls"><div class="control-heading"><h3 id="control-title">Spring settings</h3><button id="copy-demo">Copy code</button></div><div id="spring-controls" class="control-set"><label>Stiffness <output id="stiffness-output">280</output><input id="stiffness" type="range" min="80" max="600" value="280"></label><label>Damping <output id="damping-output">22</output><input id="damping" type="range" min="8" max="50" value="22"></label></div><div id="stagger-controls" class="control-set" hidden><label>Delay between items <output id="delay-output">0.10s</output><input id="delay" type="range" min="5" max="30" value="10"></label></div><div id="hover-controls" class="control-set" hidden><p>This sample uses Motion's pointer-aware hover gesture. It will not trigger from a tap-only device.</p></div><pre><code id="demo-code"></code></pre></section></div></section>
        <section class="catalog-toolbar section-block" id="catalog"><div><p class="overline">Complete resource index</p><h2>Browse the collection</h2></div><label class="search"><span>Search resources</span><input id="search" placeholder="Search name, type, topic..." type="search"></label></section>
        <div id="catalog-output"></div>
        <section class="section-block attribution"><p>Collection by Artur Kornakov and contributors. Original collection is marked CC0 in its repository.</p><a href="https://github.com/fliptheweb/motion-ui-design" target="_blank" rel="noreferrer">Open source repository ↗</a></section>
      </article>
    </main>
    <aside class="on-page"><p>On this page</p><a href="#introduction">Introduction</a><a href="#how-to-use">How to use</a><a href="#playground">Playground</a><a href="#catalog">Resource index</a><div id="on-page-links"></div></aside>
  </div>`;

function escapeHtml(value) { return value.replace(/[&<>]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]); }
function linkify(value) { return escapeHtml(value).replace(/!\[([^\]]*)\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+[^)]*)?\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1 <span aria-hidden="true">↗</span></a>').replace(/—|–/g, '-'); }
function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function parseCatalog(markdown) {
  const sections = []; let current; let subsection;
  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('## ') && !line.startsWith('## Contents') && !line.startsWith('## How to Share') && !line.startsWith('## License')) { current = { title: line.slice(3), slug: slug(line.slice(3)), intro: '', groups: [] }; sections.push(current); subsection = null; continue; }
    if (!current || !line || line.startsWith('# ') || line.startsWith('## ')) continue;
    if (line.startsWith('### ')) { subsection = { title: line.slice(4), items: [] }; current.groups.push(subsection); continue; }
    if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('\t* ')) { if (!subsection) { subsection = { title: 'Resources', items: [] }; current.groups.push(subsection); } subsection.items.push(line.replace(/^[*\-]\s+/, '').replace(/^\*\s+/, '')); continue; }
    if (!current.intro && !line.startsWith('[')) current.intro = line.replace(/—|–/g, '-');
  }
  return sections;
}
const sections = parseCatalog(source);
document.querySelector('#section-nav').innerHTML = sections.map((section) => `<a href="#${section.slug}">${section.title}</a>`).join('');
document.querySelector('#on-page-links').innerHTML = sections.map((section) => `<a href="#${section.slug}">${section.title}</a>`).join('');
function renderCatalog(query = '') {
  const term = query.toLowerCase().trim();
  const output = sections.map((section) => {
    const groups = section.groups.map((group) => { const items = group.items.filter((item) => `${section.title} ${group.title} ${item}`.toLowerCase().includes(term)); if (!items.length) return ''; return `<div class="resource-group"><h3>${linkify(group.title)}</h3><ul>${items.map((item) => `<li>${linkify(item)}</li>`).join('')}</ul></div>`; }).filter(Boolean).join('');
    if (!groups) return ''; return `<section class="section-block catalog-section" id="${section.slug}"><div class="section-title"><p class="overline">Collection</p><h2>${linkify(section.title)}</h2>${section.intro ? `<p>${linkify(section.intro)}</p>` : ''}</div>${groups}</section>`;
  }).filter(Boolean).join('');
  document.querySelector('#catalog-output').innerHTML = output || `<div class="empty-state"><strong>No resource found.</strong><span>Try a broader search term.</span></div>`;
}
renderCatalog();
document.querySelector('#search').addEventListener('input', (event) => renderCatalog(event.target.value));
document.querySelector('#theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
document.querySelector('#menu-toggle').addEventListener('click', (event) => { const open = document.body.classList.toggle('menu-open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
document.querySelector('#copy-page').addEventListener('click', async (event) => { await navigator.clipboard.writeText(location.href); event.currentTarget.textContent = 'Copied'; setTimeout(() => { event.currentTarget.textContent = 'Copy page link'; }, 1400); });

const demoCode = {
  spring: `import { animate } from 'motion';\n\nanimate('#card', { x: 190, rotate: 12 }, {\n  type: 'spring',\n  stiffness: 280,\n  damping: 22\n});`,
  stagger: `import { animate, stagger } from 'motion';\n\nanimate('.item', { opacity: [0, 1], y: [18, 0] }, {\n  delay: stagger(0.1),\n  duration: 0.36\n});`,
  hover: `import { hover, animate } from 'motion';\n\nhover('#button', () => {\n  animate('#button', { y: -4, scale: 1.03 });\n  return () => animate('#button', { y: 0, scale: 1 });\n});`,
};
let activeDemo = 'spring';
let activeAnimations = [];
const demoStatus = document.querySelector('#demo-status');
const codeOutput = document.querySelector('#demo-code');
const runButton = document.querySelector('#run-demo');
function stopAnimations() { activeAnimations.forEach((animation) => animation.cancel?.()); activeAnimations = []; }
function runSpring() {
  stopAnimations();
  const box = document.querySelector('#spring-target');
  box.style.transform = '';
  const stiffness = Number(document.querySelector('#stiffness').value);
  const damping = Number(document.querySelector('#damping').value);
  activeAnimations.push(animate(box, { x: 178, rotate: 12 }, { type: 'spring', stiffness, damping }));
  demoStatus.textContent = `Spring · stiffness ${stiffness}, damping ${damping}`;
}
function runStagger() {
  stopAnimations();
  const items = document.querySelectorAll('.stagger-item');
  const delay = Number(document.querySelector('#delay').value) / 100;
  items.forEach((item) => { item.style.opacity = '0'; item.style.transform = 'translateY(18px)'; });
  activeAnimations.push(animate(items, { opacity: [0, 1], y: [18, 0] }, { delay: stagger(delay), duration: 0.36, ease: 'easeOut' }));
  demoStatus.textContent = `Stagger · ${delay.toFixed(2)}s between items`;
}
function runHover() { demoStatus.textContent = 'Hover · point at the button to run it'; }
function runActiveDemo() { if (activeDemo === 'spring') runSpring(); if (activeDemo === 'stagger') runStagger(); if (activeDemo === 'hover') runHover(); }
function selectDemo(name) {
  activeDemo = name;
  document.querySelectorAll('.runtime-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.demo === name));
  document.querySelectorAll('.demo-view').forEach((view) => { view.hidden = !view.classList.contains(`${name}-demo`); });
  document.querySelector('#spring-controls').hidden = name !== 'spring';
  document.querySelector('#stagger-controls').hidden = name !== 'stagger';
  document.querySelector('#hover-controls').hidden = name !== 'hover';
  document.querySelector('#control-title').textContent = `${name[0].toUpperCase()}${name.slice(1)} settings`;
  codeOutput.textContent = demoCode[name];
  runButton.textContent = name === 'hover' ? 'Show instruction' : 'Run animation';
  runActiveDemo();
}
document.querySelectorAll('.runtime-tab').forEach((tab) => tab.addEventListener('click', () => selectDemo(tab.dataset.demo)));
runButton.addEventListener('click', runActiveDemo);
document.querySelector('#copy-demo').addEventListener('click', async (event) => { await navigator.clipboard.writeText(demoCode[activeDemo]); event.currentTarget.textContent = 'Copied'; setTimeout(() => { event.currentTarget.textContent = 'Copy code'; }, 1400); });
document.querySelector('#stiffness').addEventListener('input', (event) => { document.querySelector('#stiffness-output').textContent = event.target.value; });
document.querySelector('#damping').addEventListener('input', (event) => { document.querySelector('#damping-output').textContent = event.target.value; });
document.querySelector('#delay').addEventListener('input', (event) => { document.querySelector('#delay-output').textContent = `${(Number(event.target.value) / 100).toFixed(2)}s`; });
hover('#hover-target', (element) => { const enter = animate(element, { y: -4, scale: 1.03 }, { type: 'spring', stiffness: 420, damping: 22 }); return () => { enter.cancel(); animate(element, { y: 0, scale: 1 }, { type: 'spring', stiffness: 420, damping: 25 }); }; });
selectDemo('spring');
