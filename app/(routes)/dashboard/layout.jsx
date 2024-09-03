"use client"
import React, { useEffect } from 'react'
import SIdeNavBar from '@/components/SIdeNavBar'
import DashboardHeader from '@/components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import Bugets from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


const layout = ({children}) => {


  const router = useRouter()
  const { user } = useUser();


  const checkUserBudget = async () => {
    if (!user) return;
    
    try {
      const result = await db
        .select()
        .from(Bugets)
        .where(eq(Bugets.createdBy, user.primaryEmailAddress?.emailAddress ?? ''));
      if(result?.length == 0 ){
        router.replace('/dashboard/budget')
      }
      // console.log(result);
    } catch (error) {
      console.error("Error fetching user budgets:", error);
    }
  };

  return (
    <div>
        <div className='fixed md:w-64 hidden md:block '>
          <SIdeNavBar/>

        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
            {children}
        </div>
    </div>
  )
}

export default layout