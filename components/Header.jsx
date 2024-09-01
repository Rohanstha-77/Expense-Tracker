"use client"
import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
import Link from 'next/link'

const Header = () => {
  //check if User is signIn or not

  return (
    <>
        <div className='flex justify-between p-5 border shadow-sm'>
            <Image
            src={logo}
            height={30}
            width={30}
            alt=''
            />
            <Link href='/dashboard'>
              <Button className="bg-primary">Get Started</Button>
            </Link>
        </div>
    </>
  )
}

export default Header