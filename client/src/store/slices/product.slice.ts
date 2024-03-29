import { createSlice } from "@reduxjs/toolkit"

export type AvailableStatus = "active" | "inactive"

export type Product = {
    quantity: any
    category: any
    id: number
    categoryId: number
    brandId: number
    avatar: string
    name: string
    price: number
    des: string
    status: AvailableStatus
}

interface InitState {
    data: Product[] | null
    addModal: boolean
}
const initialState: InitState = {
    data: null,
    addModal: false
}
const productSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.data = action.payload
        },
        loadModal: (state) => {
            state.addModal = !state.addModal
        },
        addData: (state, action) => {
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
export const productReducer = productSlice.reducer
export const productAction = productSlice.actions