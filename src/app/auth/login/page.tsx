"use client"

import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/app/auth/components/login-form"
import { montserrat } from "@/app/fonts"
import Image from 'next/image'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                       <p className={`${montserrat.className} text-lg font-bold`}>College of Information and Computing Studies</p>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
        
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/assets/images/logo.png"
                    alt="Image"
                    width={600}
                    height={400}
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
