"use client"
import { SquarePen } from "lucide-react"
import { useModalStoreUpdate } from "@/store/modalStore"

export function EditIcon() {
  const open = useModalStoreUpdate((s) => s.openModalUpdate)

  return (
    
    <SquarePen
      className="cursor-pointer text-muted-foreground w-5 h-5"
      onClick={open}
    />
  )
}
