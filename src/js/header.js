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