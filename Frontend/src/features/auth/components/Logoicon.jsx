import React from 'react'

const Logoicon = () => {
  return (
  <header className='w-full fixed top-0 '>
    <div className='flex items-center'>
        <img className='w-25 items-center' src="/images/Logo.png" alt="" />
        <h1 className='text-4xl font-bold'>Neura</h1>
        <h1 className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl font-bold '>Gen</h1>
    </div>
  </header>
  )
}

export default Logoicon
