import { combineReducers } from "redux";
import inwardReducerState from "./InwardPieceProcessedReducer";
import squareFeetReducerState from "./squareFeetReducer";
import wareHouseReducerState from "./wareHouseReducer";
import contractReducerState from './contractReducer'

const RootReducer = combineReducers({
    wareHouseReducerState,
    squareFeetReducerState,
    inwardReducerState,
    contractReducerState
});



export default RootReducer;