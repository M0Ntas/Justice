
const defaultState = {
  products: []
}

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const ASYNC_GET_ALL_PRODUCTS = "ASYNC_GET_ALL_PRODUCTS"

export const productReducer = (state = defaultState, action) => {
  switch (action.type){
    case GET_ALL_PRODUCTS:
      return {...state, products: action.payload}
  }
  return state
}

export const getAllProducts = payload => ({type: GET_ALL_PRODUCTS, payload})
export const asyncGetAllProducts = () => ({type: ASYNC_GET_ALL_PRODUCTS})
