import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga"
import { categoryReducer } from "./categoryReducer";
import { rootWatcher } from "../saga";
import { productReducer } from "./productsReducer";
import { userReducer } from "./userReducer";

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  userReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootWatcher)
