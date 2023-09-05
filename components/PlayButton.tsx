import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = (props) => {
  const { movieId } = props;
  const router = useRouter();

  const handlePlay = () => {
    router.push(`/watch/${movieId}`);
  };

  return (
    <button
      onClick={handlePlay}
      className='
        flex
        items-center
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        bg-white
        rounded-md
        hover:bg-neutral-300]
        transition
      '
    >
      <BsFillPlayFill className='mr-1' size={25} />
      Play
    </button>
  );
};

export default PlayButton;