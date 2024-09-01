import Link from 'next/link'
import React from 'react'



const BudgetItems = ({list}) => {
    const calculateProgressPerc = ()=>{
        const amount=list.amount
        const totalSpend = list.totalSpend
        const perc = (totalSpend / amount) * 100;
        return perc.toFixed(2)
    }
  return (
    <>
        <Link href={'/dashboard/Expenses/' + list.id} >
            <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-3xl p-3 px-4 bg-slate-100 rounded-full'>{list?.icon}</h2>
                        <div>
                            <h2 className='font-bold'>{list.name}</h2>
                            <h2 className='text-sm text-gray-500'>{list.totalItems} Item</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-primary text-lg'>{list.amount}</h2>
                </div>

                

                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3'>
                        {/* <h2 className='text-xs text-slate-400'>{list.totalSpend?list.totalSpend:0} spend</h2> */}
                        {list.totalSpend > list.amount ? <h2 className='text-xs text-red-400'>{list.totalSpend?list.totalSpend:0} spend</h2> : <h2 className='text-xs text-slate-400'>{list.totalSpend?list.totalSpend:0} spend</h2>}
                        {/* <h2 className='text-xs text-slate-400'>{list.amount - list.totalSpend} Remaning</h2> */}
                        {list.amount - list.totalSpend < 0 ? <h2 className='text-xs text-slate-400'>you have cross your budget limit</h2> : <h2 className='text-xs text-slate-400'>{list.amount - list.totalSpend} Remaning</h2>}
                    </div>
                    <div className='w-full bg-slate-300 h-2 rounded-full'>
                        <div style={{
                            width: `${Math.min(Math.max(+calculateProgressPerc(), 0), 100)}%` //Math.max(+calculateProgressPerc(), 0): Ensures that the width is at least 0%. //Math.min(..., 100): Ensures that the width does not exceed 100%. 
                        }} className='bg-primary h-2 rounded-full'>                         
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    </>
  )
}

export default BudgetItems