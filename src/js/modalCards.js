import { fetchMovieTrailer } from './fetchMovieTrailer';

const modal = document.querySelector('.film_info_modal');
const modalContainer = document.querySelector('.modal');
const modalImageContainer = document.querySelector('.img_content');
const modalVotes = document.querySelector('.film-detail_votes');
const modalVotes2 = document.querySelector('.film-detail_votes2');
const modalFilmName = document.querySelector('.film_title');
const modalFilmPopularity = document.querySelector('.film-detail_popularity');
const modalOriginaFilmTitle = document.querySelector(
  '.film-detail_original-title'
);
const modalFilmGenre = document.querySelector('.film-detail_genre');
const modalFilmDescription = document.querySelector('.film-detail_description');
const closeModal = document.querySelector('#close-button');
const gallery = document.querySelector('.cards-container');
const playButton = document.querySelector('.youtubeButton');
const trailerContainer = document.querySelector('.trailer');

if (gallery) {
  gallery.addEventListener('click', galleryHandler);
}

function galleryHandler(e) {
  const element = e.target.closest('.movie-card');  

  if (!element) {
    console.error('Parent element not found');
    return;
  }

  //average work
  const elementInfo = element.querySelector('.movie-rating-modal');
  if (!elementInfo) {
    console.error('Element with class .movie-rating-modal not found');
    return;
  }

  const voteCount = elementInfo
    .querySelector('.movie-vote-count')
    .textContent.trim()
    .replace('/', '')
    .trim();
  const average = elementInfo.querySelector('.movie-vote').textContent.trim();

  const averageCountNumber = Number(average);
  const averageCountNumberRound = Math.round(averageCountNumber * 10) / 10;
  modalVotes.innerHTML = ` ${averageCountNumberRound.toFixed(1)} `;
  modalVotes2.innerHTML = ` ${voteCount}`;

  // add movie id to the modal
  const movieId = element.dataset.id;
  modalContainer.dataset.movieId = movieId;

  //image work
  const movieImage = element.querySelector('img');
  if (!movieImage) {
    console.error('Image element not found');
    return;
  }
  const imageLink = movieImage.getAttribute('src');
  modalImageContainer.innerHTML = `<img src="${imageLink}">`;

  //film title
  const containerInfoTitle = element.querySelector('.movie-title');
  if (!containerInfoTitle) {
    console.error('Element with selector .container-info  not found');
    return;
  }
  modalFilmName.textContent = containerInfoTitle.textContent;

  // film popularity
  const filmPopularity = element.querySelector('.movie-popularity').textContent;
  const filmPopularityRound = Math.round(filmPopularity);
  modalFilmPopularity.innerHTML = `Popularity: ${filmPopularityRound} `;

  //film original title
  const filmOriginalName = element.querySelector('.movie-title').textContent;
  modalOriginaFilmTitle.innerHTML = `Original-title: ${filmOriginalName} `;

  //film genre
  const containerInfo = element.querySelector('.movie-info');
  const description = containerInfo.querySelector('.movie-meta');
  const genre = description.textContent.split('|')[0];
  modalFilmGenre.innerHTML = `Genre: ${genre}`;

  // about film
  const filmDescription = element.querySelector('.movie-overview').textContent;
  if (!filmDescription) {
    console.error('Element with data-about attribute not found');
    return;
  }
  modalFilmDescription.innerHTML = `About: ${filmDescription} `;

  fetchAndDisplayTrailer(movieId);

  modal.showModal();
}

if (playButton) {
  playButton.addEventListener('click', async () => {
    const movieId = modalContainer.getAttribute('data-movie-id');
    // console.log(`Movie ID: ${movieId}`);
    const trailerId = await fetchMovieTrailer(movieId);

    trailerContainer.innerHTML = `<iframe
                                   is="ytplayer"
                                    src="https://www.youtube.com/embed/${trailerId}"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer;
                                    autoplay;
                                    clipboard-write;
                                    encrypted-media;
                                    gyroscope;
                                    picture-in-picture;
                                    web-share"
                                    allowfullscreen
                                  >
                                  </iframe>`;
  });
}

async function fetchAndDisplayTrailer(movieId) {
  const trailerId = await fetchMovieTrailer(movieId);
  if (trailerId) {
    trailerContainer.innerHTML = `<iframe is="ytplayer" src="https://www.youtube.com/embed/${trailerId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen > </iframe>`;
  } else {
    trailerContainer.innerHTML = '<p>No trailer available</p>';
  }
}

// Close modal section
if (closeModal) {
  closeModal.addEventListener('click', () => {
    clearModalOnClose();
    modal.close();
  });
}

function clearModalOnClose() {
  const modalDataElements = modal.querySelectorAll('[class*="film-detail"]');
  modalDataElements.forEach(element => {
    element.innerHTML = '';
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modalContainer.dataset.movieId = '';
    // console.log('Modal closed and data-id reset');
  });
}
