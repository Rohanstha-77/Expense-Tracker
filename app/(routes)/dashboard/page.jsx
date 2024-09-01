"use client"

import Barchart from '@/components/BarChart'
import BudgetItems from '@/components/BudgetItem'
import CardsInfo from '@/components/CardInfo'
import ExpensesListTable from '@/components/ExpensesListTable'
import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { getTableColumns, sql, eq, desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Bugets from '@/utils/schema'

const page = () => {
  const {user} = useUser()
  const [budgetList, setBudgetList] = useState([])
  const [ExpensesList, setExpensesList] = useState([])
  


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
    getAllExpenses()
    // console.log(result)
  }
  useEffect(()=>{
    user&&getBudgetList()
  },[user])
  // console.log(budgetList)


  const getAllExpenses = async ()=>{
    const result = await db.select({
      id: expenses.id,
      name : expenses.name,
      amount : expenses.amount,
      createdAt : expenses.createdAt
    }).from(Bugets)
    .rightJoin(expenses,eq(Bugets.id,expenses.budgetId))
    .where(eq(Bugets.createdBy,user?.primaryEmailAddress?.emailAddress ?? ''))
    .orderBy(desc(expenses.id))
    // console.log(result)
    setExpensesList(result)
  }
  return (
    <>
      <div className='p-8'>
        <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
        <CardsInfo BudgetList={budgetList}/>

        <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>
            <Barchart BudgetList={budgetList}/>

            <ExpensesListTable expensesList={ExpensesList} refreshData={()=>getBudgetList()}/>
          </div>
          <div>

            <h2 className='font-bold text-lg mb-2'>Latest Budget</h2>
          <div className='grid gap-5'>
            {budgetList.map((budget, index)=>(
              <BudgetItems list={budget} key={index}/>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page