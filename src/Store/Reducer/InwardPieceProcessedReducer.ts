import { act } from "react-dom/test-utils";
import ApiConstants from "../../Globals/ApiConstants";
import AppConstants from "../../Globals/AppConstants";
import { deepCopyFunction } from "../../Globals/Helper";
import { volumnRowData } from "../Action/InwardPieceProcessedTableAction";

const volumeTableHeaderObjTemp = {
    title: null,
    key: null
}

const initialState: any = {
    volumeTableHeaderArray: [],
    volumeTableDataArray: [],
    columnAddOnLoad: false,
    weightGmsTableData: [
        {
            grm: '500',
            weightslab: '#1'
        },
        {
            grm: '300',
            weightslab: '#2'
        }
    ],
    pieceSlabValue: 1,
    pieceDataOnLoad: false,
    inwardOption: '',
    inwardPieceTableData: [
        {
            key: '1',
            structuretype: 'sku1',
            pricePerPiece: '899',
            totalPriceperPiece: "38678",
        },
        {
            key: '2',
            structuretype: 'sku1',
            pricePerPiece: '899',
            totalPriceperPiece: "38678",
        },
        {
            key: '3',
            structuretype: 'sku1',
            pricePerPiece: '899',
            totalPriceperPiece: "38678"
        },
    ],
    C1: 0,
    pieceSelectedList: [
        {
            key: '1',
            structuretype: 'sku1',
            pricePerPiece: '899',
            totalPriceperPiece: "38678",
        },
        {
            key: '2',
            structuretype: 'sku1',
            pricePerPiece: '899',
            totalPriceperPiece: "38678",
        },
        {
            key: '3',
            structuretype: 'sku1',
            pricePerPiece: '899',
            totalPriceperPiece: "38678"
        },
    ],
    typeId: 0,
    additionalTableDataArray:[],
    C2: 0,
    C3: 0,
    C4: 0,
    C5: 0,
    C6: 0
}

const addVolumeTableByWeghtGmsTableData = (state: any) => {
    console.log("state addVolumeTableByWeghtGmsTableData is",state)
    try{
        let header = deepCopyFunction(volumeTableHeaderObjTemp);
        state.volumeTableHeaderArray.push(header);
        console.log("tests volumnRowData:",volumnRowData)
        for(let i = 0; i < state.weightGmsTableData.length; i++){
            console.log("state.weightGmsTableData is",state.weightGmsTableData[i])
            let obj = {
                [`col${i + 1}`]: null
            }
            state.volumeTableDataArray.push(obj);
        }
    }catch(ex){
        console.log("Error in addVolumeTableByWeghtGmsTableData::"+ex);
    }
}

const addRemoveWeightGrmTableData = (action: any, state: any) => {
    try{
        let weightGmsTableDataTemp = [...state.weightGmsTableData];
        if(action.key === AppConstants.add){
            //add weight grams tabe row
            
            let obj = {
                grm: null,
                weightslab: `#${state.weightGmsTableData.length + 1}`
            }
            weightGmsTableDataTemp.push(obj);
            state.weightGmsTableData = weightGmsTableDataTemp;

            //add one more row for volume table based on grms table row added
            let volumeTableColumnObj = {};
            for(let i = 0; i < state.volumeTableHeaderArray.length; i++){
                let newObj = {
                    [`col${i + 1}`]: null
                } 
                Object.assign(volumeTableColumnObj, newObj)
            }
            state.volumeTableDataArray.push(volumeTableColumnObj);
        }else if(action.key === AppConstants.remove){
            weightGmsTableDataTemp.splice(action.index, 1);
            state.weightGmsTableData = weightGmsTableDataTemp;
            state.volumeTableDataArray.splice(action.index, 1);
        }
    }catch(ex){
        console.log("Error in addWeightGrmTableData::"+ex);
    }
}

const addRemoveVolumeTableColumnByWeightGrmTableData = (state: any, action: any) => {
    try{
        let volumeTableHeaderArrayTemp = [...state.volumeTableHeaderArray];
        if(action.key === AppConstants.add){
            let header = deepCopyFunction(volumeTableHeaderObjTemp);
            volumeTableHeaderArrayTemp.push(header);

            //if we set like this means it will reflect in a page
            state.volumeTableHeaderArray = volumeTableHeaderArrayTemp;
            for(let item of state.volumeTableDataArray){
                let keys = Object.keys(item);
                let lastKey = keys[keys.length - 1]

                //split chars and numbers to find a last key value for the particular object
                var chars = lastKey.slice(0, lastKey.search(/\d/));
                var numbs = lastKey.replace(chars, '');
                let newKeyObj = {
                    [`col${Number(numbs) + 1}`]: null
                }
                Object.assign(item, newKeyObj)
            }
        }else if(action.key === AppConstants.remove){
            for(let item of state.volumeTableDataArray){
                let keys = Object.keys(item);

                //to find a particular key name to delete
                let delKey = keys[action.index]
                delete item[delKey];
            }
            //to remove header
            state.volumeTableHeaderArray.splice(action.index, 1);
        }
    }catch(ex){
        console.log("Error in addVolumeTableColumnByWeightGrmTableData::"+ex);
    }
    // let dataArrayTemp = [...state.dataArray]
    // if (action.payload === "AddColumn") {
    //     let newObj = {
    //         key: (state.VolumnTableDataArray.length + 1),
    //         title: `Col ${state.VolumnTableDataArray.length + 1}`

    //     }

    //     state.VolumnTableDataArray.push(newObj)
    //     for (let data of dataArrayTemp) {
    //         const source = {
    //             [`Col${Object.keys(data).length + 1}`]: 0
    //         };
    //         Object.assign(data, source);//{a:1,b:2},{c:5}=>{a:1,b:2,c:5}
    //     }

    //     state.dataArray = dataArrayTemp

    // } else {
    //     let newArr={
    //         col1: 32,
    //         col2:7846,
    //         col3:86
    //     }
    //     let source
    //     for (let data of dataArrayTemp) {
    //         source = {
    //             [`Col${Object.keys(data).length + 1}`]: 0
    //         };
    //     }

    //     state.dataArray.push( Object.assign(newArr, source))

    // }
}

const updateTableValues = (state: any, action: any) => {
    try{
        if(action.subKey === "weightGmsTableData"){
            let weightGmsTableDataTemp = [...state.weightGmsTableData];
            weightGmsTableDataTemp[action.index][action.key] = action.value;
            state.weightGmsTableData = weightGmsTableDataTemp;
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

const updateSelectOption =(state: any, action: any)=>{
    if (action.key === 'C1') {
        console.log("updateSlabSelect updateSelectOption")
        state.C1=action.value
    }
    else if (action.key === 'C2') {
        console.log("updateSlabSelect updateSelectOption")
        state.C2=action.value
    }
    else if (action.key === 'C3') {
        console.log("updateSlabSelect updateSelectOption")
        state.C3=action.value
    }
    else if (action.key === 'C4') {
        console.log("updateSlabSelect updateSelectOption")
        state.C4=action.value
    }
    else if (action.key === 'C5') {
        console.log("updateSlabSelect updateSelectOption")
        state.C5=action.value
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


function inwardReducerState(state = initialState, action: any) {
    switch (action?.type) {
        // case ApiConstants.ADD_VOLUME_TABLE_DATA:
        //     //addVolumeTableByWeghtGmsTableData(state)
        //     return {
        //         ...state 
        //     }
        // case ApiConstants.ADD_VOLUME_TABLE_DATA_SUCCESS:
        //         //addVolumeTableByWeghtGmsTableData(state)
        //         updateTableValues(state,action)
        //         console.log("ADD_VOLUME_TABLE_DATA_SUCCESS")
        //         return {
        //             ...state,
        //             volumeTableHeaderArray: action?.data?.title_data
        //         }
        case ApiConstants.ADD_VOLUME_TABLE_ROW_DATA:
           // addVolumeTableByWeghtGmsTableData(state)
            return {
                ...state
            }
        // case ApiConstants.ADD_VOLUME_TABLE_ROW_DATA_SUCCESS:
        //     console.log("ADD_VOLUME_TABLE_ROW_DATA_SUCCESS", action)
        //     //addVolumeTableByWeghtGmsTableData(state)
        //     updateVolumeData(state,action)
            
        //     console.log("shshhs",state)
        //     return {
        //         ...state,
        //         //volumeTableDataArray: action.data.title_data
                
        //     }

        case ApiConstants.ADD_REMOVE_WEIGHT_GRMS_TABLE_DATA:
            addRemoveWeightGrmTableData(action, state)
            return{
                ...state
            }

        case ApiConstants.ADD_REMOVE_VOLUME_TABLE_COLUMN:
            addRemoveVolumeTableColumnByWeightGrmTableData(state, action)
            return {
                ...state,
                addColumnOnLoad: state.columnAddOnLoad
            }

        case ApiConstants.UPDATE_TABLE_VALUES_ACTION:
            updateTableValues(state,action)
            return{
                ...state
            }
        case ApiConstants.SLAB_DATA_LOAD:
            return {
                ...state
            }
        case ApiConstants.SLAB_DATA_LOAD_SUCCESS:
            console.log("SLAB_DATA_LOAD_SUCCESS is",action,state)
            updateSlabSelect(state,action)
            return {
                ...state,
                
            }
        // case ApiConstants.SLAB_VALUE_SELECTED:
        //     console.log("SLAB_VALUE_SELECTED is", action)
        //     //addVolumeTableByWeghtGmsTableData(state)
        //     //updateVolumeData(state,action)
        //     updateSlabSelect(state,action)
        //     return {
        //         ...state
        //     }
            
        case ApiConstants?.API_SET_SELETED_DATA:
            console.log("API_GET_INWARD_DATA_LOAD_SUCCESS", action)
            return {
                ...state
            }
        // case ApiConstants?.API_SET_SELETED_DATA_SUCCESS:
        //     console.log("API_SET_SELETED_DATA_SUCCESS", action, state)
        //     updateSlabSelect(state,action)
        //     return {
        //         ...state,
        //         C1: action.data.C1
        //     }
            // case ApiConstants.API_GET_LOAD_OPTION:
            //     console.log("API_GET_LOAD_OPTION",action,state)
            //     updateSelectOption(state,action)
            //     return {
            //         ...state
            //     }
            // case ApiConstants.API_GET_LOAD_OPTION_SUCCESS:
            //     console.log("API_GET_LOAD_OPTION_SUCCESS",action,state)
            //     //updateSlabSelect(state,action)
            //     return {
            //         ...state
            //     }


        default:
            return state;
    }

}
export default inwardReducerState;