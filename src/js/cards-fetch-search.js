import { SEARCH_MOVIES_URL } from './api.js';
import { showMoviesOnPage } from './cards.js';
import { renderPagination } from './cards-fetch.js';
import { genreList } from './cards-fetch.js';

import Notiflix from 'notiflix/build/notiflix-notify-aio';

// Fetch movies based on a search query
async function searchMovies(query, page = 1) {
    if (!query.trim()) {
      console.error('Search query is empty.');
      return [];
    }
  
    try {
      const response = await fetch(SEARCH_MOVIES_URL(query, page));    
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
      totalPages = Math.min(data.total_pages, 20); // Update total pages for pagination
      return data.results; // Returns the search results
    } catch (error) {
      console.error('Error searching for movies:', error);
      return [];
    }
  }
  
async function loadSearchResults(query, page = 1) {
    pageNumber = page;
    const movies = await searchMovies(query, page);
    showMoviesOnPage(movies, genreList);
    renderPagination();
}
  
  
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('movie-search');
  
searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    if (!query.trim()){
      Notiflix.Notify.failure('dssdn')
      return;
    }
       
    
    await loadSearchResults(query, 1); // Load the first page of search results
});
  
searchInput.addEventListener('keypress', async(event) => {
    if(event.key === 'Enter') {
      const query = searchInput.value;
    if (!query.trim()) {
      Notiflix.Notify.failure('Please type something!');
      return;
    } 
    
    Notiflix.Notify.success('Searching for movies...');
    await loadSearchResults(query, 1); // Load the first page of search results
    }
})
  