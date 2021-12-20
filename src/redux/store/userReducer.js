
const defaultState = {
  user: []
}

export const GET_USER = "GET_USER"
export const ASYNC_GET_USER = "ASYNC_GET_USER"

export const userReducer = (state = defaultState, action) => {
  switch (action.type){
    case GET_USER:
      return {...state, user: action.payload}
  }
  return state
}

export const getUser = payload => ({type: GET_USER, payload})
export const asyncGetUser = () => ({type: ASYNC_GET_USER})
