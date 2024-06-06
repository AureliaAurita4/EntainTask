import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchMovieDetails } from '../store/movieSlice';
import '../styles/MovieDetails.scss';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, loading, error } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    selectedMovie && (
      <div className='movie-details'>
        <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
        <div className='movie-info'>
          <h2>{selectedMovie.Title}</h2>
          <p>{selectedMovie.Year}</p>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
