'use client'

import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { useParamsStore } from '../hooks/useParamsStore';

export default function Logo() {
  const reset = useParamsStore(state => state.reset);
  return (
    <div onClick={reset} className='flex items-center gap-2 text-3xl font-semibold text-red-500'>
        <AiOutlineCar />
        <div>Sita Auctions</div>
    </div>
  )
}