import axios from "axios";

const API_KEY = "4ef26acf5650d62d0014f405b5f141a8";

export const fetchTending = async (page: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
  );
  return response.data;
};

export const fetchMovies = async (page: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres`
  );
  return response.data;
};

export const fetchSeries = async (page: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres`
  );
  return response.data;
};
