export interface IMoviesList {
  results: IMovieDetails[];
}

export interface IMovieDetails {
  id: number;
  genre_ids: number[];
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  year?: string;
  [key: string]: any;
}

export type StringKeyObject = {
  [key: string]: any;
} | null;
