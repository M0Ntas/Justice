import {all} from "redux-saga/effects"
import { userWatcher } from "./categorySaga";

export function* rootWatcher () {
  yield all([userWatcher()])
}