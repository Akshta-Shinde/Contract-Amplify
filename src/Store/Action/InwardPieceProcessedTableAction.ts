import ApiConstants from '../../Globals/ApiConstants';

function addVolumeTableDataAction(where:any){
    const action = {
        type: ApiConstants.ADD_VOLUME_TABLE_DATA,
        where
    }
    return action;
}

function addWightGrmTableDataAction(key: any, index?: any){
    const action = {
        type: ApiConstants.ADD_REMOVE_WEIGHT_GRMS_TABLE_DATA,
        key,
        index
    }
    return action;
}

function addVolumeTableColumnAction(key: any, index?: any){
    const action = {
        type: ApiConstants.ADD_REMOVE_VOLUME_TABLE_COLUMN,
        key,
        index
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

function volumnRowData(where:any){
    const action = {
        type: ApiConstants.ADD_VOLUME_TABLE_ROW_DATA,
        where,
    }
    return action;
}

function loadSlabDataAction(value: any, key: any){
    const action = {
        type: ApiConstants.SLAB_DATA_LOAD,
        activity: key,
        where: value
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

function getInwardData(){
    const action = {
        type: ApiConstants.API_GET_INWARD_DATA_LOAD,
    }
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

export{
    addVolumeTableDataAction,
    addVolumeTableColumnAction,
    addWightGrmTableDataAction,
    updateTableValuesAction,
    volumnRowData,
    loadSlabDataAction,
    setSlabSelectedAction,
    getInwardData,
    updateSelectedData,
    optionSelectedData
}