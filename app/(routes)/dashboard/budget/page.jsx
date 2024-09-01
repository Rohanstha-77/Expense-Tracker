import BudgetList from '@/components/BudgetList'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='p-10'>
        <h2 className='font-bold text-3xl'>My Budget</h2>
        <BudgetList/>
      </div>
    </>
  )
}

export default page