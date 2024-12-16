import './js/api.js';
import './js/about-modal.js';
import { refs } from './js/refs.js';

// Asigurăm că DOM-ul este complet încărcat înainte de a înregistra evenimentele
document.addEventListener('DOMContentLoaded', () => {
  const { btnOpenAboutModal, aboutModal } = refs;

  if (!btnOpenAboutModal || !aboutModal) {
    console.error('Butonul sau modalul nu sunt disponibile în DOM.');
    return;
  }

  btnOpenAboutModal.addEventListener('click', () => {
    aboutModal.classList.add('is-shown');
    refs.body.classList.add('modal-open');
    refs.btnToTop.style.display = 'none';
  });
});
