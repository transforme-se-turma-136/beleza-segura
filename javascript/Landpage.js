document.addEventListener('DOMContentLoaded', () => {
  // Menu Lateral Sidebar
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('active');
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
  }

  if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Carrossel Full Width O Boticário
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('carouselNext');
  const prevButton = document.getElementById('carouselPrev');
  const dotsNav = document.getElementById('carouselDots');
  const dots = Array.from(dotsNav.children);

  let currentIndex = 0;
  const slideCount = slides.length;

  function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel(currentIndex);
    });

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateCarousel(currentIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });

  // Auto-play do banner (a cada 5 segundos)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel(currentIndex);
  }, 5000);

  // Filtragem de Categorias
  const categoryItems = document.querySelectorAll('.category-item');
  const productCards = document.querySelectorAll('.product-card');
  const sectionTitle = document.getElementById('sectionTitle');

  const categoryNames = {
    'all': 'Promoções Populares',
    'maquiagem': 'Maquiagem & Glow',
    'roupas': 'Roupas & Estilo',
    'sapatos': 'Sapatos & Calçados',
    'cabelo': 'Cuidados com Cabelo',
    'skin-care': 'Skin Care & Rosto'
  };

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      categoryItems.forEach(cat => cat.classList.remove('active'));
      item.classList.add('active');

      const selectedCategory = item.getAttribute('data-category');
      sectionTitle.textContent = categoryNames[selectedCategory] || 'Produtos';

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Botão de Favoritar
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      const isFavorited = btn.classList.toggle('favorited');
      if (isFavorited) {
        btn.style.color = '#e53e3e';
        btn.style.background = '#fff5f5';
      } else {
        btn.style.color = '#718096';
        btn.style.background = 'rgba(255, 255, 255, 0.9)';
      }
    });
  });
});