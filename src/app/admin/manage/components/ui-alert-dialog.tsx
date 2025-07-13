"use client"

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface AlertConfirmDialogProps {
    trigger: React.ReactNode
    title?: string
    description?: string
    cancelText?: string
    actionText?: string
    onConfirm: () => void
}

export const AlertConfirmDialog = ({
    trigger,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    cancelText = "Cancel",
    actionText = "Confirm",
    onConfirm,
}: AlertConfirmDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{actionText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
