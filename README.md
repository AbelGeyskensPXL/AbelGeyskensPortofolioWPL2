# Alex Janssens — Student Portfolio

A fully static personal portfolio built with plain HTML, CSS and JavaScript. No build step, no npm, no frameworks.

## Run locally
Just open `index.html` in any browser. In WebStorm: right-click `index.html` → **Open in Browser**.

## Project structure
```
portfolio/
├── index.html          Main portfolio page
├── wpl.html            Dedicated WPL1 & WPL2 deliverables page
├── css/styles.css      All styling
├── js/main.js          Navbar, mobile menu, scroll animations
├── images/             Profile + project screenshots + hero bg
├── downloads/          PDFs and ZIP files (replace placeholders with your own)
├── netlify.toml        Netlify config (publishes site root)
└── README.md
```

## Replace the placeholders
- Edit text directly in `index.html` and `wpl.html`.
- Drop your own images into `images/` keeping the same filenames.
- Drop your real PDFs/ZIP into `downloads/` keeping the same filenames listed in `wpl.html`.

## Deploy to Netlify
1. Drag the whole `portfolio/` folder into https://app.netlify.com/drop, **or**
2. Push it to a Git repo and connect it on Netlify — no build command needed (the included `netlify.toml` already sets publish to the root).

That's it.
