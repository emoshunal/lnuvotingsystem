"use client"

import React, { useEffect, useState } from 'react'
import { SendHorizonal } from "lucide-react"
import { Navigation } from './components/nav'
import { ModeToggle } from '../components/toggle-mode'
import { LogoutButton } from '../components/logout'
import { candidates as flatCandidates } from '@/data/candidates'
import { montserrat, roboto_mono } from '../fonts'
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from 'lucide-react'
import Footer from '../components/footer'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
const Voters = () => {
  const [selected, setSelected] = useState<Record<string, number | number[]>>({})
  const router = useRouter()

  const groupedCandidates = flatCandidates.reduce((acc, candidate) => {
    const positionID = candidate.position ?? "others"
    if (!acc[positionID]) acc[positionID] = []
    acc[positionID].push(candidate)
    return acc
  }, {} as Record<string, typeof flatCandidates>)
  const handleSelect = (position: string, candidateId: number) => {
    if (position === "Cabinet Secretary") {
      const prevSelected = (selected[position] as number[]) || []
      const isSelected = prevSelected.includes(candidateId)

      
      const updated = isSelected
        ? prevSelected.filter((id) => id !== candidateId)
        : prevSelected.length < 5
          ? [...prevSelected, candidateId]
          : prevSelected 

      setSelected((prev) => ({ ...prev, [position]: updated }))
    } else {
     
      setSelected((prev) => ({ ...prev, [position]: candidateId }))
    }
  }


  const isCandidateSelected = (position: string, candidateId: number) => {
    if (position === "Cabinet Secretary") {
      return (selected[position] as number[])?.includes(candidateId)
    }
    return selected[position] === candidateId
  }




  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div className='flex items-center justify-between p-4 px-24 print:hidden'>
          <Navigation />
          <div className='flex items-center gap-2'>
            <ModeToggle />
            <LogoutButton />
          </div>
        </div>
        <main className='flex flex-row gap-8 w-full px-24 py-8 print:flex-col print:px-8'>
          <ScrollArea className='w-2/3 h-screen pr-4 space-y-6 pb-8 print:hidden'>
            {Object.entries(groupedCandidates).map(([position, people]) => (
              <div key={position}>
                <h2 className={`text-2xl font-bold capitalize mb-4 text-primary`}>
                  {position.replace(/([A-Z])/g, " $1")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {people.map((candidate) => {
                    const isSelected = isCandidateSelected(position, candidate.id)

                    return (
                      <div
                        key={candidate.id}
                        onClick={() => handleSelect(position, candidate.id)}
                        className={`relative rounded-lg cursor-pointer transition border ${isSelected
                          ? "border-green-600 bg-green-600/10 shadow-lg"
                          : "border-muted border hover:bg-muted/50"
                          }`}
                      >
                        {isSelected && (
                          // <CheckCircle2 className="absolute top-3 right-3 text-green-600 w-12 h-12 z-10" />
                          <Image
                            src="/assets/images/check-mark-3.png"
                            alt="Image"
                            width={50}
                            height={50}
                            className="absolute top-[-1.0rem] right-1 text-green-600 w-14 h-14 z-50"
                          />
                        )}

                        <Card className="flex flex-row h-60 bg-transparent border-none shadow-none p-0">
                          {/* 40% - Image */}
                          <div className="w-2/5 h-full flex items-center justify-center">
                            <Avatar className="size-fit">
                              <AvatarImage src={candidate.image} alt={candidate.name} className="object-cover" />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          {/* 60% - Details */}
                          <div className="w-3/5 p-4 flex flex-col justify-center space-y-2">
                            <div>
                              <CardTitle className={`text-3lg ${montserrat.className} font-bold`}>{candidate.name}</CardTitle>
                              <Badge className="text-xs mt-1">
                                {candidate.party}
                              </Badge>
                            </div>
                            <CardContent className="p-0 text-sm space-y-1 text-muted-foreground">
                              <p><strong>Course:</strong> {candidate.course}</p>
                              <p><strong>Year:</strong> {candidate.year}</p>
                            </CardContent>
                          </div>
                        </Card>
                      </div>
                    )
                  })}
                </div>

                <Separator className='my-12' />
              </div>
            ))}
          </ScrollArea>
          <div className="w-1/3 print:w-full bg-zinc-50 p-6 rounded-xl border h-fit shadow-md relative overflow-hidden ">

            {/* Watermark */}
            <img
              src="/assets/images/watermark.png"
              alt="Fingerprint Watermark"
              className="absolute inset-0 m-auto object-cover opacity-10 z-0 pointer-events-none select-none"
              style={{ objectFit: 'contain' }}
            />

            {/* Main Ballot Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center border-b pb-4 mb-4">
                <img
                  src="/assets/images/L-NU_LOGO.png"
                  alt="LNUHalalan Logo"
                  className="mx-auto h-16 mb-2"
                />
                <h1 className="text-2xl font-bold text-primary">LNUHalalan Official Ballot</h1>
                <p className="text-sm text-muted-foreground">Academic Year 2025–2026</p>
              </div>

              {/* Voted Selections */}
              <div className="space-y-6">
                {Object.entries(selected).map(([position, value]) => {
                  const selectedCandidates = Array.isArray(value)
                    ? value.map((id) =>
                      groupedCandidates[position as keyof typeof groupedCandidates].find(
                        (c) => c.id === id
                      )
                    )
                    : [
                      groupedCandidates[position as keyof typeof groupedCandidates].find(
                        (c) => c.id === value
                      ),
                    ]

                  return (
                    <div key={position} className="border-t pt-4">
                      <h3 className="text-md font-bold capitalize text-gray-700 mb-2">
                        {position.replace(/([A-Z])/g, " $1")}
                      </h3>
                      <ul className={`space-y-1 ${roboto_mono.className} text-sm font-semibold text-gray-600 list-decimal ml-4`}>
                        {selectedCandidates.map(
                          (c) => c && <li key={c.id}>{c.name} — {c.party}</li>
                        )}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
            <Button
              className="w-full mt-6 gap-2 py-6 text-lg print:hidden cursor-pointer"
              onClick={() => router.push("/ballot")}
            >
              <SendHorizonal className="w-5 h-5" />
              Submit Ballot
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </>

  )
}

export default Voters