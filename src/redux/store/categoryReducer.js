
const defaultState = {
  category: []
}

export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY"
export const ASYNC_GET_ALL_CATEGORY = "ASYNC_GET_ALL_CATEGORY"
export const DELETE_CATEGORY_REDUX = "DELETE_CATEGORY_REDUX"

export const categoryReducer = (state = defaultState, action) => {
  switch (action.type){
    case GET_ALL_CATEGORY:
      return {...state, category: action.payload}
    case DELETE_CATEGORY_REDUX:
      return {...state, category: action.payload}
  }
  return state
}

export const getAllCategory = payload => ({type: GET_ALL_CATEGORY, payload})
export const asyncGetAllCategory = () => ({type: ASYNC_GET_ALL_CATEGORY})
export const deleteCategoryRedux = payload => ({type: DELETE_CATEGORY_REDUX, payload})
