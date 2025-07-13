"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { montserrat } from "@/app/fonts"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function Navigation() {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentTheme = theme === "system" ? systemTheme : theme
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Image
                        src={
                            currentTheme === "dark"
                                ? "/assets/images/image-dark.png"
                                : "/assets/images/image.png"
                        }
                        alt="Image"
                        width={150}
                        height={150}
                        className=""
                    />

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>


    )
}
