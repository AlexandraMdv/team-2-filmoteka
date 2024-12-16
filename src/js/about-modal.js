import 'swiper/swiper-bundle.min.css';
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import { refs } from './refs';

const { aboutModal, body, btnCloseAboutModal, btnToTop, swiperModal } = refs;

// Înregistrăm evenimentele după ce DOM-ul este încărcat
document.addEventListener('DOMContentLoaded', () => {
  if (!aboutModal) {
    console.error('Modalul "About" nu a fost găsit.');
    return;
  }

  // Deschidere și închidere modal
  btnCloseAboutModal.addEventListener('click', closeAboutModal);
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) closeAboutModal();
  });

  // Inițializare Swiper pentru modal
  initializeSwiper();
});

function closeAboutModal() {
  aboutModal.classList.remove('is-shown');
  body.classList.remove('modal-open');
  btnToTop.style.display = 'block';
}

function initializeSwiper() {
  new Swiper(swiperModal, {
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
}
