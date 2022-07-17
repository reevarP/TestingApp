import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addBrandToArr, addCategoryToArr, removeBrandFromArr, removeCategoryFromArray } from './Redux/actions';
import { useNavigate } from 'react-router-dom';

const HeadNav = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const brandArr = useSelector((state) => state.arrayOfBrands);
    const categoryArr = useSelector((state) => state.arrayOfCategories)
    const [showFilters, setShowFilters] = useState(false);
    const [productData, setProductData] = useState();

    const fetchProductData = async () => {
        axios({
            method: 'get',
            url: "https://dummyjson.com/products?limit=100"
        }).then((response) => {
            setProductData(response);
        }).catch((error) => console.log(error));
    }

    const brands = productData?.data?.products.map((curElem) => {
        return curElem.brand;
    });
    const uniqueBrands = [...new Set(brands)];

    const categories = productData?.data?.products.map((curElem) => {
        return curElem.category;
    });
    const uniqueCategories = [...new Set(categories)];

    const addBrandToArray = (event) => {
        if (!brandArr.includes(event.target.value)) {
            dispatch(addBrandToArr(event.target.value));
        }
    }
    const removeBrand = (brandName) => {
        dispatch(removeBrandFromArr(brandName));
    }

    const addCategoryToArray = (event) => {
        if (!categoryArr.includes(event.target.value)) {
            dispatch(addCategoryToArr(event.target.value));
        }
    }
    const removeCategory = (category) => {
        dispatch(removeCategoryFromArray(category));
    }

    const navigateAndSort = (route) => {
        navigateTo(`/filter/${route}`)
    }

    const goToCart = () => {
        navigateTo("/mycart")
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    return (
        <React.Fragment>
            <Offcanvas show={showFilters} placement="start" onHide={() => { setShowFilters(false) }}>
                <Offcanvas.Header closeButton><div style={{ fontSize: "24px" }}>Filters</div></Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <div>
                            <div className='mb-2 fs-5'>Filter by brand</div>
                            <select onChange={addBrandToArray} style={{ width: "100%", cursor: "pointer", marginBottom: "0.5rem" }}>
                                {uniqueBrands.map((curElem, index) => {
                                    return (
                                        <option key={`id-${index}`} value={curElem}>{curElem}</option>
                                    )
                                })}
                            </select>
                            <div style={{ borderBottom: "1px solid #DFDFDF", display: "flex", flexWrap: "wrap" }}>
                                {brandArr.map((curElem, index) => {
                                    return (
                                        <div key={`id-${index}`} role="button" onClick={() => removeBrand(curElem)} style={{ margin: "0.5rem", backgroundColor: "#0080a3", color: "white", borderRadius: "0.7rem", padding: "0 0.3rem", display: "flex", alignItems: "center" }}>{curElem}</div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <div className='mt-2 mb-2 fs-5'>Filter by category</div>
                            <select onChange={addCategoryToArray} style={{ width: "100%", cursor: "pointer", marginBottom: "0.5rem" }}>
                                {uniqueCategories.map((curElem, index) => {
                                    return (
                                        <option key={`id-${index}`} value={curElem}>{curElem}</option>
                                    )
                                })}
                            </select>
                            <div style={{ borderBottom: "1px solid #DFDFDF", display: "flex", flexWrap: "wrap" }}>
                                {categoryArr.map((curElem, index) => {
                                    return (
                                        <div key={`id-${index}`} role="button" onClick={() => removeCategory(curElem)} style={{ margin: "0.5rem", backgroundColor: "#0080a3", color: "white", borderRadius: "0.7rem", padding: "0 0.3rem", display: "flex", alignItems: "center" }}>{curElem}</div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className='d-flex flex-column'>
                            <div className='fs-5'>Sort By:</div>
                            <div>Rating:</div>
                            <div className='d-flex'>
                                <div>
                                    <button className='m-2' style={{ border: "1px solid black", backgroundColor: "blue", color: "white", borderRadius: "4px" }} onClick={() => navigateAndSort("ratingasc")}>Ascending</button>
                                </div>
                                <div>
                                    <button className='m-2' style={{ border: "1px solid black", backgroundColor: "blue", color: "white", borderRadius: "4px" }} onClick={() => navigateAndSort("ratingdesc")}>Descending</button>
                                </div>
                            </div>

                            <div className='mt-2'>Discount:</div>
                            <div className='d-flex'>
                                <div>
                                    <button className='m-2' style={{ border: "1px solid black", backgroundColor: "blue", color: "white", borderRadius: "4px" }} onClick={() => navigateAndSort("discountasc")}>Ascending</button>
                                </div>
                                <div>
                                    <button className='m-2' style={{ border: "1px solid black", backgroundColor: "blue", color: "white", borderRadius: "4px" }} onClick={() => navigateAndSort("discountdesc")}>Descending</button>
                                </div>
                            </div>

                            <div className='mt-2'>Price:</div>
                            <div className='d-flex'>
                                <div>
                                    <button className='m-2' style={{ border: "1px solid black", backgroundColor: "blue", color: "white", borderRadius: "4px" }} onClick={() => navigateAndSort("priceasc")}>Ascending</button>
                                </div>
                                <div>
                                    <button className='m-2' style={{ border: "1px solid black", backgroundColor: "blue", color: "white", borderRadius: "4px" }} onClick={() => navigateAndSort("pricedesc")}>Descending</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <div className='headerNavigation'>
                <div role="button" onClick={() => { setShowFilters(true) }}><MenuIcon /> Filters</div>
                <div className='logo'>Amajon</div>
                <div className='d-flex'>
                    <div role="button" className='me-3' onClick={goToCart}>Cart</div>
                    <div>Login/SignUp</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HeadNav
