"use client"

// Form
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Schema
import { candidateSchema } from "@/schema/candidateSchema"
// Component imports
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectInput } from "../../components/select-input"
import { DialogBox } from "../../components/ui-dialog"
import { Loader2 } from "lucide-react"
import React, { useEffect } from "react"

// Store imports
import { useModalStoreCreate } from "@/store/modalStore"
import { useCandidateStore } from "@/store/candidateStore"

// API
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { tr } from "zod/v4/locales"

type FormData = z.infer<typeof candidateSchema>

export function Create({

}) {
    const { triggerRefresh, resetCandidate, setCandidate } = useCandidateStore()
    const isOpen = useModalStoreCreate((state) => state.isOpenCreate)
    const close = useModalStoreCreate((state) => state.closeModalCreate)
    const [selectedCourse, setSelectedCourse] = React.useState<string>("")
    const [selectedParty, setSelectedParty] = React.useState<string>("")
    const [selectedYearLevel, setSelectedYearLevel] = React.useState<string>("")
    const [selectedPosition, setSelectedPosition] = React.useState<string>("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [party, setParty] = React.useState<{ id: number; name: string }[]>([])
    const [yearLevels, setYearLevels] = React.useState<{ id: number; level: string }[]>([])
    const [courses, setCourses] = React.useState<{ id: number; name: string }[]>([])
    const [positions, setPositions] = React.useState<{ id: number; name: string }[]>([])
    const [photo, setPhoto] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState<string>("")
    const queryClient = useQueryClient()

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
        fetch("/api/course")
            .then((res) => res.json())
            .then(setCourses)
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
            courseId: 0,
            photo_url: "",
            yearLevelId: 0,
            positionId: 0,
            partyId: 0,
        }
    })

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            let photoUrl = data.photo_url
            if (photo) {
                const formData = new FormData()
                formData.append("photo", photo)

                const res = await axios.post("/api/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })

                photoUrl = res.data.url
            }

            const response = await axios.post("/api/candidates", {
                ...data,
                photo_url: photoUrl,
            })

            const createdCandidate = response.data;

            setCandidate(createdCandidate)
            toast.success("Candidate created successfully!")
            queryClient.invalidateQueries({ queryKey: ["candidates"] })
            close()
        } catch (error) {
            console.error(error)
            toast.error("Failed to submit candidate.")
        } finally {
            setIsSubmitting(false)
            // resetForm()
            resetCandidate()
            if (photo) {
                setPhoto(null)
                setPreview("")
            }
        }
    }

    return (

        <DialogBox
            open={isOpen}
            onOpenChange={(o) => {
                (!o) && close()
            }}
            title="Create Candidate"
            description="Add a new candidate to the election"
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Full Name</Label>
                        <Input id="name" placeholder="Dela Cruz, Juan D." {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="photo">Upload Photo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setPhoto(e.target.files[0])
                                    setPreview(URL.createObjectURL(e.target.files[0]))
                                }
                            }}
                        />

                        {preview && (
                            <img src={preview} alt="Preview" className="h-20 w-20 object-cover mt-2 rounded-md" />
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Course</Label>
                        <SelectInput
                            data={courses}
                            value={selectedCourse}
                            onChange={(val) => {
                                setSelectedCourse(val)
                                setValue("courseId", +val)
                            }}
                            valueKey="id"
                            labelKey="name"
                            placeholder="Select a course"
                            width="w-full"
                        />
                        {errors.courseId && <p className="text-red-500 text-sm">{errors.courseId.message}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="year-1">Year Level</Label>
                        <SelectInput
                            data={yearLevels}
                            value={selectedYearLevel}
                            onChange={(val) => {
                                setSelectedYearLevel(val)
                                setValue("yearLevelId", +val)
                            }}
                            valueKey="id"
                            labelKey="level"
                            placeholder="Select a year level"
                            width="w-full"
                        />
                        {errors.yearLevelId && <p className="text-red-500 text-sm">{errors.yearLevelId.message}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="position-1">Position</Label>
                        <SelectInput
                            data={positions}
                            value={selectedPosition}
                            onChange={(val) => {
                                setSelectedPosition(val)
                                setValue("positionId", +val)
                            }}
                            valueKey="id"
                            labelKey="name"
                            placeholder="Select a position"
                            width="w-full"
                        />
                        {errors.positionId && <p className="text-red-500 text-sm">{errors.positionId.message}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="party-1">Party List</Label>
                        <SelectInput
                            data={party}
                            value={selectedParty}
                            onChange={(val) => {
                                setSelectedParty(val)
                                setValue("partyId", +val)
                            }}
                            valueKey="id"
                            labelKey="name"
                            placeholder="Select a party list"
                            width="w-full"
                        />
                        {errors.partyId && <p className="text-red-500 text-sm">{errors.partyId.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => useModalStoreCreate.getState().closeModalCreate()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="cursor-pointer hover:bg-primary/80 active:bg-primary/100">
                            {
                                isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : null
                            }
                            Create

                        </Button>
                    </div>
                </div>
            </form>
        </DialogBox>

    )
}
