# ART SYSTEM GROUP — Website

**A responsive company website built and deployed for ART SYSTEM GROUP.**

A clean, dark-themed website presenting the company's technical services, completed projects and contact information. The site is built with standard web technologies and includes a cPanel deployment configuration.

**Live website:** [artsystem-group.pl](https://artsystem-group.pl/)

## Overview

The website is organized around the information potential clients need most:

- **About** — introduction to the company and its approach.
- **Systems** — CCTV, intrusion alarms, LAN infrastructure and electrical installations.
- **Projects** — selected completed installations and implementations.
- **Contact** — clear access to the company's contact details.
- **Privacy** — a dedicated privacy information page.

## Tech stack

| Area | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3, responsive layouts |
| Interactions | Vanilla JavaScript |
| Hosting / deployment | cPanel, Git deployment configuration |
| Additional files | Sitemap, favicon, privacy page |

No frontend framework or build tool is required.

## Key details

- Responsive layout designed for desktop and mobile.
- Mobile navigation and smooth in-page scrolling.
- Subtle reveal effects that respect reduced-motion preferences.
- Dedicated visual assets for services and project examples.
- A deployment recipe in `.cpanel.yml`.

## Run locally

Clone the repository:

```bash
git clone https://github.com/kaczynskimarcin-spec/art-system-group-website.git
cd art-system-group-website
```

Open `index.html` in a browser, or run a simple local server:

```bash
python -m http.server 8000
```

Visit **http://localhost:8000**.

## Project structure

```text
assets/        Images and favicon
index.html     Main website
privacy.html   Privacy information
style.css      Responsive styling
script.js      Navigation and interface behavior
sitemap.xml    Search engine sitemap
.cpanel.yml    Deployment tasks
```

## Deployment

The repository contains a `.cpanel.yml` script for copying the website assets into the hosting environment. Deployment paths and hosting credentials are environment-specific and should not be reused without review.

---

Designed and implemented by [Marcin Kaczyński](https://github.com/kaczynskimarcin-spec).
