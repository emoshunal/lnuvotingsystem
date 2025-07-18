import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const parties = await prisma.party.findMany()
    return NextResponse.json(parties);
}