import Notiflix from 'notiflix';

const TRENDING_URL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
const API_KEY = '918aba14d75940fa7e0d80373b9ee894';

async function getMovies() {
    try {
        const response = await fetch(`${TRENDING_URL}&api_key=${API_KEY}`);
        if(!response.ok) {
            throw new Error(`HTTP request error! ${response.status}`);
        }
        console.log(response);
        
    
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
    }
        
}

console.log('movies, ', getMovies().then(data => data));


const libraryBtn = document.querySelector('.my-library-btn');
libraryBtn.addEventListener('click', loadMovies);

async function loadMovies() {
    changeHeader();
 
    try {
        const movies = await getMovies();
        console.log('Movies loaded on button click: ', movies);

        if (movies) {
        renderMovies(movies);
        }

        const watchedBtn = document.querySelector('.watched-list');
        watchedBtn.addEventListener('click', (event) => {
            renderWatchedMovies(event.target.getAttribute('data-list'), movies);
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
        <button class="queue-list">Queue</button>
        <div class="movies-container"></div> 
    `;
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = ''; // Clear existing movies before rendering
    console.log('movies: ', movies);

    movies.forEach(movie => {
        const { title, poster_path: path, id } = movie;
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

function addToLocalStorage(key, movie) {
    if (!movie) return; // Guard clause for invalid movies
    const storedMovies = JSON.parse(localStorage.getItem(key)) || [];
    
    // Avoid duplicates
    if (storedMovies.some(m => m.id === movie.id)) {
        console.log(`Movie already in ${key} list:`, movie.title);
        alert('Movie already in list')
        return;
    }

    storedMovies.push({
        id: movie.id,
        title: movie.title,
        path: movie.poster_path,
    });

    localStorage.setItem(key, JSON.stringify(storedMovies));
    console.log(`Added movie to ${key} list:`, movie.title);
}

// console.log(getMovies());



function renderWatchedMovies(key, movies) {
    let watchedArray = [];
    watchedArray.push(JSON.parse(localStorage.getItem(key)));
    console.log('watched arr', watchedArray);

    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = ''; // Clear existing movies before rendering

    console.log(moviesContainer);
    
    
    watchedArray.forEach((m, index) => {
        if(m.id === movies.id ){
            console.log('matching movies', movies);
            console.log('watched movies', m);
            console.log(m[index].title);
            
            
            moviesContainer.innerHTML += `
                <ul class="movie-card" data-movie-id="${m[index].id}">
                    <li class="movie-title">${m[index].title}</li>
                    <li class="movie-image">
                        <img src="https://image.tmdb.org/t/p/w500${m[index].path}" alt="${m[index].title}" />
                    </li>
                </ul>
            `;
        }
       
    })

}

