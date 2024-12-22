

export const toWatch = 'toWatch';
export const toQueue = 'toQueue';
const modalWindow = document.querySelector('.modal');

export const getStorageItem = item => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const addToLocalStorag = () => {
  modalWindow.addEventListener('click', e => {
    const clickedElement = e.target;
    const id = e.currentTarget.dataset.movieId;
    let watchStorage = getStorageItem(toWatch);
    let queueStorage = getStorageItem(toQueue);
    const watchIds = getIds(watchStorage);
    const queueIds = getIds(queueStorage);
    const movie = { id: id };
    if (clickedElement.dataset.action === 'toWatch') {
      if (!watchIds.includes(id)) {
        watchStorage.push(movie);
        setStorageItem(toWatch, watchStorage);
        clickedElement.textContent = 'REMOVE FROM WATCHED';
        clickedElement.dataset.action = 'toWatchRmv';
      }
    } else if (clickedElement.dataset.action === 'toQueue') {
      if (!queueIds.includes(id)) {
        queueStorage.push(movie);
        setStorageItem(toQueue, queueStorage);
        clickedElement.textContent = 'REMOVE FROM QUEUE';
        clickedElement.dataset.action = 'toQueueRmv';
      }
    } else if (clickedElement.dataset.action === 'toWatchRmv') {
      watchStorage = watchStorage.filter(movie => movie.id !== id);
      setStorageItem(toWatch, watchStorage);
      clickedElement.textContent = 'ADD TO WATCHED';
      clickedElement.dataset.action = 'toWatch';
    } else if (clickedElement.dataset.action === 'toQueueRmv') {
      queueStorage = queueStorage.filter(movie => movie.id !== id);
      setStorageItem(toQueue, queueStorage);
      clickedElement.textContent = 'ADD TO QUEUE';
      clickedElement.dataset.action = 'toQueue';
    }
  });
};

function getIds(arr) {
  const arrIds = [];
  arr.forEach(movie => {
    arrIds.push(movie.id);
  });
  return arrIds;
}

export const adjunstWatchBtns = (watchStorage, watchBtn, id) => {
  const watchedIds = getIds(watchStorage);
  if (watchBtn.dataset.action === 'toWatch') {
    if (watchedIds.includes(id)) {
      watchBtn.textContent = 'REMOVE FROM WATCHED';
      watchBtn.dataset.action = 'toWatchRmv';
    }
  }
  if (watchBtn.dataset.action === 'toWatchRmv') {
    if (!watchedIds.includes(id)) {
      watchBtn.textContent = 'ADD TO WATCHED';
      watchBtn.dataset.action = 'toWatch';
    }
  }
};

export const adjunstQueueBtns = (queueStorage, queueBtn, id) => {
  const watchedIds = getIds(queueStorage);
  if (queueBtn.dataset.action === 'toQueue') {
    if (watchedIds.includes(id)) {
      queueBtn.textContent = 'REMOVE FROM QUEUE';
      queueBtn.dataset.action = 'toQueueRmv';
    }
  }
  if (queueBtn.dataset.action === 'toQueueRmv') {
    if (!watchedIds.includes(id)) {
      queueBtn.textContent = 'ADD TO QUEUE';
      queueBtn.dataset.action = 'toQueue';
    }
  }
};
