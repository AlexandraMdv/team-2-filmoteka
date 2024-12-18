const ENDPOINT = 'https://api.themoviedb.org/';
const API_KEY = '918aba14d75940fa7e0d80373b9ee894';

export const TRENDING_MOVIES_URL = (page = 1) =>
  `${ENDPOINT}3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`;
export const GENRES_URL = `${ENDPOINT}3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

export const SEARCH_MOVIES_URL = (query = '', page = 1) => 
  `${ENDPOINT}3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;