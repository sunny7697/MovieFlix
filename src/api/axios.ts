import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org',
});

const genrelist =
  'https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=2dca580c2a14b55200e784d157207b4d';

export const getMovies = async (
  pageNo = 1,
  year = '',
  genres = '',
  options = {}
) => {
  const apiKey = '2dca580c2a14b55200e784d157207b4d';
  const response = await api.get(
    `/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=${pageNo}&vote_count.gte=100&with_genres=${genres}`,
    options
  );
  return response.data?.results;
};
