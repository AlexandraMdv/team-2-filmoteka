import Notiflix from 'notiflix';
import { loadMovies } from './cards-fetch.js';

Notiflix.Notify.init({
  parentId: '.film-info-modal',
  width: '280px',
  position: 'right-top',
  zindex: 14001,
});

const libraryBtn = document.querySelector('.my-library-btn');
libraryBtn.addEventListener('click', loadMoviesLibrary);

async function loadMoviesLibrary() {
  changeHeader();

  try {
    loadMovies(1);

    const watchedBtn = document.querySelector('.watched-list');
    const queueBtn = document.querySelector('.queue-list');
    watchedBtn.addEventListener('click', event => {
      renderWatchedMovies(event.target.getAttribute('data-list'));
    });
    queueBtn.addEventListener('click', event => {
      renderWatchedMovies(event.target.getAttribute('data-list'));
    });
  } catch (error) {
    console.error('Failed to load movies: ', error);
  }
}

function changeHeader() {
  const headerContainer = document.querySelector('.header-container');
  headerContainer.innerHTML = '';
  headerContainer.innerHTML = `<div class="buttons-header-my-library">
            <div class="home-btns">
                <button class="library-btn home-btn" onclick="navigateHome()">Home</button>
                <button class="library-btn my-library-btn">My library</button> 
            </div>
            <div class="user-lists-btns">
                <button class="library-btn watched-list" data-list="watched">Watched</button>
                <button class="library-btn queue-list" data-list="queue">Queue</button>
            </div>
        </div>
    `;
}

const watchedBtn = document.querySelector('.add-to-watch');
const queueBtn = document.querySelector('.add-to-watch:last-of-type');
let movieToStore = {};

watchedBtn.addEventListener('click', event => {
  const selectModal = event.target.closest('.modal');
  const movieId = selectModal.getAttribute('data-movie-id');
  const movieTitle = selectModal.querySelector('.film_title').innerText;
  const movieImage = selectModal.querySelector('.img_content img');
  const movieSrc = movieImage.src;

  movieToStore = {
    id: Number(movieId),
    title: movieTitle,
    path: movieSrc,
  };
  console.log(movieToStore);

  addToLocalStorage('watched', movieToStore);
});

queueBtn.addEventListener('click', event => {
  const selectModal = event.target.closest('.modal');
  const movieId = selectModal.getAttribute('data-movie-id');
  const movieTitle = selectModal.querySelector('.film_title').innerText;
  const movieImage = selectModal.querySelector('.img_content img');
  const movieSrc = movieImage.src;

  movieToStore = {
    id: Number(movieId),
    title: movieTitle,
    path: movieSrc,
  };
  console.log(movieToStore);

  addToLocalStorage('queue', movieToStore);
});

function addToLocalStorage(key, movieToStore) {
  if (!movieToStore) return; // for invalid movies
  const storedMovies = JSON.parse(localStorage.getItem(key)) || [];

  // Avoid duplicates
  const isMovieStored =
    storedMovies.findIndex(
      storedMovie => storedMovie.id === movieToStore.id
    ) !== -1;

  if (isMovieStored) {
    console.log(`Movie already in ${key} list:`, movieToStore.title);
    Notiflix.Notify.failure('Movie is already in list');
    return;
  }

  Notiflix.Notify.success('Movie successfully added to list');

  let title = 'Unknown';
  if (movieToStore.title) title = movieToStore.title;
  else if (movieToStore.name) title = movieToStore.name;

  storedMovies.push({
    id: movieToStore.id,
    title: title,
    path: movieToStore.path,
  });

  localStorage.setItem(key, JSON.stringify(storedMovies));
}

function renderWatchedMovies(key) {
  // Retrieve movies from localStorage
  const watchedArray = JSON.parse(localStorage.getItem(key)) || [];
  const moviesContainer = document.querySelector('.cards-container');
  moviesContainer.innerHTML = ''; // Clear existing movies before rendering

  // Render each movie in the watchedArray
  watchedArray.forEach(movie => {
    const { id, title, path } = movie;

    const posterUrl = path ? `https://image.tmdb.org/t/p/w500${path}` : '';

    moviesContainer.innerHTML += `
      <div class="movie-card" data-movie-id="${id}">
        ${
          posterUrl
            ? `<img src="${posterUrl}" alt="${title}" class="movie-poster">`
            : ''
        }
        <div class="movie-info">
          <h3 class="movie-title">${title.toUpperCase()}</h3>
        </div>
      </div>
    `;
  });
}
