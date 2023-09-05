import React from 'react';
import { isEmpty } from 'lodash';

import MovieCard from '@/components/MovieCard';

interface MovieListProps {
  movies: Record<string, any>[];
  title: string;
};

const MovieList: React.FC<MovieListProps> = (props) => {
  const { movies, title } = props;

  if (isEmpty(movies)) {
    return null;
  }

  return (
    <div
      className='
        mt-4
        px-4 md:px-12
        space-y-8
      '
    >
      <div>
        <p className='mb-4 text-white text-md md:text-xl lg:text-2xl font-semibold'>
          {title}
        </p>
        <div className='grid grid-cols-4 gap-2'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList;