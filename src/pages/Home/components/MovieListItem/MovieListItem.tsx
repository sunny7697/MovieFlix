import React from 'react';

import { IMovieDetails } from '../../../../common/models';
import './MovieListItem.css';

export interface IMovieListItemProps extends IMovieDetails {}

const MovieListItem = React.forwardRef(
  ({ movie }: IMovieListItemProps, ref: any) => {
    const imgUrl = `https://image.tmdb.org/t/p/w300/`;

    const movieBody = (
      <>
        <div className='list-item-img-container'>
          <img
            src={`${imgUrl}/${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        </div>
        <div className='list-item-details'>
          <div className='list-item-details-title'>{movie.title}</div>
          <div className='list-item-details-footer'>
            <span>{movie.vote_average}</span>
            <span>{movie.release_date}</span>
          </div>
        </div>
      </>
    );

    const content = ref ? (
      <li ref={ref} className='list-item'>
        {movieBody}
      </li>
    ) : (
      <li className='list-item'>{movieBody}</li>
    );

    return content;
  }
);

export default MovieListItem;
