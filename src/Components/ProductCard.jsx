import React, { useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, buySingleItem, removeProductFromCart } from './Redux/actions';

const ProductCard = (props) => {
    const [imagesModal, setImagesModal] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const productInCart = useSelector((state) => state.cartArray);
    const productIdArray = productInCart.map((curElem) => {
        return curElem.id
    })
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const buyAnItem = () => {
        if (props.singleProd.stock < 50) {
            setWarningModal(true);
        }
        dispatch(buySingleItem(props.singleProd));
        if (props.singleProd.stock >= 50) {
            navigateTo("/mycart")
        }
    }
    const addItemToCart = () => {
        if (!productIdArray.includes(props.singleProd.id)) {
            dispatch(addProductToCart(props.singleProd))
        }else{
            dispatch(removeProductFromCart(props.singleProd))
        }
    }
    const moveForward = () => {
        setWarningModal(false);
        navigateTo("/mycart");
    }

    return (
        <React.Fragment>
            <Modal show={warningModal} onHide={moveForward}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    Hurry! Only a few items left.
                </Modal.Body>
            </Modal>
            <Modal show={imagesModal} centered onHide={() => setImagesModal(false)}>
                <Modal.Header closeButton>Product Images</Modal.Header>
                <Modal.Body>
                    <Carousel fade>
                        {props.singleProd.images.map((curElem, index) => {
                            return (
                                <Carousel.Item key={`id-${index}`} style={{ display: "flex", justifyContent: "center" }}>
                                    <img src={curElem} style={{ height: "20rem", width: "20rem" }} alt="productImages" />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Modal.Body>
            </Modal>
            <div className='productCard'>
                <div style={{ width: "100%" }}>
                    <div role='button' className='productCardImg' onClick={() => setImagesModal(true)}><img src={props.singleProd.thumbnail} alt="productImage" /></div>
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>{props.singleProd.title}</div>
                    <div style={{ fontSize: "16px", fontWeight: "400" }}>{props.singleProd.brand}</div>
                    <div style={{ fontSize: "16px", fontWeight: "400", padding: "0 0.5rem" }}>{props.singleProd.description}</div>
                </div>
                <div style={{ marginTop: "1rem", backgroundColor: "#abffed", width: "100%" }}>
                    <div>Price: {props.singleProd.price}</div>
                    <div>Rating: {props.singleProd.rating}</div>
                    <div>In Stock: {props.singleProd.stock}</div>
                </div>
                <div className='d-flex justify-content-around w-100 p-2'>
                    <div><button className={`${productIdArray.includes(props.singleProd.id) ? "activeInCart" : null}`} style={{ border: "none", borderRadius: "4px", backgroundColor: "#FFFFFF", border: "1px solid #888888" }} onClick={addItemToCart}>Add To Cart</button></div>
                    <div><button style={{ border: "none", borderRadius: "4px", backgroundColor: "#2871f5", color: "#FFFFFF" }} onClick={buyAnItem}>Buy Now</button></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductCard