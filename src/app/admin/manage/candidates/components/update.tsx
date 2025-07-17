"use client"


import React from 'react'
import { DialogBox } from '../../components/ui-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SquarePen } from 'lucide-react'
import { useModalStore } from '@/store/modalStore'


const Update = () => {
    const isOpen = useModalStore((state) => state.isOpen)
    const close = useModalStore((state) => state.closeModal)

    const handleSave = () => {

        alert("Candidate information updated!")
    }

    return (
        <DialogBox
            open={isOpen}
            onOpenChange={(o) => {
                (!o) && close()
            }}
            title="Update Candidate"
            description="Update the candidate's information"
            footer={
                <>
                    <Button variant="outline">Cancel</Button>
                    <Button >Save</Button>
                </>
            }
        >
            <Input

                placeholder="Enter your username"
            />

        </DialogBox>
    )
}

export default Update