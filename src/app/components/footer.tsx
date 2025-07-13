"use client"

import { useTheme } from "next-themes"

export default function Footer() {
    return (
        <footer className="bg-primary text-white dark:bg-background dark:text-muted-foreground border-t dark:border-border px-8 py-6 mt-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left: Logo and System Name */}
                <div className="flex items-center gap-3">
                    <img
                        src="/assets/images/L-NU_LOGO.png"
                        alt="LNU Logo"
                        className="h-10 w-10 rounded-full bg-white p-1 dark:bg-transparent"
                    />
                    <div>
                        <h4 className="font-bold text-lg tracking-wide text-white dark:text-foreground">
                            LNUHalalan
                        </h4>
                        <p className="text-sm text-white/80 dark:text-muted-foreground">
                            Empowering Student Democracy
                        </p>
                    </div>
                </div>

                {/* Middle: Year & Info */}
                <div className="text-sm text-white/70 dark:text-muted-foreground text-center">
                    © {new Date().getFullYear()} This app was developed and maintained by the College of Information and Computing Studies Faculty
                </div>

                {/* Right: Links */}
                <div className="flex gap-4 text-sm text-white/80 dark:text-muted-foreground">
                    <a href="/privacy" className="hover:underline">Privacy</a>
                    <a href="/terms" className="hover:underline">Terms</a>
                    <a href="/about" className="hover:underline">About</a>
                </div>
            </div>
        </footer>
    )
}
