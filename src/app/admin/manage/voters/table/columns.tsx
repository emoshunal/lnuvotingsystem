"use client"

import { ColumnDef } from "@tanstack/react-table";
import { montserrat } from "@/app/fonts";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export type Voter = {
    id: number;
    name: string;
    student_id: string;
    course: string;
    image: string;
}

export const columns: ColumnDef<Voter>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "image",
        header: () => <div className={`text-right font-bold ${montserrat.className}`}></div>,
        cell: ({ row }) => <div className="flex items-center justify-end">
            <Avatar>
                <AvatarImage src={row.getValue("image")} alt={row.getValue("name")} />
                <AvatarFallback>{(row.getValue("name") as string)?.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>,

    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className={`text-leftfont-medium`}>{row.getValue("name")}</div>,
        // size: 200,
    },
    {
        accessorKey: "student_id",
        header: () => <div className={`font-bold ${montserrat.className}`}>Student ID</div>,
        cell: ({ row }) => <div className={`font-medium`}>{row.getValue("student_id")}</div>,
        // size: 150,
    },


    {
        accessorKey: "course",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Course
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className={`font-medium`}>{row.getValue("course")}</div>,
        // size: 150,
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const voter = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            View Votes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
]