import { create } from "zustand"

export const useChatStore = create((set) => ({
    data: {},
    isOpen: false,
    onOpen: (data) => {
        set({
            isOpen: true,
            data,
        })
    },
    onClose: () => {
        set({ data: {}, isOpen: false })
    },
}))
