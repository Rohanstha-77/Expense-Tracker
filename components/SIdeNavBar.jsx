"use client"
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { menu } from '@/app/constant'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SIdeNavBar = () => {
    const currentPath = usePathname()
    // useEffect(()=>{
    //     console.log(currentPath)
    // })
  return (
    <>
        <div className='h-screen p-5 border shadow-sm'>
            <Image
            src={logo}
            width={40}
            height={40}
            alt='logo'
            className='mb-12'
            />
            <div className='mt-5'>
                {menu.map((menu, index)=>(
                    <Link key={index} href={menu.Path}>
                        <h2 className={`flex gap-2 font-medium items-center text-gray-500 p-5 rounded-md mb-2 cursor-pointer hover:text-primary hover:bg-blue-200 ${currentPath===menu.Path && 'text-[#4845d2] bg-blue-200'}`}>
                            {<menu.icon/>}
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-6 p-5 flex gap-2 items-center'>
                <UserButton/>
                Profile
            </div>
        </div>
    </>
  )
}

export default SIdeNavBar