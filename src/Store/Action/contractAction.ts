import { type } from "os";
import ApiConstants from "../../Globals/ApiConstants";

function getContractDetails(where:any,activity:any){
    const action = {
        type: ApiConstants.API_GET_LOAD_DATA,
        where,
        activity

    }
    console.log("action in Action ts",action)
    return action;
}

function updateSelectedData(where: any,activity: any,table:any){
    const action = {
        type: ApiConstants.API_SET_SELETED_DATA,
        where,
        activity,
        table
    }
    return action;
}

function optionSelectedData(where: any,activity: any,table:any,key:any,value:any){
    const action = {
        type: ApiConstants.API_GET_LOAD_OPTION,
        where,
        activity,
        table,
        key,
        value
    }
    return action;
}

function volumnRowData(where:any){
    const action = {
        type: ApiConstants.ADD_VOLUME_TABLE_ROW_DATA,
        where,
    }
    return action;
}

function addVolumeTableDataAction(where:any){
    const action = {
        type: ApiConstants.ADD_VOLUME_TABLE_DATA,
        where
    }
    return action;
}

function updateTableValuesAction(value: any, key: any, subKey: any, actualValue: any,index?: any){
    const action = {
        type: ApiConstants.UPDATE_TABLE_VALUES_ACTION,
        value,
        key,
        subKey,
        index,
        actualValue
    }
    return action;
}

function setSlabSelectedAction(where:any,value: any, key: any,activity: any,table: any,dataType:any){
    const action = {
        type: ApiConstants.SLAB_VALUE_SELECTED,
        key,
        value,
        where,
        table,
        activity,
        dataType
    }
    return action;
}

function tableData(where:any){
    const action = {
        type: ApiConstants.GET_TABLE_DATA,
        where,
    }
    return action;
}

function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1);
    console.log('page to reload')
  }

export {
    getContractDetails,
    updateSelectedData,
    optionSelectedData,
    addVolumeTableDataAction,
    volumnRowData,
    updateTableValuesAction,
    setSlabSelectedAction,
    tableData,
    refreshPage
}