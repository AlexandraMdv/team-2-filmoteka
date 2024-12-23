// import { fetchGenres, fetchMovies } from './cards-fetch.js';
import { showMoviesOnPage } from './cards.js';
import { TRENDING_MOVIES_URL, GENRES_URL } from './api.js';

function filterMovies(movies, genreList) {
  const genreValue = document.getElementById('genre').value;
  const yearValue = document.getElementById('year').value;
  const ratingValue = parseFloat(document.getElementById('rating').value);

  const filtered = movies.filter(movie => {
    const matchesGenre =
      genreValue === 'All' || genreValue === ''
        ? true
        : movie.genre_ids.includes(parseInt(genreValue));

    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : null;
    const matchesYear =
      yearValue === 'All' || yearValue === ''
        ? true
        : releaseYear === parseInt(yearValue);

    const matchesRating =
      isNaN(ratingValue) || ratingValue === null
        ? true
        : movie.vote_average >= ratingValue;

    return matchesGenre && matchesYear && matchesRating;
  });

  if (filtered.length === 0) {
    document.getElementById('results').innerHTML =
      '<p>No movies found. Adjust your filters.</p>';
  } else {
    showMoviesOnPage(filtered, genreList);
  }
}

async function initializeMoviesFilter() {
  try {
    const genreResponse = await fetch(GENRES_URL);
    const genreData = await genreResponse.json();
    const genreList = Object.fromEntries(
      genreData.genres.map(genre => [genre.id, genre.name])
    );

    const genreDropdown = document.getElementById('genre');
    genreDropdown.innerHTML = '<option value="All">All</option>';
    Object.entries(genreList).forEach(([id, name]) => {
      genreDropdown.innerHTML += `<option value="${id}">${name}</option>`;
    });

    const movies = [];
    for (let page = 1; page <= 20; page++) {
      const response = await fetch(TRENDING_MOVIES_URL(page));
      const data = await response.json();
      movies.push(...data.results);
    }
    const yearDropdown = document.getElementById('year');
    const years = movies
      .map(movie => new Date(movie.release_date).getFullYear())
      .filter(year => !isNaN(year))
      .sort((a, b) => b - a);
    const uniqueYears = [...new Set(years)];
    yearDropdown.innerHTML = '<option value="All">All</option>';
    uniqueYears.forEach(year => {
      yearDropdown.innerHTML += `<option value="${year}">${year}</option>`;
    });

    showMoviesOnPage(movies, genreList);

    document.getElementById('filterBtn').addEventListener('click', () => {
      filterMovies(movies, genreList);
    });
  } catch (error) {
    console.error('Error initializing movie filter:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeMoviesFilter);
