import { message } from "antd";
import ApiConstants from "../../Globals/ApiConstants";
import AppConstants from "../../Globals/AppConstants";
import { put, call, takeEvery } from "redux-saga/effects";
import { inwardAxiosApi } from "../Http/InwardHttp/inwardAxiosApi";



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
export function* getInwardMatrixTableColSaga(action: any): any{
    try{
        //const result = yield call(inwardAxiosApi.getInwardMatrix);
        const result = yield call(inwardAxiosApi.getMatrixCol,action);
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

export function* getInwardMatrixTableRowSaga(action: any): any{
    try{
        // const result = yield call(inwardAxiosApi.getInwardMatrixRow);
        const result = yield call(inwardAxiosApi.getMatrixRow,action);
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

export function* getInwardSaga(action: any): any{
    try{
        const result = yield call(inwardAxiosApi.getInward,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.SLAB_DATA_LOAD_SUCCESS,
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

export function* updateInwardSaga(action: any): any{
    try{
        const result = yield call(inwardAxiosApi.updateInward,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.SLAB_DATA_LOAD_SUCCESS,
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

export function* updateOption(action: any): any{
    try{
        console.log("updateOption updateOption",updateOption)
        const result = yield call(inwardAxiosApi.updateOption,action);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.API_SET_SELETED_DATA_SUCCESS,
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

export function* getOptionContractSaga(action: any): any{
    try{
        const result = yield call(inwardAxiosApi.updateInward,action);
        console.log("getOptionContractSaga ",action,result.status)
        if (result.status == 1) {
            yield put({
            type: ApiConstants.API_GET_LOAD_OPTION_SUCCESS,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload,
            data: result?.result?.data?.body
            });
        }
        console.log("result is",result,action)
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}