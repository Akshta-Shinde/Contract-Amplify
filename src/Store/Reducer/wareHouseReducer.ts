import ApiConstants from "../../Globals/ApiConstants";



const initialState: any = {
    wareHouseSelectionList : [],
    wareHouseList : [
        {
            key: "1",
            location: ' Kolkata-Delhi'
    
        },
        {
            key: "2",
            location: ' Delhi-Kolkata'
    
        },
        {
            key: "3",
            location: ' chennai-Hyderabad'
    
        },
        {
            key: "4",
            location: ' Hyderabad-chennai'
    
        },
        {
            key: "5",
            location: 'Jaipur-Bangalore'
    
        },
        {
            key: "6",
            location: ' Hyderabad-Ahmadabad'
    
        },
    
    ],
    wareHouseOnLoad: false
   
}
    
const chooseWareHouse = (state: any, action: any) =>{
    try{
        let wareHouseArray = [...state.wareHouseSelectionList]
        if(action.key === "wareHouseList"){
            let wareHouseList = action.array;
            state.wareHouseSelectionList = [];
            let selectedValues = action.value;
            for (let id of selectedValues) {
                let wareHouseValue = wareHouseList.find((x: any) => x.key == id);
                if (wareHouseValue) {
                    let obj = {
                        key: wareHouseValue.key,
                        location: wareHouseValue.location,
                    };
                    state.wareHouseSelectionList.push(obj);
                }

            }
            console.log(" state.wareHouseSelectionList", state.wareHouseSelectionList);
        }else{
            let filteredWareHouse = wareHouseArray.filter((x: any) => x.key !== action.value)
            console.log("filteredWareHouse",filteredWareHouse)
            state.wareHouseSelectionList = filteredWareHouse;
        }
    }catch(ex){
        console.log("Error in Choose WareHouse::"+ex)
    }
}


function wareHouseReducerState(state = initialState, action: any) {
    switch(action?.type){
        case ApiConstants?.API_GET_WAREHOUSE:
            chooseWareHouse(state, action)
            return{
                ...state
            }
        case ApiConstants?.API_GET_WAREHOUSE_LOAD:
            return{
                ...state,
                wareHouseOnLoad: true
            }
        case ApiConstants?.API_GET_WAREHOUSE_SUCCESS:
            return{
                ...state,
                wareHouseList:state.wareHouseList,
                wareHouseOnLoad: false
            }
        default:
            return state;
    }
}

export default wareHouseReducerState;