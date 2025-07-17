"use client"
import { SquarePen } from "lucide-react"
import { useModalStore } from "@/store/modalStore"

export function EditIcon() {
  const open = useModalStore((s) => s.openModal)

  return (
    <SquarePen
      className="cursor-pointer text-muted-foreground w-5 h-5"
      onClick={open}
    />
  )
}
