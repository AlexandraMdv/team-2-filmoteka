const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1%27'
const API_KEY = '918aba14d75940fa7e0d80373b9ee894';
const homeButton = document.querySelector('.home');
const searchInput = document.querySelector('.search-box input');

// Funcționalitate pentru butonul HOME
homeButton.addEventListener('click', () => {
    alert('Te-ai întors la pagina principală!');
});


// Funcționalitate pentru căsuța SEARCH
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Căutare pentru: ${query}`);
        } else {
            alert('Te rog introdu un termen pentru căutare!');
        }
    }
});