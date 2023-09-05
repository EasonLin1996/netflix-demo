import React from 'react';

interface InputProps {
  id: string;
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const { id, label, value, type, onChange } = props;
  return (
    <div className='relative'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder=' '
        className='
          block
          w-full
          rounded-md
          px-6
          pt-6
          pb-1
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        '
      />
      <label
        htmlFor='email'
        className='
          absolute
          text-md
          text-zinc-400
          top-4
          left-6
          z-10
          origin-[0]
          -translate-y-3
          scale-75
          duration-150
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:-translate-y-3
          peer-focus:scale-75
        '
      >
        {label}
      </label>
    </div>
  );
}

export default Input;