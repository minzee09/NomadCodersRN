const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGMxNmU3ZWY4YTI1OWIxYjU1ZjRhYzg4N2ExZGNjMyIsIm5iZiI6MTcyNDk1MDExMS4yMjM4ODUsInN1YiI6IjY2ZDBhNThmYzcxYjc1YzllZDcwNTA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EmIS_RtXfhDrxNOst7i-7qg080J2F2Qn6PKMJFw89UQ',
  },
};

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

const filterOutGenre27 = (items) => {
  return items.filter(
    (item) =>
      item.genre_ids &&
      item.genre_ids.length > 0 &&
      !item.genre_ids.includes(27),
  );
};

const trending = () => {
  return fetch(`${BASE_URL}/trending/movie/week?language=en-US`, options)
    .then((res) => res.json())
    .then((data) => {
      //console.log('Trending Data:', data);
      return filterOutGenre27(data.results);
    });
};

const upcoming = () => {
  return fetch(
    `${BASE_URL}/movie/upcoming?language=en-US&page=1&region=KR`,
    options,
  )
    .then((res) => res.json())
    .then((data) => {
      //console.log('Upcoming Data:', data);
      return filterOutGenre27(data.results);
    });
};

const nowPlaying = () => {
  return fetch(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1&region=KR`,
    options,
  )
    .then((res) => res.json())
    .then((data) => {
      //console.log('Now Playing Data:', data);
      return filterOutGenre27(data.results);
    });
};

export const moviesApi = { trending, upcoming, nowPlaying };
