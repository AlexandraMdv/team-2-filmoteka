import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { refs } from './refs';

const {
  aboutModal,
  body,
  btnToTop,
  btnOpenAboutModal,
  btnCloseAboutModal,
  swiperModal,
} = refs;

// Open modal when clicking "GoIT Students"
btnOpenAboutModal.addEventListener('click', openAboutModal);

// Close modal on clicking the close button
btnCloseAboutModal.addEventListener('click', closeAboutModal);

function openAboutModal() {
  if (!aboutModal) {
    console.error('Modal element not found.');
    return;
  }

  aboutModal.classList.add('is-shown');
  body.classList.add('modal-open');
  document.addEventListener('keydown', handleEscKey);
  aboutModal.addEventListener('click', handleOutsideClick);
}

function handleEscKey(e) {
  if (e.key === 'Escape') closeAboutModal();
}

function handleOutsideClick(e) {
  if (e.target === aboutModal) closeAboutModal();
}

function closeAboutModal() {
  aboutModal.classList.remove('is-shown');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscKey);
  aboutModal.removeEventListener('click', handleOutsideClick);
}

// Initialize Swiper for modal content
const swiper = new Swiper(swiperModal, {
  modules: [Navigation, Pagination, Scrollbar],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  grabCursor: true,
});
