import { Movie } from "./movie";

export interface MovieState {
    movies: Movie[];
    selectedMovie: Movie | null;
    loading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
}