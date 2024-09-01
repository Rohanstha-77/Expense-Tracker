import React from 'react'
import Image from 'next/image'
import Dashboard from '@/public/dashboard.jpg'
import Link from 'next/link'



const Hero = () => {
  return (
    <>
    <section className="bg-gray-50 flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:items-center">
            <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold  sm:text-5xl">
                Manage Your Expenses
                <strong className="font-extrabold text-primary sm:block"> Control Your Money Flow. </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
                Start Creating youe budget and Control your Money Floow
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href='/dashboard' className='className="block rounded-md bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-800 focus:outline-none focus:ring active:bg-primary sm:w-auto"'>
                    Get Started
                </Link>
            </div>
            </div>
        </div>
        <Image
            src={Dashboard}
            height={700}
            width={1000}
            alt=''
            className='mt- rounded-xl border-2'
        />
    </section>
    </>
  )
}

export default Hero