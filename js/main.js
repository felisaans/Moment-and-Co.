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
