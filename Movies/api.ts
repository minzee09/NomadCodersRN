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

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

const filterOutGenre27 = (items) => {
  return items.filter(
    (item) =>
      item.genre_ids &&
      item.genre_ids.length > 0 &&
      !item.genre_ids.includes(27),
  );
};

export const moviesApi = {
  trending: () => {
    return fetch(`${BASE_URL}/trending/movie/week?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        //console.log('Trending Data:', data);
        return filterOutGenre27(data.results);
      });
  },
  upcoming: ({ pageParam }) => {
    return fetch(
      `${BASE_URL}/movie/upcoming?language=en-US&page=${pageParam}&region=KR`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log('Upcoming Data:', data);
        return filterOutGenre27(data.results);
      });
  },
  nowPlaying: () => {
    return fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1&region=KR`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log('Now Playing Data:', data);
        return filterOutGenre27(data.results);
      });
  },
  search: ({ queryKey }) => {
    const [_, query] = queryKey; // 배열에서 첫 번째 item 무시하고 두 번째 item 불러오기
    return fetch(
      `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey; // 배열에서 첫 번째 item 무시하고 두 번째 item 불러오기
    return fetch(
      `${BASE_URL}/movie/${id}?append_to_response=videos,images&language=en-US`,
      options,
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () => {
    return fetch(`${BASE_URL}/trending/tv/week?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        //console.log('Trending Data:', data);
        return filterOutGenre27(data.results);
      });
  },
  airingToday: () => {
    return fetch(`${BASE_URL}/tv/airing_today?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        //console.log('Trending Data:', data);
        return filterOutGenre27(data.results);
      });
  },
  topRated: () => {
    return fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        //console.log('Trending Data:', data);
        return filterOutGenre27(data.results);
      });
  },
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey; // 배열에서 첫 번째 item 무시하고 두 번째 item 불러오기
    return fetch(
      `${BASE_URL}/tv/${id}?append_to_response=videos,images&language=en-US`,
      options,
    ).then((res) => res.json());
  },
};
