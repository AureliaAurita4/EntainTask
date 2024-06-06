import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieItem.scss';
import { MovieItemProps } from '../interfaces/movieItemProps';

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <div className='movie-item'>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );
};

export default MovieItem;
