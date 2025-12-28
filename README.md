# Ubunifu — Ubunifu Tech Solutions

Responsive marketing site for Ubunifu Tech Solutions (product engineering, cloud, design).

## Overview

This repository contains a small static site for Ubunifu Tech Solutions built with plain HTML, CSS and a little JavaScript.

- `Frontend/index.html` — homepage (professional layout)
- `Frontend/about.html` — about page
- `Frontend/projects.html` — projects/case studies
- `Frontend/team.html` — team page (profile cards)
- `Frontend/contact.html` — contact form (static)
- `Frontend/css/styles.css` — shared stylesheet
- `Frontend/js/main.js` — shared script (loads navbar partial & scroll reveal)
- `Frontend/includes/navbar.html` — shared header partial
- `Frontend/assets/` — placeholder images and logos (add your assets here)

## Local preview
Open `Frontend/index.html` in your browser to preview the site locally:

```powershell
# from repository root
start Frontend\index.html
```

## Notes
- The contact form is static and does not submit by default; wire to a backend or form service to collect messages.
- To update the shared navbar, edit `Frontend/includes/navbar.html`.

## License
Add a license if needed.