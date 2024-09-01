import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { db } from '@/utils/dbConfig'
import Bugets from '@/utils/schema'

import { toast } from 'sonner'
import { expenses } from '@/utils/schema'

const AddExpenses = ({budgetId, user, refreshData}) => {
    const [name, setName] = useState("")
    const [Amount, setAmount] = useState("")

    const addNewExpenses = async ()=>{
        const result = await db.insert(expenses).values({
            name: name,
            amount: Amount,
            budgetId: budgetId,
            createdAt: new Date().toISOString()    //user?.primaryEmailAddress?.emailAddress
        }).returning ({insertedId:Bugets.id})
        // console.log("result",result)
        if(result){
            refreshData()
            toast("Sucessfully added your expenses")
        }else{
            toast("Fail to add expenses")
        }
    }
  return (
    <>
        <div>
            <h2 className='font-bold text-lg'>Add Expenses</h2>
            <div>
                <h2 className='text-black font-medium my-2'>Expense name</h2>
                <Input type='text' onChange={(name)=>setName(name.target.value)} placeholder='Enter your Expenses name'/>
            </div>

            <div>
                <h2 className='text-black font-medium my-2'>Expense amount</h2>
                <Input type='text' onChange={(Amount)=>setAmount(Amount.target.value)} placeholder='Enter your Expenses name'/>
            </div>

            <Button disabled={!(name && Amount)} onClick={()=>addNewExpenses()} className='mt-3 bg-primary w-full'>Add Expenses</Button>

        </div>
    </>
  )
}

export default AddExpenses