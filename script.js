// GPS POLYGON ANCHORS â€” exact roof corners from Google Maps
var GPS = {
  nb: [
    [17.026607, 121.628844], // A â€” top-left
    [17.026795, 121.629841], // B â€” top-right
    [17.026664, 121.629867], // C â€” bottom-right
    [17.026475, 121.628870]  // D â€” bottom-left
  ],
  be: [
    [17.026542, 121.628652], // E â€” top-left
    [17.026564, 121.628830], // F â€” top-right (widened, below NB boundary)
    [17.025724, 121.629000], // G â€” bottom-right (widened, south of NB)
    [17.025708, 121.628811]  // H â€” bottom-left
  ]
};

// Campus center & bounds derived from GPS pins
var CAMPUS_CENTER = [17.026250, 121.629200];
var CAMPUS_BOUNDS = [
  [17.025600, 121.628600],
  [17.026900, 121.630000]
];

// ROOM DATA â€” pixel coords within each building's SVG canvas
var NB_SVG_W = 978, NB_SVG_H = 155;
var BE_SVG_W = 480, BE_SVG_H = 720;

var FL = { ground: 'Ground Floor', second: '2nd Floor', third: '3rd Floor' };
var HOURS = {
  office: 'Mon-Fri  7:30 AM - 5:00 PM',
  library: 'Mon-Sat  7:00 AM - 6:00 PM',
  lab: 'Mon-Fri  7:00 AM - 5:00 PM',
  classroom: 'Varies by schedule',
  toilet: 'Always Open',
  stair: 'Always Open',
  default: 'Mon-Fri  7:00 AM - 5:00 PM'
};

function mk(id, lb, tp, x, y, w, h, desc, tags, icon) {
  return { id, label: lb, type: tp, x, y, w, h, desc: desc || '', tags: tags || [], icon: icon || '🚪' };
}

var DATA = {
  nb: {
    name: 'New Building', svgW: NB_SVG_W, svgH: NB_SVG_H,
    floors: {
      ground: {
        label: 'Ground Floor', rooms: [
          mk('nb-1-stl', 'STAIR', 'stair', 0, 0, 36, 120, 'Main staircase.', ['Accessible']),
          mk('nb-1-r101', 'Room 101', 'classroom', 38, 0, 70, 120, 'College classroom.', ['College']),
          mk('nb-1-r102', 'Room 102', 'classroom', 110, 0, 70, 120, 'College classroom.', ['College']),
          mk('nb-1-r103', 'TES Office', 'office', 182, 0, 70, 120, 'TES Office.', ['Office']),
          mk('nb-1-tres', 'TREASURER', 'office', 254, 0, 70, 120, "Treasurer's Office.", ['Admin', 'Office']),
          mk('nb-1-reg', 'REGISTRAR', 'office', 326, 0, 72, 120, 'Registrar Office.', ['Admin', 'Office']),
          mk('nb-1-guid', 'GUIDANCE', 'office', 400, 0, 72, 120, 'Guidance & Counseling.', ['Admin', 'Office']),
          mk('nb-1-dean', "DEAN'S OFFICE", 'office', 474, 0, 72, 120, "Dean's Office.", ['Admin', 'Office']),
          mk('nb-1-fac', 'FACULTY ROOM', 'office', 548, 0, 70, 120, 'Faculty Room.', ['Faculty', 'Staff']),
          mk('nb-1-r108', 'Room 108', 'classroom', 620, 0, 70, 120, 'College classroom.', ['College']),
          mk('nb-1-r109', 'Room 109', 'classroom', 692, 0, 70, 120, 'College classroom.', ['College']),
          mk('nb-1-r110', 'Room 110', 'classroom', 764, 0, 62, 120, 'College classroom.', ['College']),
          mk('nb-1-r111', 'Room 111', 'classroom', 828, 0, 52, 120, 'College classroom.', ['College']),
          mk('nb-1-r112', 'Room 112', 'classroom', 881, 0, 52, 120, 'College classroom.', ['College']),
          mk('nb-1-stl2', 'STAIR', 'stair', 933, 0, 38, 120, 'Secondary staircase.', ['Accessible']),
          mk('nb-1-corr', 'CORRIDOR', 'corridor', 38, 122, 938, 28),
        ]
      },
      second: {
        label: '2nd Floor', rooms: [
          mk('nb-2-stl', 'STAIR', 'stair', 0, 0, 36, 120, 'Main staircase.', ['Accessible']),
          mk('nb-2-lib1', 'Library', 'library', 38, 0, 118, 120, 'Library - reading.', ['Library', 'Reading']),
          mk('nb-2-lib2', 'Library', 'library', 158, 0, 74, 120, 'Library - digital.', ['Library', 'Digital']),
          mk('nb-2-lib3', 'Library', 'library', 234, 0, 74, 120, 'Library - references.', ['Library', 'Digital']),
          mk('nb-2-r205', 'Room 205', 'classroom', 310, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-r206', 'Room 206', 'classroom', 386, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-comp', 'Comp Lab', 'lab', 462, 0, 74, 120, 'Computer lab.', ['Computer', 'Lab']),
          mk('nb-2-r208', 'Room 208', 'classroom', 538, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-r209', 'Room 209', 'classroom', 614, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-r210', 'Room 210', 'classroom', 690, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-crime', 'Crime Lab', 'lab', 766, 0, 74, 120, 'Criminology lab.', ['Criminology', 'Lab']),
          mk('nb-2-r212', 'Room 212', 'classroom', 842, 0, 72, 120, 'College classroom.', ['College']),
          mk('nb-2-stl2', 'STAIR', 'stair', 916, 0, 36, 120, 'Secondary staircase.', ['Accessible']),
          mk('nb-2-corr', 'CORRIDOR', 'corridor', 38, 122, 914, 28),
        ]
      },
      third: {
        label: '3rd Floor', rooms: [
          mk('nb-3-stl', 'STAIR', 'stair', 0, 0, 36, 120, 'Main staircase.', ['Accessible']),
          mk('nb-3-r301', 'Room 301', 'classroom', 38, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r302', 'Room 302', 'classroom', 108, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r303', 'Room 303', 'classroom', 178, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r304', 'Room 304', 'classroom', 248, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r305', 'Room 305', 'classroom', 318, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r306', 'Room 306', 'classroom', 388, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r307', 'Room 307', 'classroom', 458, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r308', 'Room 308', 'classroom', 528, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r309', 'Room 309', 'classroom', 598, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r310', 'Room 310', 'classroom', 668, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-r311', 'Room 311', 'classroom', 738, 0, 68, 120, 'College classroom.', ['College']),
          mk('nb-3-cba', 'CBA\nVenture Lab', 'lab', 808, 0, 106, 120, 'CBA Venture Lab.', ['CBA', 'Business']),
          mk('nb-3-stl2', 'STAIR', 'stair', 916, 0, 36, 120, 'Secondary staircase.', ['Accessible']),
          mk('nb-3-corr', 'CORRIDOR', 'corridor', 38, 122, 914, 28),
        ]
      }
    }
  },
  be: {
    name: 'Basic Education', svgW: BE_SVG_W, svgH: BE_SVG_H,
    floors: {
      ground: {
        label: 'Ground Floor', rooms: [
          mk('be-g-tf', 'F.Toilet', 'toilet', 2, 0, 62, 26, 'Female comfort room.', ['Facility']),
          mk('be-g-tm', 'M.Toilet', 'toilet', 2, 27, 62, 26, 'Male comfort room.', ['Facility']),
          mk('be-g-stl', 'STAIR', 'stair', 66, 0, 32, 54, 'Staircase.', ['Accessible']),
          mk('be-g-corr-top', 'CORRIDOR', 'corridor', 100, 0, 162, 54),
          mk('be-g-c1', 'Room 101', 'classroom', 0, 56, 210, 50, 'Grade 1.', ['Grade 1', 'K-12']),
          mk('be-g-c2', 'Room 102', 'classroom', 0, 108, 210, 50, 'Grade 2.', ['Grade 2', 'K-12']),
          mk('be-g-c3', 'Room 103', 'classroom', 0, 160, 210, 50, 'Grade 3.', ['Grade 3', 'K-12']),
          mk('be-g-c4', 'Room 104', 'classroom', 0, 212, 210, 50, 'Grade 4.', ['Grade 4', 'K-12']),
          mk('be-g-c5', 'Room 105', 'classroom', 0, 264, 210, 50, 'Grade 5.', ['Grade 5', 'K-12']),
          mk('be-g-c6', 'Room 106', 'classroom', 0, 316, 210, 50, 'Grade 6.', ['Grade 6', 'K-12']),
          mk('be-g-c7', 'Room 107', 'classroom', 0, 368, 210, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-c8', 'Room 108', 'classroom', 0, 420, 210, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-c9', 'Room 109', 'classroom', 0, 472, 210, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-c10', 'Room 110', 'classroom', 0, 524, 210, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-tf2', 'F.Toilet', 'toilet', 2, 576, 62, 26, 'Female comfort room.', ['Facility']),
          mk('be-g-tm2', 'M.Toilet', 'toilet', 2, 603, 62, 26, 'Male comfort room.', ['Facility']),
          mk('be-g-stl2', 'STAIR', 'stair', 66, 576, 32, 54, 'Staircase.', ['Accessible']),
          mk('be-g-corr-bot', 'CORRIDOR', 'corridor', 100, 576, 162, 54),
          mk('be-g-corr-side', 'CORRIDOR', 'corridor', 212, 56, 60, 520),
        ]
      },
      second: {
        label: '2nd Floor', rooms: [
          mk('be-2-tle', 'T.L.E. Lab', 'lab', 0, 0, 120, 54, 'TLE lab.', ['TLE', 'Lab']),
          mk('be-2-tm2', 'M.Toilet', 'toilet', 122, 0, 28, 26, 'Male comfort room.', ['Facility']),
          mk('be-2-tf2', 'F.Toilet', 'toilet', 122, 28, 28, 26, 'Female comfort room.', ['Facility']),
          mk('be-2-stl2', 'STAIR', 'stair', 152, 0, 30, 54, 'Staircase.', ['Accessible']),
          mk('be-2-g11stem', 'Gr.11 STEM', 'classroom', 0, 56, 210, 44, 'Grade 11 STEM.', ['SHS', 'STEM']),
          mk('be-2-g12stem', 'Gr.12 STEM', 'classroom', 0, 102, 210, 44, 'Grade 12 STEM.', ['SHS', 'STEM']),
          mk('be-2-g12abm', 'Gr.12\nABM/HUMSS', 'classroom', 0, 148, 210, 52, 'Grade 12 ABM/HUMSS.', ['SHS', 'Grade 12']),
          mk('be-2-g11abm', 'Gr.11\nABM/HUMSS', 'classroom', 0, 202, 210, 52, 'Grade 11 ABM/HUMSS.', ['SHS', 'Grade 11']),
          mk('be-2-fac', 'FACULTY', 'office', 0, 256, 210, 54, 'BE Faculty Room.', ['Faculty', 'Staff']),
          mk('be-2-princ', 'Principal\nOffice', 'office', 0, 312, 210, 54, 'BE Principal Office.', ['Admin', 'Office']),
          mk('be-2-sci2', 'SCI LAB', 'lab', 0, 368, 210, 50, 'Secondary science lab.', ['Science', 'Lab']),
          mk('be-2-chem', 'Chemistry\nLab', 'lab', 0, 420, 210, 50, 'Chemistry lab.', ['Chemistry', 'Lab']),
          mk('be-2-sci1', 'SCI LAB', 'lab', 0, 472, 210, 50, 'Science lab.', ['Science', 'Lab']),
          mk('be-2-com', 'COM LAB', 'lab', 0, 524, 210, 50, 'Computer lab.', ['Computer', 'Lab', 'ICT']),
          mk('be-2-stl', 'STAIR', 'stair', 66, 576, 32, 54, 'Staircase.', ['Accessible']),
          mk('be-2-tf', 'F.Toilet', 'toilet', 2, 576, 62, 26, 'Female comfort room.', ['Facility']),
          mk('be-2-tm', 'M.Toilet', 'toilet', 2, 603, 62, 26, 'Male comfort room.', ['Facility']),
          mk('be-2-pray', 'Prayer\nRoom', 'office', 275, 271, 75, 90, 'Prayer Room.', ['Chapel', 'Prayer']),
          mk('be-2-corr-top', 'CORRIDOR', 'corridor', 100, 576, 162, 54),
          mk('be-2-corr-bot', 'CORRIDOR', 'corridor', 212, 56, 60, 520),
        ]
      }
    }
  }
};

// Quick destinations
var QUICK = [
  { id: 'nb-2-lib1', icon: '📚', label: 'Library', sub: 'NB · 2nd Floor' },
  { id: 'nb-2-lib2', icon: '📚', label: 'Library', sub: 'NB · 2nd Floor' },
  { id: 'nb-1-reg', icon: '📋', label: 'Registrar', sub: 'NB · Ground' },
  { id: 'nb-1-guid', icon: '💬', label: 'Guidance', sub: 'NB · Ground' },
  { id: 'nb-2-comp', icon: '💻', label: 'Comp Lab', sub: 'NB · 2nd Floor' },
  { id: 'be-2-princ', icon: '🏫', label: 'BE Principal', sub: 'BE · 2nd Floor' },
];

// ============================================================
// POLYGON OVERLAY SYSTEM
// Core idea: each building has a GPS polygon. We compute a
// 2D affine transform from SVG-pixel space â†’ Leaflet layer-point
// space and apply it as a CSS matrix transform.
// ============================================================

var map = null;
var buildingOverlays = {}; // bk -> { el, pane }

// Compute the affine (scale + rotation + translation) that maps
// SVG pixel coords into Leaflet layer-point coords.
// We use three of the four corners as the basis (A=TL, B=TR, D=BL).
function computeTransform(bk) {
  var gps = GPS[bk];
  var bd = DATA[bk];
  // SVG corners in pixel space
  var svgA = { x: 0, y: 0 };        // top-left
  var svgB = { x: bd.svgW, y: 0 };        // top-right
  var svgD = { x: 0, y: bd.svgH };  // bottom-left

  // Corresponding Leaflet layer-points from GPS
  var ptA = map.latLngToLayerPoint(gps[0]);
  var ptB = map.latLngToLayerPoint(gps[1]);
  var ptD = map.latLngToLayerPoint(gps[3]);

  // Vectors in SVG space and Leaflet space
  var svgVx = { x: svgB.x - svgA.x, y: svgB.y - svgA.y }; // right vector
  var svgVy = { x: svgD.x - svgA.x, y: svgD.y - svgA.y }; // down vector
  var mapVx = { x: ptB.x - ptA.x, y: ptB.y - ptA.y };
  var mapVy = { x: ptD.x - ptA.x, y: ptD.y - ptA.y };

  // Affine: [a c e; b d f] where the transform maps svgâ†’map
  // For the X column (how map moves per svg-x pixel):
  //   We scale svgVx to produce mapVx
  var scaleX = Math.sqrt(mapVx.x * mapVx.x + mapVx.y * mapVx.y) /
    Math.sqrt(svgVx.x * svgVx.x + svgVx.y * svgVx.y);
  var scaleY = Math.sqrt(mapVy.x * mapVy.x + mapVy.y * mapVy.y) /
    Math.sqrt(svgVy.x * svgVy.x + svgVy.y * svgVy.y);

  // Full 2x2 linear transform columns
  var a = mapVx.x / (bd.svgW);
  var b = mapVx.y / (bd.svgW);
  var c = mapVy.x / (bd.svgH);
  var d = mapVy.y / (bd.svgH);

  // Translation = ptA (origin maps to GPS corner A layer-point)
  var e = ptA.x;
  var f = ptA.y;

  return { a, b, c, d, e, f };
}

function applyOverlayTransform(bk) {
  var el = buildingOverlays[bk];
  if (!el || !map) return;
  var t = computeTransform(bk);
  // CSS matrix(a,b,c,d,e,f) â€” column-major 2D affine
  el.style.transform = 'matrix(' + t.a + ',' + t.b + ',' + t.c + ',' + t.d + ',' + t.e + ',' + t.f + ')';
  el.style.transformOrigin = '0 0';
}

function syncAllOverlays() {
  overlaySyncQueued = false;
  Object.keys(DATA).forEach(function (bk) { applyOverlayTransform(bk); });
}

function queueOverlaySync() {
  if (overlaySyncQueued) return;
  overlaySyncQueued = true;
  requestAnimationFrame(syncAllOverlays);
}

// ============================================================
// INIT LEAFLET + OVERLAYS
// ============================================================
function initLeaflet() {
  if (typeof L === 'undefined') return;

  map = L.map('map', {
    center: CAMPUS_CENTER,
    zoom: 19,
    minZoom: 17,
    maxZoom: 22,
    zoomControl: false,
    attributionControl: true
  });

  var glLayer = null;

  function applyMapStyle() {
    // Remove old layer if present
    if (glLayer) { map.removeLayer(glLayer); glLayer = null; }

    glLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap contributors',
      maxNativeZoom: 19, maxZoom: 22
    }).addTo(map);
    return;

    // Always use raster OSM tiles
    var tileUrl = style === '3d'
      ? 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var attribution = style === '3d'
      ? 'Â© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">HOT</a>'
      : 'Â© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    glLayer = L.tileLayer(tileUrl, {
      attribution: attribution,
      maxNativeZoom: 19, maxZoom: 22
    }).addTo(map);
  }

  // Expose globally so HTML buttons work
  window.setMapStyle = applyMapStyle;

  applyMapStyle('bright');

  map.fitBounds(CAMPUS_BOUNDS, { padding: [24, 24] });

  // Create one overlay div per building, placed in Leaflet's overlayPane
  // so it zooms/pans in perfect sync.
  Object.keys(DATA).forEach(function (bk) {
    var bd = DATA[bk];
    var wrap = document.createElement('div');
    wrap.id = 'bov-' + bk;
    wrap.style.cssText = [
      'position:absolute',
      'top:0', 'left:0',
      'width:' + bd.svgW + 'px',
      'height:' + bd.svgH + 'px',
      'pointer-events:auto',
      'will-change:transform',
      'transform-origin:0 0'
    ].join(';');

    // Inject the floor SVG cards into this wrapper
    wrap.innerHTML = buildBuildingHTML(bk);
    map.getPanes().overlayPane.appendChild(wrap);
    buildingOverlays[bk] = wrap;
  });

  map.on('zoomend viewreset resize zoom', queueOverlaySync);
  syncAllOverlays();
}

// ============================================================
// SVG BUILDING RENDERER
// ============================================================
function buildBuildingHTML(bk) {
  var bd = DATA[bk];
  var fks = Object.keys(bd.floors);
  var af = activeF[bk];

  var h = '<div class="bldg" id="bc-' + bk + '" style="width:' + bd.svgW + 'px;">';
  h += '<div class="bldg-head">';
  h += '<div class="bldg-name ' + (bk === 'be' ? 'be-color' : 'nb-color') + '">' + bd.name + '</div>';
  h += '<div class="floor-tabs" id="ft-' + bk + '" aria-label="Floor switcher for ' + bd.name + '">';
  fks.forEach(function (fk) {
    h += '<button class="ftab' + (fk === af ? ' on-' + bk : '') + '" onclick="switchF(\'' + bk + '\',\'' + fk + '\')">' + bd.floors[fk].label + '</button>';
  });
  h += '</div></div>';

  var maxH = Math.max.apply(null, fks.map(function (fk) { return bd.svgH; }));
  h += '<div class="flr-wrap" style="height:' + maxH + 'px;width:' + bd.svgW + 'px;">';
  fks.forEach(function (fk) {
    h += '<div class="flr-layer' + (fk === af ? ' show' : '') + '" id="fl-' + bk + '-' + fk + '">' + makeSVG(bk, fk) + '</div>';
  });
  h += '</div></div>';
  return h;
}

function makeSVG(bk, fk) {
  var bd = DATA[bk], fd = bd.floors[fk], W = bd.svgW, H = bd.svgH;
  var s = '<svg width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg">';
  s += '<rect width="' + W + '" height="' + H + '" fill="#f8f8f6"/>';

  var AC = {
    classroom: '#eef2ff', lab: '#f0fdf4', library: '#e8f8ff',
    office: '#fdf4ff', toilet: '#f0f9ff', stair: '#fffbeb', corridor: '#f1f1ef'
  };

  fd.rooms.forEach(function (r) {
    if (!r.w) return;
    var c = AC[r.type] || '#fff';
    var cx = r.x + r.w / 2, cy = r.y + r.h / 2;
    var lines = r.label.split('\n');
    var maxch = Math.max.apply(null, lines.map(function (l) { return l.length; }));
    var fs = Math.min(9.5, Math.max(5, Math.min(r.w, r.h) / (maxch * 0.72)));
    var lh = fs * 1.3;
    var ty = cy - ((lines.length - 1) * lh / 2);

    if (r.type === 'corridor') {
      s += '<rect x="' + r.x + '" y="' + r.y + '" width="' + r.w + '" height="' + r.h + '" fill="rgba(210,210,205,.5)" stroke="#aaa" stroke-width="0.6"/>';
      if (r.w > 60 && r.h > 14) {
        s += '<line x1="' + r.x + '" y1="' + cy + '" x2="' + (r.x + r.w) + '" y2="' + cy + '" stroke="#bbb" stroke-width="0.5" stroke-dasharray="5,4"/>';
        s += '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="middle" font-family="Space Mono,monospace" font-size="5" fill="rgba(100,100,100,.55)" font-weight="600" letter-spacing="2">CORRIDOR</text>';
      }
      if (r.h > 60 && r.w > 14) {
        s += '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="middle" font-family="Space Mono,monospace" font-size="5" fill="rgba(100,100,100,.55)" font-weight="600" letter-spacing="2" writing-mode="tb">CORRIDOR</text>';
      }
      return;
    }

    if (r.id === 'be-2-pray') {
      var rx = r.w / 2, ry = r.h / 2, pcx = r.x + rx, pcy = r.y + ry;
      s += '<g class="room-g" id="rg-' + r.id + '" onclick="tapRoom(\'' + r.id + '\',\'' + bk + '\',\'' + fk + '\')">';
      s += '<ellipse id="rc-' + r.id + '" cx="' + pcx + '" cy="' + pcy + '" rx="' + rx + '" ry="' + ry + '" fill="#f0fdf4" stroke="#444" stroke-width="1.5"/>';
      var pfs = Math.min(8, Math.max(5.5, rx * 0.32));
      s += '<text x="' + pcx + '" y="' + (pcy - pfs * .7) + '" text-anchor="middle" dominant-baseline="middle" font-family="Space Mono,monospace" font-size="' + pfs + '" fill="#1a1a2e" font-weight="700">PRAYER</text>';
      s += '<text x="' + pcx + '" y="' + (pcy + pfs * .85) + '" text-anchor="middle" dominant-baseline="middle" font-family="Space Mono,monospace" font-size="' + pfs + '" fill="#1a1a2e" font-weight="700">ROOM</text>';
      s += '</g>'; return;
    }

    s += '<g class="room-g" id="rg-' + r.id + '" onclick="tapRoom(\'' + r.id + '\',\'' + bk + '\',\'' + fk + '\')">';
    s += '<rect id="rc-' + r.id + '" x="' + r.x + '" y="' + r.y + '" width="' + r.w + '" height="' + r.h + '" rx="0" fill="' + c + '" stroke="#333" stroke-width="1.8"/>';
    var wt = 3;
    if (r.w > wt * 4 && r.h > wt * 4) {
      s += '<rect x="' + (r.x + wt) + '" y="' + (r.y + wt) + '" width="' + (r.w - wt * 2) + '" height="' + (r.h - wt * 2) + '" fill="none" stroke="rgba(60,60,60,.18)" stroke-width="0.5"/>';
    }
    if (r.type === 'stair') {
      var isV = (r.h > r.w);
      var steps = isV ? Math.min(6, Math.floor(r.h / 10)) : Math.min(6, Math.floor(r.w / 10));
      for (var i = 1; i < steps; i++) {
        if (isV) s += '<line x1="' + (r.x + wt) + '" y1="' + (r.y + r.h / steps * i) + '" x2="' + (r.x + r.w - wt) + '" y2="' + (r.y + r.h / steps * i) + '" stroke="#777" stroke-width="0.7"/>';
        else s += '<line x1="' + (r.x + r.w / steps * i) + '" y1="' + (r.y + wt) + '" x2="' + (r.x + r.w / steps * i) + '" y2="' + (r.y + r.h - wt) + '" stroke="#777" stroke-width="0.7"/>';
      }
      s += '<text x="' + cx + '" y="' + cy + '" text-anchor="middle" dominant-baseline="middle" font-size="' + (Math.min(r.w, r.h) * 0.45) + '" fill="rgba(80,80,80,.5)">â†‘</text>';
    }
    if (r.type !== 'stair' && r.type !== 'toilet' && r.w >= 36 && r.h >= 32) {
      var nw = Math.max(1, Math.floor(r.w / 18));
      var sp = r.w / (nw + 1), ww = Math.min(10, sp * 0.55);
      for (var i = 1; i <= nw; i++) {
        var wx = r.x + sp * i - ww / 2;
        s += '<rect x="' + wx + '" y="' + (r.y + 1) + '" width="' + ww + '" height="4.5" rx="0.5" fill="rgba(160,210,240,.65)" stroke="#777" stroke-width="0.5"/>';
        s += '<line x1="' + (wx + ww / 2) + '" y1="' + (r.y + 1) + '" x2="' + (wx + ww / 2) + '" y2="' + (r.y + 5.5) + '" stroke="#888" stroke-width="0.4"/>';
      }
    }
    if (r.type !== 'stair' && r.w >= 22 && r.h >= 22) {
      var dw = Math.min(13, r.w * 0.32);
      var dx = cx - dw / 2, dy = r.y + r.h;
      s += '<rect x="' + dx + '" y="' + (dy - 1.5) + '" width="' + dw + '" height="3" fill="' + c + '" stroke="none"/>';
      s += '<line x1="' + dx + '" y1="' + (dy - 1) + '" x2="' + dx + '" y2="' + (dy - 1 - dw) + '" stroke="#555" stroke-width="0.8"/>';
      s += '<path d="M' + dx + ',' + (dy - 1) + ' A' + dw + ',' + dw + ' 0 0,1 ' + (dx + dw) + ',' + (dy - 1) + '" fill="none" stroke="#666" stroke-width="0.5" stroke-dasharray="2,1"/>';
    }
    var labelColor = r.type === 'classroom' ? '#1e3a8a' : r.type === 'lab' ? '#14532d' : r.type === 'office' ? '#581c87' : r.type === 'toilet' ? '#0c4a6e' : '#1a1a2e';
    lines.forEach(function (ln, i) {
      s += '<text x="' + cx + '" y="' + (ty + i * lh) + '" text-anchor="middle" dominant-baseline="middle" font-family="Space Mono,monospace" font-size="' + fs + '" fill="' + labelColor + '" font-weight="700">' + ln.toUpperCase() + '</text>';
    });
    s += '</g>';
  });

  s += '<g id="pg-' + bk + '-' + fk + '"></g></svg>';
  return s;
}

// ============================================================
// RE-RENDER (called once, or when floor switches)
// ============================================================
function render() {
  Object.keys(DATA).forEach(function (bk) {
    var el = buildingOverlays[bk];
    if (el) {
      el.innerHTML = buildBuildingHTML(bk);
    }
  });
}

// ============================================================
// APP STATE
// ============================================================
var youId = null, destId = null;
var activeF = { be: 'ground', nb: 'second' };
var pendingId = null;
var gpsWatchId = null;
var userGPS = { lat: null, lng: null, accuracy: null, heading: null };
var userPixel = { x: null, y: null };
var onCampus = false;
var arrivedToastShownId = null;
var arSteps = [], arStepIdx = 0, arStream = null, arAnimFrame = null, arPathDots = [];
var arDeviceHeading = 0, lastStepGPS = null, STEP_ADV = 8;
var arTravelerT = 0, arMapDotProgress = 0;
var arStableDist = null, arStableBadgeGPS = null;
var arLaunchDist = null;
var arHasHeading = false;
var arVideoMirrorApplied = false;
var arOverlayMirrored = false;
var arCompassHandler = null;
var arMapNeedsRedraw = true;
var arLastCamFrameAt = 0;
var arLastMapFrameAt = 0;
var overlaySyncQueued = false;
var voiceGuidanceSupported = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
var voiceGuidanceEnabled = voiceGuidanceSupported;
var voiceAnnouncementState = { destId: null, near: false, arrived: false, lastStep: -1, lastKey: '', lastAt: 0 };
var voiceAnnouncementUtterance = null;
var voiceGuidanceVoices = [];
var cachedAR = {
  camSection: null,
  mapSection: null,
  camCanvas: null,
  mapCanvas: null,
  camCtx: null,
  mapCtx: null
};

var leafUserMarker = null, leafUserAcc = null;

// ============================================================
// GPS UTILITIES
// ============================================================
function gpsDistance(a, b, c, d) {
  var R = 6371000, dL = (c - a) * Math.PI / 180, dN = (d - b) * Math.PI / 180;
  var e = Math.sin(dL / 2) * Math.sin(dL / 2) + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(dN / 2) * Math.sin(dN / 2);
  return R * 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
}
function calculateBearing(lat1, lng1, lat2, lng2) {
  var dLon = (lng2 - lng1) * Math.PI / 180, l1 = lat1 * Math.PI / 180, l2 = lat2 * Math.PI / 180;
  var y = Math.sin(dLon) * Math.cos(l2), x = Math.cos(l1) * Math.sin(l2) - Math.sin(l1) * Math.cos(l2) * Math.cos(dLon);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
function isOnCampus(lat, lng) {
  return lat >= 17.025500 && lat <= 17.027000 && lng >= 121.628500 && lng <= 121.630200;
}

// Convert a room's SVG pixel position to GPS lat/lng using the building's affine transform
function roomToGPS(room) {
  var bk = room.bk, gps = GPS[bk], bd = DATA[bk];
  var px = room.x + room.w / 2, py = room.y + room.h / 2;
  // Bilinear interpolation using 4 GPS corners
  var u = px / bd.svgW, v = py / bd.svgH;
  var A = gps[0], B = gps[1], C = gps[2], D = gps[3];
  // Bilinear: TL*(1-u)*(1-v) + TR*u*(1-v) + BR*u*v + BL*(1-u)*v
  var lat = A[0] * (1 - u) * (1 - v) + B[0] * u * (1 - v) + C[0] * u * v + D[0] * (1 - u) * v;
  var lng = A[1] * (1 - u) * (1 - v) + B[1] * u * (1 - v) + C[1] * u * v + D[1] * (1 - u) * v;
  return { lat: lat, lng: lng };
}

// ============================================================
// USER LOCATION MARKER
// ============================================================
function placeUserMarker(lat, lng, acc) {
  if (!map) return;
  var visualAcc = (acc && acc > 0 && acc <= 120) ? acc : 0;

  if (!leafUserMarker) {
    if (visualAcc > 0) {
      leafUserAcc = L.circle([lat, lng], { radius: visualAcc, color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.12, weight: 1, interactive: false }).addTo(map);
    }
    var iconHtml = '<div style="position:relative;width:24px;height:24px;">' +
      '<div style="position:absolute;inset:0;background:rgba(37,99,235,.22);border-radius:50%;animation:gpsPulse 2s infinite ease-out;"></div>' +
      '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:50%;background:#2563eb;border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);"></div>' +
      '</div>';
    leafUserMarker = L.marker([lat, lng], {
      icon: L.divIcon({ html: iconHtml, className: '', iconSize: [24, 24], iconAnchor: [12, 12] }),
      interactive: false, zIndexOffset: 1000
    }).addTo(map);
  } else {
    leafUserMarker.setLatLng([lat, lng]);
    if (leafUserAcc) {
      if (visualAcc > 0) { leafUserAcc.setLatLng([lat, lng]); leafUserAcc.setRadius(visualAcc); leafUserAcc.setStyle({ opacity: .5, fillOpacity: .12 }); }
      else { leafUserAcc.setStyle({ opacity: 0, fillOpacity: 0 }); }
    } else if (visualAcc > 0) {
      leafUserAcc = L.circle([lat, lng], { radius: visualAcc, color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: .12, weight: 1, interactive: false }).addTo(map);
    }
  }
}

function recenterUser() {
  if (!map) return;
  if (userGPS.lat) { map.setView([userGPS.lat, userGPS.lng], Math.max(map.getZoom(), 20), { animate: true }); }
  else { map.fitBounds(CAMPUS_BOUNDS, { padding: [24, 24] }); }
}

// ============================================================
// GPS TRACKING
// ============================================================
function startGPS() {
  if (!navigator.geolocation) { toast('📍 GPS not available - tap a room to set location.'); return; }
  document.getElementById('locText').textContent = 'Locating...';

  var opts = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
  var watch = { enableHighAccuracy: true, timeout: 5000, maximumAge: 2000 };

  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' }).then(function (r) {
      if (r.state === 'denied') { onGPSError({ message: 'denied' }); return; }
      navigator.geolocation.getCurrentPosition(onGPSUpdate, onGPSError, opts);
      gpsWatchId = navigator.geolocation.watchPosition(onGPSUpdate, onGPSError, watch);
    });
  } else {
    navigator.geolocation.getCurrentPosition(onGPSUpdate, onGPSError, opts);
    gpsWatchId = navigator.geolocation.watchPosition(onGPSUpdate, onGPSError, watch);
  }
}

function onGPSUpdate(p) {
  var lat = p.coords.latitude, lng = p.coords.longitude;
  var acc = Math.round(p.coords.accuracy), hdg = p.coords.heading;
  userGPS = { lat: lat, lng: lng, accuracy: acc, heading: hdg };
  onCampus = isOnCampus(lat, lng);
  placeUserMarker(lat, lng, acc);

  var lt = document.getElementById('locText');
  if (onCampus) { lt.textContent = 'On Campus ✓'; document.getElementById('locBadge').style.borderColor = 'rgba(34,197,94,.4)'; }
  else { lt.textContent = acc < 50 ? 'Near Campus' : 'GPS ±' + acc + 'm'; document.getElementById('locBadge').style.borderColor = 'rgba(245,158,11,.4)'; }

  if (hdg !== null && !isNaN(hdg)) arDeviceHeading = hdg;
  if (document.getElementById('arView').classList.contains('show')) {
    buildARPathDots();
    updateARFromGPS();
  }

  if (destId && onCampus) {
    var toR = getRoom(destId);
    var destGPSPos = roomToGPS(toR);
    var dist = gpsDistance(lat, lng, destGPSPos.lat, destGPSPos.lng);
    if (voiceAnnouncementState.destId !== destId) resetVoiceGuidanceState();
    if (dist <= 18 && !voiceAnnouncementState.near) {
      voiceAnnouncementState.near = true;
      speakGuidance('You are near ' + toSpokenText(toR.label) + '.', 'near:' + destId, 0);
    }
    if (dist < 8) {
      if (arrivedToastShownId !== destId) {
        toast('🎯 You are at ' + toR.label.replace('\n', ' ') + '!');
        arrivedToastShownId = destId;
      }
      if (!voiceAnnouncementState.arrived) {
        voiceAnnouncementState.arrived = true;
        speakGuidance('You have arrived at ' + toSpokenText(toR.label) + '.', 'arrive:' + destId, 0);
      }
    } else {
      arrivedToastShownId = null;
      var cr = getClosestRoomToGPS(lat, lng);
      if (cr && cr.id !== destId && cr.id !== youId) {
        youId = cr.id;
        drawPath();
        var fr = getRoom(youId);
        var bn = function (b) { return b === 'be' ? 'Basic Education' : 'New Building'; };
        var ef = document.getElementById('rFrom'); if (ef) ef.textContent = fr.label.replace('\n', ' ');
        var es = document.getElementById('rFromSub'); if (es) es.textContent = bn(fr.bk) + ' · ' + (FL[fr.fk] || fr.fk);
        var ee = document.getElementById('rtEtaTxt'); if (ee) ee.textContent = estimateWalkTime(fr, toR);
        arSteps = buildSteps(fr, toR);
        if (document.getElementById('arView').classList.contains('show')) buildARPathDots();
        renderSidebarSteps();
      }
    }
  }
}

function onGPSError(e) {
  console.warn('GPS:', e.message);
  document.getElementById('locBadge').style.borderColor = 'rgba(245,158,11,.4)';
  document.getElementById('locText').textContent = 'Tap room to locate';
  toast('📍 GPS unavailable - tap any room to set your location.');
}

function getClosestRoomToGPS(lat, lng) {
  var closest = null, minDist = Infinity;
  allRooms().forEach(function (r) {
    var gp = roomToGPS(r);
    var d = gpsDistance(lat, lng, gp.lat, gp.lng);
    if (d < minDist) { minDist = d; closest = r; }
  });
  return closest;
}

function startCompass() {
  if (!window.DeviceOrientationEvent) return;
  if (!canUseDeviceCompass()) return;
  if (arCompassHandler) return;
  arCompassHandler = function (e) {
    var heading = null;
    if (typeof e.webkitCompassHeading === 'number' && !isNaN(e.webkitCompassHeading)) heading = e.webkitCompassHeading;
    else if (e.absolute === true && typeof e.alpha === 'number' && !isNaN(e.alpha)) heading = (360 - e.alpha + 360) % 360;
    if (heading === null) return;
    arHasHeading = true;
    arDeviceHeading = heading;
  };
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(function (p) { if (p === 'granted' && arCompassHandler) window.addEventListener('deviceorientation', arCompassHandler, true); }).catch(function () { });
  } else {
    window.addEventListener('deviceorientation', arCompassHandler, true);
  }
}

// ============================================================
// WALK TIME ESTIMATION
// ============================================================
function estimateWalkTime(fr, to) {
  var gpsFr = roomToGPS(fr), gpsTo = roomToGPS(to);
  var distM = gpsDistance(gpsFr.lat, gpsFr.lng, gpsTo.lat, gpsTo.lng);
  var walkSpd = 1.2;
  var secs = distM / walkSpd;
  var floorOrder = { ground: 0, second: 1, third: 2 };
  var floorDiff = Math.abs((floorOrder[to.fk] || 0) - (floorOrder[fr.fk] || 0));
  if (fr.bk !== to.bk) floorDiff = Math.max(1, floorDiff);
  secs += floorDiff * 20;
  if (secs < 60) return 'About 1 min walk · ~' + Math.round(distM) + 'm';
  return 'About ' + Math.round(secs / 60) + ' min walk · ~' + Math.round(distM) + 'm';
}

// ============================================================
// QUICK DESTINATIONS & RECENT
// ============================================================
function renderQuickGrid() {
  document.getElementById('quickGrid').innerHTML = QUICK.map(function (q) {
    return '<button class="quick-btn" onclick="quickNavigate(\'' + q.id + '\')">' +
      '<span class="quick-btn-ico">' + q.icon + '</span>' +
      '<span class="quick-btn-lbl">' + q.label + '</span>' +
      '<span class="quick-btn-sub">' + q.sub + '</span></button>';
  }).join('');
}

function quickNavigate(id) {
  if (!youId) {
    if (userGPS.lat && onCampus) {
      var cr = getClosestRoomToGPS(userGPS.lat, userGPS.lng);
      if (cr && cr.id !== id) {
        youId = cr.id; destId = id; highlight(); drawPath(); showSidebar(); saveRecent(youId, destId); renderRecent(); toast('🎯 Route ready!');
        announceRouteGuidance(getRoom(youId), getRoom(destId));
        return;
      }
    }
    destId = id; highlight(); toast('📍 Tap your current location on the map first.'); return;
  }
  destId = id; highlight(); drawPath(); showSidebar(); toast('🎯 Route set!');
  announceRouteGuidance(getRoom(youId), getRoom(destId));
}

function getRecent() { try { return JSON.parse(localStorage.getItem('olpc_r') || '[]'); } catch (e) { return []; } }
function saveRecent(f, t) {
  if (!f || !t || f === t) return;
  var rs = getRecent().filter(function (r) { return !(r.from === f && r.to === t); });
  rs.unshift({ from: f, to: t }); if (rs.length > 3) rs = rs.slice(0, 3);
  try { localStorage.setItem('olpc_r', JSON.stringify(rs)); } catch (e) { }
}
function renderRecent() {
  var rs = getRecent(), sec = document.getElementById('recentSec'), list = document.getElementById('recentList');
  if (!rs.length) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';
  list.innerHTML = rs.map(function (r, i) {
    var fr = getRoom(r.from), to = getRoom(r.to); if (!fr || !to) return '';
    return '<div class="recent-item" onclick="loadRecent(' + i + ')">' +
      '<span class="recent-ico">🕐</span><div class="recent-text"><strong>' + fr.label.replace('\n', ' ') + '</strong><br>→ ' + to.label.replace('\n', ' ') + '</div>' +
      '<span class="recent-del" onclick="delRecent(event,' + i + ')">✕</span></div>';
  }).join('');
}
function loadRecent(i) {
  var rs = getRecent(), r = rs[i]; if (!r) return;
  youId = r.from; destId = r.to; highlight(); drawPath(); showSidebar(); toast('🕐 Recent route loaded');
  announceRouteGuidance(getRoom(youId), getRoom(destId));
}
function delRecent(e, i) {
  e.stopPropagation(); var rs = getRecent(); rs.splice(i, 1);
  try { localStorage.setItem('olpc_r', JSON.stringify(rs)); } catch (ex) { }
  renderRecent();
}

// ============================================================
// ROOM LOOKUP
// ============================================================
function getRoom(id) {
  for (var b in DATA) for (var f in DATA[b].floors) {
    var r = DATA[b].floors[f].rooms.find(function (r) { return r.id === id; });
    if (r) return Object.assign({}, r, { bk: b, fk: f });
  }
  return null;
}
function allRooms() {
  var out = [];
  for (var b in DATA) for (var f in DATA[b].floors)
    DATA[b].floors[f].rooms.filter(function (r) { return r.type !== 'corridor' && r.w > 0; })
      .forEach(function (r) { out.push(Object.assign({}, r, { bk: b, fk: f })); });
  return out;
}

function getRoomIcon(room) {
  var icon = room && typeof room.icon === 'string' ? room.icon : '';
  if (icon && !/[ðâÂ]/.test(icon) && icon.trim().length <= 4) return icon;

  var byType = {
    classroom: '📘',
    lab: '🧪',
    library: '📚',
    office: '🏢',
    toilet: '🚻',
    stair: '🪜',
    corridor: '➡️'
  };
  return byType[room && room.type] || '📍';
}

function canUseDeviceCompass() {
  if (typeof navigator === 'undefined') return false;
  var ua = navigator.userAgent || '';
  var mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  var coarsePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  return mobileUA || coarsePointer;
}

function toSpokenText(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/·/g, ',')
    .replace(/✓/g, '')
    .trim();
}

function getVoiceGuidancePreference() {
  var saved = localStorage.getItem('olpc-voice-guidance');
  if (saved === 'off') return false;
  if (saved === 'on') return true;
  return true;
}

function updateVoiceToggleUI() {
  var btn = document.getElementById('voiceToggle');
  var icon = document.getElementById('voiceToggleIcon');
  var label = document.getElementById('voiceToggleLabel');
  if (!btn || !icon || !label) return;

  btn.classList.toggle('is-off', !voiceGuidanceEnabled);
  btn.classList.toggle('is-disabled', !voiceGuidanceSupported);
  btn.setAttribute('aria-pressed', String(voiceGuidanceEnabled));
  btn.setAttribute('aria-label', voiceGuidanceSupported
    ? (voiceGuidanceEnabled ? 'Turn voice guidance off' : 'Turn voice guidance on')
    : 'Voice guidance unavailable');

  if (!voiceGuidanceSupported) {
    icon.textContent = '🔇';
    label.textContent = 'No Voice';
    return;
  }

  icon.textContent = voiceGuidanceEnabled ? '🔊' : '🔈';
  label.textContent = voiceGuidanceEnabled ? 'Voice On' : 'Voice Off';
}

function resetVoiceGuidanceState() {
  voiceAnnouncementState.destId = destId;
  voiceAnnouncementState.near = false;
  voiceAnnouncementState.arrived = false;
  voiceAnnouncementState.lastStep = -1;
}

function loadVoiceGuidanceVoices() {
  if (!voiceGuidanceSupported) return;
  voiceGuidanceVoices = window.speechSynthesis.getVoices();
}

function getPreferredVoice() {
  if (!voiceGuidanceVoices.length) loadVoiceGuidanceVoices();
  return voiceGuidanceVoices.find(function (voice) { return /^en(-|_)/i.test(voice.lang || ''); }) ||
    voiceGuidanceVoices.find(function (voice) { return /english/i.test(voice.name || ''); }) ||
    voiceGuidanceVoices[0] ||
    null;
}

function speakGuidance(message, key, minGapMs) {
  if (!voiceGuidanceSupported || !voiceGuidanceEnabled || !message) return;
  var now = Date.now();
  var gap = typeof minGapMs === 'number' ? minGapMs : 5000;
  if (key && voiceAnnouncementState.lastKey === key && now - voiceAnnouncementState.lastAt < gap) return;

  var spoken = toSpokenText(message);
  if (!spoken) return;

  try {
    window.speechSynthesis.cancel();
    voiceAnnouncementUtterance = new SpeechSynthesisUtterance(spoken);
    var preferredVoice = getPreferredVoice();
    if (preferredVoice) voiceAnnouncementUtterance.voice = preferredVoice;
    voiceAnnouncementUtterance.rate = 1;
    voiceAnnouncementUtterance.pitch = 1;
    window.speechSynthesis.speak(voiceAnnouncementUtterance);
    voiceAnnouncementState.lastKey = key || spoken;
    voiceAnnouncementState.lastAt = now;
  } catch (e) { }
}

function applyVoiceGuidancePreference(enabled) {
  voiceGuidanceEnabled = !!enabled && voiceGuidanceSupported;
  if (!voiceGuidanceEnabled && voiceGuidanceSupported) window.speechSynthesis.cancel();
  updateVoiceToggleUI();
}

function toggleVoiceGuidance() {
  if (!voiceGuidanceSupported) {
    updateVoiceToggleUI();
    toast('🔇 Voice guidance is not supported in this browser.');
    return;
  }

  var next = !voiceGuidanceEnabled;
  localStorage.setItem('olpc-voice-guidance', next ? 'on' : 'off');
  applyVoiceGuidancePreference(next);
  if (next) speakGuidance('Voice guidance on.', 'voice:on', 0);
}

function announceRouteGuidance(fromRoom, toRoom) {
  if (!fromRoom || !toRoom) return;
  resetVoiceGuidanceState();
  speakGuidance('Route ready. Head to ' + toSpokenText(toRoom.label) + '. ' + estimateWalkTime(fromRoom, toRoom) + '.', 'route:' + toRoom.id, 0);
}

// ============================================================
// TAP & POPUP
// ============================================================
function tapRoom(id, bk, fk) {
  if (!youId) {
    if (userGPS.lat && onCampus) {
      var cr = getClosestRoomToGPS(userGPS.lat, userGPS.lng);
      if (cr && cr.id !== id) {
        youId = cr.id; destId = id; highlight(); drawPath(); showSidebar(); saveRecent(youId, destId); renderRecent(); toast('🎯 Route ready!');
        announceRouteGuidance(getRoom(youId), getRoom(destId));
        return;
      }
    }
    youId = id; highlight(); toast('📍 You are at: ' + getRoom(id).label.replace('\n', ' ') + ' - tap destination'); renderRecent(); return;
  }
  if (id === youId) { youId = null; destId = null; resetVoiceGuidanceState(); clearPathSVG(); highlight(); hideSidebar(); toast('📍 Cleared.'); return; }
  destId = id; highlight(); drawPath(); showSidebar(); saveRecent(youId, destId); renderRecent(); toast('🎯 Route ready!');
  announceRouteGuidance(getRoom(youId), getRoom(destId));
}

function showRoomPopup(id) {
  var r = getRoom(id); if (!r) return;
  pendingId = id;
  var bn = r.bk === 'be' ? 'Basic Education' : 'New Building';
  document.getElementById('pIco').textContent = getRoomIcon(r);
  document.getElementById('pTitle').textContent = r.label.replace('\n', ' ');
  document.getElementById('pSub').textContent = bn + ' · ' + (FL[r.fk] || r.fk);
  document.getElementById('pDesc').textContent = r.desc || '';
  document.getElementById('pTags').innerHTML = (r.tags || []).map(function (t) { return '<span class="popup-tag">' + t + '</span>'; }).join('');
  document.getElementById('pHoursText').textContent = HOURS[r.type] || HOURS.default;
  document.getElementById('popupOverlay').classList.add('show');
}
function closePopup() { document.getElementById('popupOverlay').classList.remove('show'); }
function closePopupBg(e) { if (e.target === document.getElementById('popupOverlay')) closePopup(); }
function popupSetOrigin() {
  if (!pendingId) return; closePopup(); youId = pendingId; destId = null; resetVoiceGuidanceState(); clearPathSVG(); highlight(); hideSidebar();
  toast('📍 Location set: ' + getRoom(youId).label.replace('\n', ' '));
}
function popupGoHere() {
  if (!pendingId) return; closePopup();
  if (!youId) { youId = pendingId; highlight(); toast('📍 Start set. Tap destination.'); return; }
  destId = pendingId; highlight(); drawPath(); showSidebar(); saveRecent(youId, destId); renderRecent(); toast('🎯 Route set!');
  announceRouteGuidance(getRoom(youId), getRoom(destId));
}

function shareRoom() {
  if (!pendingId) return;
  var room = getRoom(pendingId);
  var url = window.location.origin + window.location.pathname + '?dest=' + pendingId;

  if (navigator.share) {
    navigator.share({
      title: 'OLPC Map: ' + room.label.replace('\n', ' '),
      text: 'Check out ' + room.label.replace('\n', ' ') + ' on the OLPC campus map!',
      url: url
    }).catch(function(err) {
      console.log("Error sharing", err);
      fallbackCopyTextToClipboard(url);
    });
  } else {
    fallbackCopyTextToClipboard(url);
  }
}

function fallbackCopyTextToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      toast('🔗 Link copied to clipboard!');
    }).catch(function() {
      toast('⚠️ Failed to copy link.');
    });
  } else {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast('🔗 Link copied to clipboard!');
    } catch (err) {
      toast('⚠️ Failed to copy link.');
    }
    document.body.removeChild(textArea);
  }
}


// ============================================================
// HIGHLIGHT
// ============================================================
function highlight() {
  document.querySelectorAll('.room-g').forEach(function (g) { g.classList.remove('you', 'dest'); });
  if (youId) { var g = document.getElementById('rg-' + youId); if (g) g.classList.add('you'); }
  if (destId) { var g2 = document.getElementById('rg-' + destId); if (g2) g2.classList.add('dest'); }
}

// ============================================================
// PATH DRAWING â€” SVG inside each building's overlay
// ============================================================
function clearPathSVG() {
  document.querySelectorAll('[id^="pg-"]').forEach(function (g) { g.innerHTML = ''; });
}
function ctr(r) { return { x: r.x + r.w / 2, y: r.y + r.h / 2 }; }

function drawPath() {
  clearPathSVG(); if (!youId || !destId) return;
  var fr = getRoom(youId), to = getRoom(destId); if (!fr || !to) return;
  _switchFloor(fr.bk, fr.fk);
  if (to.bk !== fr.bk || to.fk !== fr.fk) _switchFloor(to.bk, to.fk);
  var fc = ctr(fr), tc = ctr(to);
  if (fr.bk === to.bk && fr.fk === to.fk) {
    if (fr.bk === 'be') injectPth(fr.bk, fr.fk, [fc, { x: 182, y: fc.y }, { x: 182, y: tc.y }, tc], fr, to);
    else injectPth(fr.bk, fr.fk, [fc, { x: fc.x, y: 136 }, { x: tc.x, y: 136 }, tc], fr, to);
  } else if (fr.bk === to.bk) {
    var st = DATA[fr.bk].floors[fr.fk].rooms.find(function (r) { return r.type === 'stair' && r.w > 0; }), sc = st ? ctr(st) : fc;
    injectPth(fr.bk, fr.fk, fr.bk === 'be' ? [fc, { x: 182, y: fc.y }, { x: 182, y: sc.y }, sc] : [fc, { x: fc.x, y: 136 }, { x: sc.x, y: 136 }, sc], fr, null);
    var st2 = DATA[to.bk].floors[to.fk].rooms.find(function (r) { return r.type === 'stair' && r.w > 0; }), sc2 = st2 ? ctr(st2) : tc;
    injectPth(to.bk, to.fk, to.bk === 'be' ? [sc2, { x: 182, y: sc2.y }, { x: 182, y: tc.y }, tc] : [sc2, { x: sc2.x, y: 136 }, { x: tc.x, y: 136 }, tc], null, to);
  } else {
    var stA = DATA[fr.bk].floors[fr.fk].rooms.find(function (r) { return r.type === 'stair' && r.w > 0; }), scA = stA ? ctr(stA) : fc;
    injectPth(fr.bk, fr.fk, fr.bk === 'be' ? [fc, { x: 182, y: fc.y }, { x: 182, y: scA.y }, scA] : [fc, { x: fc.x, y: 136 }, { x: scA.x, y: 136 }, scA], fr, null);
    var stB = DATA[to.bk].floors[to.fk].rooms.find(function (r) { return r.type === 'stair' && r.w > 0; }), scB = stB ? ctr(stB) : tc;
    injectPth(to.bk, to.fk, to.bk === 'be' ? [scB, { x: 182, y: scB.y }, { x: 182, y: tc.y }, tc] : [scB, { x: scB.x, y: 136 }, { x: tc.x, y: 136 }, tc], null, to);
  }
  highlight();
}

function injectPth(bk, fk, pts, fromR, toR) {
  var g = document.getElementById('pg-' + bk + '-' + fk); if (!g || pts.length < 2) return;
  var d = pts.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
  var h = '<path d="' + d + '" class="rt-glow"/><path d="' + d + '" class="rt-path"/><path d="' + d + '" class="rt-anim"/>';
  if (fromR) { var c = ctr(fromR); h += '<circle cx="' + c.x + '" cy="' + (fromR.y + 12) + '" r="9" fill="#2563eb" opacity=".9"/><text x="' + c.x + '" y="' + (fromR.y + 12) + '" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#fff" font-weight="800">▲</text>'; }
  if (toR) { var c2 = ctr(toR); h += '<circle cx="' + c2.x + '" cy="' + (toR.y + 12) + '" r="9" fill="#16a34a" opacity=".9"/><text x="' + c2.x + '" y="' + (toR.y + 12) + '" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#fff" font-weight="800">★</text>'; }
  g.innerHTML = h;
}

// ============================================================
// FLOOR SWITCHING
// ============================================================
function switchF(bk, fk) {
  activeF[bk] = fk;
  Object.keys(DATA[bk].floors).forEach(function (f) { var el = document.getElementById('fl-' + bk + '-' + f); if (el) el.classList.toggle('show', f === fk); });
  document.querySelectorAll('#ft-' + bk + ' .ftab').forEach(function (t, i) { t.className = 'ftab' + (Object.keys(DATA[bk].floors)[i] === fk ? ' on-' + bk : ''); });
  highlight();
}
function _switchFloor(bk, fk) {
  activeF[bk] = fk;
  Object.keys(DATA[bk].floors).forEach(function (f) { var el = document.getElementById('fl-' + bk + '-' + f); if (el) el.classList.toggle('show', f === fk); });
  document.querySelectorAll('#ft-' + bk + ' .ftab').forEach(function (t, i) { t.className = 'ftab' + (Object.keys(DATA[bk].floors)[i] === fk ? ' on-' + bk : ''); });
}

// ============================================================
// STEPS
// ============================================================
function buildSteps(fr, to) {
  var bn = function (b) { return b === 'be' ? 'Basic Education' : 'New Building'; }, ss = [];
  ss.push({ icon: '📍', text: 'Start at <strong>' + fr.label.replace('\n', ' ') + '</strong>', type: 'start' });
  if (fr.bk !== to.bk) {
    ss.push({ icon: '🚶', text: 'Walk to the corridor and exit <strong>' + bn(fr.bk) + '</strong>', type: 'walk' });
    ss.push({ icon: '🏃', text: 'Cross campus to <strong>' + bn(to.bk) + '</strong>', type: 'walk' });
    if (fr.fk !== to.fk) ss.push({ icon: '🪜', text: 'Take staircase to <strong>' + (FL[to.fk] || to.fk) + '</strong>', type: 'stairs' });
    ss.push({ icon: '🚶', text: 'Follow corridor to destination', type: 'walk' });
  } else if (fr.fk !== to.fk) {
    ss.push({ icon: '🚶', text: 'Walk to the corridor', type: 'walk' });
    ss.push({ icon: '🪜', text: 'Take staircase to <strong>' + (FL[to.fk] || to.fk) + '</strong>', type: 'stairs' });
    ss.push({ icon: '🚶', text: 'Follow corridor', type: 'walk' });
  } else {
    ss.push({ icon: '🚶', text: 'Walk ' + (fr.bk === 'be' ? (to.y > fr.y ? 'downward' : 'upward') : (to.x > fr.x ? 'right' : 'left')) + ' along the corridor', type: 'walk' });
  }
  ss.push({ icon: '🎯', text: 'Arrive at <strong>' + to.label.replace('\n', ' ') + '</strong> ✓', type: 'arrive' });
  return ss;
}

// ============================================================
// SIDEBAR
// ============================================================
function showSidebar() {
  var fr = getRoom(youId), to = getRoom(destId); if (!fr || !to) return;
  var bn = function (b) { return b === 'be' ? 'Basic Education' : 'New Building'; };
  document.getElementById('rFrom').textContent = fr.label.replace('\n', ' ');
  document.getElementById('rFromSub').textContent = bn(fr.bk) + ' · ' + (FL[fr.fk] || fr.fk);
  document.getElementById('rTo').textContent = to.label.replace('\n', ' ');
  document.getElementById('rToSub').textContent = bn(to.bk) + ' · ' + (FL[to.fk] || to.fk);
  document.getElementById('rtEtaTxt').textContent = estimateWalkTime(fr, to);
  arSteps = buildSteps(fr, to); arStepIdx = 0;
  arMapNeedsRedraw = true;
  renderSidebarSteps();
  document.getElementById('sbDefaultPanel').style.display = 'none';
  document.getElementById('routePanel').classList.add('show');
}
function renderSidebarSteps() {
  document.getElementById('steps').innerHTML = arSteps.map(function (s, i) {
    return '<div class="step' + (i === arStepIdx ? ' active-step' : '') + '" id="sb-step-' + i + '"><div class="step-n' + (i < arStepIdx ? ' done' : '') + '">' +
      (i < arStepIdx ? '✓' : (i + 1)) + '</div><div class="step-t">' + s.text + '</div></div>';
  }).join('');
}
function hideSidebar() {
  document.getElementById('sbDefaultPanel').style.display = '';
  document.getElementById('routePanel').classList.remove('show');
  renderRecent();
}
function clearRoute() {
  youId = null; destId = null; arStepIdx = 0; arLaunchDist = null; arPathDots = [];
  resetVoiceGuidanceState();
  clearPathSVG(); highlight(); hideSidebar(); toast('📍 Cleared.');
}

// ============================================================
// AR NAVIGATION
// ============================================================
function launchAR() {
  if (!youId || !destId) { toast('⚠️ Set origin and destination first.'); return; }
  arStepIdx = 0;
  arStableDist = null;
  arStableBadgeGPS = null;
  resetVoiceGuidanceState();
  var to = getRoom(destId), fr = getRoom(youId);
  var startGPS = (userGPS.lat && userGPS.accuracy < 60) ? { lat: userGPS.lat, lng: userGPS.lng } : roomToGPS(fr);
  var destGPS = roomToGPS(to);
  arLaunchDist = gpsDistance(startGPS.lat, startGPS.lng, destGPS.lat, destGPS.lng);
  var bn = to.bk === 'be' ? 'Basic Education' : 'New Building';
  document.getElementById('arDestNamePill').textContent = to.label.replace('\n', ' ');
  document.getElementById('arDestSubPill').textContent = bn + ' · ' + (FL[to.fk] || to.fk);
  document.getElementById('arDestIcon').textContent = getRoomIcon(to);
  document.getElementById('arEtaChip').textContent = '🚶 ' + estimateWalkTime(fr, to);
  arSteps = buildSteps(fr, to);
  buildARPathDots(); updateARStepUI();
  document.getElementById('arView').classList.add('show');
  primeARCache();
  arMapNeedsRedraw = true;
  arLastCamFrameAt = 0;
  arLastMapFrameAt = 0;
  startCamera(); startARLoop(); startCompass();
  lastStepGPS = userGPS.lat ? { lat: userGPS.lat, lng: userGPS.lng } : null;
  if (arSteps.length > 1) speakGuidance('AR navigation started. ' + toSpokenText(arSteps[1].text), 'ar:start:' + destId, 0);
}

function buildARPathDots() {
  arPathDots = []; if (!youId || !destId) return;
  var fr = getRoom(youId), to = getRoom(destId); if (!fr || !to) return;
  var gpsFr = (userGPS.lat && userGPS.accuracy < 60) ? { lat: userGPS.lat, lng: userGPS.lng } : roomToGPS(fr);
  var gpsTo = roomToGPS(to);
  // Build dots from the live position toward the destination
  var N = 13;
  for (var i = 0; i <= N; i++) {
    arPathDots.push({
      lat: gpsFr.lat + (gpsTo.lat - gpsFr.lat) * i / N,
      lng: gpsFr.lng + (gpsTo.lng - gpsFr.lng) * i / N
    });
  }
  arMapNeedsRedraw = true;
}

function buildARPathDotsAsPixels() {
  if (!map) return [];
  return arPathDots.map(function (p) { return map.latLngToContainerPoint([p.lat, p.lng]); });
}

async function startCamera() {
  var vid = document.getElementById('arVideo'), fb = document.getElementById('camFallback');
  try {
    arStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    var track = arStream.getVideoTracks()[0];
    var settings = track && typeof track.getSettings === 'function' ? track.getSettings() : {};
    var preferMirroredPreview = settings && settings.facingMode === 'user';
    arVideoMirrorApplied = preferMirroredPreview;
    arOverlayMirrored = preferMirroredPreview;
    vid.srcObject = arStream;
    vid.style.transform = arVideoMirrorApplied ? 'scaleX(-1)' : 'scaleX(1)';
    vid.style.display = 'block';
    fb.style.display = 'none';
  } catch (e) { vid.style.display = 'none'; fb.style.display = 'flex'; }
}

function primeARCache() {
  cachedAR.camSection = cachedAR.camSection || document.querySelector('.ar-cam-section');
  cachedAR.mapSection = cachedAR.mapSection || document.querySelector('.ar-map-section');
  cachedAR.camCanvas = cachedAR.camCanvas || document.getElementById('arCanvas');
  cachedAR.mapCanvas = cachedAR.mapCanvas || document.getElementById('arMapCanvas');
  if (cachedAR.camCanvas && !cachedAR.camCtx) cachedAR.camCtx = cachedAR.camCanvas.getContext('2d');
  if (cachedAR.mapCanvas && !cachedAR.mapCtx) cachedAR.mapCtx = cachedAR.mapCanvas.getContext('2d');
}

function startARLoop() {
  if (arAnimFrame) cancelAnimationFrame(arAnimFrame);
  primeARCache();
  function loop(ts) {
    var camCanvas = cachedAR.camCanvas, mapCanvas = cachedAR.mapCanvas, camSec = cachedAR.camSection;
    if (camSec && camCanvas) {
      var w = camSec.clientWidth, h = camSec.clientHeight;
      if (camCanvas.width !== w || camCanvas.height !== h) { camCanvas.width = w; camCanvas.height = h; }
    }
    if (camCanvas && (!arLastCamFrameAt || ts - arLastCamFrameAt >= 33)) {
      drawARCamOverlay(camCanvas, cachedAR.camCtx);
      arLastCamFrameAt = ts;
    }
    if (mapCanvas && (arMapNeedsRedraw || !arLastMapFrameAt)) {
      drawARMapView(mapCanvas, cachedAR.mapCtx);
      arLastMapFrameAt = ts;
      arMapNeedsRedraw = false;
    }
    arAnimFrame = requestAnimationFrame(loop);
  }
  arAnimFrame = requestAnimationFrame(loop);
}

function normalizeHeadingDelta(delta) {
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

function getARHorizontalOffset(diff, laneWidth) {
  if (!arHasHeading) return 0;
  var signedDiff = arOverlayMirrored ? -diff : diff;
  return Math.max(-laneWidth, Math.min(laneWidth, (signedDiff / 60) * laneWidth));
}

function drawARCamOverlay(canvas, ctx) {
  ctx = ctx || canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  var remainingDist = 0;
  if (userGPS.lat && destId) {
    var curTo = getRoom(destId), curDestGPS = roomToGPS(curTo);
    remainingDist = gpsDistance(userGPS.lat, userGPS.lng, curDestGPS.lat, curDestGPS.lng);
  } else if (arStableDist !== null) remainingDist = arStableDist;
  var refDist = Math.max(arLaunchDist || remainingDist || 1, 1);
  var remainingRatio = Math.max(.18, Math.min(1, remainingDist / refDist || 1));
  var baseY = H * .87, horizY = H * (.20 + .12 * (1 - remainingRatio)), cx = W / 2;
  var routeDots = [], leadX = cx;
  if (userGPS.lat && arPathDots.length) {
    var usableDots = arPathDots.slice(1, Math.min(arPathDots.length, 11));
    usableDots.forEach(function (p, idx) {
      var t = usableDots.length === 1 ? 1 : idx / (usableDots.length - 1);
      var bearing = calculateBearing(userGPS.lat, userGPS.lng, p.lat, p.lng);
      var diff = normalizeHeadingDelta(bearing - arDeviceHeading);
      var depth = 1 - Math.pow(1 - t, 1.35); // 0 corresponds to closest
      var laneWidth = (1 - depth) * (W * .20) + W * .015;
      var x = cx + getARHorizontalOffset(diff, laneWidth);
      var y = baseY - (baseY - horizY) * depth;
      
      // Invert perspective rendering: Closest is largest, furthest is smallest.
      var r = Math.max(4, 18 - depth * 14); // closest 18px, furthest 4px
      routeDots.push({ x: x, y: y, r: r, alpha: 0.25 + (1 - depth) * 0.75 });
    });
    if (routeDots.length) leadX = routeDots[0].x;
  } else {
    var numDots = Math.max(4, Math.round(11 * remainingRatio));
    var curveXTarget = 0;
    if (userGPS.lat && destId) {
      var toR = getRoom(destId), destGPSPos = roomToGPS(toR);
      var targetBearing = calculateBearing(userGPS.lat, userGPS.lng, destGPSPos.lat, destGPSPos.lng);
      var diff = normalizeHeadingDelta(targetBearing - arDeviceHeading);
      curveXTarget = arHasHeading ? getARHorizontalOffset(diff, W * .26) : 0;
    }
    for (var i = 0; i < numDots; i++) {
      var t2 = numDots > 1 ? i / (numDots - 1) : 0;
      var r = Math.max(4, 18 - t2 * 14);
      routeDots.push({ x: cx + curveXTarget * t2, y: baseY - (baseY - horizY) * t2, r: r, alpha: 0.25 + (1 - t2) * 0.75 });
    }
    leadX = cx + curveXTarget;
  }

  // Pre-calculate goal dot before sorting
  var goalDot = routeDots.length ? routeDots[routeDots.length - 1] : { x: leadX, y: horizY + 15 };
  var curveX = leadX - cx;

  // Painter's algorithm: sort ascending by radius (smallest/furthest drawn first!)
  routeDots.sort(function(a, b) { return a.r - b.r; });

  routeDots.forEach(function (dot) {
    var alpha = Math.min(1, Math.max(0, dot.alpha));
    var r = dot.r;
    
    ctx.save();
    // Add glowing orbit
    ctx.shadowColor = 'rgba(56,189,248,' + (alpha * 0.8) + ')';
    ctx.shadowBlur = r * 1.5;

    // 3D Sphere gradient
    var radGrad = ctx.createRadialGradient(
      dot.x, dot.y - r * 0.2, r * 0.1, 
      dot.x, dot.y, r
    );
    radGrad.addColorStop(0, 'rgba(255,255,255,' + Math.min(1, alpha + 0.3) + ')');   // Center white highlight
    radGrad.addColorStop(0.3, 'rgba(125,211,252,' + alpha + ')');   // Cyan highlight
    radGrad.addColorStop(0.7, 'rgba(2,132,199,' + (alpha * 0.9) + ')'); // Deep blue main body
    radGrad.addColorStop(1, 'rgba(12,74,110,' + (alpha * 0.6) + ')');   // Darker rim edge

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
    ctx.fillStyle = radGrad;
    ctx.fill();
    ctx.restore();
  });

  if (arStepIdx >= arSteps.length - 1) {
    ctx.save(); ctx.shadowBlur = 24; ctx.shadowColor = '#22c55e';
    ctx.fillStyle = 'rgba(34,197,94,.9)'; ctx.beginPath(); ctx.arc(goalDot.x, goalDot.y, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('★', cx + curveX * .8, horizY + 15); ctx.restore();
  }
  if (Math.abs(curveX) > 10) {
    ctx.save(); ctx.globalAlpha = .4 + .3 * Math.sin(Date.now() / 450);
    ctx.font = 'bold 34px sans-serif'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(curveX > 0 ? '→' : '←', cx + (curveX > 0 ? 80 : -80), H * .55); ctx.restore();
  }
}

function arCorridorPath(bk, fromPt, toPt) {
  if (!fromPt || !toPt) return [];
  if (bk === 'be') return [fromPt, { x: 182, y: fromPt.y }, { x: 182, y: toPt.y }, toPt];
  return [fromPt, { x: fromPt.x, y: 136 }, { x: toPt.x, y: 136 }, toPt];
}

function getARMapState() {
  var fallback = {
    mode: 'single',
    panels: [{ bk: 'nb', fk: activeF.nb || 'second', fromRoom: null, toRoom: null, path: [] }]
  };
  var from = youId ? getRoom(youId) : null;
  var to = destId ? getRoom(destId) : null;
  if (!from && !to) return fallback;
  if (!to) {
    return {
      mode: 'single',
      panels: [{ bk: from.bk, fk: from.fk, fromRoom: from, toRoom: null, path: [], showOrigin: true, showDestination: false }]
    };
  }

  if (from && from.bk === to.bk && from.fk === to.fk) {
    return {
      mode: 'single',
      panels: [{ bk: to.bk, fk: to.fk, fromRoom: from, toRoom: to, path: arCorridorPath(to.bk, ctr(from), ctr(to)), showOrigin: true, showDestination: true }]
    };
  }

  if (from && from.bk !== to.bk) {
    var fromStair = DATA[from.bk].floors[from.fk].rooms.find(function (r) { return r.type === 'stair' && r.w > 0; }) || null;
    var toStair = DATA[to.bk].floors[to.fk].rooms.find(function (r) { return r.type === 'stair' && r.w > 0; }) || null;
    var dualPanels = [
      {
        bk: from.bk,
        fk: from.fk,
        fromRoom: from,
        toRoom: fromStair,
        path: fromStair ? arCorridorPath(from.bk, ctr(from), ctr(fromStair)) : [],
        showOrigin: true,
        showDestination: false
      },
      {
        bk: to.bk,
        fk: to.fk,
        fromRoom: toStair,
        toRoom: to,
        path: toStair ? arCorridorPath(to.bk, ctr(toStair), ctr(to)) : [],
        showOrigin: false,
        showDestination: true
      }
    ];
    dualPanels.sort(function (a, b) {
      if (a.bk === b.bk) return 0;
      if (a.bk === 'be') return -1;
      if (b.bk === 'be') return 1;
      return a.bk.localeCompare(b.bk);
    });
    return {
      mode: 'dual',
      panels: dualPanels
    };
  }

  var floorRooms = DATA[to.bk].floors[to.fk].rooms;
  var stair = floorRooms.find(function (r) { return r.type === 'stair' && r.w > 0; }) || null;
  var startRoom = stair || (from && from.bk === to.bk && from.fk === to.fk ? from : null);
  var startPt = startRoom ? ctr(startRoom) : null;
  return {
    mode: 'single',
    panels: [{
      bk: to.bk,
      fk: to.fk,
      fromRoom: startRoom,
      toRoom: to,
      path: startPt ? arCorridorPath(to.bk, startPt, ctr(to)) : [],
      showOrigin: true,
      showDestination: true
    }]
  };
}

function arCanvasRoomStyle(type) {
  if (type === 'classroom') return { fill: 'rgba(239,244,255,.96)', stroke: 'rgba(126,157,233,.58)', text: '#4473d0' };
  if (type === 'lab' || type === 'library') return { fill: 'rgba(237,250,244,.96)', stroke: 'rgba(90,200,143,.58)', text: '#2f9b63' };
  if (type === 'office') return { fill: 'rgba(244,240,255,.96)', stroke: 'rgba(160,145,232,.56)', text: '#6d58bf' };
  if (type === 'stair' || type === 'toilet') return { fill: 'rgba(251,247,232,.96)', stroke: 'rgba(220,185,110,.56)', text: '#9e7931' };
  if (type === 'corridor') return { fill: 'rgba(223,236,244,.72)', stroke: 'rgba(171,198,214,.45)', text: '#7a95a9' };
  return { fill: 'rgba(246,249,251,.96)', stroke: 'rgba(159,184,197,.5)', text: '#5d7686' };
}

function drawARRoundedRect(ctx, x, y, w, h, r) {
  var radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawARPanel(ctx, panel, box) {
  var bd = DATA[panel.bk], fd = bd.floors[panel.fk];
  if (!bd || !fd) return;

  function toPx(pt) {
    return {
      x: box.x + pt.x * box.scale,
      y: box.y + pt.y * box.scale
    };
  }

  drawARRoundedRect(ctx, box.x, box.y, bd.svgW * box.scale, bd.svgH * box.scale, 5);
  ctx.fillStyle = panel.bk === 'nb' ? 'rgba(225, 242, 250, .72)' : 'rgba(233, 230, 252, .66)';
  ctx.strokeStyle = panel.bk === 'nb' ? 'rgba(114, 204, 236, .78)' : 'rgba(152, 144, 235, .68)';
  ctx.lineWidth = 1.5;
  ctx.fill();
  ctx.stroke();

  fd.rooms.forEach(function (r) {
    if (!r.w) return;
    var style = arCanvasRoomStyle(r.type);
    var x = box.x + r.x * box.scale, y = box.y + r.y * box.scale, w = r.w * box.scale, h = r.h * box.scale;
    if (r.type === 'corridor') {
      ctx.fillStyle = style.fill;
      ctx.fillRect(x, y, w, h);
      return;
    }
    drawARRoundedRect(ctx, x, y, w, h, Math.max(1.2, Math.min(3, 2.5 * box.scale)));
    ctx.fillStyle = style.fill;
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = Math.max(.8, box.scale);
    ctx.fill();
    ctx.stroke();
  });

  if (panel.path.length > 1) {
    ctx.beginPath();
    panel.path.forEach(function (pt, idx) {
      var p = toPx(pt);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = 'rgba(77, 149, 255, .16)';
    ctx.lineWidth = Math.max(5, box.scale * 10);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.beginPath();
    panel.path.forEach(function (pt, idx) {
      var p = toPx(pt);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#6f98ff';
    ctx.lineWidth = Math.max(2, box.scale * 3);
    ctx.stroke();
  }

  if (panel.fromRoom && panel.showOrigin) {
    var start = toPx(ctr(panel.fromRoom));
    ctx.beginPath();
    ctx.arc(start.x, start.y, Math.max(4.2, box.scale * 7), 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = Math.max(1.8, box.scale * 2.2);
    ctx.strokeStyle = '#5d8eff';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(start.x, start.y, Math.max(2.1, box.scale * 3), 0, Math.PI * 2);
    ctx.fillStyle = '#5d8eff';
    ctx.fill();
  }

  if (panel.toRoom && panel.showDestination) {
    var dest = toPx(ctr(panel.toRoom));
    ctx.beginPath();
    ctx.arc(dest.x, dest.y, Math.max(4, box.scale * 6), 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = Math.max(1.5, box.scale * 2);
    ctx.strokeStyle = '#3fcf79';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(dest.x, dest.y, Math.max(2, box.scale * 2.7), 0, Math.PI * 2);
    ctx.fillStyle = '#3fcf79';
    ctx.fill();
  }

  ctx.fillStyle = panel.bk === 'nb' ? 'rgba(78, 178, 214, .95)' : 'rgba(119, 108, 224, .92)';
  ctx.font = '700 8px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(panel.bk.toUpperCase(), box.x + (bd.svgW * box.scale) / 2, box.y - 4);
}

function drawARMapView(canvas, ctx) {
  var sec = cachedAR.mapSection || document.querySelector('.ar-map-section'); if (!sec) return;
  var rect = sec.getBoundingClientRect(), W = rect.width, H = rect.height;
  var mapH = Math.max(60, H);
  if (canvas.width !== W || canvas.height !== mapH) { canvas.width = W; canvas.height = mapH; }
  ctx = ctx || canvas.getContext('2d');
  ctx.clearRect(0, 0, W, mapH);
  ctx.fillStyle = 'rgba(240,246,249,.92)';
  ctx.fillRect(0, 0, W, mapH);

  var state = getARMapState();
  var panels = state.panels || [];
  if (!panels.length) return;

  var pad = 14;
  var gap = state.mode === 'dual' ? 26 : 0;
  var totalWidth = 0, maxHeight = 0;
  panels.forEach(function (panel, idx) {
    var bd = DATA[panel.bk];
    if (!bd) return;
    totalWidth += bd.svgW;
    if (idx < panels.length - 1) totalWidth += gap;
    maxHeight = Math.max(maxHeight, bd.svgH);
  });

  var scale = Math.min((W - pad * 2) / totalWidth, (mapH - pad * 2) / maxHeight);
  var startX = (W - totalWidth * scale) / 2;
  var startY = (mapH - maxHeight * scale) / 2;
  var cursorX = startX;
  var boxes = [];

  panels.forEach(function (panel) {
    var bd = DATA[panel.bk];
    var box = {
      x: cursorX,
      y: startY + (maxHeight - bd.svgH) * scale / 2,
      scale: scale
    };
    boxes.push(box);
    cursorX += (bd.svgW + gap) * scale;
  });

  if (state.mode === 'dual' && boxes.length === 2) {
    var leftBd = DATA[panels[0].bk], rightBd = DATA[panels[1].bk];
    var leftPt = {
      x: boxes[0].x + leftBd.svgW * boxes[0].scale + 5,
      y: boxes[0].y + leftBd.svgH * boxes[0].scale / 2
    };
    var rightPt = {
      x: boxes[1].x - 5,
      y: boxes[1].y + rightBd.svgH * boxes[1].scale / 2
    };
    ctx.beginPath();
    ctx.moveTo(leftPt.x, leftPt.y);
    ctx.lineTo(rightPt.x, rightPt.y);
    ctx.strokeStyle = 'rgba(77, 149, 255, .18)';
    ctx.lineWidth = Math.max(6, scale * 8);
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftPt.x, leftPt.y);
    ctx.lineTo(rightPt.x, rightPt.y);
    ctx.strokeStyle = '#6f98ff';
    ctx.setLineDash([6, 5]);
    ctx.lineWidth = Math.max(1.6, scale * 2.4);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  panels.forEach(function (panel, idx) {
    drawARPanel(ctx, panel, boxes[idx]);
  });
}

function updateARStepUI() {
  if (!arSteps.length) return;
  var s = arSteps[arStepIdx], ring = document.getElementById('arCompassRing'), arrow = document.getElementById('arDirArrow');
  ring.className = 'ar-compass-ring';
  if (s.type === 'stairs') { arrow.textContent = '🪜'; ring.classList.add('stairs'); }
  else if (s.type === 'arrive') { arrow.textContent = '★'; ring.classList.add('arrived'); }
  else if (s.text.includes('right')) arrow.textContent = '→';
  else if (s.text.includes('left')) arrow.textContent = '←';
  else if (s.text.includes('downward')) arrow.textContent = '↓';
  else arrow.textContent = '↑';
  arMapNeedsRedraw = true;
  renderSidebarSteps();
}

function updateARFromGPS() {
  if (!userGPS.lat) return;
  if (destId) {
    var to = getRoom(destId), destGPSPos = roomToGPS(to);
    var dist = gpsDistance(userGPS.lat, userGPS.lng, destGPSPos.lat, destGPSPos.lng);
    var acc = userGPS.accuracy || 999;
    var movedSinceBadge = arStableBadgeGPS ? gpsDistance(userGPS.lat, userGPS.lng, arStableBadgeGPS.lat, arStableBadgeGPS.lng) : Infinity;
    var distDelta = arStableDist === null ? Infinity : Math.abs(dist - arStableDist);
    var movementGate = Math.max(4, Math.min(12, acc * .45));
    var betterFix = !arStableBadgeGPS || (acc + 5 < (arStableBadgeGPS.accuracy || 999));
    if (arStableDist === null || dist < 8 || movedSinceBadge >= movementGate || (betterFix && distDelta >= Math.max(3, acc * .25))) {
      arStableDist = dist;
      arStableBadgeGPS = { lat: userGPS.lat, lng: userGPS.lng, accuracy: acc };
    }
    var shownDist = arStableDist === null ? dist : arStableDist;
    document.getElementById('arDistBadge').textContent = shownDist < 5 ? 'Arrived!' : Math.round(shownDist) + 'm away';
    arMapNeedsRedraw = true;
    if (dist < 8 && arStepIdx < arSteps.length - 1) {
      arStepIdx = arSteps.length - 1;
      updateARStepUI();
      toast('🎯 You have arrived!');
      return;
    }
  }
  // Faulty distance-based step advancement completely removed here.
  // We rely fully on the distance-to-destination logic above to indicate 'arrival'.
  // Steps act as a helpful reference roadmap rather than forced checkpoints prone to GPS noise.
}
function closeAR() {
  document.getElementById('arView').classList.remove('show');
  if (arStream) { arStream.getTracks().forEach(function (t) { t.stop(); }); arStream = null; }
  if (arAnimFrame) { cancelAnimationFrame(arAnimFrame); arAnimFrame = null; }
  if (arCompassHandler) { window.removeEventListener('deviceorientation', arCompassHandler, true); arCompassHandler = null; }
  arMapDotProgress = 0;
  arStableDist = null;
  arStableBadgeGPS = null;
  arLaunchDist = null;
  arHasHeading = false;
  arVideoMirrorApplied = false;
  arOverlayMirrored = false;
  arPathDots = [];
  arMapNeedsRedraw = true;
}

// ============================================================
// TOAST
// ============================================================
var toastTmr;
function toast(msg) {
  var t = document.getElementById('toast');
  document.getElementById('toastMsg').innerHTML = msg;
  t.classList.remove('hide'); clearTimeout(toastTmr);
  toastTmr = setTimeout(function () { t.classList.add('hide'); }, 3500);
}

// ============================================================
// MOBILE DRAWER
// ============================================================
function openMobileDrawer() { var sb = document.querySelector('.sidebar'), bd = document.getElementById('drawerBackdrop'); if (sb) sb.classList.add('drawer-open'); if (bd) bd.classList.add('show'); }
function closeMobileDrawer() { var sb = document.querySelector('.sidebar'), bd = document.getElementById('drawerBackdrop'); if (sb) sb.classList.remove('drawer-open'); if (bd) bd.classList.remove('show'); }
function toggleMobileDrawer() { var sb = document.querySelector('.sidebar'); if (sb && sb.classList.contains('drawer-open')) closeMobileDrawer(); else openMobileDrawer(); }

var _origShowSidebar = showSidebar;
showSidebar = function () { _origShowSidebar(); if (window.innerWidth <= 767) openMobileDrawer(); };
var _origHideSidebar = hideSidebar;
hideSidebar = function () { _origHideSidebar(); if (window.innerWidth <= 767) closeMobileDrawer(); };

// ============================================================
// ZOOM CONTROLS
// ============================================================
function zoomIn() { if (map) map.zoomIn(); }
function zoomOut() { if (map) map.zoomOut(); }

// ============================================================
// SEARCH
// ============================================================
var si = document.getElementById('searchInput'), sd = document.getElementById('sdrop');
si.addEventListener('input', function () {
  var q = si.value.trim().toLowerCase(); if (!q) { sd.classList.remove('open'); return; }
  var ms = allRooms().filter(function (r) { return r.label.toLowerCase().includes(q) || (r.tags && r.tags.some(function (t) { return t.toLowerCase().includes(q); })); }).slice(0, 8);
  if (!ms.length) { sd.classList.remove('open'); return; }  sd.innerHTML = ms.map(function (r) {
    return '<div class="sd-item" onclick="pickSearch(\'' + r.id + '\',\'' + r.bk + '\',\'' + r.fk + '\')">' +
      '<span class="sd-badge ' + (r.bk === 'be' ? 'be-badge' : 'nb-badge') + '">' + (r.bk === 'be' ? 'BE' : 'NB') + '</span>' +
      r.label.replace('\n', ' ') + ' - ' + (FL[r.fk] || r.fk) + '</div>';
  }).join('');
  sd.classList.add('open');
});
document.addEventListener('click', function (e) { if (!e.target.closest('.search-wrap')) sd.classList.remove('open'); });
function pickSearch(id, bk, fk) { sd.classList.remove('open'); si.value = ''; tapRoom(id, bk, fk); }

// ============================================================
// INSTALL APP PROMPT
// ============================================================
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  var installPromo = document.getElementById('installPromo');
  if (installPromo) {
    installPromo.style.display = 'flex';
  }
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        document.getElementById('installPromo').style.display = 'none';
      }
      deferredPrompt = null;
    });
  }
}

// ============================================================
// OFFLINE INDICATOR
// ============================================================
window.addEventListener('offline', function() {
  toast('📡 You are offline. Map is using cached data.');
});
window.addEventListener('online', function() {
  toast('📡 Back online!');
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var icon = document.getElementById('themeToggleIcon');
  var label = document.getElementById('themeToggleLabel');
  var btn = document.getElementById('themeToggle');
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '◐';
  if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  if (btn) {
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function getPreferredTheme() {
  var savedTheme = localStorage.getItem('olpc-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
  var nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('olpc-theme', nextTheme);
  applyTheme(nextTheme);
}

function normalizeUIStrings() {
  HOURS.office = 'Mon-Fri  7:30 AM - 5:00 PM';
  HOURS.library = 'Mon-Sat  7:00 AM - 6:00 PM';
  HOURS.lab = 'Mon-Fri  7:00 AM - 5:00 PM';
  HOURS.default = 'Mon-Fri  7:00 AM - 5:00 PM';

  QUICK = [
    { id: 'nb-2-lib1', icon: '📚', label: 'Library', sub: 'NB · 2nd Floor' },
    { id: 'nb-2-lib2', icon: '📚', label: 'Library', sub: 'NB · 2nd Floor' },
    { id: 'nb-1-reg', icon: '📋', label: 'Registrar', sub: 'NB · Ground' },
    { id: 'nb-1-guid', icon: '💬', label: 'Guidance', sub: 'NB · Ground' },
    { id: 'nb-2-comp', icon: '💻', label: 'Comp Lab', sub: 'NB · 2nd Floor' },
    { id: 'be-2-princ', icon: '🏫', label: 'BE Principal', sub: 'BE · 2nd Floor' }
  ];

  Object.keys(DATA).forEach(function (bk) {
    Object.keys(DATA[bk].floors).forEach(function (fk) {
      DATA[bk].floors[fk].rooms.forEach(function (room) {
        room.icon = room.icon || '🚪';
        if (room.desc) {
          room.desc = room.desc
            .replace(/â€”/g, '-')
            .replace(/â€“/g, '-')
            .replace(/Â·/g, '·');
        }
      });
    });
  });
}

var themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (themeMediaQuery && typeof themeMediaQuery.addEventListener === 'function') {
  themeMediaQuery.addEventListener('change', function (event) {
    if (localStorage.getItem('olpc-theme')) return;
    applyTheme(event.matches ? 'dark' : 'light');
  });
}

if (voiceGuidanceSupported) {
  loadVoiceGuidanceVoices();
  if (typeof window.speechSynthesis.addEventListener === 'function') {
    window.speechSynthesis.addEventListener('voiceschanged', loadVoiceGuidanceVoices);
  }
}

// ============================================================
// BOOTSTRAP
// ============================================================
normalizeUIStrings();
applyTheme(getPreferredTheme());
applyVoiceGuidancePreference(getVoiceGuidancePreference());
initLeaflet();
renderQuickGrid();
renderRecent();
startGPS();

var urlParams = new URLSearchParams(window.location.search);
var destParam = urlParams.get('dest');
if (destParam) {
  var dRoom = getRoom(destParam);
  if (dRoom) {
    // Wait briefly for GPS to try to locate user before setting route
    setTimeout(function() {
      tapRoom(dRoom.id, dRoom.bk, dRoom.fk);
    }, 800);  } else {
    toast('📍 Acquiring GPS...');
  }
} else {
  toast('📍 Acquiring GPS...');
}
function shareRoute() {
  if (!youId || !destId) return;
  var fromRoom = getRoom(youId);
  var toRoom = getRoom(destId);
  var url = window.location.origin + window.location.pathname + '?from=' + youId + '&dest=' + destId;
  var shareText = 'Route from ' + fromRoom.label.replace('\n', ' ') + ' to ' + toRoom.label.replace('\n', ' ');

  if (navigator.share) {
    navigator.share({
      title: 'OLPC Map Route',
      text: shareText,
      url: url
    }).catch(function(err) {
      console.log("Error sharing", err);
      fallbackCopyTextToClipboard(url);
    });
  } else {
    fallbackCopyTextToClipboard(url);
  }
}



