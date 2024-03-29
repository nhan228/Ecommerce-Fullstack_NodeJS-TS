import { createSlice } from "@reduxjs/toolkit"

export type AvailableStatus = "active" | "inactive"

export type Category = {
    title: string | number | readonly string[]
    id: number
    name: string
    codeName: string
    avatar: String
    createAt: string
    updateAt: String
    status: AvailableStatus
    branches: Branch[]
}
export type Branch = {
    id: number
    name: string
    codeName: string
    createAt: string
    updateAt: String
    status: AvailableStatus
}
interface InitState {
    data: Category[] | null
    addModal: boolean
}
const initialState: InitState = {
    data: null,
    addModal: false,
}
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        loadModal: (state) => {
            state.addModal = !state.addModal
        },
        addData:(state, action) => {
            state.data.push(action.payload)
        },
        update: (state, action) => {
            state.data = state.data.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
        }
    }
})
export const categoryAction = categorySlice.actions
export const categoryReducer = categorySlice.reducer

