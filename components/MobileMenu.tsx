import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className='
        w-56
        py-5
        flex
        flex-col
        absolute
        top-8
        left-0
        border-2
        border-gray-800
        bg-black
      '
    >
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline'>
          Home
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Series
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Films
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          New & Popular
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          My List
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Browse by Language
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
