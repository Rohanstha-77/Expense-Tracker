import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import SIdeNavBar from './SIdeNavBar'

const DashboardHeader = () => {
  const [openNavBar, setOpenNavBar] = useState(false)
  return (
    <>
        <div className='p-5 shadow-sm border-b flex justify-between'>
            <div>
              <Menu className='lg:hidden cursor-pointer' onClick={()=>setOpenNavBar(!openNavBar)}/>
            </div>
            <div>
                <UserButton/>
            </div>
        </div> 
        {openNavBar && (<SIdeNavBar/>)}
    </>
  )
}

export default DashboardHeader