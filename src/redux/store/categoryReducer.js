
const defaultState = {
  category: []
}

export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY"
export const ASYNC_GET_ALL_CATEGORY = "ASYNC_GET_ALL_CATEGORY"

export const categoryReducer = (state = defaultState, action) => {
  switch (action.type){
    case GET_ALL_CATEGORY:
      return {...state, category: action.payload}
  }
  return state
}

export const getAllCategory = payload => ({type: GET_ALL_CATEGORY, payload})
export const asyncGetAllCategory = () => ({type: ASYNC_GET_ALL_CATEGORY})
