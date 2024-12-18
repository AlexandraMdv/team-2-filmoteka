document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeModal = document.querySelector('#close-button');
  const openModalButton = document.querySelector('[data-modal-open]');

  if (openModalButton) {
    openModalButton.addEventListener('click', () => {
      modalOverlay.classList.add('is-open');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modalOverlay.classList.remove('is-open');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', event => {
      if (event.target === modalOverlay) {
        modalOverlay.classList.remove('is-open');
      }
    });
  }
});
