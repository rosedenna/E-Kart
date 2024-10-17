import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishList } from '../Slice/wishListSlice'
import Header from '../Components/Header'
import { addToCart } from '../Slice/cartSlice'


function View() {

  const {id}=useParams()
  //console.log(id);
  const {loading}=useSelector((state)=>state.productReducer)
  const [product,setProduct]=useState({})
  const{Wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)

  const dispatch=useDispatch()

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))
  },[])
  // console.log(product);
  const handleWishlist=(product)=>{
    const existingProduct = Wishlist.find(item=>item?.id==product?.id)
    if(existingProduct){
      alert("Product Already Exist In Wishlist")

    }else{
      dispatch(addToWishList(product))
    }
  }

  const handleCart=(product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("Items Added")
    }
    else{
      dispatch(addToCart(product))
      alert("Item Added")
    }
  }
  
  return (
    <>
        <Header insideHome={false}/>

    <div className="mt-5">
      {
        loading?<div>
           <Spinner animation="grow" variant="danger" />  Loading....
        </div>:
        <div className='container row ' style={{marginTop:"100px"}}>
        <div className="col-lg-4">
          <img style={{width:"100%",height:"400px"}} src={product?.thumbnail} alt="" />
  
        </div>
        <div className="col-lg-2"> </div>
        <div className="col-lg-6"> 
          <p className='text-dark'>PId:{product?.id}</p>
          <h1 className='text-dark'>{product?.title}</h1>
          <h5 className='fw-bolder text-dark'>Price: <span style={{color:"red"}}>{product?.price}</span></h5>
          <p className='text-dark'>{product?.description}</p>
          <div className='d-flex justify-content-between mt-4'>
            <Button className='btn btn-light' onClick={()=>handleWishlist(product)}><i className='fa-solid fa-heart text-danger '></i></Button>
            <Button className='btn btn-light' onClick={()=>handleCart(product)}><i className='fa-solid fa-cart-shopping text-dark'></i></Button>
          </div>
  
        </div>
        
      </div>
      }
    </div>
    </>
  )
}

export default View