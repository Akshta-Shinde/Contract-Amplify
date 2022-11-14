import { Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import AppConstants from '../../../Globals/AppConstants';
import "../Inward.scss";
import OrderProcessedScreen from './PieceSlabView/OrderProcessedScreen';
import PiecesProcessedScreen from './PieceSlabView/PiecesProcessedScreen';
import { useDispatch, useSelector } from 'react-redux'
import {optionSelectedData} from "../../../Store/Action/contractAction"
import { TypePredicateKind } from 'typescript';

function InwardPieceSlabIndexScreen() {

    const [pieceSlabValue, setPieceSlabValue] = useState();
    const dispatch = useDispatch();
    const {
        typeId,
        menuId,
        C1
      }: any = useSelector((state: any) => state.contractReducerState);
    

    if(C1 && pieceSlabValue===undefined){
        setPieceSlabValue(C1)
    }

    const PieceSlabOnChange = (e: any) => {
        setPieceSlabValue(e.target.value)
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems","C1",e.target.value))
    };

    const contentView = () => {
        try {
            return (
                <>
                    <div className='piece-option-container'>
                        <Radio.Group onChange={PieceSlabOnChange} value={pieceSlabValue}>
                            <Radio value={'O'}>{AppConstants.orderProcessed}</Radio>
                            <Radio value={'P'}>{AppConstants.pieceProcessed}</Radio>
                        </Radio.Group>
                    </div>
                    <div className='price-per-piece-container'>
                        {(pieceSlabValue === 'O') && <OrderProcessedScreen/>}
                        {(pieceSlabValue === 'P') && <OrderProcessedScreen/>}
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in contentView::" + ex)
        }

    }
    return (
        <div className='piece-slab-screen-container'>
            {contentView()}
        </div>
    );
}

export default InwardPieceSlabIndexScreen;