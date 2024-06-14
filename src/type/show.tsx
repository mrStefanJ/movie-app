import { Genre } from "./genre";

export interface Movie {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  backdrop_path: string;
  id: number;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  adult: boolean;
  title: string;
  original_language: OriginalLanguage;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  original_name?: string;
  name: string;
  first_air_date: string;
  origin_country?: string[];
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  De = "de",
  En = "en",
  Ja = "ja",
}

interface Collection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string | null;
  name: string;
  original_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  season_number: number;
  still_path: string | null;
}

interface Network {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface ShowDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  created_by?: CreatedBy[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name?: string;
  networks: Network[];
  next_episode_to_air: Episode | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: OriginalLanguage;
  original_title: string;
  original_name: string;
  overview?: string;
  popularity: string;
  poster_path?: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date?: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  seasons: Season[];
  tagline?: string;
  title?: string;
  video: boolean;
  vore_average: number;
  vote_count: number;
}
