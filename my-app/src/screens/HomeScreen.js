import React,{useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Row,Col} from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import {listProducts,listAscendingProducts,listDescendingProducts,listLowestPricesProducts,listHighestPricesProducts} from "../actions/productActions"
import { PRODUCT_ASCENDING_RESET, PRODUCT_DESCENDING_RESET, PRODUCT_HIGHEST_PRICE_RESET, PRODUCT_LOWEST_PRICE_RESET } from '../constants/productContants'


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch=useDispatch()

    const productList=useSelector(state => state.productList)
    const {loading,error,products,pages,page}=productList

    const productAcending = useSelector(state => state.productAcending)
    const {success:ascendingSuccess,sortedProducts:acendingProducts}=productAcending

    const productDecending = useSelector(state => state.productDecending)
    const {success:descendingSuccess,sortedProducts:descendingProducts}=productDecending
    
    const productLowestPrice = useSelector(state => state.productLowestPrice)
    const {success:lowestPriceSuccess,sortedProducts:lowestPriceProducts}=productLowestPrice

    const productHighestPrice = useSelector(state => state.productHighestPrice)
    const {success:highestPriceSuccess,sortedProducts:highestPriceProducts}=productHighestPrice




    useEffect(()=>{
      dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])

    const changeHandler = (e) => {
        if(e.target.value==="From A-Z"){
            //From A-Z
            dispatch(listAscendingProducts())
            dispatch({type:PRODUCT_DESCENDING_RESET})
            dispatch({type:PRODUCT_LOWEST_PRICE_RESET})
            dispatch({type:PRODUCT_HIGHEST_PRICE_RESET})
        }
        else if(e.target.value==="From Z-A"){
            //From Z-A
            dispatch(listDescendingProducts())
            dispatch({type:PRODUCT_ASCENDING_RESET})
            dispatch({type:PRODUCT_LOWEST_PRICE_RESET})
            dispatch({type:PRODUCT_HIGHEST_PRICE_RESET})

            
        }
        else if(e.target.value==="From lowest prices"){
            //From lowest prices
            dispatch(listLowestPricesProducts())
            dispatch({type:PRODUCT_ASCENDING_RESET})
            dispatch({type:PRODUCT_DESCENDING_RESET})
            dispatch({type:PRODUCT_HIGHEST_PRICE_RESET})
        }
        else if(e.target.value==="From highest prices"){
            //From highest prices
            dispatch(listHighestPricesProducts())
            dispatch({type:PRODUCT_ASCENDING_RESET})
            dispatch({type:PRODUCT_DESCENDING_RESET})
            dispatch({type:PRODUCT_LOWEST_PRICE_RESET})
        }
        else{
            //Sort by :
            dispatch({type:PRODUCT_ASCENDING_RESET})
            dispatch({type:PRODUCT_DESCENDING_RESET})
            dispatch({type:PRODUCT_LOWEST_PRICE_RESET})
            dispatch({type:PRODUCT_HIGHEST_PRICE_RESET})
        }
    }
    return (
        <>
       <Meta />
        {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">Go Back</Link> }
         <h1 className="homeScreen_heading">Latest Products</h1>
         <select onChange={changeHandler}>
             <option>Sort by :</option>
             <option>From A-Z</option>
             <option>From Z-A</option>
             <option>From lowest prices</option>
             <option>From highest prices</option>
         </select>
         {loading ? <Loader/>:error ? <Message varitant="danger">{error}</Message> : ascendingSuccess ? 
         <>
          <Row>
             {acendingProducts.map(ascendedProduct=>(
                 <Col key={ascendedProduct._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={ascendedProduct} />
                 </Col>
             ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
         </> : descendingSuccess ? 
         <>
          <Row>
             {descendingProducts.map(descendedProduct=>(
                 <Col key={descendedProduct._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={descendedProduct} />
                 </Col>
             ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
         </> : lowestPriceSuccess ?
         <>
          <Row>
             {lowestPriceProducts.map(lowestPriceProduct=>(
                 <Col key={lowestPriceProduct._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={lowestPriceProduct} />
                 </Col>
             ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
         </> : highestPriceSuccess ? 
         <>
          <Row>
             {highestPriceProducts.map(highestPriceProduct=>(
                 <Col key={highestPriceProduct._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={highestPriceProduct} />
                 </Col>
             ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
         </> :
         <>
          <Row>
             {products.map(product=>(
                 <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={product} />
                 </Col>
             ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
         </>
         


         }
        
        </>
    )
}

export default HomeScreen






