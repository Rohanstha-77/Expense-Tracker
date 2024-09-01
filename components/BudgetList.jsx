"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { getTableColumns, sql, eq, desc } from 'drizzle-orm'
import { expenses } from '@/utils/schema'
import Bugets from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItems from './BudgetItem'

const BudgetList = () => {
  const {user} = useUser()
  const [budgetList, setBudgetList] = useState([])

  useEffect(()=>{
    user&&getBudgetList()
  },[user])
  const getBudgetList = async ()=>{

    const result = await db.select({
      ...getTableColumns(Bugets),
      totalSpend: sql `sum(${expenses.amount})`.mapWith(Number),
      totalItems: sql `count(${expenses.id})`.mapWith(Number)
    }).from(Bugets)
    .leftJoin(expenses,eq(Bugets.id,expenses.budgetId))
    .where(eq(Bugets.createdBy,user?.primaryEmailAddress?.emailAddress ?? ''))
    .groupBy(Bugets.id).orderBy(desc(Bugets.id))
    setBudgetList(result)
    // console.log(result)
  }
  return (
    <>
      <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <CreateBudget refreshData={()=>getBudgetList()}/>
          {budgetList?.length > 0 ? budgetList.map((list)=>(
            <BudgetItems list={list}/>
          )):
          [1,2,3,4,5].map((item,index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

            </div>
          ))}
        </div> 
      </div>
    </>
  )
}

export default BudgetList