import { loadMovies } from "./cards-fetch.js"; 

const TRENDING_URL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
const API_KEY = '918aba14d75940fa7e0d80373b9ee894';

async function getMovies() {
    try {
        const response = await fetch(`${TRENDING_URL}&api_key=${API_KEY}`);
        if(!response.ok) {
            throw new Error(`HTTP request error! ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
    }
        
}

const libraryBtn = document.querySelector('.my-library-btn');
libraryBtn.addEventListener('click', loadMoviesLibrary);
const heroSection = document.querySelector('.hero-section');

async function loadMoviesLibrary() {
    changeHeader();
    // disableSections(heroSection);
    // heroSection.classList.add('disable-section')
 
    try {
        loadMovies(1);

        const watchedBtn = document.querySelector('.watched-list');
        const queueBtn = document.querySelector('.queue-list');
        watchedBtn.addEventListener('click', (event) => {
            renderWatchedMovies(event.target.getAttribute('data-list'));
        });
        queueBtn.addEventListener('click', (event) => {
            renderWatchedMovies(event.target.getAttribute('data-list'));
        });

    } catch (error) {
        console.error('Failed to load movies: ', error);
    }
}

function changeHeader() {
    const headerContainer = document.querySelector('.header-container');
    headerContainer.innerHTML = '';
    headerContainer.innerHTML = `<div class="buttons-header-my-library">
            <div class="home-btns">
                <button class="library-btn home-btn">Home</button>
                <button class="library-btn my-library-btn">My library</button> 
            </div>
            <div class="user-lists-btns">
                <button class="library-btn watched-list" data-list="watched">Watched</button>
                <button class="library-btn queue-list" data-list="queue">Queue</button>
            </div>
        </div>
    `;
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.cards-container');
    moviesContainer.innerHTML = ''; // Clear existing movies before rendering

    movies.forEach(movie => {
    
        const {poster_path: path, id } = movie;

        let title = 'Unknown'; 
        if (movie.title) title = movie.title
        else if (movie.name) title = movie.name;

        moviesContainer.innerHTML += `
        <div class="movie-card" data-movie-id="${id}>
            ${
            posterUrl
                ? `<img src="https://image.tmdb.org/t/p/w500${path}" alt="${title}" class="movie-poster">`
                : ''
            }
            <div class="movie-info">
            <h3 class="movie-title">${title.toUpperCase()}</h3>
            <p class="movie-meta">${genres} | ${year}</p>
            </div>
        </div>
        `
    });

    // Attach event listeners to buttons
    attachButtonListeners(movies);
}

function attachButtonListeners(movies) {
    const watchedButtons = document.querySelectorAll('.add-to-watched');
    const queueButtons = document.querySelectorAll('.add-to-queue');

    watchedButtons.forEach(button => {
        button.addEventListener('click', event => {
        const movieId = event.target.getAttribute('data-movie-id');
        const movie = movies.find(m => m.id === Number(movieId));
        addToLocalStorage('watched', movie);
        });
    });

    queueButtons.forEach(button => {
        button.addEventListener('click', event => {
        const movieId = event.target.getAttribute('data-movie-id');
        const movie = movies.find(m => m.id === Number(movieId));
        addToLocalStorage('queue', movie);
        });
    });
}

function addToLocalStorage(key, movieToStore) {
    if (!movieToStore) return; // for invalid movies
    const storedMovies = JSON.parse(localStorage.getItem(key)) || [];
    
    // Avoid duplicates
    const isMovieStored = storedMovies.findIndex(storedMovie => storedMovie.id === movieToStore.id) !== -1;

    if (isMovieStored) {
        console.log(`Movie already in ${key} list:`, movieToStore.title);
        alert('Movie already in list')
        return;
    }

    let title = 'Unknown';
    if(movieToStore.title) title = movieToStore.title
    else if(movieToStore.name) title = movieToStore.name;

    storedMovies.push({
        id: movieToStore.id,
        title: title,
        path: movieToStore.poster_path,
    });

    localStorage.setItem(key, JSON.stringify(storedMovies));
}

function renderWatchedMovies(key) {
    // Retrieve movies from localStorage
    const watchedArray = JSON.parse(localStorage.getItem(key)) || [];
    console.log(watchedArray);
    

    const moviesContainer = document.querySelector('.cards-container');
    moviesContainer.innerHTML = ''; // Clear existing movies before rendering

    // Render each movie in the watchedArray
    watchedArray.forEach(movie => {
        const {id, title, path } = movie;

    const posterUrl = path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : '';
    
    moviesContainer.innerHTML += `
      <div class="movie-card" data-movie-id="${id}">
        ${
          posterUrl
            ? `<img src="${posterUrl}" alt="${title}" class="movie-poster">`
            : ''
        }
        <div class="movie-info">
          <h3 class="movie-title">${title.toUpperCase()}</h3>
        </div>
      </div>
    `;
    });
}