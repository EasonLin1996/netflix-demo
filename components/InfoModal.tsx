import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useMovie from '@/hooks/useMovie';
import useInfoModal from '@/hooks/useInfoModal';

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void; 
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(!!visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  React.useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!visible) {
    return null;
  }


  return (
    <div
      className='
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        z-50
        bg-black
        bg-opacity-80
        inset-0
        transition
        duration-300
      '
    >
      <div
        className='
          w-auto
          mx-auto
          relative
          max-w-3xl
          rounded-md
          overflow-hidden
        '
      >
        <div
          className={`
            flex-auto
            bg-zinc-900
            drop-shadow-md
            relative
            transform
            ${isVisible ? 'scale-100' : 'scale-0'}
            duration-300
          `}
        >
          <div className='relative h-96'>
            <video
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className='
                w-full
                h-full
                object-cover
                brightness-[60%]
              '
            />
            <div
              className='
                absolute
                top-3
                right-3
                flex
                items-center
                justify-center
                h-10
                w-10
                bg-black
                bg-opacity-70
                cursor-pointer
              '
              onClick={handleClose}
            >
              <AiOutlineClose className='text-white' size={20} />
            </div>

            <div
              className='
                absolute
                bottom-[10%]
                left-10
              '
            >
              <p
                className='
                  h-full
                  mb-8
                  text-white
                  font-bold
                  text-3xl md:text-4xl lg:text-5xl
                '
              >
                {data?.title}
              </p>
              <div className='flex gap-4 items-center'>
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold text-lg'>
              New
            </p>
            <p className='text-white text-lg'>
              {data?.duration}
            </p>
            <p className='text-white text-lg'>
              {data?.genra}
            </p>
            <p className='text-white text-lg'>
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;