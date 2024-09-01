"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PenBox } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Input } from './ui/input';
import { useUser } from '@clerk/nextjs';
import Bugets from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({ BudgetInfo}) => {
    const [emojiIcon, setEmojiIcon] = useState(BudgetInfo?.icon);
    const [openEmoji, setOpenEmoji] = useState(false);
    const { user } = useUser();

    const [names, setNames] = useState();
    const [amounts, setAmounts] = useState();

    useEffect(()=>{
        if(BudgetInfo){
            setEmojiIcon(BudgetInfo?.icon);
            setAmounts(BudgetInfo?.amount);
            setNames(BudgetInfo?.name);
        }
    },[BudgetInfo]);

    const onUpdateBudget = async () => {
        try {
            const result = await db.update(Bugets).set({
                name: names,
                amount: amounts,
                icon: emojiIcon
            }).where(eq(Bugets?.id, BudgetInfo?.id)).returning();
            
            if (result.length > 0) {
                window.location.reload()
                toast("Successfully updated your budget");
            } else {
                toast('Failed to update your budget');
            }
        } catch (error) {
            console.error("Failed to update budget:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex bg-primary gap-2'>
                    <PenBox /> Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Your Budget</DialogTitle>
                    <DialogDescription>
                        <div className='mt-5 relative'>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg"
                                onClick={() => setOpenEmoji(!openEmoji)}
                            >
                                {emojiIcon}
                            </Button>
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
                                <Input 
                                    type='text' 
                                    defaultValue={BudgetInfo?.name} 
                                    onChange={(e) => setNames(e.target.value)} 
                                    placeholder='Enter your Budget name'
                                />
                            </div>
                            <div>
                                <h2 className='text-black font-medium my-2'>Budget Amount</h2>
                                <Input 
                                    type='number' 
                                    defaultValue={BudgetInfo?.amount} 
                                    onChange={(e) => setAmounts(e.target.value)} 
                                    placeholder='Enter your Budget amount'
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button 
                            disabled={!(names && amounts)} 
                            onClick={onUpdateBudget} 
                            className='mt-5 bg-primary w-full'
                        >
                            Update budget
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditBudget;
