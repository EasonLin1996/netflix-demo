import React from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Input from '@/components/Input';

enum ActionType {
  SET_NAME = 'SET_NAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  RESET = 'RESET',
}

const initialReducerState = {
  name: '',
  email: '',
  password: '',
};

const reducer = (state: typeof initialReducerState, action: { type: ActionType; payload: string }) => {
  switch (action.type) {
    case ActionType.SET_NAME:
      return { ...state, name: action.payload };
    case ActionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionType.SET_PASSWORD:
      return { ...state, password: action.payload };
    case ActionType.RESET:
      return initialReducerState;
    default:
      return state;
  }
};

const Auth = () => {
  const [loginState, loginDispatch] = React.useReducer(reducer, initialReducerState);
  const [mode, setMode] = React.useState('login');
  const isLoginMode = mode === 'login';
  const toggleMode = () => {
    setMode((mode) === 'login' ? 'register' : 'login');
  }

  const login = async () => {
    try {
      const res = await signIn('credentials', {
        email: loginState.email,
        password: loginState.password,
        callbackUrl: '/profiles',
      });

      if (res?.status !== 200) {
        loginDispatch({ type: ActionType.RESET, payload: ''});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      await axios.post('/api/register', loginState);

      login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-center bg-cover bg-fixed">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {isLoginMode ? 'Sign In' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {!isLoginMode && (
                <Input
                  id='name'
                  label='Username'
                  value={loginState.name}
                  type='text'
                  onChange={(e) => {
                    loginDispatch({ type: ActionType.SET_NAME, payload: e.target.value});
                  }}
                />
              )}
              <Input
                id='email'
                label='Email'
                value={loginState.email}
                type='email'
                onChange={(e) => {
                  loginDispatch({ type: ActionType.SET_EMAIL, payload: e.target.value});
                }}
              />
              <Input
                id='password'
                label='Password'
                value={loginState.password}
                type='password'
                onChange={(e) => {
                  loginDispatch({ type: ActionType.SET_PASSWORD, payload: e.target.value});
                }}
              />
            </div>
            <button
              onClick={isLoginMode ? login : register}
              className='
                w-full
                mt-10
                py-3
                bg-red-600
                text-white
                rounded-md
                hover:bg-red-700
                transition
              '
            >
              {isLoginMode ? 'Login' : 'Sign up'}
            </button>
            <div className='flex flex-row items-center justify-center mt-8 gap-4'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  bg-white
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  transition
                '
              >
                <FcGoogle size={30}/>
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  bg-white
                  rounded-full
                  cursor-pointer
                  hover:opacity-80
                  transition
                '
              >
                <FaGithub size={30}/>
              </div>
            </div>
            <p className='text-neutral-500 mt-12'>
              {isLoginMode ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleMode} className='text-white ml-2 hover:underline cursor-pointer'>
                {isLoginMode ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;