export function showMoviesOnPage(movies, genreList) {
  const container = document.querySelector('.cards-container');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, genre_ids, release_date } = movie;

    const posterUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : '';

    const genres =
      genre_ids
        .slice(0, 2)
        .map(id => genreList[id])
        .join(', ') || 'N/A';

    const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

    container.innerHTML += `
      <div class="movie-card">
        ${
          posterUrl
            ? `<img src="${posterUrl}" alt="${title}" class="movie-poster">`
            : ''
        }
        <div class="movie-info">
          <h3 class="movie-title">${title.toUpperCase()}</h3>
          <p class="movie-meta">${genres} | ${year}</p>
        </div>
      </div>
    `;
  });
}
