// ===== Dados das lojas =====
const stores = [
  { name: "Mundo do Cabeleireiro", url: "https://www.mundodocabeleireiro.com.br/", logo: "images/mundo-do-cabeleireiro.png", popular: true, freeShipping: true },
  { name: "Yes Cosméticos", url: "https://www.yescosmetics.com.br/", logo: "images/yes-cosmeticos.png", popular: true, freeShipping: false },
  { name: "Sephora", url: "https://www.sephora.com.br/", logo: "images/sephora.png", popular: true, freeShipping: true },
  { name: "Sallve", url: "https://www.sallve.com.br/", logo: "images/sallve.png", popular: true, freeShipping: true },
  { name: "Creamy", url: "https://www.creamy.com.br/", logo: "images/creamy.png", popular: false, freeShipping: true },
];

// ===== Estado =====
let activeFilter = "todos"; // "todos" | "populares" | "frete"

// ===== Ícones SVG =====
const starIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const badgeCheckIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>';

// ===== Filtro =====
function filterStores(filter) {
  if (filter === "populares") return stores.filter((store) => store.popular);
  if (filter === "frete") return stores.filter((store) => store.freeShipping);
  return stores;
}

// ===== Renderização =====
function renderStoreCard(store) {
  const card = document.createElement("article");
  card.className = "store-card";
  card.innerHTML = `
    <img class="store-logo" src="${store.logo}" alt="Logo ${store.name}" />
    <div class="store-content">
      <h2 class="store-name">${store.name}</h2>
      <span class="verified-badge">Verificado ${badgeCheckIcon}</span>
      <div class="store-actions">
        <div class="store-stars" aria-label="Avaliação: 5 de 5 estrelas">${starIcon.repeat(5)}</div>
        <a class="store-link" href="${store.url}" target="_blank" rel="noreferrer">Ir para loja</a>
      </div>
    </div>
  `;
  return card;
}

function renderStores() {
  const list = document.getElementById("store-list");
  list.replaceChildren(...filterStores(activeFilter).map(renderStoreCard));
}

// ===== Eventos dos filtros =====
document.getElementById("filters").addEventListener("click", (event) => {
  const button = event.target.closest(".filter-button");
  if (!button) return;

  activeFilter = button.dataset.filter;

  document.querySelectorAll(".filter-button").forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  renderStores();
});

// ===== Botão voltar =====
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back();
});

// ===== Inicialização =====
renderStores();
