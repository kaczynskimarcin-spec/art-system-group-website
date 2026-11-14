# ART SYSTEM GROUP — Company Website

A responsive website for a company delivering **CCTV, intrusion alarm, LAN and electrical installation services**. Built with HTML, CSS and vanilla JavaScript and prepared for deployment on cPanel.

**Live site:** [artsystem-group.pl](https://artsystem-group.pl/) · **Languages:** Polish · **Status:** source code on `main`

## The problem

The company needed a clear, mobile-friendly way to present its services, selected installations and contact details. The project also needed to be maintainable on existing hosting, with fast page loading, discoverable content and accessible navigation.

## What I built

- **Company website:** About, technical systems, selected projects, process, contact and a separate privacy page.
- **Responsive interface:** desktop and mobile layouts, mobile navigation with keyboard controls, visible focus states, skip link and support for reduced motion.
- **Performance work:** responsive WebP images, lazy loading below the fold, preloaded hero image, locally hosted Manrope fonts and versioned CSS/JS assets.
- **SEO foundations:** descriptive metadata, canonical URLs, Open Graph/Twitter previews, `LocalBusiness` JSON-LD, `robots.txt` and `sitemap.xml`.
- **Maintainable delivery:** a Git/cPanel deployment manifest that publishes site assets before HTML, plus an example of server hardening rules for separate review.

No frontend framework, build step, tracking SDK or external JavaScript library is required.

## Results from the local audit

The repository documents a before/after **Lighthouse 13.6.0** comparison, run locally on the same test setup on **13 November 2026**:

| Lighthouse metric | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | ---: | ---: | ---: | ---: |
| Performance | 75 | **95** | 75 | **99** |
| Accessibility | 95 | **100** | 95 | **100** |
| Transferred resources | 15.15 MB | **0.73 MB** | 15.15 MB | **1.00 MB** |
| Largest Contentful Paint | 37.17 s | **2.89 s** | 10.43 s | **0.97 s** |

These are **single laboratory measurements**, not production Core Web Vitals or proof of search rankings. SEO scored 100 both before and after the changes. Mobile LCP in this test remained above 2.5 s.

Additional documented local checks:
- **262 browser assertions** across responsive layouts and interactions in the initial optimization audit.
- **183 passing regression assertions, zero failures** after the later animation changes.
- HTML validation, JavaScript syntax checks and axe-core accessibility scans; zero automated axe violations in the reported scenarios. This **does not certify WCAG compliance**.

See [the audit and its limitations](AUDIT.md), [performance and accessibility results](audit/results.json) and [motion regression results](audit/motion-results.json).

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| UX and accessibility | Semantic HTML, keyboard navigation, reduced-motion support |
| Performance | WebP, responsive images, lazy loading, locally hosted WOFF2 |
| SEO | Metadata, canonical links, JSON-LD, sitemap and robots directives |
| Testing / review | Lighthouse, Chrome, axe-core, html-validate |
| Hosting | Git-based deployment with cPanel |

## Run locally

```bash
git clone https://github.com/kaczynskimarcin-spec/art-system-group-website.git
cd art-system-group-website
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). An HTTP server is recommended so relative URLs and navigation behave like a hosted site.

## Repository layout

```text
index.html                    Main website
privacy.html                  Privacy information
style.css                     Layout, typography and responsive styles
script.js                     Mobile navigation and reveal interactions
assets/                       Images, favicons and self-hosted fonts
robots.txt                    Search crawler directives
sitemap.xml                   Public URL sitemap
.cpanel.yml                   Deployment task manifest
AUDIT.md                      Audit, changes and limitations
audit/                        Recorded local test results
deployment/apache.htaccess.example   Optional server configuration example
```

## Deployment and outstanding checks

`.cpanel.yml` defines deployment tasks for the hosting environment, including the privacy page and search-engine files. **A merge to `main` is not, by itself, confirmation that the current public site has been deployed and verified.**

The sample `deployment/apache.htaccess.example` is **not deployed automatically**; redirects, security headers and HTTPS/HSTS settings require separate review on the actual hosting configuration. After release, recheck the live site, browser console, indexing and real-world performance.

---

Developed and maintained by [Marcin Kaczyński](https://github.com/kaczynskimarcin-spec).
