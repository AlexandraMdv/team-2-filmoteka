// imports
import {
  getStorageItem,
  adjunstQueueBtns,
  adjunstWatchBtns,
  toQueue,
  toWatch,
} from './locatStorage';

const modal = document.querySelector('.modal');
const gallery = document.querySelector('.cards-container');

const galleryClick = e => {
  const card = e.target.parentNode;
  const watchBtn = modal.querySelector('.watch');
  const queueBtn = modal.querySelector('.queue');
  const id = card.dataset.id;
  const toWatchList = getStorageItem(toWatch);
  const toQueueList = getStorageItem(toQueue);
  adjunstWatchBtns(toWatchList, watchBtn, id);
  adjunstQueueBtns(toQueueList, queueBtn, id);
};

export const handleModalBtns = () => {
  gallery.addEventListener('click', galleryClick);
};
