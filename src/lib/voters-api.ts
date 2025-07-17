// lib/api.ts
import { voters } from "@/data/voters";

export async function fetchVoters() {
  await new Promise((r) => setTimeout(r, 300)); // simulate network delay
  return voters;
}
