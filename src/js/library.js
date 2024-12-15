import Notiflix from 'notiflix';

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
libraryBtn.addEventListener('click', loadMovies);

async function loadMovies() {
    changeHeader();
 
    try {
        const movies = await getMovies();
        if (movies) {
        renderMovies(movies);
        }

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
    headerContainer.innerHTML = `<button class="home-btn">Home</button>
        <button class="my-library-btn">My library</button> 
        <button class="watched-list" data-list="watched">Watched</button>
        <button class="queue-list" data-list="queue">Queue</button>
        <div class="movies-container"></div> 
    `;
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = ''; // Clear existing movies before rendering

    movies.forEach(movie => {

        const {poster_path: path, id } = movie;
        
        let title = 'Unknown'; 
        if (movie.title) title = movie.title
        else if (movie.name) title = movie.name;

        moviesContainer.innerHTML += `
        <ul class="movie-card" data-movie-id="${id}">
            <li class="movie-title">${title}</li>
            <li class="movie-image">
            <img src="https://image.tmdb.org/t/p/w500${path}" alt="${title}" />
            </li>
            <button class="add-to-watched" data-movie-id="${id}">Add to Watched</button>
            <button class="add-to-queue" data-movie-id="${id}">Add to Queue</button>
        </ul>`;
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

    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = ''; // Clear existing movies before rendering

    // Render each movie in the watchedArray
    watchedArray.forEach(movie => {
        const { id, title, path } = movie;
        moviesContainer.innerHTML += `
            <ul class="movie-card" data-movie-id="${id}">
                <li class="movie-title">${title}</li>
                <li class="movie-image">
                    <img src="https://image.tmdb.org/t/p/w500${path}" alt="${title}" />
                </li>
            </ul>
        `;
    });
}