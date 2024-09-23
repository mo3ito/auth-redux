'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'


export default function page() {


  
  return (
    <div className='flex flex-col gap-y-3 items-center justify-center w-full h-screen '>
      <Link href="/register" className='w-44 h-12 bg-blue-400 text-xl rounded-lg flex items-center justify-center'>ثبت‌نام</Link>
      <Link href="/login" className='w-44 h-12 bg-blue-400 text-xl rounded-lg flex items-center justify-center'>ورود</Link>
    </div>
  )
}
