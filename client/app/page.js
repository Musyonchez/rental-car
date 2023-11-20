"use client"
import Navbar from './navbar/navbar'
import React from 'react'
import Hero from './hero/hero'

const index = () => {
  return (
    <div className=' bg-slate-100 min-h-screen'>
      <Navbar />
      <div className=' flex justify-center flex-col w-screen items-center mt-14'>
        <div className=' w-1/2 bg-white h-1'></div>
          Rent now for as low as $40/day
          <div className=' w-1/2 bg-white h-1'></div>
      </div>
      <Hero />
      </div>
  )
}

export default index