"use client"


import React from 'react'
import { DialogBox } from '../../components/ui-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStoreUpdate } from '@/store/modalStore'
import { Label } from '@radix-ui/react-label'
import { SelectInput } from '../../components/select-input'

const courses = [
    { id: 1, name: "BS Information Technology" },
    { id: 2, name: "BS Information Systems" },
    { id: 3, name: "BS Computer Science" },
    { id: 4, name: "BS Computer Engineering" },
    { id: 5, name: "BS Electronics Engineering" },
    { id: 6, name: "BS Civil Engineering" },
    { id: 7, name: "BS Accountancy" },
    { id: 8, name: "BS Business Administration" },
    { id: 9, name: "BS Hospitality Management" },
    { id: 10, name: "BS Tourism Management" },
]
const partylist = [
    { id: 1, name: "Partido Iskolar" },
    { id: 2, name: "Kabisig Party" },
]
const yearlevels = [
    { id: 1, name: "1st Year" },
    { id: 2, name: "2nd Year" },
    { id: 3, name: "3rd Year" },
    { id: 4, name: "4th Year" },
    { id: 5, name: "5th Year" },
]
const positions = [
    { id: 1, name: "President" },
    { id: 2, name: "Vice President" },
    { id: 3, name: "General Secretary" },
    { id: 3, name: "Cabinet Secretary" },
]
const Update = () => {
    const isOpen = useModalStoreUpdate((state) => state.isOpenUpdate)
    const close = useModalStoreUpdate((state) => state.closeModalUpdate)
    const [selectedCourse, setSelectedCourse] = React.useState<string>("")
    const [selectedParty, setSelectedParty] = React.useState<string>("")
    const [selectedYearLevel, setSelectedYearLevel] = React.useState<string>("")
    const [selectedPosition, setSelectedPosition] = React.useState<string>("")


    return (
        <DialogBox
            open={isOpen}
            onOpenChange={(o) => {
                (!o) && close()
            }}
            title="Edit Candidate"
            description="Update the candidate's information"
            footer={
                <>
                    <Button variant="outline">Cancel</Button>
                    <Button >Save</Button>
                </>
            }
        >
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="name-1">Full Name</Label>
                    <Input id="name-1" name="name" placeholder="Dela Cruz, Juan D." />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username-1">Course</Label>
                    <SelectInput
                        data={courses}
                        value={selectedCourse}
                        onChange={setSelectedCourse}
                        valueKey="id"
                        labelKey="name"
                        placeholder="Select a course"
                        width="w-full"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="year-1">Year Level</Label>
                    <SelectInput
                        data={yearlevels}
                        value={selectedYearLevel}
                        onChange={setSelectedYearLevel}
                        valueKey="id"
                        labelKey="name"
                        placeholder="Select a year level"
                        width="w-full"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="position-1">Position</Label>
                    <SelectInput
                        data={positions}
                        value={selectedPosition}
                        onChange={setSelectedPosition}
                        valueKey="id"
                        labelKey="name"
                        placeholder="Select a position"
                        width="w-full"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="party-1">Party List</Label>
                    <SelectInput
                        data={partylist}
                        value={selectedParty}
                        onChange={setSelectedParty}
                        valueKey="id"
                        labelKey="name"
                        placeholder="Select a party list"
                        width="w-full"
                    />
                </div>

            </div>

        </DialogBox>
    )
}

export default Update