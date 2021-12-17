import {put, takeEvery, call} from "redux-saga/effects";
import { ASYNC_GET_ALL_CATEGORY, getAllCategory } from "../store/categoryReducer";
import axios from "axios";

export const getAllCategoryApi = async () => {
  let products
  await axios.get(`http://localhost:5000/api/category`, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      products = res.data
      console.log('====>products<====', products)
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  return products
}


function* fetchUserWorker() {
  const data = yield call(getAllCategoryApi)
  yield put(getAllCategory(data))
}

export function* userWatcher () {
  yield takeEvery(ASYNC_GET_ALL_CATEGORY, fetchUserWorker)
}
