import React from 'react';
import useBillboard from '@/hooks/useBillboard';
import useInfoModal from '@/hooks/useInfoModal';
import PlayButton from '@/components/PlayButton';

import { AiOutlineInfoCircle } from 'react-icons/ai';

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenInfoModal = () => {
    openModal(data?.id);
  };

  return (
    <div className='relative h-[56.25vw]'>
      <video
        className='
          w-full
          h-[56.25vw]
          object-cover
          brightness-[60%]
        '
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div
        className='
          absolute
          top-[30%] md:top-[40%]
          ml-4 md:ml-16
        '
      >
        <p
          className='
            h-full
            w-[50%]
            text-white
            text-1xl md:text-5xl lg:text-6xl
            font-bold
            drop-shadow-xl
          '
        >
          {data?.title}
        </p>
        <p
          className='
            text-white
            text-[8px]
            md:text-lg
            mt-3 md:mt-8
            w-[90%] md:w-[80%] lg:w-[50%]
            drop-shadow-xl
          '
        >
          {data?.description}
        </p>
        <div
          className='
            flex
            items-center
            mt-3
            md:mt-4
            gap-3
          '
        >
          <PlayButton movieId={data?.id} />
          <button
            type="button"
            className='
              bg-white
              text-white
              bg-opacity-30
              rounded-md
              py1 md:py-2
              px2 md:px-4
              w-auto
              text-xs lg:text-lg
              font-semibold
              flex
              items-center
              hover:bg-opacity-20
              transition
            '
            onClick={handleOpenInfoModal}
          >
            <AiOutlineInfoCircle className='mr-1' />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;