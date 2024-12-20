// imports
import { getElement } from './library-utils';
import { fetchMovieTrailer } from './fetchMovieTrailer';

// vars
const modal = getElement('.library-film_info_modal');
const modalImageContainer = getElement('.img_content');
const modalVotes = getElement('.film-detail_votes');
const modalVotes2 = getElement('.film-detail_votes2');
const modalFilmName = getElement('.film_title');
const modalFilmPopularity = getElement('.film-detail_popularity');
const modalOriginaFilmTitle = getElement('.film-detail_original-title');
const modalFilmGenre = getElement('.film-detail_genre');
const modalFilmDescription = getElement('.film-detail_description');
const closeModal = getElement('#close-button');
const gallery = getElement('.library-gallery');
const modalContainer = getElement('.modal');
const playButton = getElement('.youtubeButtonLibrary');
const trailerContainer = getElement('.trailerLibrary');

export const libraryModal = () => {
  gallery.addEventListener('click', e => {
    const element = e.target.parentNode;

    //average work
    const elementInfo = element.querySelector('.modal-info');
    const voteCount = elementInfo.getAttribute('data-vote-count');
    const average = elementInfo.getAttribute('data-vote-avg');
    const averageCountNumber = Number(average);
    const averageCountNumberRound = Math.round(averageCountNumber * 10) / 10;
    modalVotes.innerHTML = ` ${averageCountNumberRound} `;
    modalVotes2.innerHTML = ` / ${voteCount}`;

    // add movie id to the modal
    const movieId = element.dataset.id;
    modalContainer.dataset.movieId = movieId;

    //image work
    const movieImage = element.querySelector('img');
    const imageLink = movieImage.getAttribute('src');
    modalImageContainer.innerHTML = `<img src="${imageLink}">`;
    //film title
    const containerInfoTitle = element.querySelector('.container-info b');
    const filmName = containerInfoTitle.textContent;
    modalFilmName.innerHTML = ` ${filmName} `;
    //film popularity
    const filmPopularity = elementInfo.getAttribute('data-popularity');
    const filmPopularityRound = Math.round(filmPopularity);
    modalFilmPopularity.innerHTML = `Popularity: ${filmPopularityRound} `;
    //film original title
    const filmOriginalName = elementInfo.getAttribute('data_original_title');
    const originalTitle =
      filmOriginalName === 'undefined' ? filmName : filmOriginalName;
    modalOriginaFilmTitle.innerHTML = `Original-title: ${originalTitle} `;
    //film genre
    const containerInfo = element.querySelector('.container-info');
    const description = containerInfo.querySelector('.cont-descr');
    const genre = description.querySelector('p').textContent;
    modalFilmGenre.innerHTML = `Genre: ${genre}`;
    //about film
    const filmDescription = elementInfo.getAttribute('data-about');
    modalFilmDescription.innerHTML += ` ${filmDescription} `;
    modal.showModal();
  });
};

playButton.addEventListener('click', async () => {
  const movieId = modalContainer.getAttribute('data-movie-id');
  const trailerId = await fetchMovieTrailer(movieId);

  trailerContainer.innerHTML = `<iframe
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

closeModal.addEventListener('click', () => {
  clearModalOnClose();
  modal.close();
});

function clearModalOnClose() {
  const modalDataElements = modal.querySelectorAll('[class*="film-detail"]');
  modalDataElements.forEach(element => {
    element.innerHTML = '';
  });
  trailerContainer.innerHTML = '';
}

// function to close modal by  outside click
window.addEventListener('click', e => {
  if (e.target == modal) {
    clearModalOnClose();
    modal.close();
  }
});

// function to close modal by esc
document.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.key === 'Escape') {
    clearModalOnClose();
    modal.close();
  }
});
