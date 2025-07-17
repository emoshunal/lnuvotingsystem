"use client"

import { create } from 'zustand'

interface ModalStoreUpdate {
    isOpenUpdate: boolean;
    openModalUpdate: () => void;
    closeModalUpdate: () => void;
}

export const useModalStoreUpdate = create<ModalStoreUpdate>((set) => ({
    isOpenUpdate: false,
    openModalUpdate: () => set({ isOpenUpdate: true }),
    closeModalUpdate: () => set({ isOpenUpdate: false }),
}));


interface ModalStoreCreate {
    isOpenCreate: boolean;
    openModalCreate: () => void;
    closeModalCreate: () => void;
}

export const useModalStoreCreate = create<ModalStoreCreate>((set) => ({
    isOpenCreate: false,
    openModalCreate: () => set({ isOpenCreate: true }),
    closeModalCreate: () => set({ isOpenCreate: false }),
}));