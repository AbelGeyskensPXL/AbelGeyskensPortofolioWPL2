(async function () {
    const root = document.getElementById('root');
    const nav = document.getElementById('nav');
    const footer = document.getElementById('footer');

    const page = window.PAGE || 'index';

    let data;

    try {
        const res = await fetch('./data.json');
        data = await res.json();
    } catch (err) {
        root.innerHTML = `<p style="padding:2rem;color:red">
      Failed to load data.json. Make sure you're running via a server (or Netlify is configured correctly).
    </p>`;
        return;
    }

    // NAV
    if (nav) {
        nav.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="index.html">
          ${data.site.brand.replace('.', '<span>.</span>')}
        </a>
        <nav class="nav-links">
          ${data.site.nav.map(l => `
            <a href="${l.href}" class="${isActive(l.href, page) ? 'active' : ''}">
              ${l.label}
            </a>
          `).join('')}
        </nav>
      </div>
    `;
    }

    // FOOTER
    if (footer) {
        footer.innerHTML = `
      <div class="footer-inner">
        <p>© ${new Date().getFullYear()} — ${data.site.footer.copyright}</p>
        <p class="built">${data.site.footer.tagline}</p>
      </div>
    `;
    }

    // ROUTING
    if (page === 'index') renderHome();
    if (page === 'wpl2') renderWPL2();
    if (page === 'wpl') renderDownloads();

    function isActive(href, page) {
        return (
            (page === 'index' && href === 'index.html') ||
            (page === 'wpl2' && href === 'wpl2.html') ||
            (page === 'wpl' && href === 'wpl.html')
        );
    }

    function renderHome() {
        root.innerHTML = `
      <div class="container">
        <section class="hero">
          <div>
            <p class="eyebrow">${data.about.eyebrow}</p>
            <h1>${data.about.headline}</h1>
            <p class="lead">${data.about.bio}</p>
            <div class="tags">
              ${data.about.skills.map(s => `<span class="tag">${s}</span>`).join('')}
            </div>
          </div>

          <div class="portrait-wrap">
            <img src="${data.about.portrait}" class="portrait" alt="Portrait">
          </div>
        </section>

        <section class="section">
          <p class="eyebrow">Projects</p>
          <h2>Selected work</h2>

          <div class="projects">
            ${data.projects.map(p => `
              <article class="project">
                <div class="project-img">
                  <img src="${p.img}" alt="${p.title}">
                </div>
                <h3>${p.title}</h3>
                <p class="muted">${p.blurb}</p>
                <div class="tech">
                  ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="section">
          <p class="eyebrow">Contact</p>
          <h2>Let’s talk</h2>

          <div class="contact-grid">
            ${data.contact.map(c => `
              <a class="contact-card" href="${c.href}" target="_blank">
                <div>
                  <p class="lbl">${c.label}</p>
                  <p class="val">${c.value}</p>
                </div>
              </a>
            `).join('')}
          </div>
        </section>
      </div>
    `;
    }

    function renderWPL2() {
        const w = data.wpl2;

        root.innerHTML = `
      <div class="article">
        <p class="eyebrow">${w.eyebrow}</p>
        <h1>${w.title}</h1>
        <p class="meta">${w.meta}</p>

        ${w.sections.map(s => `
          <section>
            <h2>${s.title}</h2>
            ${(s.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
            ${s.list ? `<ul>${s.list.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
            ${s.deliverables ? `
              <h3>Deliverables</h3>
              <ul>${s.deliverables.map(i => `<li>${i}</li>`).join('')}</ul>
            ` : ''}
          </section>
        `).join('')}
      </div>
    `;
    }

    function renderDownloads() {
        root.innerHTML = `
      <div class="article">
        <p class="eyebrow">Downloads</p>
        <h1>WPL Archive</h1>

        <div class="dl-group">
          <h2>WPL2</h2>
          <div class="dl-list">
            ${data.downloads.wpl2.map(item => dl(item)).join('')}
          </div>
        </div>

        <div class="dl-group">
          <h2>WPL1</h2>
          <div class="dl-list">
            ${data.downloads.wpl1.map(item => dl(item)).join('')}
          </div>
        </div>
      </div>
    `;
    }

    function dl(i) {
        return `
      <a class="dl-row" href="${i.href}" download>
        <div class="left">
          <span class="badge">${i.kind}</span>
          <div>
            <p class="ttl">${i.title}</p>
            <p class="meta">${i.meta}</p>
          </div>
        </div>
        <div class="right">Download ↓</div>
      </a>
    `;
    }

})();