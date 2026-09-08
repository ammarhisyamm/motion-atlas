import './style.css';
import source from './motion-ui-design.md?raw';

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
        <section class="catalog-toolbar section-block" id="catalog"><div><p class="overline">Complete resource index</p><h2>Browse the collection</h2></div><label class="search"><span>Search resources</span><input id="search" placeholder="Search name, type, topic..." type="search"></label></section>
        <div id="catalog-output"></div>
        <section class="section-block attribution"><p>Collection by Artur Kornakov and contributors. Original collection is marked CC0 in its repository.</p><a href="https://github.com/fliptheweb/motion-ui-design" target="_blank" rel="noreferrer">Open source repository ↗</a></section>
      </article>
    </main>
    <aside class="on-page"><p>On this page</p><a href="#introduction">Introduction</a><a href="#how-to-use">How to use</a><a href="#catalog">Resource index</a><div id="on-page-links"></div></aside>
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
