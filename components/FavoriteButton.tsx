import axios from 'axios';
import React from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorite from '@/hooks/useFavorite';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = (props) => {
  const { movieId } = props;
  const { mutate: mutateFavorite } = useFavorite();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = currentUser?.favoriteIds?.includes(movieId) || false;

  const handleFavorite = async () => {
    let res;

    if (isFavorite) {
      res = await axios.delete(`/api/favorite`, { data: { movieId } });
    } else {
      res = await axios.post(`/api/favorite`, { movieId });
    }

    const updatedFavoriteList = res?.data?.favoriteList;
    
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteList,
    });

    mutateFavorite();
  };

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={handleFavorite}
      className='
        group/item
        w-6 lg:w-10
        h-6 lg:h-10
        flex
        justify-center
        items-center
        cursor-pointer
        border-white
        border-2
        rounded-full
        transition
        hover:bg-neutral-300
      '
    >
      <Icon className='text-white'  size={25} />
    </div>
  );
};

export default FavoriteButton;