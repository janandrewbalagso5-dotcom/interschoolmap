# AR Campus Map

An interactive, AR-assisted campus navigation web app for OLPC (Our Lady of Perpetual Help College). It overlays interactive floor plans of campus buildings directly on a live map and provides turn-by-turn walking directions with an optional augmented-reality camera view.

---

## Features

- 🗺️ **Live Map** — OpenStreetMap tiles with GPS-anchored building overlays
- 🏢 **Multi-building support** — New Building (NB) & Basic Education (BE)
- 🏠 **Multi-floor plans** — Ground, 2nd, and 3rd floors per building
- 📍 **GPS Positioning** — Auto-detects user location on campus
- 🔍 **Room Search** — Search by room name or tag (e.g. "library", "Grade 1")
- 🧭 **Turn-by-turn routing** — Step-by-step indoor walking directions
- 📱 **AR Navigation** — Camera overlay with path dots and compass heading
- ⭐ **Quick Destinations** — One-tap shortcuts to common locations
- 🕐 **Recent Routes** — Remembers your last 3 routes

---

## Project Structure

```
ARCAMPUSMAP/
├── index.html      # Main HTML shell & UI layout
├── script.js       # All app logic (map, rooms, GPS, AR, routing)
├── style.css       # All styles
├── data.js         # (supplemental data, if any)
├── manifest.json   # PWA manifest
├── sw.js           # Service worker (offline support)
└── styles/         # Additional stylesheets
```

---

## Buildings & Floors

| Building | Floors | Notes |
|----------|--------|-------|
| New Building (NB) | Ground, 2nd, 3rd | Offices, classrooms, library, labs |
| Basic Education (BE) | Ground, 2nd | K-12 classrooms, SHS, science & computer labs |

---

## How to Run

This is a plain HTML/CSS/JS app — no build step required.

1. Open `index.html` in any modern browser, **or**
2. Serve locally (recommended for GPS/camera features):
   ```bash
   npx serve .
   # then open http://localhost:3000
   ```
3. For AR features, use **HTTPS** or `localhost` (browser security requirement).

---

## GPS & AR Notes

- GPS tracking requires browser **location permission**
- AR camera requires browser **camera permission**
- Best experienced on a mobile device with GPS and camera
- If GPS is unavailable, tap any room on the map to manually set your location

---

## Tech Stack

- **Leaflet.js** — Map rendering and tile layers
- **OpenStreetMap** — Map tiles
- **Vanilla JS / HTML / CSS** — No framework dependencies
- **Canvas API** — AR overlay drawing
- **PWA** — Installable via manifest + service worker

---

## License

For internal/educational use at OLPC campus.
