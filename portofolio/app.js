// Loads data.json and hydrates the page. Each page reads window.PAGE.
(async function () {
  const res = await fetch('data.json');
  const data = await res.json();
  const page = window.PAGE || 'index';

  // Nav + footer (shared)
  const nav = document.getElementById('nav');
  if (nav) {
    nav.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="index.html">${data.site.brand.replace('.', '<span>.</span>')}</a>
        <nav class="nav-links">
          ${data.site.nav.map(l => `<a href="${l.href}" class="${matchActive(l.href, page) ? 'active' : ''}">${l.label}</a>`).join('')}
        </nav>
      </div>`;
  }
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <p>© ${new Date().getFullYear()} — ${data.site.footer.copyright}</p>
        <p class="built">${data.site.footer.tagline}</p>
      </div>`;
  }

  if (page === 'index') renderHome(data);
  if (page === 'wpl2') renderWPL2(data);
  if (page === 'wpl') renderDownloads(data);

  function matchActive(href, page) {
    if (page === 'index' && href === 'index.html') return true;
    if (page === 'wpl2' && href === 'wpl2.html') return true;
    if (page === 'wpl' && href === 'wpl.html') return true;
    return false;
  }

  function renderHome(d) {
    const root = document.getElementById('root');
    root.innerHTML = `
      <div class="container">
        <section class="hero">
          <div>
            <p class="eyebrow">${d.about.eyebrow}</p>
            <h1>Student at <span class="accent">PXL</span> — building sharp digital things.</h1>
            <p class="lead">${d.about.bio}</p>
            <div class="tags">${d.about.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
          </div>
          <div class="portrait-wrap">
            <img class="portrait" src="${d.about.portrait}" alt="Portrait" width="800" height="800">
          </div>
        </section>

        <section class="section" id="projects">
          <div class="section-head">
            <div>
              <p class="eyebrow">Projects</p>
              <h2>Selected work</h2>
            </div>
            <p class="muted" style="max-width:24rem">A mix of personal experiments and assignments from PXL.</p>
          </div>
          <div class="projects">
            ${d.projects.map((p, i) => `
              <article class="project ${i === 0 ? 'wide' : ''}">
                <div class="project-img"><img src="${p.img}" alt="${p.title}" loading="lazy" width="1280" height="800"></div>
                <div>
                  <h3>${p.title}</h3>
                  <p class="muted">${p.blurb}</p>
                  <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
                </div>
              </article>`).join('')}
          </div>
        </section>

        <section class="free">
          <p class="eyebrow" style="color:color-mix(in oklab, var(--primary-foreground) 60%, transparent)">Vrije sectie</p>
          <h2 class="display" style="font-size:clamp(2.25rem,5vw,3rem)">Beyond the screen.</h2>
          <div class="free-grid">
            ${d.free.map(f => `<div><h3>${f.title}</h3><p>${f.body}</p></div>`).join('')}
          </div>
        </section>

        <section class="section" id="contact">
          <p class="eyebrow">Contact</p>
          <h2>Let's get in touch.</h2>
          <p class="muted" style="margin-top:1rem; max-width:36rem">For internships, collaborations, or a quick coffee chat — pick whichever is easiest.</p>
          <div class="contact-grid">
            ${d.contact.map(c => `
              <a class="contact-card" href="${c.href}" target="_blank" rel="noreferrer">
                <div style="display:flex;align-items:center;gap:1rem">
                  <span class="ico">●</span>
                  <div><p class="lbl">${c.label}</p><p class="val">${c.value}</p></div>
                </div>
                <span class="muted">↗</span>
              </a>`).join('')}
          </div>
          <div class="btn-row">
            <a class="btn btn-primary" href="portofolio/wpl2.html">Read the WPL2 case study</a>
            <a class="btn btn-outline" href="portofolio/wpl.html">WPL downloads</a>
          </div>
        </section>
      </div>`;
  }

  function renderWPL2(d) {
    const w = d.wpl2;
    document.getElementById('root').innerHTML = `
      <article class="article">
        <p class="eyebrow">${w.eyebrow}</p>
        <h1>${w.title}</h1>
        <p class="meta">${w.meta}</p>
        ${w.sections.map(s => `
          <section>
            <h2>${s.title}</h2>
            ${(s.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
            ${s.list ? `<ul>${s.list.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
            ${s.deliverables ? `<p><strong>Deliverables</strong></p><ul>${s.deliverables.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
          </section>`).join('')}
        <div style="margin-top:4rem;border-top:1px solid var(--border);padding-top:2rem">
          <a class="accent" href="portofolio/wpl.html">→ Looking for downloadable WPL1 & WPL2 deliverables? Go to the downloads page.</a>
        </div>
      </article>`;
  }

  function renderDownloads(d) {
    const row = (i) => `
      <a class="dl-row" href="${i.href}" download>
        <div class="left">
          <span class="badge">${i.kind}</span>
          <div><p class="ttl">${i.title}</p><p class="meta">${i.meta}</p></div>
        </div>
        <span class="right">Download ↓</span>
      </a>`;
    document.getElementById('root').innerHTML = `
      <div class="article">
        <p class="eyebrow">Academic archive</p>
        <h1>WPL1 & WPL2 — downloads.</h1>
        <p class="meta">A dedicated archive of my Work Placement deliverables. Reports, assignments, and reflections — kept separate from the rest of the portfolio so they're easy to evaluate.</p>
        <div class="dl-group">
          <h2>WPL2 — Work Placement 2</h2>
          <p class="sub">Internship deliverables and final reflection.</p>
          <div class="dl-list">${d.downloads.wpl2.map(row).join('')}</div>
        </div>
        <div class="dl-group">
          <h2>WPL1 — Work Placement 1</h2>
          <p class="sub">First-year assignments and supporting files.</p>
          <div class="dl-list">${d.downloads.wpl1.map(row).join('')}</div>
        </div>
      </div>`;
  }
})();
