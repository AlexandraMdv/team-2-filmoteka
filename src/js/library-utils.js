import Notiflix from 'notiflix';

export const getElement = selection => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`the ${selection} does not exist`);
};

export function getIds(arr) {
  const arrIds = [];
  arr.forEach(movie => {
    arrIds.push(movie.id);
  });
  return arrIds;
}

export const getStorageItem = item => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

export function showLoader() {
  Notiflix.Loading.standard('Loading...');
}
export function hideLoader() {
  Notiflix.Loading.remove();
}
