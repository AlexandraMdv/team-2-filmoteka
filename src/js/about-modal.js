import 'swiper/swiper-bundle.min.css';
import Swiper, { Navigation, Pagination, Scrollbar, Keyboard, Mousewheel } from 'swiper';

const refs = {
  aboutModal: document.querySelector('.js-about-modal'),
  body: document.body,
  btnOpenAboutModal: document.querySelector('.js-open-about-modal'),
  btnCloseAboutModal: document.querySelector('.js-close-about-modal'),
  swiperModal: document.querySelector('#swiper-modal'),
  btnToTop: document.querySelector('.js-btn-to-top'),
};

refs.btnOpenAboutModal.addEventListener('click', openAboutModal);
refs.btnCloseAboutModal.addEventListener('click', closeAboutModal);

function openAboutModal() {
  refs.aboutModal.classList.add('is-shown');
  refs.body.classList.add('modal-open');
  refs.btnToTop.style.display = "none";
  document.addEventListener('keydown', handleEscKey);
  refs.aboutModal.addEventListener('click', handleModalClick);
}

function handleEscKey(e) {
  if (e.code === 'Escape') closeAboutModal();
}

function handleModalClick(e) {
  if (e.target === refs.aboutModal) closeAboutModal();
}

function closeAboutModal() {
  refs.aboutModal.classList.remove('is-shown');
  refs.body.classList.remove('modal-open');
  refs.btnToTop.style.display = "block";
  document.removeEventListener('keydown', handleEscKey);
  refs.aboutModal.removeEventListener('click', handleModalClick);
}

// Initialize Swiper
const swiper = new Swiper('#swiper-modal', {
  modules: [Navigation, Pagination, Scrollbar, Keyboard, Mousewheel],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    invert: false,
    sensitivity: 1,
  },
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  grabCursor: true,
});
