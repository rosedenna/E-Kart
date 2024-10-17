import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Slice/cartSlice'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'


function Cart() {
  const cart = useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()
  const [total,setTotal]=useState(0)
  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
    }
    else{
      setTotal(0)
    }
  },[cart])


  return (
    <>
    <Header insideHome={false}/>
    <div className='container' style={{marginTop:"100px"}}>
     { 
      cart?.length>0?
      <div className="row mt-5">
        <div className="col-lg-8">
          <table className='table shadow'>
            <thead>
              <tr>
                <th className='text-dark'>#</th>
                <th className='text-dark'>Title</th>
                <th className='text-dark'>Image</th>
                <th className='text-dark'>Quantity</th>
                <th className='text-dark'>Price</th>
                <th className='text-dark'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cart?.map((product,index)=>(
                <tr>
                <td className='text-dark'>{index+1}</td>
                <td className='text-dark'>{product.title}</td>
                <td><img style={{width:"200px",height:"300px"}} src={product.thumbnail} alt="" /></td>
                <td><input type="text" readOnly value={product?.quantity} style={{width:'30px'}} /></td>
                <td className='text-danger fw-bolder'>${product.totalprice}</td>
                <td><Button className='btn btn-light' onClick={()=>dispatch(removeFromCart(product?.id))}><i class="fa-solid fa-trash text-danger"></i></Button></td>
              </tr>
              ))}
            </tbody>
          </table>
          <div className='d-flex justify-content-between'>
          <button className=' btn btn-outline-danger'onClick={()=>dispatch(emptyCart())}>Empty-Cart</button>
          
          <Link to={'/'} style={{TextDecoration:"none"}} className='btn btn-outline-success'> Shop-More</Link>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-3">
          <div className="container border rounder shadow mt-5 p-5 w-100">
            <h1 className='text-danger'>Cart Summary</h1>
            <h4 className='text-dark'>Total Products:{cart?.length}</h4>
            <h5 className='text-dark'>Total: <span className='text-danger fw-bolder'>${total}</span></h5>

          </div>
          <div className="d-grid">
            <button className='btn btn-success m-3 rounded text-light'>Checkout</button>
          </div>

        </div>
      </div>
      :<div className="d-flex flex-column flex-md-row align-items-center mt-5 text-center text-md-left">
      <img 
        src="https://mytrident.com/cdn/shop/files/empty-cart-3.gif?v=1728580041&width=1500" 
        alt="Empty Wishlist" 
        className="img-fluid mb-3 mb-md-0" 
        style={{ width: "100%", maxWidth: "400px" }}
      />
      <h1 className="text-danger ms-md-3">Your Cart is Empty...</h1>
    </div>
    }
      
    </div>
    </>
  )
}

export default Cart