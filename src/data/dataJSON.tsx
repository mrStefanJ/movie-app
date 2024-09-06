import axios from "axios";

const API_KEY = "4ef26acf5650d62d0014f405b5f141a8";

export const fetchTending = async (page: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovies = async (page: number, genreforURL: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSeries = async (page: number, genreforURL: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGenres = async (type: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const featchByID = async (media_type: string, id: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchVideo = async (media_type: string, id: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCarousel = async (media_type: string, id: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (response.status === 200) return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchData = async (
  type: string,
  searchText: string,
  page: number
) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/${
      type === "movie" ? "movie" : "tv"
    }?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
  );
  return response.data;
};
