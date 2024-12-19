// imports
import { getElement } from './library-utils';

const libraryGallery = getElement('.library-gallery');

export const createLibraryDOM = moviesArr => {
  const galleryContent = moviesArr
    .map(movie => {
      let {
        genres: movieType,
        original_title: name,
        poster_path: movieImg,
        id,
        release_date: releaseDate,
      } = movie;
      movieType = getGenres(movieType);
      releaseDate = getRealeaseDate(releaseDate);
      movieImg = movieImg
        ? `https://image.tmdb.org/t/p/w500${movieImg}`
        : `../../images/no-signal-img.jpg`;
      return `<div class="photo-card" data-id="${id}" >
      <div
        class="modal-info"
        data-vote-avg="${movie.vote_average}"
        data-vote-count="${movie.vote_count}"
        data-popularity="${movie.popularity}"
        data-about="${movie.overview}"
        data_original_title="${movie.original_title}"
        >
      </div>
    <img src="${movieImg}" class="image" alt="${name}" />
     <div class="overlay-text">
        <h1>${Math.round(movie.vote_average * 10) / 10}</h1>
    </div>
  <div class="container-info">
    <b class="title">${name}</b>
    <div class="cont-descr">
      <p class="descr-item">${movieType}</p>
      <p class="descr-item">|</p>
      <p class="descr-item">${releaseDate}</p>
    </div>
  </div>
</div>`;
    })
    .join('');
  libraryGallery.innerHTML = galleryContent;
};

function getGenres(arr) {
  let types = '';
  arr.forEach(movie => {
    types = types + movie.name + ', ';
  });
  types = types ? types.slice(0, -2) : 'N/A';
  return types;
}

function getRealeaseDate(realeaseDate) {
  const year = realeaseDate ? realeaseDate.split('-')[0] : 'N/A';
  return year;
}
