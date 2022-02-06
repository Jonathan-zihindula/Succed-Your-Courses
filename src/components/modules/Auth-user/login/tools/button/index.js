import React from 'react';

const LoginButton = ({isDisabled}) => {
    return (
        <div className='w-full absolute 2xl:relative xl:relative lg:relative md:relative sm:bottom-6 xsm:bottom-4 flex justify-center items-center'>
            <button type='submit' className='font-Poppins bg-2778F0 sm:w-96 xsm:w-80 2xl:w-80 2xl:mt-10 xl:w-80 xl:mt-10 lg:w-80 md:w-80 md:mt-10 lg:mt-10 h-12 rounded-xl text-center text-white font-extrabold' disabled={isDisabled}>Login</button>
        </div>
    )
}

export default LoginButton;