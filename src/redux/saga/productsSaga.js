import {put, takeEvery, call} from "redux-saga/effects";
import axios from "axios";
import { ASYNC_GET_ALL_PRODUCTS, getAllProducts } from "../store/productsReducer";

export const getAllProductsApi = async () => {
  let products
  await axios.get(`http://localhost:5000/api/position`, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      products = res.data
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  return products
}

function* fetchProductsWorker() {
  const data = yield call(getAllProductsApi)
  yield put(getAllProducts(data))
}

export function* productsWatcher () {
  yield takeEvery(ASYNC_GET_ALL_PRODUCTS, fetchProductsWorker)
}