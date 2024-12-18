import { TRENDING_MOVIES_URL } from './api.js';
import { GENRES_URL } from './api.js';
import { showMoviesOnPage } from './cards.js';

let pageNumber = 1;
let totalPages = 20;
let genreList = {};
const paginationContainer = document.getElementById('pagination');

async function fetchGenres() {
  try {
    const response = await fetch(GENRES_URL);
    const data = await response.json();
    genreList = Object.fromEntries(
      data.genres.map(genre => [genre.id, genre.name])
    );
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

async function fetchMovies(page) {
  try {
    const response = await fetch(TRENDING_MOVIES_URL(page));
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();
    totalPages = Math.min(data.total_pages, 20);
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

async function loadMovies(page) {
  pageNumber = page;
  const movies = await fetchMovies(page);
  showMoviesOnPage(movies, genreList);
  renderPagination();
}

function renderPagination() {
  paginationContainer.innerHTML = '';

  createButton('left', pageNumber > 1, () => loadMovies(pageNumber - 1));

  if (pageNumber > 3) {
    createButton('1', true, () => loadMovies(1));
    addDots();
  }

  for (
    let i = Math.max(1, pageNumber - 2);
    i <= Math.min(totalPages, pageNumber + 2);
    i++
  ) {
    createButton(i, i !== pageNumber, () => loadMovies(i), i === pageNumber);
  }

  if (pageNumber < totalPages - 2) {
    addDots();
    createButton(totalPages, true, () => loadMovies(totalPages));
  }

  createButton('right', pageNumber < totalPages, () =>
    loadMovies(pageNumber + 1)
  );
}

function createButton(text, enabled, onClick, active = false) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = active ? 'page-num active' : 'page-num';
  button.disabled = !enabled;

  if (text === 'left' || text === 'right') {
    const img = document.createElement('img');
    img.src =
      text === 'left'
        ? './images/icons.svg#icon-arrow-left'
        : './images/icons.svg#icon-arrow-right';
    img.alt = text === 'left' ? 'Previous' : 'Next';
    img.className = 'pagination-icon';
    button.appendChild(img);
  } else {
    button.textContent = text;

    if (enabled) button.addEventListener('click', onClick);
    paginationContainer.appendChild(button);
  }
}

function addDots() {
  const span = document.createElement('span');
  span.textContent = '...';
  span.className = 'dots';
  paginationContainer.appendChild(span);
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchGenres();
  loadMovies(1);
});

export {loadMovies, renderPagination, genreList};