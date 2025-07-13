// components/navigation-menu.tsx
"use client"

import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { navigationLinks } from "@/lib/navigation-links"
import { ListItem } from "./nav-menu"
import Image from "next/image"
import { useTheme } from "next-themes"


export function NavMenu() {
      const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentTheme = theme === "system" ? systemTheme : theme
    return (
        <NavigationMenu viewport={false} className="flex w-full justify-around">
            <NavigationMenuList>
                <NavigationMenuItem className="hidden md:flex mr-10">
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
                {navigationLinks.map((section) => (
                    <NavigationMenuItem key={section.title} className="mx-2">
                        <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[500px] md:grid-cols-2">
                                {section.items.map((item) => (
                                    <ListItem key={item.title} title={item.title} href={item.href}>
                                        {item.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}


