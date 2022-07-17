export function addBrandToArr(brandName){
    return{
        type: "ADD_BRAND_TO_ARRAY",
        payload: brandName
    }
}
export function removeBrandFromArr(brandName){
    return{
        type: "DELETE_BRAND_FROM_ARRAY",
        payload: brandName
    }
}

export function addCategoryToArr(category){
    return{
        type: "ADD_CATEGORY_TO_ARRAY",
        payload: category
    }
}
export function removeCategoryFromArray(category){
    return{
        type: "REMOVE_CATEGORY_FROM_ARRAY",
        payload: category
    }
}

export function buySingleItem(item){
    return{
        type: "BUY_SINGLE_ITEM",
        payload: item
    }
}
export function addProductToCart(item){
    return{
        type: "ADD_PRODUCT_TO_CART",
        payload: item
    }
}
export function removeProductFromCart(item){
    return{
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: item
    }
}