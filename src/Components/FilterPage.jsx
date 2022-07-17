import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ProductCard from './ProductCard';

const FilterPage = () => {
    const { filterBy } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const fetchProductData = async () => {
        axios({
            method: 'get',
            url: "https://dummyjson.com/products?limit=100"
        }).then((response) => {
            setIsLoading(false);
            if (filterBy == 'ratingasc') {
                setProductData(response?.data?.products.sort((a, b) => {
                    return a.rating - b.rating;
                }))
            } else if (filterBy == 'ratingdesc') {
                setProductData(response?.data?.products.sort((a, b) => {
                    return a.rating - b.rating
                }).reverse());
            } else if (filterBy == 'discountasc') {
                setProductData(response?.data?.products.sort((a, b) => {
                    return a.discountPercentage - b.discountPercentage;
                }))
            } else if (filterBy == 'discountdesc') {
                setProductData(response?.data?.products.sort((a, b) => {
                    return a.discountPercentage - b.discountPercentage;
                }).reverse())
            } else if (filterBy == 'priceasc') {
                setProductData(response?.data?.products.sort((a, b) => {
                    return a.price - b.price;
                }))
            } else if (filterBy == 'pricedesc') {
                setProductData(response?.data?.products.sort((a, b) => {
                    return a.price - b.price;
                }).reverse())
            }
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchProductData();
    }, [])


    return (
        <React.Fragment>
            {isLoading ? <Loader/> : <div>
                <div className='fs-3 fw-bold m-3'>{filterBy == 'ratingasc' && "Sorted By Rating(Ascending)"}</div>
                <div className='fs-3 fw-bold m-3'>{filterBy == 'ratingdesc' && "Sorted By Rating(Descending)"}</div>
                <div className='fs-3 fw-bold m-3'>{filterBy == 'discountasc' && "Sorted By Discount(Ascending)"}</div>
                <div className='fs-3 fw-bold m-3'>{filterBy == 'discountdesc' && "Sorted By Discount(Descending)"}</div>
                <div className='fs-3 fw-bold m-3'>{filterBy == 'priceasc' && "Sorted By Price(Ascending)"}</div>
                <div className='fs-3 fw-bold m-3'>{filterBy == 'pricedesc' && "Sorted By Price(Descending)"}</div>
                <div className='d-flex flex-wrap'>
                    {productData.map((curElem) => {
                        return <ProductCard key={curElem.id} singleProd={curElem} />
                    })}
                </div>
            </div>}
        </React.Fragment>
    )
}

export default FilterPage