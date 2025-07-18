"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { candidateSchema, CandidateFormValues } from "@/schema/candidateSchema"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectInput } from "../../components/select-input"
import React, { useEffect } from "react"
import { useModalStoreCreate } from "@/store/modalStore"
import axios from "axios"
import { DialogBox } from "../../components/ui-dialog"

interface Props {
    isOpenDialog: boolean
    close: () => void
    courses: any[]
    positions: any[]
    yearLevels: any[]
    partyList: any[]
}

type FormData = z.infer<typeof candidateSchema>

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


export function Create({

}) {
    const isOpen = useModalStoreCreate((state) => state.isOpenCreate)
    const close = useModalStoreCreate((state) => state.closeModalCreate)
    const [selectedCourse, setSelectedCourse] = React.useState<string>("")
    const [selectedParty, setSelectedParty] = React.useState<string>("")
    const [selectedYearLevel, setSelectedYearLevel] = React.useState<string>("")
    const [selectedPosition, setSelectedPosition] = React.useState<string>("")

    const [party, setParty] = React.useState<{ id: number; name: string }[]>([])
    const [yearLevels, setYearLevels] = React.useState<{ id: number; level: string }[]>([])
    const [positions, setPositions] = React.useState<{ id: number; name: string }[]>([])

    useEffect(() => {
        fetch("/api/party")
            .then((res) => res.json())
            .then(setParty)
        fetch("/api/yearLevels")
            .then((res) => res.json())
            .then(setYearLevels)
        fetch("/api/positions")
            .then((res) => res.json())
            .then(setPositions)
    }, [])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(candidateSchema),
        defaultValues: {
            name: "",
            course: "",
            yearLevelId: 0,
            positionId: 0,
            partyId: 0,
        }
    })

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post("/api/candidates", data)
            alert("Candidate created!")
            console.log("Candidate created:", data)
            close()
        } catch (error) {
            console.error(error)
            alert("Failed to submit candidate.")
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBox
                open={isOpen}
                onOpenChange={(o) => {
                    (!o) && close()
                }}
                title="Create Candidate"
                description="Add a new candidate to the election"
                footer={
                    <>
                        <Button variant="outline" onClick={() => useModalStoreCreate.getState().closeModalCreate()}>Cancelsss</Button>
                        <Button className="cursor-pointer" type="submit">Create</Button>
                    </>
                }
            >
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Full Name</Label>
                        <Input id="name" placeholder="Dela Cruz, Juan D." {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                            data={yearLevels}
                            value={selectedYearLevel}
                            onChange={setSelectedYearLevel}
                            valueKey="id"
                            labelKey="level"
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
                            data={party}
                            value={selectedParty}
                            onChange={setSelectedParty}
                            valueKey="id"
                            labelKey="name"
                            placeholder="Select a party list"
                            width="w-full"
                        />
                        {errors.partyId && <p className="text-red-500 text-sm">{errors.partyId.message}</p>}
                    </div>

                </div>
            </DialogBox>
        </form>
    )
}
