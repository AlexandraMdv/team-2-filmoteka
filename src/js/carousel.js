const API_KEY = '918aba14d75940fa7e0d80373b9ee894';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const carouselMovies = document.querySelector('.carousel-movies');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');


let movies = [];
let currentIndex = 0;

async function fetchMovies() {
  const response = await fetch(API_URL);
  const data = await response.json();
  movies = data.results;
  displayMovies();
}

function displayMovies() {
  carouselMovies.innerHTML = '';
  movies.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      
    `;
    // I think we only need images of the trending movies
    //<h3>${movie.title}</h3>
    //<p class="rating">${'★'.repeat(Math.round(movie.vote_average / 2))}</p>
    carouselMovies.appendChild(movieEl);
  });
  updateCarousel();
}

function updateCarousel() {
  const movieWidth = document.querySelector('.movie').offsetWidth;
  //220px is not the width of each movie card, it is dinamically calculate by min-width: calc(100% / 5) so we need the offsetWidth to find out the width which changes depending on viewport width
  const offset = currentIndex * -movieWidth; // 220px is the width of each movie + gap
  carouselMovies.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  const movieWidth = document.querySelector('.movie').offsetWidth; // Calculate dynamic image width
  const containerWidth = carouselMovies.offsetWidth;
  const maxIndex = Math.round((movies.length * movieWidth - containerWidth) / movieWidth);

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

fetchMovies();
