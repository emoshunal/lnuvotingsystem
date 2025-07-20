
import { NextResponse } from "next/server"
import { IncomingForm } from "formidable"
import fs from "fs"
import path from "path"
import { promisify } from "util"
import { Readable } from "stream"


export const dynamic = "force-dynamic"

function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = []
    stream.on("data", (chunk) => chunks.push(chunk))
    stream.on("end", () => resolve(Buffer.concat(chunks)))
    stream.on("error", reject)
  })
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("photo") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), "public/uploads")
  fs.mkdirSync(uploadDir, { recursive: true })

  // const filename = `${Date.now()}-${file.name}`
  const ext = path.extname(file.name)
  const filename = `${crypto.randomUUID()}${ext}`
  const filepath = path.join(uploadDir, filename)

  fs.writeFileSync(filepath, buffer)

  const fileUrl = `/uploads/${filename}`

  return NextResponse.json({ url: fileUrl }, { status: 200 })
}
