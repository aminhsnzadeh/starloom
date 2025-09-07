import { create } from 'zustand'

interface seedType {
    zoomAt: boolean
    focusAt: any
    focus: (data: any) => void
}

const useFocus = create<seedType>()((set) => ({
    zoomAt: false,
    focusAt: {},
    focus: (data: any) => set(() => ({
        focusAt: data,
    })),
}))

export default useFocus