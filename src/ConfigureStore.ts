import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import RootReducer from "./Store/Reducer";
import rootSaga from "./Store/Saga";

const sagaMiddleware = createSagaMiddleware();

export function ConfigureStore(){
    const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}