import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function GET(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const updated = await prisma.candidate.update({
        where: { id: Number(params.id) },
        data,
    })

    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const deleted = await prisma.candidate.delete({
        where: { id: Number(params.id) },
    })

    return NextResponse.json(deleted);
}