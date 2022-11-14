import { message } from "antd";
import ApiConstants from "../../Globals/ApiConstants";
import AppConstants from "../../Globals/AppConstants";
import { put, call, takeEvery } from "redux-saga/effects";
import { contractAxiosApi } from "../Http/contractHttp/contractAxiosApi";



function* failSaga(result: any) {

    yield put({ type: ApiConstants.API_USER_FILE });

    let msg = result.result.data

        ? result.result.data.message

        : AppConstants.somethingWentWrong;

    message.config({

        duration: 1.5,

        maxCount: 1,

    });

    message.error(msg);

}



function* errorSaga(error: any) {

    yield put({

        type: ApiConstants.API_USER_ERROR,

        error: error,

        status: error.status,

    });



    message.config({

        duration: 1.5,

        maxCount: 1,

    });

    message.error(AppConstants.somethingWentWrong);

}
export function* getContractSaga(action: any): any{
    try{
        const result = yield call(contractAxiosApi.getDetails,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.API_GET_LOAD_DATA_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

export function* updateContractSaga(action: any): any{
    try{
        const result = yield call(contractAxiosApi.updateContract,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.API_SET_SELETED_DATA_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
        console.log("updateContractSaga action is",action)
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

export function* getOptionContractSaga(action: any): any{
    try{
        const result = yield call(contractAxiosApi.updateContract,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.API_GET_LOAD_OPTION_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

export function* getMatrixTableColSaga(action: any): any{
    try{
        //const result = yield call(inwardAxiosApi.getInwardMatrix);
        const result = yield call(contractAxiosApi.getMatrixCol,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.ADD_VOLUME_TABLE_DATA_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

export function* getMatrixTableRowSaga(action: any): any{
    try{
        // const result = yield call(inwardAxiosApi.getInwardMatrixRow);
        const result = yield call(contractAxiosApi.getMatrixRow,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.ADD_VOLUME_TABLE_ROW_DATA_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

export function* getTableSaga(action: any): any{
    try{
        // const result = yield call(inwardAxiosApi.getInwardMatrixRow);
        const result = yield call(contractAxiosApi.getMatrixRow,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.GET_TABLE_DATA_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

