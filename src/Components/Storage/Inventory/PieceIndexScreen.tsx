import { Col, Input, Radio, Row, Table, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import PerPieceView from './PieceViews/PerPieceView';
import "../Storage.scss";
import CategoryView from './PieceViews/CategoryView';
import WeightSlabView from './PieceViews/WeightSlabView';
import { updateSelectedData,getContractDetails,optionSelectedData,tableData } from '../../../Store/Action/contractAction'

function PieceIndexScreen() {
    
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        menuId,
        C2

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log(" storage PieceIndexScreen typeId",typeId,menuId,C2)
    if(C2 && value===undefined){
        setValue(C2)
    }

    useEffect(() => {
        console.log("inside effect")
        const where ='5000|101'
        if(typeId){
            const where='5000|101|'+typeId
            dispatch(getContractDetails(where,'A-V'))
            dispatch(tableData(where))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
            dispatch(tableData(where))
        }
    }, [])

    const onChange =(e: any, key: any, item: any) => {
        console.log("onChange",e.target.value)
        setValue(e.target.value);
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        //dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    };
    
    const contentView = () => {
        try {
            return (
                <>
                    <div className='piece-option-container'>
                        <Radio.Group 
                        onChange={(e: any) => onChange(e, "C2", null)}
                        value={value}>
                            <Radio value={"PI"}>{AppConstants.perPiece}</Radio>
                            <Radio value={"W"}>{AppConstants.chargableWeightSlab}</Radio>
                            <Radio value={"C"}>{AppConstants.category}</Radio>
                        </Radio.Group>
                    </div>
                    <div className='price-per-piece-container'>
                        {(value === "PI") && <PerPieceView/>}
                        {(value === "W") && <WeightSlabView/>}
                        {(value === "C") && <CategoryView/>}
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in contentView::" + ex)
        }

    }

    return (
        <div className='piece-screen-container'>
            {contentView()}
        </div>
    );
}

export default PieceIndexScreen;