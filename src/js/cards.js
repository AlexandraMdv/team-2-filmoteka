export function showMoviesOnPage(movies, genreList) {
  const container = document.querySelector('.cards-container');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  movies.forEach(movie => {
    const {
      title,
      poster_path,
      genre_ids,
      release_date,
      overview,
      vote_average,
      vote_count,
      popularity,
    } = movie;
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
      <div class="movie-card" data-id="${movie.id}">
        ${
          posterUrl
            ? `<img src="${posterUrl}" alt="${title}" class="movie-poster">`
            : ''
        }
        <div class="movie-info">
          <h3 class="movie-title">${title}</h3>
          <p class="movie-meta">${genres} | ${year}</p>
          <p class="movie-overview">${overview}</p>

          <div class="movie-rating-modal">
            <span class="movie-vote">${vote_average}</span>
            <span class="movie-vote-count">/ ${vote_count}</span>
          </div>
       </div>
       <div class="movie-popularity">${popularity}</div>
  </div>ws
    `;
  });
}
