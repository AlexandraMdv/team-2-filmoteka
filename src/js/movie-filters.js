import { fetchGenres, fetchMovies } from './cards-fetch.js';
import { showMoviesOnPage } from './cards.js';

function filterMovies(movies, genreList) {
  const genre = parseInt(document.getElementById('genre').value);
  const year = parseInt(document.getElementById('year').value);
  const rating = parseFloat(document.getElementById('rating').value);

  const filtered = movies.filter(movie => {
    const matchesGenre = genre ? movie.genre_ids.includes(genre) : true;
    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : null;
    const matchesYear = year ? releaseYear === year : true;
    const matchesRating = rating ? movie.vote_average >= rating : true;
    return matchesGenre && matchesYear && matchesRating;
  });

  showMoviesOnPage(filtered, genreList);
}

async function initializeMoviesFilter() {
  try {
    const genreList = await fetchGenres();
    const movies = await fetchMovies(1);
    showMoviesOnPage(movies, genreList);
    document.getElementById('filterBtn').addEventListener('click', () => {
      filterMovies(movies, genreList);
    });
  } catch (error) {
    console.error('Error initializing movie filter:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeMoviesFilter);
