import { message } from "antd";
import ApiConstants from "../../Globals/ApiConstants";
import AppConstants from "../../Globals/AppConstants";
import { put, call, takeEvery } from "redux-saga/effects";
import { wareHouseAxiosApi } from "../Http/wareHouseHttp/wareHouseAxiosApi";



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
export function* getListSaga(action: any): any{
    try{
        const result = yield call(wareHouseAxiosApi.getList);
        if (result.status == 1) {
            yield put({
            type: ApiConstants.API_GET_WAREHOUSE_SUCCESS,
            //result: result.result.data.data,
            result: result?.result?.data,
            status: result.status,
            payload: action.payload
            });
        }
    }
    catch(error: any){
        yield call(errorSaga, error);
    }
}

