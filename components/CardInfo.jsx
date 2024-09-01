import { useUser } from '@clerk/nextjs'
import { PiggyBankIcon, ReceiptText, Wallet } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'



const CardsInfo = ({BudgetList}) => {
    const {user} = useUser()
    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)
    const calculateCardInfo = ()=>{
        // console.log(BudgetList)
        let totalBudget_ = 0
        let totalSpend_ = 0
        BudgetList.forEach(element =>{
            totalBudget_ = totalBudget_+ Number(element.amount)
            totalSpend_ = totalSpend_ + element.totalSpend
        })
        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)

        // console.log(totalBudget_,totalSpend_)
    }

    useEffect(()=>{
       calculateCardInfo()
    },[BudgetList])
  return (
    <>
        {BudgetList?.length > 0 ? 
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='p-7 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h2 className='text-sm'>Total Budget</h2>
                        <h2 className='font-bold text-2xl'>{totalBudget}</h2>
                    </div>
                    <PiggyBankIcon className='bg-primary text-white p-3 h-12 w-12 rounded-full '/>
                </div>

                <div className='p-7 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h2 className='text-sm'>Total Spend</h2>
                        <h2 className='font-bold text-2xl'>{totalSpend}</h2>
                    </div>
                    <ReceiptText className='bg-primary text-white p-3 h-12 w-12 rounded-full '/>
                </div>

                <div className='p-7 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h2 className='text-sm'>No. Of Budget</h2>
                        <h2 className='font-bold text-2xl'>{BudgetList.length}</h2>
                    </div>
                    <Wallet className='bg-primary text-white p-3 h-12 w-12 rounded-full '/>
                </div>
            </div>
        :
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    [1,2,3].map((item, index)=>(
                        <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'>

                        </div>
                    ))
                }
            </div>
        }
    </>
  )
}

export default CardsInfo