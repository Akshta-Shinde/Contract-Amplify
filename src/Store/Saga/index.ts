import { takeEvery } from "redux-saga/effects";
import ApiConstants from "../../Globals/ApiConstants";
import { getTableDataSaga } from "./squareFeetSaga";
import { getListSaga } from "./wareHouseSaga";
import {getInwardMatrixTableColSaga,
    getInwardMatrixTableRowSaga,
    getInwardSaga,
    updateInwardSaga,
    updateOption
    } from "./InwardSaga"
import {getContractSaga,updateContractSaga,getOptionContractSaga,
    getMatrixTableColSaga,
    getMatrixTableRowSaga,
    getTableSaga
    
} from "./contractSaga"



export default function* rootSaga() {
    yield takeEvery(ApiConstants.API_GET_WAREHOUSE_LOAD,getListSaga);
    yield takeEvery(ApiConstants.API_GET_SQUAREFEET_TABLE_DATA_LOAD,getTableDataSaga);
    //yield takeEvery(ApiConstants.ADD_VOLUME_TABLE_DATA,getInwardMatrixTableColSaga);
    //yield takeEvery(ApiConstants.ADD_VOLUME_TABLE_ROW_DATA,getInwardMatrixTableRowSaga)
    yield takeEvery(ApiConstants.SLAB_DATA_LOAD,getInwardSaga)
    //yield takeEvery(ApiConstants.SLAB_VALUE_SELECTED,updateContractSaga)
    //yield takeEvery(ApiConstants.API_SET_SELETED_DATA,updateOption)
    //yield takeEvery(ApiConstants.API_GET_LOAD_OPTION,getOptionContractSaga)
    //yield takeEvery(ApiConstants.UPDATE_TABLE_VALUES_ACTION,updateInwardSaga)

    yield takeEvery(ApiConstants.API_GET_LOAD_DATA,getContractSaga)
    yield takeEvery(ApiConstants.API_SET_SELETED_DATA,updateContractSaga)
    
    yield takeEvery(ApiConstants.API_GET_LOAD_OPTION,getOptionContractSaga)
    yield takeEvery(ApiConstants.ADD_VOLUME_TABLE_DATA,getMatrixTableColSaga);
    yield takeEvery(ApiConstants.SLAB_VALUE_SELECTED,updateContractSaga);
    yield takeEvery(ApiConstants.ADD_VOLUME_TABLE_ROW_DATA,getMatrixTableRowSaga);
    yield takeEvery(ApiConstants.GET_TABLE_DATA,getTableSaga)
}

