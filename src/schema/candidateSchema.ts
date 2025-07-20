import { z } from 'zod';


export const candidateSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    courseId: z.number().int().positive("Course is required"),
    yearLevelId: z.number().int().positive("Yearlevel is required"),
    positionId: z.number().int().positive("Position is required"),
    partyId: z.number().int().positive("Party is required"),
    photo_url: z.string().optional(),
});

export type CandidateFormValues = z.infer<typeof candidateSchema>;