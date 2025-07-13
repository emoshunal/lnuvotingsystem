import React from 'react'
import { NavMenu } from '../components/nav-menu-item'
import { ModeToggle } from '@/app/components/toggle-mode'
import { LogoutButton } from '@/app/components/logout'

const Dashboard = () => {
    return (
        <>
            <div className="flex items-center p-2 w-full justify-between px-24">
                <NavMenu />
                <div className='flex items-center gap-2'>
                    <ModeToggle />
                    <LogoutButton />
                </div>
            </div>
        </>
    )
}

export default Dashboard