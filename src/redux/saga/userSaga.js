import {put, takeEvery, call} from "redux-saga/effects";
import axios from "axios";

import { ASYNC_GET_USER, getUser } from "../store/userReducer";

export const getUserApi = async () => {
  let user
  console.log('====>l<====', localStorage.getItem('token'))
  await axios.get(`http://localhost:5000/api/user`, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      user = res.data
      console.log('====>res<====', res)
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  console.log('====><====',user )
  return user
}

function* fetchUser() {
  const data = yield call(getUserApi)
  yield put(getUser(data))
}

export function* userWatcher () {
  yield takeEvery(ASYNC_GET_USER, fetchUser)
}