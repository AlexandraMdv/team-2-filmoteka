//
// const movies = [
//   { title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8 },
//   { title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0 },
//   { title: 'Interstellar', genre: 'Sci-Fi', year: 2014, rating: 8.6 },
//   { title: 'Pulp Fiction', genre: 'Crime', year: 1994, rating: 8.9 },
//   { title: 'The Godfather', genre: 'Crime', year: 1972, rating: 9.2 },
//   { title: 'Forrest Gump', genre: 'Drama', year: 1994, rating: 8.8 },
//   { title: 'The Matrix', genre: 'Sci-Fi', year: 1999, rating: 8.7 },
// ];

// function renderMovies(movies) {
//   const resultsDiv = document.getElementById('results');
//   resultsDiv.innerHTML = ''; // Clear previous results

//   if (movies.length === 0) {
//     resultsDiv.innerHTML = '<p>No movies found matching the criteria.</p>';
//     return;
//   }

//   movies.forEach(movie => {
//     const movieDiv = document.createElement('div');
//     movieDiv.classList.add('movie');
//     movieDiv.innerHTML = `
//       <h3>${movie.title}</h3>
//       <p><strong>Genre:</strong> ${movie.genre}</p>
//       <p><strong>Year:</strong> ${movie.year}</p>
//       <p><strong>Rating:</strong> ${movie.rating}</p>
//     `;
//     resultsDiv.appendChild(movieDiv);
//   });
// }

// function filterMovies() {
//   const genre = document.getElementById('genre').value;
//   const year = parseInt(document.getElementById('year').value);
//   const rating = parseFloat(document.getElementById('rating').value);

//   const filtered = movies.filter(movie => {
//     const matchesGenre = genre ? movie.genre === genre : true;
//     const matchesYear = year ? movie.year === year : true;
//     const matchesRating = rating ? movie.rating >= rating : true;
//     return matchesGenre && matchesYear && matchesRating;
//   });

//   renderMovies(filtered);
// }

// document.getElementById('filterBtn').addEventListener('click', filterMovies);

// renderMovies(movies);




import { fetchGenres, fetchMovies } from './cards-fetch.js';

function renderMovies(movies, genreList) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  movies.forEach(movie => {
    const { title, genre_ids, release_date, vote_average } = movie;

    const genres = genre_ids.map(id => genreList[id]).join(', ') || 'N/A';
    const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
    const rating = vote_average || 'N/A';

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <h3>${title}</h3>
      <p><strong>Genre:</strong> ${genres}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Rating:</strong> ${rating}</p>
    `;
    resultsDiv.appendChild(movieDiv);
  });
}

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

  renderMovies(filtered, genreList);
}

async function initializeMoviesFilter() {
  try {
    const genreList = await fetchGenres();
    const movies = await fetchMovies(1);
    renderMovies(movies, genreList);
    document.getElementById('filterBtn').addEventListener('click', () => {
      filterMovies(movies, genreList);
    });
  } catch (error) {
    console.error('Error initializing movie filter:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeMoviesFilter);