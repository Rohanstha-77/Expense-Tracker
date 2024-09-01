"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { db } from '@/utils/dbConfig'
import Bugets from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'



const CreateBudget = ({ refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState("😊")
  const [openEmoji, setOpenEmoji] = useState(false)

  const [names, setNames] = useState("")
  const [amounts, setAmounts] = useState("")

  const { user } = useUser()

  const onCreateBudget = async () => {
    try {
      const result = await db.insert(Bugets)
        .values({
          name: names || "",
          amount: amounts || "0",
          createdBy: user?.primaryEmailAddress?.emailAddress || "",
          icon: emojiIcon || ""
        })
        .returning({ insertedId: Bugets.id });

      if (result) {
        refreshData();
        toast("Successfully created budget");
      } else {
        toast("Failed to create budget");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast("An error occurred while creating the budget");
    }
  };


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
            <h2 className='text-3xl'>+</h2>
            <h2>Create budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your new Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button variant="outline" size="lg" className="text-lg" onClick={() => setOpenEmoji(!openEmoji)}>{emojiIcon}</Button>
                {openEmoji && (
                  <div className='absolute z-20'>
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmoji(false);
                      }}
                    />
                  </div>
                )}
                <div>
                  <h2 className='text-black font-medium my-2'>Budget name</h2>
                  <Input type='text' value={names} onChange={(e) => setNames(e.target.value)} placeholder='Enter your Budget name' />
                </div>

                <div>
                  <h2 className='text-black font-medium my-2'>Budget Amount</h2>
                  <Input type='number' value={amounts} onChange={(e) => setAmounts(e.target.value)} placeholder='Enter your Budget amount' />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={!(names && amounts)}
                onClick={() => onCreateBudget()}
                className='mt-5 bg-primary w-full'>
                Create budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateBudget;
