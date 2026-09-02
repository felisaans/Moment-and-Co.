// ===================================================================
// Moment & Co. — shared design catalog
// ===================================================================

const DESIGNS = [
  { id: 1,  name: "Blooming Congratulations", occasion: "Wisuda",       price: 50000, img: "images/design-01.jpg" },
  { id: 2,  name: "Soft Graduation",           occasion: "Wisuda",       price: 65000, img: "images/design-02.jpg" },
  { id: 3,  name: "Classic Achievement",       occasion: "Wisuda",       price: 65000, img: "images/design-03.jpg" },
  { id: 4,  name: "Garden Celebration",        occasion: "Wisuda",       price: 95000, img: "images/design-04.jpg" },
  { id: 5,  name: "Elegant White",             occasion: "Wisuda",       price: 75000, img: "images/design-05.jpg" },
  { id: 6,  name: "Forever & Always",          occasion: "Pernikahan",   price: 55000, img: "images/design-06.jpg" },
  { id: 7,  name: "Love in Bloom",             occasion: "Pernikahan",   price: 85000, img: "images/design-07.jpg" },
  { id: 8,  name: "Grand Opening",             occasion: "Grand Opening",price: 85000, img: "images/design-08.jpg" },
  { id: 9,  name: "New Beginning",             occasion: "Soft Opening", price: 55000, img: "images/design-09.jpg" },
  { id: 10, name: "Officially Yours",          occasion: "Pelantikan",   price: 45000, img: "images/design-10.jpg" },
  { id: 11, name: "New Chapter",               occasion: "Wisuda",       price: 50000, img: "images/design-11.jpg" },
  { id: 12, name: "Golden Anniversary",        occasion: "Anniversary",  price: 65000, img: "images/design-12.jpg" },
  { id: 13, name: "Sweet Celebration",         occasion: "Anniversary",  price: 75000, img: "images/design-13.jpg" },
  { id: 14, name: "Grand Launch",              occasion: "Opening",      price: 80000, img: "images/design-14.jpg" },
  { id: 15, name: "Minimal Moment",            occasion: "Semua Acara",  price: 75000, img: "images/design-15.jpg" },
];

const ICONS = {
  "Wisuda": '<path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 8v6"/>',
  "Pernikahan": '<circle cx="9" cy="14" r="4.5"/><circle cx="16" cy="10" r="4.5"/>',
  "Grand Opening": '<path d="M3 21h18"/><path d="M5 21V10l7-6 7 6v11"/><path d="M10 21v-6h4v6"/>',
  "Opening": '<path d="M3 21h18"/><path d="M5 21V10l7-6 7 6v11"/><path d="M10 21v-6h4v6"/>',
  "Soft Opening": '<path d="M12 21c-4-2-6-5-6-9a6 6 0 0 1 12 0c0 4-2 7-6 9Z"/><path d="M12 12v9"/>',
  "Pelantikan": '<circle cx="12" cy="8" r="5"/><path d="m8.5 12.5-2 8.5 5.5-3 5.5 3-2-8.5"/>',
  "Anniversary": '<path d="M12 21s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z"/>',
  "Semua Acara": '<path d="M12 3c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6Z"/><path d="M12 21c1.5-2 1.5-4 0-6-1.5 2-1.5 4 0 6Z"/><path d="M3 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0Z"/><path d="M15 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0Z"/><circle cx="12" cy="12" r="2"/>',
};

function formatRupiah(n){
  return "Rp" + n.toLocaleString("id-ID");
}

function iconFor(occasion){
  return ICONS[occasion] || ICONS["Semua Acara"];
}
