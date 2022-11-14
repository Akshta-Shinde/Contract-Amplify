import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import RadioGroupContainer from '../RadioGroupContainer';
import TitleContainer from '../TitleContainer';
import "./Inward.scss";
import InwardBoxScreen from './InwardStorageType/InwardBoxScreen';
import InwardBoxSlabScreen from './InwardStorageType/InwardBoxSlabScreen';
import InwardCftScreen from './InwardStorageType/InwardCftScreen';
import InwardMrpScreen from './InwardStorageType/InwardMrpScreen';
import InwardPieceScreen from './InwardStorageType/InwardPieceScreen';
import InwardPieceSlabIndexScreen from './InwardStorageType/InwardPieceSlabIndexScreen';
import OrderProcessedScreen from './InwardStorageType/PieceSlabView/OrderProcessedScreen'
import { useDispatch, useSelector } from 'react-redux';
import{getContractDetails, updateSelectedData,optionSelectedData,refreshPage} from '../../Store/Action/contractAction'


function InwardIndexScreen() {

    const [value, setValue] = useState();
    const dispatch = useDispatch()
    const {
        typeId,
        menuId
      }: any = useSelector((state: any) => state.contractReducerState);
    console.log("pieceSlabValue is",typeId,menuId)
    const storageInventoryTypes = [
        {
            id: 2001,
            name: AppConstants.piece
        },
        {
            id: 2002,
            name: AppConstants.pieceSlab
        },
        {
            id: 2003,
            name: AppConstants.box
        },
        {
            id: 2004,
            name: AppConstants.boxSlab
        },
        {
            id: 2005,
            name: AppConstants.cft
        },
        {
            id: 2006,
            name: AppConstants.mrp
        },
        {
            id: 2000,
            name: AppConstants.notApplicable
        }
    ]
    if (typeId && value=== undefined) {
        setValue(typeId)
        
    }

    const onChange = (e: any) => {
        setValue(e.target.value)
        const where= '5000|'+menuId+'|'+e.target.value
        dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        refreshPage()
    };

    useEffect(() => {
        const where ='5000|104'
        if(typeId){
            const where='5000|'+menuId+'|'+typeId
            dispatch(getContractDetails(where,'A-V'))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
        }
    }, [])

    const notApplicableView = () => {
        try {
            return (
                <div className='not-applicable-container'>
                     <div className='notes-view-container'>
                        <NotesIcon />
                        <div style ={{marginLeft:20}}>
                            <div  className='notes-title'>Inward Process is not applicable</div>
                        </div>
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in ")
        }
    }

    const contractTypeView = () => {
        try {
            return (
                <RadioGroupContainer
                    options={storageInventoryTypes}
                    handleRadioSelect={onChange}
                    value={value?value:typeId}
                >
                    {(value === 2001) && <InwardPieceScreen/>}
                    {(value === 2002) && <InwardPieceSlabIndexScreen/>}
                    {(value === 2003) && <InwardBoxScreen/>}
                    {(value === 2004) && <OrderProcessedScreen/>}
                    {(value === 2005) && <InwardCftScreen/>}
                    {(value === 2006) && <InwardMrpScreen/>} 
                    {(value === 2000) && notApplicableView()}
                </RadioGroupContainer>
            )
        } catch (ex) {
            console.log("Error in contractTypeView::" + ex)
        }
    }
    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu 
                    selectedKey={AppConstants.inward}
                    menu={null}/>
                    <Content>
                        <TitleContainer
                        title={AppConstants.inward}
                        screenPath="/order-processing"
                        screenPreviousPath="/inventory">
                            <div className="inward-screen-container">
                                {contractTypeView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default InwardIndexScreen;