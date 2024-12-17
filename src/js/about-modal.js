import 'swiper/swiper-bundle.min.css';
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import { refs } from './refs';

const aboutModal = refs.aboutModal;
const body = refs.body;
const btnOpenAboutModal = refs.btnOpenAboutModal;
const btnCloseAboutModal = refs.btnCloseAboutModal;
const swiperModal = refs.swiperModal;

btnOpenAboutModal.addEventListener('click', openAboutModal);
btnCloseAboutModal.addEventListener('click', closeAboutModal);

function openAboutModal() {
    aboutModal.classList.add('is-shown');
    body.classList.add('modal-open');
    refs.btnToTop.style.display = "none";
    document.addEventListener('keydown', onCloseEsc);
    document.addEventListener('click', function onCloseClick(e) {
        if (e.target === aboutModal) {
            closeAboutModal();
        }
    });
}

function onCloseEsc(e) {
    if (e.code === "Escape") {
        closeAboutModal();
    }
}

function closeAboutModal() {
    aboutModal.classList.remove('is-shown');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onCloseEsc);
    refs.btnToTop.style.display = "block";
}

const swipers = new Swiper(swiperModal, {
    modules: [Navigation, Pagination],
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
        pageUpDown: true,
    },
    mousewheel: {
        invert: true,
        sensitivity: 1,
        eventsTarget: "swiper"
    },
    centeredSlides: true,
    grabCursor: true,
    slideToClickedSlide: true,
    loop: true,
    slidesPerView: 'auto',
    freeMode: true,

});