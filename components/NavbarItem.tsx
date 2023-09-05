import React, { Component } from 'react'

interface NavbarItemProps {
  label: string;
}

const NavbarItem = (props: NavbarItemProps) => {
  const { label } = props;
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
      {label}
    </div>
  );
};

export default NavbarItem;