import { create } from "zustand";

type Candidate = {
    id?: number;
    name: string;
    course: string;
    yearLevelId: number;
    positionId: number;
    partyId: number;
    photo_url?: string;
}

interface CandidateStore {
    candidate: Partial<Candidate>;
    setCandidate: (candidate: Partial<Candidate>) => void;
    resetCandidate: () => void;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
    candidate: {},
    setCandidate: (data) => 
        set((state) => ({
            candidate: {
                ...state.candidate,
                ...data,
            },
        })),
    resetCandidate: () => set({ candidate: {} }),
}))