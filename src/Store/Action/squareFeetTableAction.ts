import ApiConstants from "../../Globals/ApiConstants";

function getSquareFeetTableDataAction(){
    const action = {
        type: ApiConstants.API_GET_SQUAREFEET_TABLE_DATA_LOAD,
    }
    return action;
}

function setPricePerSqftAction(value: any,item : any,key: any){
    const action ={
        type: ApiConstants.API_SET_SQUAREFEET_TABLE_VALUE_LOAD,
        value,
        item,
        key
    }
    return action;
}
function squareFeetSelectAction(value: any,item: any,array: any){
    const action ={
        type: ApiConstants.API_SET_SQUAREFEET_TABLE_DATA_LOAD,
        value,
        array,
        item
    }
    return action;
}

function setMinimumSqftValueAction(value: any){
    const action = {
        type: ApiConstants.API_SET_MINIMUM_SQUAREFEET_DATA_LOAD,
        value,
    }
    return action;
}


export {
    getSquareFeetTableDataAction,
    setPricePerSqftAction,
    squareFeetSelectAction,
    setMinimumSqftValueAction
}