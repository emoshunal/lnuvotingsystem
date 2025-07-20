import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const data = await req.json();
    const created = await prisma.candidate.create({ data })
    return NextResponse.json(created);
}

export async function GET() {
    const candidates = await prisma.candidate.findMany({
        include: {
            course: true,
            party: true,
            position: true,
            yearLevel: true,
        },
        orderBy: {
            id: 'desc',
        },
    })
    return NextResponse.json(candidates);
}