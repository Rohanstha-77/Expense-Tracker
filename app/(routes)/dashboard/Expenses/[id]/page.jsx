"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { getTableColumns, sql, eq, desc, and } from 'drizzle-orm'
import Bugets from '@/utils/schema'
import { expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItems from '@/components/BudgetItem'
import AddExpenses from '@/components/AddExpenses'
import ExpensesListTable from '@/components/ExpensesListTable'
import { Button } from '@/components/ui/button'
import { PenBox, Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import EditBudget from '@/components/EditBudget'



const Expenses = ({ params }) => {
  const router = useRouter()
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [ExpensesList, setExpensesList] = useState([]);

  const getBudgetInfo = async () => {
    try {
      if (!user) return; 
      const result = await db.select({
        ...getTableColumns(Bugets),
        totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${expenses.id})`.mapWith(Number)
      })
      .from(Bugets)
      .leftJoin(expenses, eq(Bugets.id, expenses.budgetId))
      .where(and(
        eq(Bugets.createdBy, user.primaryEmailAddress?.emailAddress ?? ''),
        eq(Bugets.id, Number(params.id))
      ))
      .groupBy(Bugets.id)
      .orderBy(desc(Bugets.id));

      setbudgetInfo(result[0]);
      await getExpensesList(); // Fetch expenses list after getting budget info
    } catch (error) {
      console.log("Error fetching data from expenses", error);
    }
  }

  const getExpensesList = async () => {
    try {
      const result = await db.select().from(expenses)
      .where(eq(expenses.budgetId, Number(params.id)))
      .orderBy(desc(expenses.id));
      // console.log(result)
      setExpensesList(result);
    } catch (error) {
      console.log("Error fetching expenses list", error);
    }
  }

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user]);
  // console.log("Expenses List:", JSON.stringify(ExpensesList, null, 2));
  const deleteBudget =async () =>{
    const deleteExpenseResult= await db.delete(expenses)
    .where(eq(expenses.budgetId, Number(params.id)))
    if(deleteExpenseResult){
      const result = await db.delete(Bugets)
      .where(eq(Bugets.id, Number(params.id)))
      .returning()
      
      if(result){
        router.push('/dashboard/budget')
        toast("sucessfully deleted your budget")
      }
    }
    console.log("sucess to delete data", deleteExpenseResult)
  }

  // console.log(budgetInfo)
  return (
    <div className='p-10'>
      <h2 className="text-2xl font-bold flex justify-between items-center">My Expenses


        <div className='flex gap-2 items-center'>

          <EditBudget refreshData={()=>getBudgetInfo} BudgetInfo={budgetInfo}/>

          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2' variant="destructive">
                <Trash/> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your current budget
                  and remove your data from your budget list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteBudget()} className="bg-primary">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
        {budgetInfo ?  
          <BudgetItems list={budgetInfo}/> 
          : 
          <div className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
        }
        <AddExpenses refreshData={getBudgetInfo} user={user} budgetId={params.id}/>
      </div>
      <div>
        <ExpensesListTable refreshData={()=>getBudgetInfo()} expensesList = {ExpensesList}/>
      </div>
    </div>
  )
}

export default Expenses;
