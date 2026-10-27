const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const basePrice = 220; // case, PSU, motherboard, assembly
const cpuSelect = document.getElementById('cpu');
const gpuSelect = document.getElementById('gpu');
const ramSelect = document.getElementById('ram');
const storageSelect = document.getElementById('storage');
const totalPriceEl = document.getElementById('totalPrice');

function updateTotal() {
  const total = basePrice +
    Number(cpuSelect.value) +
    Number(gpuSelect.value) +
    Number(ramSelect.value) +
    Number(storageSelect.value);

  totalPriceEl.textContent = '$' + total.toLocaleString();
}

[cpuSelect, gpuSelect, ramSelect, storageSelect].forEach(select => {
  select.addEventListener('change', updateTotal);
});

updateTotal();

// fade sections in as they scroll into view
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(section => {
  revealObserver.observe(section);
});

// highlight the nav link for the section currently in view
const sections = document.querySelectorAll('section[id]');
const navLinkMap = {};
navLinks.querySelectorAll('a[data-section]').forEach(link => {
  navLinkMap[link.dataset.section] = link;
});

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const link = navLinkMap[entry.target.id];
    if (!link) return;
    if (entry.isIntersecting) {
      Object.values(navLinkMap).forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => navObserver.observe(section));
