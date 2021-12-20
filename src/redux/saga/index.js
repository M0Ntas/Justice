import {all} from "redux-saga/effects"
import { categoryWatcher } from "./categorySaga";
import { productsWatcher } from "./productsSaga";
import { userWatcher } from "./userSaga";

export function* rootWatcher () {
  yield all([categoryWatcher(), productsWatcher(), userWatcher()])
}