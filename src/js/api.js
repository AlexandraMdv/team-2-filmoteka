const ENDPOINT = 'https://api.themoviedb.org';
const apiKey = '918aba14d75940fa7e0d80373b9ee894'; // Replace with your API key
const externalId = 'tt0111161'; // Replace with your external ID
const externalSource = 'imdb_id'; // Replace with your external source type



fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US?key=${apiKey}`)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));


// fetch(`https://api.themoviedb.org/3/find/${externalId}?external_source=${externalSource}&api_key=${apiKey}`)
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
