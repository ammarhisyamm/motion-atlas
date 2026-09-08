import './style.css';

const resources = [
  {
    name: 'CSS Transitions',
    level: 'Basic',
    type: 'Playground',
    description: 'Start with hover, timing, transforms, and a small amount of polish.',
    tags: ['CSS', 'Core'],
    code: `.chip {\n  transition: transform 240ms cubic-bezier(.2,.8,.2,1);\n}\n\n.chip:hover {\n  transform: translateY(-4px) scale(1.02);\n}`,
  },
  {
    name: 'Keyframe Loop',
    level: 'Basic',
    type: 'Playground',
    description: 'Build a small repeated motion and make it respect reduced motion.',
    tags: ['CSS', 'Loop'],
    code: `@media (prefers-reduced-motion: no-preference) {\n  .orb {\n    animation: float 1.6s ease-in-out infinite alternate;\n  }\n}\n\n@keyframes float { to { transform: translateY(-18px); } }`,
  },
  {
    name: 'GSAP',
    level: 'Intermediate',
    type: 'Library',
    description: 'Timeline-first JavaScript animation for richer choreography and scroll work.',
    tags: ['JavaScript', 'Timeline'],
    url: 'https://gsap.com/docs/v3/',
    code: `import { gsap } from 'gsap';\n\ngsap.timeline()\n  .from('.title', { y: 20, opacity: 0, duration: .45 })\n  .from('.item', { y: 12, opacity: 0, stagger: .08 }, '-=.2');`,
  },
  {
    name: 'Motion for React',
    level: 'Intermediate',
    type: 'Library',
    description: 'Declarative layout, gestures, and presence animation for React interfaces.',
    tags: ['React', 'Gesture'],
    url: 'https://motion.dev/docs/react',
    code: `import { motion } from 'motion/react';\n\nexport function SaveButton() {\n  return <motion.button\n    whileHover={{ y: -2 }}\n    whileTap={{ scale: .97 }}\n    transition={{ type: 'spring', stiffness: 500, damping: 30 }}\n  >Save</motion.button>;\n}`,
  },
  {
    name: 'LottieFiles',
    level: 'Intermediate',
    type: 'Tool',
    description: 'Create, preview, optimize, and ship vector animation files to the web.',
    tags: ['Lottie', 'Vector'],
    url: 'https://developers.lottiefiles.com/',
    code: `import { DotLottie } from '@lottiefiles/dotlottie-web';\n\nnew DotLottie({\n  canvas: document.querySelector('#animation'),\n  src: '/intro.lottie',\n  autoplay: true,\n  loop: true\n});`,
  },
  {
    name: 'Scroll-driven CSS',
    level: 'Intermediate',
    type: 'Technique',
    description: 'Link a visual response to scroll without adding a JavaScript listener.',
    tags: ['CSS', 'Scroll'],
    code: `.reveal {\n  animation: reveal linear both;\n  animation-timeline: view();\n  animation-range: entry 12% cover 34%;\n}\n\n@keyframes reveal {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: none; }\n}`,
  },
  {
    name: 'Theatre.js',
    level: 'Advanced',
    type: 'Tool',
    description: 'An animation sequencer that makes complex timeline values editable.',
    tags: ['Timeline', '3D'],
    url: 'https://www.theatrejs.com/docs/latest',
    code: `import studio from '@theatre/studio';\nimport { getProject } from '@theatre/core';\n\nstudio.initialize();\nconst project = getProject('Scene');\nconst sheet = project.sheet('Intro');\nsheet.sequence.play({ iterationCount: Infinity });`,
  },
  {
    name: 'Web Animations API',
    level: 'Advanced',
    type: 'Platform',
    description: 'Use browser-native keyframes when you need imperative control with no library.',
    tags: ['Browser API', 'Core'],
    code: `element.animate(\n  [\n    { opacity: 0, transform: 'translateY(12px)' },\n    { opacity: 1, transform: 'translateY(0)' }\n  ],\n  { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }\n);`,
  },
];

const sources = [
  ['fliptheweb/motion-ui-design', 'Curated principles, software, video, and articles.', 'https://github.com/fliptheweb/motion-ui-design'],
  ['sergey-pimenov/awesome-web-animation', 'A practical directory of web animation libraries.', 'https://github.com/sergey-pimenov/awesome-web-animation'],
  ['darelova/Awesome-Design-Resources-List', 'Broader design library with motion, 3D, and sound.', 'https://github.com/darelova/Awesome-Design-Resources-List'],
  ['LottieFiles/motion-design-skill', 'Motion principles and a way of thinking about timing.', 'https://github.com/LottieFiles/motion-design-skill'],
];

let activeLevel = 'All';
let activeResource = resources[0];

const app = document.querySelector('#app');
app.innerHTML = `
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
          ${sources.map(([name, text, url]) => `<a href="${url}" target="_blank" rel="noreferrer"><strong>${name}</strong><span>${text}</span><b>Open source</b></a>`).join('')}
        </div>
      </section>
    </main>
  </div>
`;

function resourceTemplate(resource) {
  const external = resource.url ? `<a class="row-action" href="${resource.url}" target="_blank" rel="noreferrer">Open docs</a>` : `<button class="row-action select-resource" data-name="${resource.name}">View code</button>`;
  return `<article class="resource-row ${activeResource.name === resource.name ? 'is-active' : ''}">
    <button class="resource-main select-resource" data-name="${resource.name}" aria-label="Select ${resource.name}">
      <span class="resource-initial">${resource.name.slice(0, 1)}</span>
      <span class="resource-name"><strong>${resource.name}</strong><small>${resource.type} · ${resource.level}</small></span>
      <span class="resource-description">${resource.description}</span>
      <span class="row-tags">${resource.tags.map(tag => `<i>${tag}</i>`).join('')}</span>
    </button>
    ${external}
  </article>`;
}

function renderResources(query = '') {
  const queryText = query.toLowerCase().trim();
  const list = resources.filter((item) => (activeLevel === 'All' || item.level === activeLevel) && (!queryText || `${item.name} ${item.type} ${item.level} ${item.tags.join(' ')}`.toLowerCase().includes(queryText)));
  document.querySelector('#resource-list').innerHTML = list.length ? list.map(resourceTemplate).join('') : `<div class="empty-state"><strong>Nothing matched that search.</strong><span>Try CSS, React, scroll, or timeline.</span></div>`;
  document.querySelector('#result-count').textContent = `${list.length} resource${list.length === 1 ? '' : 's'}`;
  document.querySelectorAll('.select-resource').forEach((button) => button.addEventListener('click', () => selectResource(button.dataset.name)));
}

function selectResource(name, shouldScroll = true) {
  activeResource = resources.find((item) => item.name === name) || resources[0];
  document.querySelector('#selected-name').textContent = activeResource.name;
  document.querySelector('#selected-description').textContent = activeResource.description;
  document.querySelector('#selected-tags').innerHTML = activeResource.tags.map((tag) => `<span>${tag}</span>`).join('');
  document.querySelector('#code-output').textContent = activeResource.code;
  renderResources(document.querySelector('#search').value);
  if (shouldScroll) document.querySelector('#playground').scrollIntoView({ behavior: document.documentElement.dataset.reduceMotion ? 'auto' : 'smooth', block: 'center' });
}

document.querySelector('#search').addEventListener('input', (event) => renderResources(event.target.value));
document.querySelectorAll('.level-link').forEach((button) => button.addEventListener('click', () => {
  activeLevel = button.dataset.level;
  document.querySelectorAll('.level-link').forEach((item) => item.classList.toggle('selected', item === button));
  renderResources(document.querySelector('#search').value);
}));

document.querySelector('#copy-code').addEventListener('click', async (event) => {
  await navigator.clipboard.writeText(activeResource.code);
  event.target.textContent = 'Copied';
  window.setTimeout(() => { event.target.textContent = 'Copy code'; }, 1400);
});

document.querySelector('#theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
if (media.matches) document.documentElement.dataset.reduceMotion = 'true';
selectResource(activeResource.name, false);
