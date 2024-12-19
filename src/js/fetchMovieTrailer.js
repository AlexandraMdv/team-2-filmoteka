import { API_KEY, ENDPOINT } from './api';

export const fetchMovieTrailer = async movieId => {
  try {
    const url = `${ENDPOINT}/movie/${movieId}/videos?api_key=${API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const videos = data.results.find(video => video.type === 'Trailer');

    if (videos) {
      const videoKey = videos.key;

      return videoKey;
    } else {
      throw new Error('No trailer found for the movie.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
