// ===================================================================
// Moment & Co. — homepage logic
// ===================================================================

function renderDesigns(list){
  const grid = document.getElementById("designsGrid");
  const empty = document.getElementById("searchEmpty");
  grid.innerHTML = "";

  if (list.length === 0){
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  list.forEach(d => {
    const card = document.createElement("article");
    card.className = "board-card";
    card.innerHTML = `
      <div class="board-thumb">
        <svg class="thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconFor(d.occasion)}</svg>
        <span class="thumb-caption">Foto desain segera hadir</span>
        <img src="${d.img}" alt="Papan ucapan akrilik ${d.name}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="board-body">
        <span class="board-occasion">${d.occasion}</span>
        <h3 class="board-name">${d.name}</h3>
        <span class="board-price">${formatRupiah(d.price)} <span class="price-unit">/ acara</span></span>
        <a class="btn btn-primary btn-full" href="board.html?id=${d.id}">Custom &amp; Sewa</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initSearch(){
  const input = document.getElementById("designSearch");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = DESIGNS.filter(d => d.name.toLowerCase().includes(q));
    renderDesigns(filtered);
  });
}

renderDesigns(DESIGNS);
initSearch();
initNavToggle();

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const revealElements = [
    ".hero-eyebrow",
    ".hero h1",
    ".hero-lead",
    ".hero-actions",
    ".hero-actions .btn-primary",
    ".designs-section .section-head h2",
    ".designs-section .section-head p",
    ".search-bar",
    ".board-card",
    ".board-body .btn-primary"
  ];

  const elements = document.querySelectorAll(
    revealElements.join(", ")
  );

  elements.forEach((el) => {
    el.classList.add("scroll-reveal");
  });


  /* Stagger khusus board card */
  document.querySelectorAll(".board-card").forEach((card, index) => {
    const delay = (index % 3) * 120;
    card.style.setProperty("--reveal-delay", `${delay}ms`);
  });


  /* Intersection Observer */
  const observer = new IntersectionObserver(
    (entries, obs) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          /*
           * Stop observing setelah muncul.
           * Jadi animasi hanya terjadi sekali.
           */
          obs.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );


  elements.forEach((el) => {
    observer.observe(el);
  });

});
