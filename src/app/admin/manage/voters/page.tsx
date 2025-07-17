
import React from 'react'
import { NavMenu } from '../../components/nav-menu-item'
import { ModeToggle } from '@/app/components/toggle-mode'
import { LogoutButton } from '@/app/components/logout'
import { columns } from './table/columns'
import { DataTable } from '../components/datatable/data-table'
import { voters } from '@/data/voters'

export default async function Voters() {
    const data = voters;
    return (
        <div className='flex flex-col min-h-screen'>
            {/* Header */}
            <div className="flex items-center justify-between px-24 py-4 border-b">
                <NavMenu />
                <div className='flex items-center gap-2'>
                    <ModeToggle />
                    <LogoutButton />
                </div>
            </div>
            <main className='flex flex-col container mx-auto gap-8 px-24 py-8'>
                <h1 className='text-2xl font-bold'>Manage Voters</h1>
                {/* Content goes here */}
                <p className='text-gray-600'>This is where you can manage voters.</p>
                
                    <DataTable columns={columns} data={data} />
              
            </main>
        </div>

    )
}

