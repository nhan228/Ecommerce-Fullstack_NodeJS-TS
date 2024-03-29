import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./slices/user.slice"
import { categoryReducer } from "./slices/category.slice"
import { brandReducer } from "./slices/brand.slice"
import { productReducer } from "./slices/product.slice"
import { receiptReducer } from "./slices/receipt.slice"
import { addressReducer } from "./slices/address.slice"

const RootReducer = combineReducers({
    userStore: userReducer,
    categoryStore: categoryReducer,
    brandStore: brandReducer,
    productStore: productReducer,
    receiptStore: receiptReducer,
    addressStore: addressReducer
})
export type Store = ReturnType<typeof RootReducer>
export const store = configureStore({
    reducer: RootReducer
})