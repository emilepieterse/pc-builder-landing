const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
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
