import { API_KEY, ENDPOINT } from './api.js';

export async function fetchPopularMovieTrailer() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=${API_KEY}`
    );
    const data = await response.json();

    const mostPopularMovie = data.results.find(movie => movie.vote_count > 0);

    const videoResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${mostPopularMovie.id}/videos?api_key=${API_KEY}`
    );
    const videoData = await videoResponse.json();

    const trailerVideo = videoData.results.find(
      video => video.type === 'Trailer'
    );

    if (trailerVideo) {
      const videoKey = trailerVideo.key;

      const youtubeUrl = `https://www.youtube.com/embed/${videoKey}`;

      return youtubeUrl;
    } else {
      throw new Error('No trailer found for the movie.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
