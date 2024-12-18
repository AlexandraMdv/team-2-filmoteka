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

function renderMovies(movies) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  if (movies.length === 0) {
    resultsDiv.innerHTML = '<p>No movies found matching the criteria.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <h3>${movie.title}</h3>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Year:</strong> ${movie.year}</p>
      <p><strong>Rating:</strong> ${movie.rating}</p>
    `;
    resultsDiv.appendChild(movieDiv);
  });
}

function filterMovies() {
  const genre = document.getElementById('genre').value;
  const year = parseInt(document.getElementById('year').value);
  const rating = parseFloat(document.getElementById('rating').value);

  const filtered = movies.filter(movie => {
    const matchesGenre = genre ? movie.genre === genre : true;
    const matchesYear = year ? movie.year === year : true;
    const matchesRating = rating ? movie.rating >= rating : true;
    return matchesGenre && matchesYear && matchesRating;
  });

  renderMovies(filtered);
}

document.getElementById('filterBtn').addEventListener('click', filterMovies);

renderMovies(movies);
