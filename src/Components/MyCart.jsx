import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard';

const MyCart = () => {
    const productInCart = useSelector((state) => state.cartArray);
    return (
        <React.Fragment>
            <div className='fs-3 m-3'>My Cart</div>
            <div className='d-flex flex-wrap'>
                {productInCart.map((curElem) => {
                    return <ProductCard key={curElem.id} singleProd={curElem} />
                })}
            </div>
        </React.Fragment>
    )
}

export default MyCart