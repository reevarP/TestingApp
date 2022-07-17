const initialState = {
    arrayOfBrands: [],
    arrayOfCategories: [],
    cartArray: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_BRAND_TO_ARRAY":
            return {
                ...state,
                arrayOfBrands: [...state.arrayOfBrands, action.payload],
                arrayOfCategories: []
            }
        case "DELETE_BRAND_FROM_ARRAY":
            return{
                ...state,
                arrayOfBrands: state.arrayOfBrands.filter((curElem) => {
                    return curElem !== action.payload;
                })
            }

        case "ADD_CATEGORY_TO_ARRAY":
            return{
                ...state,
                arrayOfCategories: [...state.arrayOfCategories, action.payload],
                arrayOfBrands: []
            }

        case "REMOVE_CATEGORY_FROM_ARRAY":
            return{
                ...state,
                arrayOfCategories: state.arrayOfCategories.filter((curElem) => {
                    return curElem !== action.payload;
                })
            }

        case "BUY_SINGLE_ITEM":
            return{
                ...state,
                cartArray: [action.payload]
            }

        case "ADD_PRODUCT_TO_CART":
            return{
                ...state,
                cartArray: [...state.cartArray, action.payload]
            }

        case "REMOVE_PRODUCT_FROM_CART":
            return{
                ...state,
                cartArray: state.cartArray.filter((curElem) => {
                    return curElem.id !== action.payload.id
                })
            }

        default:
            return {
                ...state
            }
    }
}

export default productReducer;