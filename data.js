var RC = {
  classroom: { f: 'rgba(59,130,246,.12)', s: 'rgba(37,99,235,.45)' },
  lab: { f: 'rgba(6,160,90,.12)', s: 'rgba(5,150,105,.42)' },
  library: { f: 'rgba(8,145,178,.12)', s: 'rgba(6,182,212,.42)' },
  office: { f: 'rgba(124,58,237,.12)', s: 'rgba(139,92,246,.42)' },
  toilet: { f: 'rgba(14,165,233,.10)', s: 'rgba(14,165,233,.38)' },
  stair: { f: 'rgba(217,119,6,.14)', s: 'rgba(245,158,11,.42)' },
  corridor: { f: 'rgba(148,163,184,.18)', s: 'rgba(100,116,139,.3)' }
};

var FL = { ground: 'Ground Floor', second: '2nd Floor', third: '3rd Floor' };

function mk(id, lb, tp, x, y, w, h, desc, tags, icon) {
  return { id, label: lb, type: tp, x, y, w, h, desc: desc || '', tags: tags || [], icon: icon || '🚪' };
}

var HOURS = {
  office: 'Mon-Fri  7:30 AM - 5:00 PM',
  library: 'Mon-Sat  7:00 AM - 6:00 PM',
  lab: 'Mon-Fri  7:00 AM - 5:00 PM',
  classroom: 'Varies by schedule',
  toilet: 'Always Open',
  stair: 'Always Open',
  default: 'Mon-Fri  7:00 AM - 5:00 PM'
};

var NB_SVG_W = 978;
var NB_SVG_H = 155;
var BE_SVG_W = 410;
var BE_SVG_H = 720;

var DATA = {
  nb: {
    name: 'New Building', cardLeft: 120, cardTop: 60,
    svgW: NB_SVG_W, svgH: NB_SVG_H,
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
          mk('nb-1-r111', 'Room 111', 'classroom', 828, 0, 55, 57, 'College classroom.', ['College']),
          mk('nb-1-r112', 'Room 112', 'classroom', 828, 59, 55, 61, 'College classroom.', ['College']),
          mk('nb-1-tf', 'F.Toilet', 'toilet', 885, 0, 46, 57, 'Female comfort room.', ['Facility']),
          mk('nb-1-tm', 'M.Toilet', 'toilet', 885, 59, 46, 61, 'Male comfort room.', ['Facility']),
          mk('nb-1-stl2', 'STAIR', 'stair', 933, 0, 38, 120, 'Secondary staircase.', ['Accessible']),
          mk('nb-1-corr', 'CORRIDOR', 'corridor', 38, 122, 938, 28)
        ]
      },
      second: {
        label: '2nd Floor', rooms: [
          mk('nb-2-stl', 'STAIR', 'stair', 0, 0, 36, 120, 'Main staircase.', ['Accessible']),
          mk('nb-2-lib1', 'Library', 'library', 38, 0, 118, 120, 'Library - reading & periodicals.', ['Library', 'Reading']),
          mk('nb-2-lib2', 'Library', 'library', 158, 0, 74, 120, 'Library - digital & references.', ['Library', 'Digital']),
          mk('nb-2-lib3', 'Library', 'library', 234, 0, 74, 120, 'Library - digital & references.', ['Library', 'Digital']),
          mk('nb-2-r205', 'Room 205', 'classroom', 310, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-r206', 'Room 206', 'classroom', 386, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-comp', 'Comp Lab', 'lab', 462, 0, 74, 120, 'Computer lab.', ['Computer', 'Lab']),
          mk('nb-2-r208', 'Room 208', 'classroom', 538, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-r209', 'Room 209', 'classroom', 614, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-r210', 'Room 210', 'classroom', 690, 0, 74, 120, 'College classroom.', ['College']),
          mk('nb-2-crime', 'Crime Lab', 'lab', 766, 0, 74, 120, 'Criminology lab.', ['Criminology', 'Lab']),
          mk('nb-2-r212', 'Room 212', 'classroom', 842, 0, 72, 120, 'College classroom.', ['College']),
          mk('nb-2-stl2', 'STAIR', 'stair', 916, 0, 36, 120, 'Secondary staircase.', ['Accessible']),
          mk('nb-2-corr', 'CORRIDOR', 'corridor', 38, 122, 914, 28)
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
          mk('nb-3-corr', 'CORRIDOR', 'corridor', 38, 122, 914, 28)
        ]
      }
    }
  },

  be: {
    name: 'Basic Education', cardLeft: 30, cardTop: 260,
    svgW: BE_SVG_W, svgH: BE_SVG_H,
    floors: {
      ground: {
        label: 'Ground Floor', rooms: [
          mk('be-g-tf', 'F.Toilet', 'toilet', 2, 0, 62, 26, 'Female comfort room.', ['Facility']),
          mk('be-g-tm', 'M.Toilet', 'toilet', 2, 27, 62, 26, 'Male comfort room.', ['Facility']),
          mk('be-g-stl', 'STAIR', 'stair', 66, 0, 32, 54, 'Staircase.', ['Accessible']),
          mk('be-g-corr-top', 'CORRIDOR', 'corridor', 100, 0, 191, 54),
          mk('be-g-c1', 'Room 101', 'classroom', 0, 56, 155, 50, 'Grade 1.', ['Grade 1', 'K-12']),
          mk('be-g-c2', 'Room 102', 'classroom', 0, 108, 155, 50, 'Grade 2.', ['Grade 2', 'K-12']),
          mk('be-g-c3', 'Room 103', 'classroom', 0, 160, 155, 50, 'Grade 3.', ['Grade 3', 'K-12']),
          mk('be-g-c4', 'Room 104', 'classroom', 0, 212, 155, 50, 'Grade 4.', ['Grade 4', 'K-12']),
          mk('be-g-c5', 'Room 105', 'classroom', 0, 264, 155, 50, 'Grade 5.', ['Grade 5', 'K-12']),
          mk('be-g-c6', 'Room 106', 'classroom', 0, 316, 155, 50, 'Grade 6.', ['Grade 6', 'K-12']),
          mk('be-g-c7', 'Room 107', 'classroom', 0, 368, 155, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-c8', 'Room 108', 'classroom', 0, 420, 155, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-c9', 'Room 109', 'classroom', 0, 472, 155, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-c10', 'Room 110', 'classroom', 0, 524, 155, 50, 'JHS.', ['JHS', 'K-12']),
          mk('be-g-tf2', 'F.Toilet', 'toilet', 2, 576, 62, 26, 'Female comfort room.', ['Facility']),
          mk('be-g-tm2', 'M.Toilet', 'toilet', 2, 603, 62, 26, 'Male comfort room.', ['Facility']),
          mk('be-g-stl2', 'STAIR', 'stair', 66, 576, 32, 54, 'Staircase.', ['Accessible']),
          mk('be-g-corr-bot', 'CORRIDOR', 'corridor', 100, 576, 191, 54),
          mk('be-g-corr-side', 'CORRIDOR', 'corridor', 157, 56, 130, 520)
        ]
      },
      second: {
        label: '2nd Floor', rooms: [
          mk('be-2-tle', 'T.L.E. Lab', 'lab', 0, 0, 93, 54, 'Technology & Livelihood Education lab.', ['TLE', 'Lab']),
          mk('be-2-tm2', 'M.Toilet', 'toilet', 95, 0, 28, 26, 'Male comfort room.', ['Facility']),
          mk('be-2-tf2', 'F.Toilet', 'toilet', 95, 28, 28, 26, 'Female comfort room.', ['Facility']),
          mk('be-2-stl2', 'STAIR', 'stair', 125, 0, 30, 54, 'Staircase.', ['Accessible']),
          mk('be-2-extra-top', 'CORRIDOR', 'corridor', 157, 0, 130, 54),
          mk('be-2-g11stem', 'Gr.11 STEM', 'classroom', 0, 56, 155, 44, 'Grade 11 STEM.', ['SHS', 'STEM']),
          mk('be-2-g12stem', 'Gr.12 STEM', 'classroom', 0, 102, 155, 44, 'Grade 12 STEM.', ['SHS', 'STEM']),
          mk('be-2-g12abm', 'Gr.12\nABM/HUMSS', 'classroom', 0, 148, 155, 52, 'Grade 12 ABM/HUMSS.', ['SHS', 'Grade 12']),
          mk('be-2-g11abm', 'Gr.11\nABM/HUMSS', 'classroom', 0, 202, 155, 52, 'Grade 11 ABM/HUMSS.', ['SHS', 'Grade 11']),
          mk('be-2-fac', 'FACULTY', 'office', 0, 256, 155, 54, 'BE Faculty Room.', ['Faculty', 'Staff']),
          mk('be-2-princ', 'Principal\nOffice', 'office', 0, 312, 155, 54, 'BE Principal Office.', ['Admin', 'Office']),
          mk('be-2-sci2', 'SCI LAB', 'lab', 0, 368, 155, 50, 'Secondary science lab.', ['Science', 'Lab']),
          mk('be-2-chem', 'Chemistry\nLab', 'lab', 0, 420, 155, 50, 'Chemistry lab.', ['Chemistry', 'Lab']),
          mk('be-2-sci1', 'SCI LAB', 'lab', 0, 472, 155, 50, 'Science lab.', ['Science', 'Lab']),
          mk('be-2-com', 'COM LAB', 'lab', 0, 524, 155, 50, 'Computer lab.', ['Computer', 'Lab', 'ICT']),
          mk('be-2-stl', 'STAIR', 'stair', 66, 576, 32, 54, 'Staircase.', ['Accessible']),
          mk('be-2-tf', 'F.Toilet', 'toilet', 2, 576, 62, 26, 'Female comfort room.', ['Facility']),
          mk('be-2-tm', 'M.Toilet', 'toilet', 2, 603, 62, 26, 'Male comfort room.', ['Facility']),
          mk('be-2-pray', 'Prayer\nRoom', 'office', 290, 210, 70, 120, 'Prayer Room.', ['Chapel', 'Prayer']),
          mk('be-2-corr-top', 'CORRIDOR', 'corridor', 100, 576, 191, 54),
          mk('be-2-corr-bot', 'CORRIDOR', 'corridor', 157, 56, 130, 520)
        ]
      }
    }
  }
};

var QUICK = [
  { id: 'nb-2-lib1', icon: '📚', label: 'Library (1)', sub: 'NB · 2nd Floor' },
  { id: 'nb-2-lib2', icon: '📚', label: 'Library (2)', sub: 'NB · 2nd Floor' },
  { id: 'nb-1-reg', icon: '📋', label: 'Registrar', sub: 'NB · Ground' },
  { id: 'nb-1-guid', icon: '💬', label: 'Guidance', sub: 'NB · Ground' },
  { id: 'nb-2-comp', icon: '💻', label: 'Comp Lab', sub: 'NB · 2nd Floor' },
  { id: 'be-2-princ', icon: '🏫', label: 'BE Principal', sub: 'BE · 2nd Floor' }
];
