import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col,Button,Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Slice/productSlice'
import { addToWishList } from '../Slice/wishListSlice'
import { addToCart } from '../Slice/cartSlice'
import Header from '../Components/Header'

function Home() {
  const dispatch = useDispatch()
  const{loading,products,error}=useSelector((state)=>state.productReducer)
  const{Wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)
  // console.log(loading);
  // console.log(products);
  // console.log(error);


  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
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
   <Header insideHome={true}/>
    <div style={{ marginTop:"70px"}}>
      {
        loading?
        <div className='text-center mt-5'>
           <Spinner animation="grow" variant="danger" />  Loading....
        </div>:
        
        <Row className='mt-5 m-auto container'>
        {
          products?.length>0?products.map((product, index)=>(
          <Col className="mt-5" sm={12} md={6} lg={4} x1={3}>
        <Card style={{ width: '18rem', height:'350px' }}>
          <Link to={`/view/${product.id}`}>
      <Card.Img variant="top" style={{width:"100%", height:"200px"}} src={product.thumbnail} />
      </Link>
      <Card.Body>
        <Card.Title className='text-dark'>{product.title.slice(0,10)}</Card.Title>
        <Card.Text className='text-dark'>
          {product.description.slice(0,20)}
        </Card.Text>
       <div className="d-flex justify-content-between">
        <Button className='btn btn-light' onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-dark"></i></Button>
        <Button className='btn btn-light' onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-dark"></i></Button>
        </div>
      </Card.Body>
    </Card>
        </Col>)):
        <div className='fw-bolder my-5'>
          <p className='text-danger'>Nothing to display</p>
        </div>
        }
      </Row>}
      
      
    </div>
    </>
  )
}

export default Home