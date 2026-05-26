// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== MENU DATA with real Unsplash photos =====
const menuItems = [
  {
    id: 1, name: 'Classic Espresso', category: 'hot',
    desc: 'Rich, bold single-origin shot with a golden crema finish.',
    price: 'Rs. 320', tag: 'Hot',
    img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80'
  },
  {
    id: 2, name: 'Cappuccino', category: 'hot',
    desc: 'Equal parts espresso, steamed milk, and velvety foam.',
    price: 'Rs. 450', tag: 'Hot',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
  },
  {
    id: 3, name: 'Flat White', category: 'hot',
    desc: 'Double ristretto with silky microfoam — the barista\'s choice.',
    price: 'Rs. 490', tag: 'Hot',
    img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=500&q=80'
  },
  {
    id: 4, name: 'Pour Over', category: 'hot',
    desc: 'Hand-poured single-origin, bright and floral with clean finish.',
    price: 'Rs. 550', tag: 'Hot',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80'
  },
  {
    id: 5, name: 'Cold Brew', category: 'cold',
    desc: 'Steeped 18 hours for smooth, low-acid iced perfection.',
    price: 'Rs. 520', tag: 'Cold',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80'
  },
  {
    id: 6, name: 'Iced Mocha', category: 'cold',
    desc: 'Espresso, dark chocolate, milk over ice. Pure indulgence.',
    price: 'Rs. 570', tag: 'Cold',
    img: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=500&q=80'
  },
  {
    id: 7, name: 'Matcha Latte', category: 'cold',
    desc: 'Ceremonial grade matcha with oat milk and a hint of honey.',
    price: 'Rs. 540', tag: 'Cold',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80'
  },
  {
    id: 8, name: 'Iced Coffee', category: 'cold',
    desc: 'Chilled espresso with fresh ice and creamy milk. Refreshing.',
    price: 'Rs. 480', tag: 'Cold',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80'
  },
  {
    id: 9, name: 'Affogato', category: 'special',
    desc: 'Hot espresso drowned over silky vanilla gelato. Extraordinary.',
    price: 'Rs. 680', tag: 'Special',
    img: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=500&q=80'
  },
  {
    id: 10, name: 'Honey Lavender Latte', category: 'special',
    desc: 'Espresso, lavender syrup, oat milk, wildflower honey drizzle.',
    price: 'Rs. 620', tag: 'Special',
    img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80'
  },
  {
    id: 11, name: 'Caramel Macchiato', category: 'hot',
    desc: 'Vanilla-scented milk, espresso marks, salted caramel drizzle.',
    price: 'Rs. 520', tag: 'Hot',
    img: 'https://dinnerthendessert.com/wp-content/uploads/2023/10/Caramel-Macchiato-10.jpg'
  },
  {
    id: 12, name: 'Coconut Cold Brew', category: 'special',
    desc: 'Cold brew with coconut milk and a hint of tropical sweetness.',
    price: 'Rs. 590', tag: 'Special',
    img: 'https://images.unsplash.com/photo-1579888944880-d98341245702?w=500&q=80'
  },
];

// ===== RENDER MENU =====
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
  filtered.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'menu-card reveal';
    card.innerHTML = `
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        <div class="menu-card-img-overlay"></div>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-badge">${item.tag}</div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${item.price}</span>
          <button class="menu-card-btn" title="Add to order">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 60 + idx * 80);
  });
  initReveal();
}

renderMenu();

// ===== FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.1 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
initReveal();

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1200);
});

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '2rem', right: '2rem',
    background: '#2c1a0e', color: '#fdf6ec',
    padding: '0.9rem 1.6rem', borderRadius: '50px',
    fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transform: 'translateY(20px)', opacity: '0',
    transition: 'all 0.35s ease', zIndex: '9999',
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; }, 10);
  setTimeout(() => {
    t.style.transform = 'translateY(20px)'; t.style.opacity = '0';
    setTimeout(() => t.remove(), 400);
  }, 2500);
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-card-btn')) {
    const name = e.target.closest('.menu-card').querySelector('h3').textContent;
    showToast(`☕ ${name} added to your order!`);
    e.target.style.background = '#c8893a';
    setTimeout(() => e.target.style.background = '', 600);
  }
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = '#e8b86d';
  });
});
