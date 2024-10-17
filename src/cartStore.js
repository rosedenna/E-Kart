import { configureStore } from "@reduxjs/toolkit"
import productSlice from './Slice/productSlice'
import wishListSlice from './Slice/wishListSlice'
import cartSlice from './Slice/cartSlice'

const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishListSlice,
        cartReducer:cartSlice

    }

})

export default cartStore