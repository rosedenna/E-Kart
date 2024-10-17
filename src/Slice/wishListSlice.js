import { createSlice } from "@reduxjs/toolkit";




const WishListSlice= createSlice({
    name:"Wishlist",
    initialState:{
        Wishlist:[]
    },
    reducers:{
        addToWishList:(state,action)=>{
            state.Wishlist.push(action.payload)
        },
        removeFromWishlist:(state,action)=>{
            state.Wishlist=state.Wishlist.filter(item=>item.id!=action.payload)
        }

    }
})
export const{addToWishList, removeFromWishlist}=WishListSlice.actions
export default WishListSlice.reducer