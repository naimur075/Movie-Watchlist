import axios from 'axios'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export async function searchMovies(query){
  if(!query) return []
  const res=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
  return res.data.results
}

export async function getMovieDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data;
}
