import React from 'react';
import NavbarItem from '@/components/NavbarItem';
import MobileMenu from '@/components/MobileMenu';
import AccountMenu from '@/components/AccountMenu';
import logoImg from '@/images/logo.png';
import defaultBlueImg from '@/images/default-blue.png';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);

  const toggleMobileMenu = React.useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountMenu = React.useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='fixed z-40 w-full'>
      <div
        className={`
          px-4
          md:px-16
          py-6
          flex
          items-center
          transition
          duration-500
          ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}
      >
        <img className='h-4 lg:h-7' src={logoImg.src} alt="logo" />
        <div
          className='
           ml-8
           gap-7
           hidden
           lg:flex
          '
        >
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by languages' />
        </div>
        <div onClick={toggleMobileMenu} className='ml-8 relative lg:hidden flex items-center gap-2 cursor-pointer'>
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex ml-auto gap-7 items-center'>
          <div className='text-gray-200 cursor-pointer hover:text-gray-300 transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 cursor-pointer hover:text-gray-300 transition'>
            <BsBell />
          </div>
  
          <div onClick={toggleAccountMenu} className='flex items-center gap-2 cursor-pointer relative'>
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-sm overflow-hidden'>
              <img src={defaultBlueImg.src} alt="logo" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
    
        </div>
      </div>
    </nav>
  )
};

export default Navbar;