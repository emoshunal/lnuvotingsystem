"use client"
import { Plus } from "lucide-react"
import { useModalStoreCreate } from "@/store/modalStore"
import { Button } from "@/components/ui/button"

export function AddIconButton() {
    const open = useModalStoreCreate((s) => s.openModalCreate)

    return (
        <Button className='ml-autCo cursor-pointer rounded-full size-10 bg-primary text-white hover:bg-primary/80'
            onClick={open}
        >
            <Plus className="mr" />
        </Button>

    )
}
