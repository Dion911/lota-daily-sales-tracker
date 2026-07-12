# Lota Sales Tracker

Daily sales tracker PWA for **Lota Kopi** café. Runs entirely in the browser — no server, no database, no accounts. All data stays on your device.

**Live app:** https://dion911.github.io/lota-daily-sales-tracker/

---

## Features

- **Quick Entry** — tap item quantities, add a note, save in seconds
- **Scan notebook page** — snap a handwritten sales page with iOS Live Text; parses the cash-ledger format (item + amount) into an entry, off-menu items included
- **★ Faves** — auto-sorted top sellers for faster entry
- **Search** — find any menu item instantly
- **Repeat last sale** — one tap to reload the previous order
- **Sold-out toggle** — mark items unavailable for the day
- **Summary tab** — today's breakdown, share day summary, field note journal
- **Field Note of the Day** — write daily observations about the café
- **History tab** — 7-day bar chart, week-on-week comparison, category breakdown, per-entry delete
- **Daily target** — set a revenue goal and track progress in the header
- **Export / Import CSV** — back up and restore your sales data
- **Dark mode** — warm mahogany theme, toggle in header
- **PIN login** — 4-digit PIN on the splash screen
- **Offline-ready** — service worker caches the app after first load

---

## Install on iPhone

1. Open the link above in **Safari**
2. Tap **Share** → **Add to Home Screen**
3. Tap **Add**

Opens as a full-screen app — no browser chrome, works offline.

---

## Tech stack

| | |
|---|---|
| UI | React 18 + Babel standalone (in-browser JSX, no build step) |
| Styles | Tailwind CSS + custom CSS variables |
| Libraries | Vendored locally in `vendor/` — no runtime CDN, fully offline |
| Storage | `localStorage` (on-device, no backend) |
| Hosting | GitHub Pages |
| PWA | Web App Manifest + Service Worker (cache-first for assets, network-first for HTML) |

---

## Local development

```bash
node server.js
# → http://localhost:3400
```

Requires Node.js. Edit `index.html` and refresh — no build step needed.

---

## Updating the live app

1. Edit `index.html` locally
2. Upload to this GitHub repo (drag & drop on the repo page)
3. GitHub Pages deploys automatically in ~60 seconds
4. If you also changed `sw.js`, bump the cache version number so devices get the fresh files

---

*Built for Lota Kopi · Cebu, Philippines*
