import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const OpenButtonModal = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Button className='ml-auto cursor-pointer rounded-full size-10 bg-primary text-white hover:bg-primary/80'
            onClick={onOpen}
        >
            <Plus className="mr" />
        </Button>
    )
}

export default OpenButtonModal