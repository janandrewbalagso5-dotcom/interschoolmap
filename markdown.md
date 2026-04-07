# OLPC Campus Navigator

**Our Lady of the Pillar College — San Manuel, Isabela**

A single-page, mobile-friendly campus navigation web app featuring an interactive floor map, GPS tracking, and augmented reality (AR) step-by-step navigation.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Campus & Building Data](#campus--building-data)
5. [GPS & Location System](#gps--location-system)
6. [Navigation & Routing](#navigation--routing)
7. [AR Navigation Mode](#ar-navigation-mode)
8. [UI Components](#ui-components)
9. [Search](#search)
10. [Configuration & Customization](#configuration--customization)
11. [Browser Compatibility](#browser-compatibility)
12. [Known Limitations](#known-limitations)

---

## Overview

OLPC Campus Navigator is a fully self-contained HTML/CSS/JavaScript application — no build tools, no server, no dependencies beyond Google Fonts. Drop the single `index.html` file anywhere and it works.

The app covers two buildings on the OLPC campus:

| Building        | Abbreviation | Floors           |
| --------------- | ------------ | ---------------- |
| New Building    | NB           | Ground, 2nd, 3rd |
| Basic Education | BE           | Ground, 2nd      |

---

## Features

- **Interactive campus map** — clickable rooms across all floors with zoom and pan
- **Floor switcher** — tab between Ground / 2nd / 3rd floors per building
- **Point-to-point routing** — tap your origin, tap your destination, get an animated path
- **Walk-time estimation** — calculated from real GPS bounds and campus dimensions
- **AR Navigation mode** — split-screen view: live camera feed with path overlay on top, live mini-map below
- **GPS tracking** — live user position dot on the map; falls back to IP geolocation
- **Device compass** — direction arrow updates from `DeviceOrientationEvent`
- **Step-by-step instructions** — corridor, staircase, and cross-building steps in sidebar
- **Room info popup** — hours, description, and tags for every room
- **Search** — fuzzy match on room name and tags with dropdown
- **Quick destinations** — one-tap shortcuts for Library, Registrar, Guidance, Dean's Office, Computer Lab, BE Principal
- **Recent routes** — last 3 routes saved to `localStorage`
- **Pinch-to-zoom** — touch gesture zoom and `Ctrl+Scroll` zoom on desktop

---

## Architecture

The app is a single HTML file with three logical layers:

```
index.html
├── CSS (inline <style>)
│   ├── Layout: topbar, sidebar, campus map, AR view
│   └── Components: building cards, rooms, popup, toast, legend
├── HTML
│   ├── Topbar (logo, search, GPS badge)
│   ├── AR View (camera section + map section)
│   ├── Campus scroll area → .campus div → building slots
│   ├── Sidebar (mode, quick dests, route panel, legend)
│   └── Popup overlay
└── JavaScript (inline <script>)
    ├── GPS bounds & coordinate conversion
    ├── Room data (DATA object)
    ├── Rendering (SVG room grids per floor)
    ├── Tap/routing logic
    ├── Path drawing (intra-floor SVG paths, cross-building connector)
    ├── Walk-time estimation
    ├── AR loop (camera canvas + map canvas)
    └── Search, recent routes, zoom, toast
```

### Key Global Variables

| Variable       | Type   | Purpose                                           |
| -------------- | ------ | ------------------------------------------------- |
| `CB`           | Object | GPS bounding box of the campus                    |
| `DATA`         | Object | All building and room definitions                 |
| `youId`        | String | Room ID of user's selected origin                 |
| `destId`       | String | Room ID of selected destination                   |
| `activeF`      | Object | Currently visible floor per building (`{be, nb}`) |
| `currentScale` | Number | Map zoom level (0.4 – 2.0)                        |
| `userGPS`      | Object | Live GPS coordinates, accuracy, heading           |
| `userPixel`    | Object | User's position in campus pixel coordinates       |
| `arSteps`      | Array  | Navigation steps for current route                |
| `arStepIdx`    | Number | Index of the current AR step                      |
| `arPathDots`   | Array  | Pixel waypoints for the AR mini-map path          |

---

## Campus & Building Data

### GPS Bounds (`CB`)

```js
var CB = {
  latMin: 17.025614,
  latMax: 17.026807,
  lngMin: 121.628662,
  lngMax: 121.630369,
  mapW: 1400, // campus SVG width in pixels
  mapH: 980, // campus SVG height in pixels
};
```

Real-world campus dimensions used for walk-time calculations:

```js
var CAMPUS_REAL_W_M = 140; // meters
var CAMPUS_REAL_H_M = 135; // meters
```

### Coordinate Conversion

```js
function gpsToPixel(lat, lng)
// Returns { x, y } in campus pixel coordinates

function isOnCampus(lat, lng)
// Returns true if position is within the GPS bounding box (with 50m buffer)

function gpsDistance(lat1, lng1, lat2, lng2)
// Haversine formula — returns distance in metres
```

### Room Definition Format

Every room is created with the `mk()` helper:

```js
mk(id, label, type, x, y, width, height, description, tags, icon);
```

| Field    | Type   | Description                                                                    |
| -------- | ------ | ------------------------------------------------------------------------------ |
| `id`     | String | Unique identifier, e.g. `nb-1-r101`                                            |
| `label`  | String | Display name; use `\n` for line breaks                                         |
| `type`   | String | One of: `classroom`, `lab`, `library`, `office`, `toilet`, `stair`, `corridor` |
| `x`, `y` | Number | Position within the building's SVG canvas (pixels)                             |
| `w`, `h` | Number | Width and height (pixels)                                                      |
| `desc`   | String | Long description shown in the popup                                            |
| `tags`   | Array  | Searchable keywords, e.g. `['College', 'Lab']`                                 |
| `icon`   | String | Emoji shown in popup and AR destination chip                                   |

### Room Types and Colors

| Type        | Fill        | Stroke       |
| ----------- | ----------- | ------------ |
| `classroom` | Blue-purple | Light purple |
| `lab`       | Green       | Teal-green   |
| `library`   | Blue        | Cyan         |
| `office`    | Purple      | Lavender     |
| `toilet`    | Teal        | Cyan         |
| `stair`     | Amber       | Gold         |
| `corridor`  | Dark grey   | Grey         |

### Building Layout

**New Building (NB)** — horizontal layout, SVG canvas 978 × 155 px per floor

Rooms are arranged left-to-right. A corridor runs along the bottom (y=122).

**Basic Education (BE)** — vertical layout, SVG canvas 210 × 720 px per floor

Rooms are stacked top-to-bottom. A side corridor runs along the right edge.

---

## GPS & Location System

### Startup Sequence

1. `startGPS()` is called on page load
2. `navigator.geolocation.getCurrentPosition()` gets an initial fix
3. `navigator.geolocation.watchPosition()` watches for updates
4. On error, `locateByIP()` calls `https://ipapi.co/json/` as a fallback
5. If IP lookup also fails, user position is defaulted to a fixed campus coordinate

### Live Updates

`onGPSUpdate(position)` fires on every GPS update and:

- Updates `userGPS` and `userPixel`
- Moves the user location marker on the campus map
- Updates the GPS badge in the topbar
- If AR is active, calls `updateARFromGPS()` which checks distance to destination and can auto-advance steps

### Compass

`startCompass()` listens to `DeviceOrientationEvent`. On iOS 13+, it requests permission via `DeviceOrientationEvent.requestPermission()`. The heading value updates `arDeviceHeading` which drives the AR compass ring direction arrow.

---

## Navigation & Routing

### Route Flow

```
User taps a room (Route mode)
  → First tap: set as origin (youId)
  → Second tap: set as destination (destId)
  → drawPath() is called
  → showSidebar() shows the route panel
```

### Path Drawing

`drawPath(fr, to)` handles three cases:

1. **Same building, same floor** — draws a simple L-shaped SVG path through the corridor
2. **Same building, different floor** — draws path to nearest staircase on origin floor, then from staircase on destination floor
3. **Different buildings** — draws paths to stairs on both ends plus a dashed cross-campus connector on the main campus SVG

Path elements injected per floor:

| Element            | Class      | Description                         |
| ------------------ | ---------- | ----------------------------------- |
| Glow path          | `rt-glow`  | Wide semi-transparent stroke        |
| Solid path         | `rt-path`  | Blue route line                     |
| Animated dashes    | `rt-anim`  | Cyan dashes flowing along the route |
| Origin marker      | inline SVG | Blue `▲` circle                     |
| Destination marker | inline SVG | Green `★` circle                    |

### Walk-Time Estimation

```js
function estimateWalkTime(fr, to)
```

1. Converts pixel positions to real-world metres using the campus scale constants
2. Calculates Euclidean distance between origin and destination centres
3. Divides by walking speed (1.2 m/s)
4. Adds 20 seconds per floor change (stair penalty)
5. Adds 20 seconds base penalty for cross-building routes

Returns a string like `"About 2 min walk · ~58m"`.

### Step Generation

`buildSteps(fr, to)` produces an array of step objects:

```js
{ icon: '🚶', text: 'Walk to the corridor', type: 'walk' }
```

Step types: `start`, `walk`, `stairs`, `arrive`

Steps are rendered in the sidebar and consumed by AR navigation.

---

## AR Navigation Mode

Launched by clicking **Launch AR Navigation** in the sidebar.

### Layout

The AR view splits the screen:

| Zone           | Height | Content                                     |
| -------------- | ------ | ------------------------------------------- |
| Camera section | 60%    | Live camera feed with animated path overlay |
| Map section    | 40%    | Live mini-map                               |

### Camera Overlay (`drawARCamOverlay`)

Draws on `<canvas id="arCanvas">` overlaid on the video element:

- **Path dots** — perspective-projected circles from bottom-center upward, animated with `arDotOff` offset
- Dot colour transitions from blue (near) to teal (far) using linear interpolation
- **Turn arrows** — `→` or `←` shown when the current step mentions "right" or "left"
- **Arrival star** — green `★` shown at the vanishing point on the last step

### Mini-Map (`drawARMapView`)

Draws on `<canvas id="arMapCanvas">` in the map section:

- Auto-scales and centres to fit the full route plus user position
- Draws building footprints (BE in indigo, NB in cyan)
- Draws the route as a dashed then solid polyline
- Draws a `▲` at the origin and `★` at the destination
- Animates a walking dot along the route using `arMapDotProgress`
- Shows the live GPS dot (green) when on campus

### Step Advancement

Steps are advanced automatically:

- **GPS-based**: if the user moves more than `STEP_ADV` (8m) from the last step position and GPS accuracy is under 30m
- **Arrival detection**: if GPS distance to destination drops below 8m, jumps to the final step

### Compass Ring States

| State             | Colour | When                  |
| ----------------- | ------ | --------------------- |
| Default (walking) | Blue   | Any walk step         |
| Stairs            | Amber  | Step type is `stairs` |
| Arrived           | Green  | Final step            |

### Closing AR

`closeAR()` stops all camera tracks, cancels the animation frame, and hides the AR view.

---

## UI Components

### Topbar

- **Logo** — icon, app name, campus subtitle
- **Search input** — live dropdown search
- **GPS badge** — shows location status; click to re-center map

### Sidebar

Two panels toggled by `showSidebar()` / `hideSidebar()`:

**Default panel:**

- Mode buttons (Route / Info)
- Mode hint text
- Quick destination grid
- Recent routes list

**Route panel:**

- Origin and destination with floor labels
- Walk-time estimate
- Step list (active step highlighted)
- Launch AR Navigation button
- Clear Route button

### Room Popup

Shown in Info mode or via the "Info" action. Contains:

- Room name, building, floor
- Operating hours
- Description
- Tag chips
- **I'm Here** — sets room as origin
- **Navigate Here** — sets room as destination and draws route

### Toast Notifications

`toast(message)` displays a bottom-centre notification that auto-hides after 3.5 seconds.

### Map Controls

| Control         | Action                     |
| --------------- | -------------------------- |
| `+`             | Zoom in (max 2×)           |
| `−`             | Zoom out (min 0.4×)        |
| `◎`             | Re-center on user location |
| Pinch gesture   | Smooth zoom on touch       |
| `Ctrl + Scroll` | Zoom on desktop            |

---

## Search

The search input filters all rooms across all buildings and floors in real time.

Matching criteria:

- Room label (case-insensitive substring match)
- Any tag in the room's `tags` array

Results show up to 8 matches with building badge (BE / NB) and floor label. Tapping a result calls `tapRoom()` as if the user had tapped the room directly on the map.

---

## Configuration & Customization

### Adding a Room

Add a new `mk(...)` entry to the appropriate floor's `rooms` array in `DATA`. The room will automatically appear in search results, the campus map, and be routable.

### Adding a Building

1. Add a new key to `DATA` with `name`, `cardLeft`, `cardTop`, `svgW`, `svgH`, and `floors`
2. Assign a new floor abbreviation in `activeF`
3. Add a colour class or extend `RC` if a new room type is needed
4. Handle cross-building path drawing in `drawXPath()` if needed

### Adjusting GPS Bounds

Update `CB.latMin`, `CB.latMax`, `CB.lngMin`, `CB.lngMax` to match the real GPS corners of the campus. Update `CAMPUS_REAL_W_M` and `CAMPUS_REAL_H_M` to keep walk-time estimates accurate.

### Changing Walk Speed

```js
var walkSpd = 1.2; // m/s — inside estimateWalkTime()
```

### Stair Time Penalty

```js
secs += floorDiff * 20; // seconds per floor — inside estimateWalkTime()
```

### GPS Auto-Step Distance

```js
var STEP_ADV = 8; // metres — minimum movement to auto-advance a step
```

---

## Browser Compatibility

| Feature               | Requirement                                                       |
| --------------------- | ----------------------------------------------------------------- |
| GPS tracking          | `navigator.geolocation` (all modern browsers)                     |
| Camera / AR mode      | `navigator.mediaDevices.getUserMedia` + HTTPS                     |
| Device compass        | `DeviceOrientationEvent` (iOS requires HTTPS + permission prompt) |
| Pinch zoom            | Touch events (mobile browsers)                                    |
| Recent routes         | `localStorage`                                                    |
| `roundRect` on Canvas | Chrome 99+, Firefox 112+, Safari 15.4+ (falls back to `rect`)     |

The app works on HTTP for all features except camera access and iOS compass, which require HTTPS.

---

## Known Limitations

- **Route paths are simplified** — paths follow a fixed L-shape through corridors rather than a true graph-based shortest path. Complex multi-floor, multi-building routes may produce visually approximate paths.
- **AR is visual guidance only** — the camera overlay shows animated dots and direction arrows, not true AR anchoring to real-world geometry. It does not use ARKit, ARCore, or WebXR.
- **GPS indoors** — satellite GPS accuracy degrades significantly inside buildings. The app uses the room-tap system as a reliable fallback for setting origin indoors.
- **Compass accuracy** — `DeviceOrientationEvent` heading quality varies by device. Magnetic interference indoors can cause drift.
- **Single file** — all data is hardcoded. Adding rooms or updating hours requires editing the HTML file directly; there is no CMS or admin panel.
- **No accessibility support** — the campus map is SVG-based and not screen-reader navigable.
