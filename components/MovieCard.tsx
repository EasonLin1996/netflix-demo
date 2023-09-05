import React from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import useInfoModal from '@/hooks/useInfoModal';
import FavoriteButton from '@/components/FavoriteButton';

interface MovieCardProps {
  movie: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { movie } = props;
  const router = useRouter();
  const { openModal } = useInfoModal();

  const handleInfoModal = () => {
    openModal(movie?.id);
  };

  return (
    <div className='group bg-zinc-900 col-span relative h-[12vw]'>
      <img
        className='
          w-full
          h-[12vw]
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90 sm:group-hover:opacity-0
          delay-300
        '
        src={movie.thumbnailUrl}
        alt='' 
      />
      <div
        className='
          absolute
          top-0
          w-full
          opacity-0
          z-10
          transition
          duration-200
          delay-300
          scale-0
          invisible sm:visible
          group-hover:scale-110
          group-hover:-translate-y-[6vw]
          group-hover:translate-x-[2vw]
          group-hover:opacity-100
        '
      >
        <img
          className='
            w-full
            h-[12vw]
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-t-md
          '
          src={movie.thumbnailUrl}
          alt=''
        />
        <div
          className='
            p-2 lg:p-4
            bg-zinc-800
            transition
            shadow-md
            rounded-b-md
          '
        >
          <div className='flex items-center gap-3'>
            <div
              className='
                flex
                justify-center
                items-center
                w-6 lg:w-10
                h-6 lg:h-10
                bg-white
                rounded-full
                cursor-pointer
                transition
                hover:bg-neutral-300
              '
              onClick={() => router.push(`/watch/${movie?.id}`)}
            >
              <BsFillPlayFill size={28} />
            </div>
            <FavoriteButton movieId={movie?.id} />
            <div
              className='
                group/item
                h-6 lg:h-10
                w-6 lg:w-10
                ml-auto
                flex
                justify-center
                items-center
                border-white
                border-2
                rounded-full
                cursor-pointer
                transition
                hover:border-neutral-300
              '
              onClick={handleInfoModal}
            >
              <BiChevronDown
                size={30}
                className=' text-white group-hover/item:text-neutral-300'
              />
            </div>
          </div>
          <p className='mt-4 text-green-400 font-semibold'>
            New <span className='text-white'>2023</span>
          </p>
          <div className='mt-4 flex gap-2 item-center'>
            <p className='text-white text-[10px] lg:text-sm'>{movie.duration}</p>
          </div>
          <div className='mt-4 flex gap-2 item-center'>
            <p className='text-white text-[10px] lg:text-sm'>{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;