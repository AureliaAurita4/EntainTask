import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchMovies, setCurrentPage } from '../store/movieSlice';
import MovieItem from './MovieItem';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import '../styles/MovieList.scss';

const DEFAULT_MOVIE = 'Matrix';

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, searchQuery, currentPage } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    // Fetch default movie
    dispatch(fetchMovies({ searchQuery: DEFAULT_MOVIE, page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchMovies({ searchQuery, page: currentPage }));
    }
  }, [searchQuery, currentPage, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='movie-list'>
      <div className='controls'>
        <div className='search-bar'>
          <SearchBar />
        </div>
        <div className='pagination'>
          <Pagination />
        </div>
      </div>
      <div>
        <h2>Favourite Movies List</h2>
        {movies.map(movie => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
