import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

import defaultBlueImg from '@/images/default-blue.png';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();
  const router = useRouter();

  if (!visible) {
    return <div />;
  };

  return (
    <div
      className='
        w-56
        py-5
        flex
        flex-col
        absolute
        top-14
        right-0
        bg-black
        border-2
        border-gray-800
      '
    >
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex gap-3 items-center'>
          <img className='w-8 rounded-sm' src={defaultBlueImg.src} alt="logo" />
          <p
            className='text-white text-sm group-hover/item:underline'
            onClick={() => router.push('/profiles')}
          >
            {user?.name}
          </p>
        </div>
        <hr className='h-px my-4 bg-gray-600 border-0' />
        <div onClick={() => signOut()} className='px-3 text-center text-white text-sm hover:underline'>
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
