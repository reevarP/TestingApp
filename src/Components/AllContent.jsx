import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CategorizedSection from './CategorizedSection';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Loader from './Loader';

const AllContent = () => {
    const [productData, setProductData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const brandArray = useSelector((state) => state.arrayOfBrands);
    const categoryArray = useSelector((state) => state.arrayOfCategories);

    const fetchProductData = async () => {
        axios({
            method: 'get',
            url: "https://dummyjson.com/products?limit=100"
        }).then((response) => {
            setIsLoading(false);
            setProductData(response);
        }).catch((error) => console.log(error));
    }

    const categories = productData?.data?.products.map((curElem) => {
        return curElem.category;
    });
    const uniqueSections = [...new Set(categories)];

    const filteredByBrand = productData?.data?.products.filter((curElem) => {
        return brandArray.includes(curElem.brand)
    })

    const filteredByCategory = productData?.data?.products.filter((curElem) => {
        return categoryArray.includes(curElem.category)
    })

    useEffect(() => {
        fetchProductData();
    }, [])
    return (
        <React.Fragment>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "24px", fontWeight: "600" }}>Welcome To Amajon. Your bootlegged amazon.</div>
            {isLoading ? <Loader /> : <div>
                {filteredByBrand?.length > 0 ? <div className='fs-5 fw-bold'>Products Filtered by Brand Name</div> : null}
                {filteredByCategory?.length > 0 ? <div className='fs-5 fw-bold'>Products Filtered by Category</div> : null}

                {filteredByBrand?.length > 0 ? <div className='d-flex'>
                    {filteredByBrand.map((curElem, index) => {
                        return (
                            <ProductCard key={curElem.id} singleProd={curElem} />
                        )
                    })}
                </div> : (filteredByCategory?.length > 0 ? <div className='d-flex flex-wrap'>
                    {filteredByCategory.map((curElem) => {
                        return (
                            <ProductCard key={curElem.id} singleProd={curElem} />
                        )
                    })}
                </div> : <div className='allContentBody'>
                    {uniqueSections.map((curElem, index) => {
                        return (
                            <CategorizedSection key={`id-${index}`} sectionName={curElem} sectionData={productData?.data?.products} />
                        )
                    })}
                </div>)}
            </div>}

        </React.Fragment>
    )
}

export default AllContent