"use client"

import React, { useState } from 'react'
import { NavMenu } from '../../components/nav-menu-item'
import { ModeToggle } from '@/app/components/toggle-mode'
import { LogoutButton } from '@/app/components/logout'
import { candidates as flatCandidates } from '@/data/candidates'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { montserrat } from '@/app/fonts'
import Footer from '@/app/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, SquarePen, Trash } from 'lucide-react'
import { Create } from './components/create'
import { AlertConfirmDialog } from '../components/ui-alert-dialog'
import { EditIcon } from '@/app/components/icon/edit-icon'
import Update from './components/update'
import { AddIconButton } from '@/app/components/icon/add-icon-button'


const Candidates = () => {
    const [search, setSearch] = useState("")
    const [filterCourse, setFilterCourse] = useState("")
    const [filterParty, setFilterParty] = useState("")
    const [filterPosition, setFilterPosition] = useState("")

    const uniqueCourses = Array.from(new Set(flatCandidates.map(c => c.course)))
    const uniqueParties = Array.from(new Set(flatCandidates.map(c => c.party)))
    const uniquePositions = Array.from(new Set(flatCandidates.map(c => c.position)))

    const filteredCandidates = flatCandidates.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(search.toLowerCase())
        const matchesCourse = filterCourse ? candidate.course === filterCourse : true
        const matchesParty = filterParty ? candidate.party === filterParty : true
        const matchesPosition = filterPosition ? candidate.position === filterPosition : true

        return matchesSearch && matchesCourse && matchesParty && matchesPosition
    })

    const handleDelete = () => {
        // Your delete logic here
        alert("Deleted!")
    }

    const handleSave = () => {
        // your save logic here
        alert("saved")
    }

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

            {/* Main Content */}
            <main className='flex flex-col gap-8 px-24 py-8'>
                <h1 className="text-2xl font-bold text-primary">Manage Candidates</h1>
                <div className="flex flex-wrap gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded-md w-60"
                    />

                    <select
                        value={filterCourse}
                        onChange={(e) => setFilterCourse(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    >
                        <option value="">All Courses</option>
                        {uniqueCourses.map((course) => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                    <select
                        value={filterParty}
                        onChange={(e) => setFilterParty(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    >
                        <option value="">All Parties</option>
                        {uniqueParties.map((party) => (
                            <option key={party} value={party}>{party}</option>
                        ))}
                    </select>

                    <select
                        value={filterPosition}
                        onChange={(e) => setFilterPosition(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    >
                        <option value="">All Positions</option>
                        {uniquePositions.map((position) => (
                            <option key={position} value={position}>{position}</option>
                        ))}
                    </select>
                    <AddIconButton />
                    <Create/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCandidates.map((candidate) => (
                        <Card key={candidate.id} className="flex flex-row h-60 bg-white shadow-md border">
                            {/* Left: Image */}
                            <div className="w-2/5 h-full flex items-center justify-center">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={candidate.image} alt={candidate.name} />
                                    <AvatarFallback>
                                        {candidate.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Right: Info */}
                            <div className="w-3/5 p-4 flex flex-col justify-center space-y-2">
                                <CardTitle className={`text-lg ${montserrat.className} font-bold`}>
                                    {candidate.name}
                                </CardTitle>
                                <Badge className="w-fit text-xs">{candidate.party}</Badge>
                                <CardContent className="p-0 text-sm space-y-1 text-muted-foreground">
                                    <p><strong>Position:</strong> {candidate.position}</p>
                                    <p><strong>Course:</strong> {candidate.course}</p>
                                    <p><strong>Year:</strong> {candidate.year}</p>
                                </CardContent>
                                <CardFooter className='flex justify-end gap-2'>
                                    <EditIcon />
                                    <Update />
                                    <AlertConfirmDialog
                                        trigger={<Trash className="cursor-pointer text-muted-foreground w-5 h-5" />}
                                        title="Delete your account?"
                                        description="This will permanently delete your account and all associated data."
                                        actionText="Delete"
                                        cancelText="Cancel"
                                        onConfirm={handleDelete}
                                    />
                                </CardFooter>
                            </div>

                        </Card>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Candidates
