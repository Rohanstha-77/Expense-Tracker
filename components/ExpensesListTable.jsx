import { db } from '@/utils/dbConfig';
import { expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const ExpensesListTable = ({ expensesList,refreshData }) => {
    const deleteExpense = async ()=>{
        const result = await db.delete(expenses).where(eq(expenses.id, expenses.id)).returning()
        if(result){
            refreshData()
            toast("Sucessfully deleted your expenses")
        }else{
            toast("Failed to delete your expenses")
        }
    }
  return (
    <>
      <div className='mt-3'>
        <h2 className='font-bold text-lg mb-4'>Latest Expenses</h2>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
          <h2 className='font-bold'>Name</h2>
          <h2 className='font-bold'>Amount</h2>
          <h2 className='font-bold'>Date</h2>
          <h2 className='font-bold'>Action</h2>
        </div>
        {expensesList.map((expense) => (
          <div key={expense.id} className='grid grid-cols-4 bg-slate-50 p-2'>
            <h2>{expense?.name}</h2>
            <h2>{expense?.amount}</h2>
            <h2>{new Date(expense?.createdAt).toLocaleDateString()}</h2>
            <h2>
              <Trash className='text-red-600 cursor-pointer' onClick={()=>deleteExpense()} />
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpensesListTable;
