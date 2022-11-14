import ApiConstants from "../../Globals/ApiConstants";
import { numInIndianFormat } from "../../Globals/Helper";
import { setPricePerSqftAction } from "../Action/squareFeetTableAction";



const initialState: any = {
    squareFeetTableDataOnLoad: false,
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
    squareFeetTableValueOnLoad: false,
    TotalCount: 0,
    sqftSelectedList: [],
    minimumMonthlyBill: {
        pricePerSqft: 0,
        minimumSqft: 0,
        monthlyBill: 0
    },
    sqftOnLoad: false


}

const setPricePerSqft = (state: any, action: any) => {

    if (action.item === 'PricePerSqft') {
        console.log("PricePerSqft")
        let squareFeetDataArray = [...state.squareFeetTableData]
        let value = action.value
        for (let id of squareFeetDataArray) {
            let index = squareFeetDataArray.findIndex((x: any) => x.key === id.key)
            squareFeetDataArray[index] = {
                key: id.key,
                structuretype: id.structuretype,
                Sqftrack: id.Sqftrack,
                actualValue: id.actualValue,
                sqft: (id.actualValue * id.Sqftrack),
                pricepersqft: value,
                price: ((id.actualValue * id.Sqftrack) * value)
            }
        }
        state.minimumMonthlyBill.pricePerSqft = value;
        state.minimumMonthlyBill.monthlyBill= state.minimumMonthlyBill.pricePerSqft * value
        let selectedListArr = [...state.sqftSelectedList]
        for (let id of selectedListArr) {
            let index = selectedListArr.findIndex((x: any) => x.key === id.key)
            selectedListArr[index] = {
                key: id.key,
                structuretype: id.structuretype,
                Sqftrack: id.Sqftrack,
                actualValue: id.actualValue,
                sqft: (id.actualValue * id.Sqftrack),
                pricepersqft: value,
                price: ((id.actualValue * id.Sqftrack) * value)
            }
        }
        state.squareFeetTableData = squareFeetDataArray
        state.sqftSelectedList = selectedListArr
    } else if (action.item === 'actualValue') {
        console.log("actualValue")
        let squareFeetDataArray = [...state.sqftSelectedList]
        let value = action.value
        let newArr = squareFeetDataArray.findIndex((x: any) => x.key === action.key.key)
        squareFeetDataArray[newArr] = {
            key: action.key.key,
            structuretype: action.key.structuretype,
            Sqftrack: action.key.Sqftrack,
            actualValue: value,
            sqft: (value * action.key.Sqftrack),
            pricepersqft: action.key.pricepersqft,
            price: (value * action.key.Sqftrack) * action.key.pricepersqft
        }
        state.sqftSelectedList = squareFeetDataArray
        return state.sqftSelectedList
    } else if (action.item === 'minimumSqft') {
        let value = action.value
        state.minimumMonthlyBill = {
            pricePerSqft: state.minimumMonthlyBill.pricePerSqft,
            minimumSqft: value,
            monthlyBill: state.minimumMonthlyBill.pricePerSqft * value
        }


    }
}

    const getTotalPrice = (state: any) => {
        let newArr = state.squareFeetTableData.map((x: any) => x.price)
        state.TotalCount = newArr.reduce(function (a: any, b: any) { return a + b; }, 0);
        return state.TotalCount;
    }

    const setSqftTableData = (state: any, action: any) => {
        try {
            let SqftSelectedArray: any = [...state.sqftSelectedList];
            if (action.item === 'add') {
                console.log("add")
                let array = action.array
                let findItem: any = array.find((x: any) => x.key === action.value)
                if (findItem) {
                    SqftSelectedArray.push(findItem)
                }
                state.sqftSelectedList = SqftSelectedArray
            } else if (action.item === 'remove') {
                console.log("remove")
                let value = action.value
                const newData = SqftSelectedArray.filter((item: any) => item.key !== value);
                state.sqftSelectedList = newData
            }

        } catch (ex) {
            console.log("Error in setSqftTableData::" + ex)
        }
    }



    function squareFeetReducerState(state = initialState, action: any) {
        switch (action?.type) {
            case ApiConstants?.API_GET_SQUAREFEET_TABLE_DATA_LOAD:
                return {
                    ...state,
                    squareFeetTableDataOnLoad: true
                }
            case ApiConstants?.API_GET_SQUAREFEET_TABLE_DATA_SUCCESS:
                return {
                    ...state,
                    TotalCount: state.TotalCount,
                    minimumMonthlyBill: state.minimumMonthlyBill,
                    squareFeetTableDataOnLoad: false
                }
            case ApiConstants?.API_SET_SQUAREFEET_TABLE_VALUE_LOAD:
                setPricePerSqft(state, action)
                //getTotalPrice(state)
                return {
                    ...state,
                    TotalCount: state.TotalCount,
                    squareFeetTableValueOnLoad: false
                }
            case ApiConstants?.API_SET_SQUAREFEET_TABLE_DATA_LOAD:
                setSqftTableData(state, action)
                return {
                    ...state,
                    sqftOnLoad: false
                }
            // case ApiConstants?.API_SET_MINIMUM_SQUAREFEET_DATA_LOAD:
            //     setMinimunSqftData(state,action)
            //     return{
            //         ...state,
            //     }

            default:
                return state;
        }
    }

    export default squareFeetReducerState;