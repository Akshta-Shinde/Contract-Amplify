import ApiConstants from '../../Globals/ApiConstants';

function wareHouseSelectAction(value: any,key: any,array: any){
    const action = {
        type: ApiConstants.API_GET_WAREHOUSE,
        value,
        key,
        array
    }
    return action;
}

function getWareHouseListAction(){
    const action = {
        type: ApiConstants.API_GET_WAREHOUSE_LOAD,
    }
    return action;
}

export {
    wareHouseSelectAction,
    getWareHouseListAction
}