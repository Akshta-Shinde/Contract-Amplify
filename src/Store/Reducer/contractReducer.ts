import { act } from "@testing-library/react";
import { access } from "fs";
import ApiConstants from "../../Globals/ApiConstants";

const initialState: any = {
    C1: 0,
    C2: 0,
    C3:0,
    C4: 0,
    C5: 0,
    C6: 0,
    typeId: 0,
    menuId: 0,
    dataLoad: false,
    sqftSelectedList: [],
    minimumMonthlyBill: {
        pricePerSqft: 0,
        minimumSqft: 0,
        monthlyBill: 0
    },
    squareFeetTableData: [
        {
            key: '1',
            structuretype: 'HDR - Pallet',
            Sqftrack: 22.5,
            sqft: 0,
            actualValue: 0,
            pricepersqft: 0,
            price: 0
        },
        {
            key: '2',
            structuretype: 'Boltless',
            Sqftrack: 22.5,
            sqft: 0,
            actualValue: 0,
            pricepersqft: 0,
            price: 0
        },
        {
            key: '3',
            structuretype: 'LSS',
            Sqftrack: 22.5,
            sqft: 0,
            actualValue: 0,
            pricepersqft: 0,
            price: 0
        },
        {
            key: '4',
            structuretype: 'Ground',
            Sqftrack: 22.5,
            sqft: 0,
            actualValue: 0,
            pricepersqft: 0,
            price: 0
        },
    ],
    volumeTableHeaderArray: [],
    volumeTableDataArray:[],
    weightGmsTableData:[],
    additionalTableDataArray:[]

}

const setData = (state: any, action: any) => {
    console.log("setData is111", action)

    if (action.key == "C1") {
        console.log("setData C1", action)
        state.C1 = action.value

    }
    else if (action.key == "C2") {
        console.log("setData C2", action)
        state.C2 = action.value

    }
    else if (action.key == "C3") {
        console.log("setData C3", action)
        state.C3 = action.value

    }
    else if (action.key == "C4") {
        console.log("setData C4", action)
        state.C4 = action.value

    }
    else if (action.key == "C5") {
        console.log("setData C5", action)
        state.C5 = action.value

    }
    else if (action.key == "C6") {
        console.log("setData C6", action)
        state.C6 = action.value

    }
    else {
        state.typeId = action?.data?.typeId ? action.data.typeId : state.typeId
        state.C1 = action?.data?.C1 ? action.data.C1 : state.C1
        state.C2 = action?.data?.C2 ? action.data.C2 : state.C2
        state.C3 = action?.data?.C3 ? action.data.C3 : state.C3
        state.C4 = action?.data?.C4 ? action.data.C4 : state.C4
        state.C5 = action?.data?.C5 ? action.data.C5 : state.C5
        state.C6 = action?.data?.C6 ? action.data.C6 : state.C6
        state.menuId = action?.data?.menuId?action.data.menuId:state.menuId
        console.log("state is", state)
    }


}

const updateTableValues = (state: any, action: any) => {
    console.log("updateTableValues action.subKey",action.subKey,action.index,action.key)
    try{
        if(action.subKey === "weightGmsTableData"){
            // let weightGmsTableDataTemp = [...state.weightGmsTableData];
            // console.log("weightGmsTableDataTemp is",weightGmsTableDataTemp)
            // weightGmsTableDataTemp[action.index][action.key] = action.value;
            // state.weightGmsTableData = weightGmsTableDataTemp;
            console.log("weightGmsTableDataTemp is",action.subKey,action.index)
            state[action.subKey][action.index][action.key] = action.value;
            
        }else if(action.subKey === "volumeTableHeaderArray" || action.subKey === "volumeTableDataArray"){
            state[action.subKey][action.index][action.key] = action.value;
        }else if(action.subKey === "additionalTableHeaderArray" || action.subKey === "additionalTableDataArray"){
            state[action.subKey][action.index][action.key] = action.value;
        }
    }catch(ex){
        console.log("Error in updateTableValue::"+ex);
    }
}

const updateVolumeData=(state: any, action: any) => {
    try{
        console.log("action is",action)
        const volumeData = action.data.title_data
        const weightData=[]
        const weightArr= ['']
        const newColumndata=[]
        for(let i = 0; i < volumeData.length; i++){
            const data = volumeData[i]
            const weight =data.W
            if(!weightArr.includes(weight)){
                weightArr.push(weight)
                var p1 = { C1:weight,weightslab: i+1 };
                weightData.push(p1)
                const filterData = volumeData.filter((volume:any) => volume.W ==weight );
                let rowData={}
                for(let i = 0; i < filterData.length; i++){
                    const weightData= filterData[i]
                    const value = weightData["P"]
                    const title = weightData["T"]
                    rowData={...rowData,[`C|${weight+'|'+title}`]: value}
                }
                console.log("rowData is",rowData)
                if(rowData){
                    newColumndata.push(rowData)
                }
            }
        }
        console.log("action is newColumndata",weightData,newColumndata)
        if(weightData.length>0){
            console.log("weightData,weightData")
            state.weightGmsTableData = weightData
        }

        if(newColumndata.length>0){
            console.log("newColumndata,newColumndata")
            state.volumeTableDataArray=newColumndata
        }
        const additionalVolumeData = action.data.additional_data 
        const additionWeight =['']
        const additionalColumndata =[]
        for(let i = 0; i < additionalVolumeData.length; i++){
            const data = additionalVolumeData[i]
            const weight =data.W
            if(!additionWeight.includes(weight)){
                additionWeight.push(weight)
                const additionalfilterData = additionalVolumeData.filter((volume:any) => volume.W ==weight );
                let rowData={}
                for(let i = 0; i < additionalfilterData.length; i++){
                    const weightData= additionalfilterData[i]
                    const value = weightData["P"]
                    const title = weightData["T"]
                    rowData={...rowData,[`R|${weight+'|'+title}`]: value}
                }
                if(rowData){
                    additionalColumndata.push(rowData)
                }
            }
            console.log("additionalColumndata is",additionalColumndata)
            state.additionalTableDataArray=additionalColumndata
        }
    }catch(ex){
        console.log("Error in updateTableValue::"+ex);
    }

}

const updateSlabSelect =(state: any, action: any)=>{
    console.log("insoed updateSlabSelect",state,action)
    if (action.key === 'C1' && action.dataType==='slab') {
        console.log("updateSlabSelect updateSlabSelect")
        state.pieceSlabValue=action.value
    }
    else{
        if(action.data!=undefined){
            state.pieceSlabValue=action.data.C1?action.data.C1:state.pieceSlabValue
            state.typeId=action.data.typeId?action.data.typeId:state.typeId
            state.C1=action.data.C1?action.data.C1:state.C1
            state.C2 = action.data.C2?action.data.C2:state.C2
            state.C3 = action.data.C3?action.data.C3:state.C3
            state.C4 = action.data.C4?action.data.C4:state.C4
            state.C5 = action.data.C5?action.data.C5:state.C5
            state.C6 = action.data.C6?action.data.C6:state.C6
            console.log("state.pieceSlabValue",state.pieceSlabValue)
        }
        
    }

}

const updateTableData =(state: any, action: any)=>{
    const table_data = action?.data?.title_data?action.data.title_data:state.weightGmsTableData
    if(table_data.length>0){
        table_data.sort(
            (P1:any, P2:any) => 
            (P1.W < P2.W) ? -1 : (P1.W > P2.W) ? 0 : 1
            //P2.W > P1.W ? 1 : -1,
            );
        const table_data1= table_data.sort((a:any, b:any) => a.value - b.value);
            
        console.log("table_data table_data1",table_data1)
        state.weightGmsTableData= table_data
    }
    
}


function contractReducerState(state = initialState, action: any) {
    console.log("cftReducerState", action)
    switch (action?.type) {
        case ApiConstants?.API_GET_LOAD_DATA:
            console.log("API_GET_LOAD_OPTION", action, state)
            //setData(state, action)
            
            return {
                ...state,
                dataLoad: true
            }
        case ApiConstants?.API_GET_LOAD_DATA_SUCCESS:

            console.log("API_GET_LOAD_DATA_SUCCESS", action, state)
            setData(state, action)
            console.log("state is on load", state)
            return {
                ...state,
                dataLoad: false
            }
        case ApiConstants?.API_SET_SELETED_DATA_SUCCESS:
            console.log("API_SET_SELETED_DATA_SUCCESS", action)
            //setData(state, action)
            return {
                ...state,
                dataLoad: false
            }
        case ApiConstants?.API_GET_LOAD_OPTION:
            console.log("API_GET_LOAD_OPTION",action)
            setData(state,action)
            return {
                ...state,
                dataLoad: false
            }
        case ApiConstants?.API_GET_LOAD_OPTION_SUCCESS:
            console.log("API_GET_LOAD_DATA_SUCCESS", action, state)
            return {
                ...state,
                dataLoad: false
            }
        case ApiConstants.ADD_VOLUME_TABLE_DATA:
            //addVolumeTableByWeghtGmsTableData(state)
            return {
                ...state
            }
        case ApiConstants.ADD_VOLUME_TABLE_DATA_SUCCESS:
            //addVolumeTableByWeghtGmsTableData(state)
            updateTableValues(state, action)
            console.log("ADD_VOLUME_TABLE_DATA_SUCCESS")
            return {
                ...state,
                volumeTableHeaderArray: action?.data?.title_data
            }
        case ApiConstants.ADD_VOLUME_TABLE_ROW_DATA:
            // addVolumeTableByWeghtGmsTableData(state)
            return {
                ...state
            }
        case ApiConstants.ADD_VOLUME_TABLE_ROW_DATA_SUCCESS:
            console.log("ADD_VOLUME_TABLE_ROW_DATA_SUCCESS", action)
            updateVolumeData(state, action)
            return {
                ...state,

            }
        case ApiConstants.UPDATE_TABLE_VALUES_ACTION:
            updateTableValues(state, action)
            return {
                ...state
            }
        case ApiConstants.SLAB_VALUE_SELECTED:
            console.log("SLAB_VALUE_SELECTED is", action)
            updateSlabSelect(state, action)
            return {
                ...state
            }
        case ApiConstants.GET_TABLE_DATA_SUCCESS:
            updateTableData(state, action)
            return {
                ...state
            }

        default:
            return state;
    }
}

export default contractReducerState;