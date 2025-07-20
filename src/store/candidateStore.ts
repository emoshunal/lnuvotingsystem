import { create } from "zustand";

type Candidate = {
    id?: number;
    name: string;
    courseId: string;
    yearLevelId: number;
    positionId: number;
    partyId: number;
    photo_url?: string;
}

interface CandidateStore {
    candidate: Partial<Candidate>;
    setCandidate: (candidate: Partial<Candidate>) => void;
    resetCandidate: () => void;

    refreshTrigger: number;
    triggerRefresh: () => void;
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
    refreshTrigger: 0,
    triggerRefresh: () =>
        set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))