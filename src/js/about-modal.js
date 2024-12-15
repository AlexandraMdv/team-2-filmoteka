// Get modal elements
const openModal = document.getElementById('openAboutModal');
const closeModal = document.getElementById('closeAboutModal');
const modal = document.getElementById('swiper-modal');

// Open modal
openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});