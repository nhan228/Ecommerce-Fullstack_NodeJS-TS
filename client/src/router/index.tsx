import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from '@/utils'

export default function RouteIndex() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={lazy.lazyFn(() => import("@/pages/home/Home"))()}>
          <Route path="category/:categoryName/:brandName" element={lazy.lazyFn(() => import("@/pages/home/pages/categories"))()}></Route>
          <Route path="cart" element={lazy.lazyFn(() => import("@/pages/home/pages/cart"))()}></Route>
          <Route path="receipts" element={lazy.lazyFn(() => import("@/pages/home/pages/receipts"))()}></Route>
          <Route path="product-info/:id" element={lazy.lazyFn(() => import("@/pages/home/components/product-info"))()}></Route>
        </Route>
        <Route path="/authen" element={lazy.lazyFn(() => import("@/pages/authen/Authen"), localStorage.getItem('token') == null)()}></Route>
        <Route path="/admin" element={lazy.lazyFn(() => import("@/pages/admin/Admin"), localStorage.getItem('token') != null)()}>
          <Route path="product/list" element={lazy.lazyFn(() => import("@/pages/admin/pages/products/List"))()}></Route>
          <Route path="product/recycle" element={lazy.lazyFn(() => import("@/pages/admin/pages/products/Recycle"))()}></Route>
          <Route path="category/list" element={lazy.lazyFn(() => import("@/pages/admin/pages/categories/List"))()}></Route>
          <Route path="category/recycle" element={lazy.lazyFn(() => import("@/pages/admin/pages/categories/Recycle"))()}></Route>
          <Route path="brand/list" element={lazy.lazyFn(() => import("@/pages/admin/pages/brands/List"))()}></Route>
          <Route path="brand/recycle" element={lazy.lazyFn(() => import("@/pages/admin/pages/brands/Recycle"))()}></Route>
          <Route path="user/list" element={lazy.lazyFn(() => import("@/pages/admin/pages/users/List"))()}></Route>
          <Route path="user/recycle" element={lazy.lazyFn(() => import("@/pages/admin/pages/users/Recycle"))()}></Route>
        </Route>
        <Route path="/support" element={lazy.lazyFn(() => import("@/pages/authen/Authen"), localStorage.getItem('token') == null)()}></Route>
      </Routes>
    </BrowserRouter>
  )
}