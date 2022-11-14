import { Col, Layout, Row } from 'antd';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import RadioGroupContainer from '../RadioGroupContainer';
import TitleContainer from '../TitleContainer';
import "./RtoScreen.scss";
import OrderSlabScreen from './RtoStorageType/OrderSlabScreen';
import PerOrderScreen from './RtoStorageType/PerOrderScreen';
import PerPieceScreen from './RtoStorageType/PerPieceScreen';
import PieceSlabScreen from './RtoStorageType/PieceSlabScreen';
import OrderProcessedScreen from '../../Components/Inward/InwardStorageType/PieceSlabView/OrderProcessedScreen';
import { useDispatch, useSelector } from 'react-redux'
import{getContractDetails, updateSelectedData, refreshPage} from '../../Store/Action/contractAction'

const { Content } = Layout;

function RtoIndexScreen() {

    const [value, setValue] = useState();
    const dispatch = useDispatch()
    const {
        typeId,
        C1,
        C2,
        menuId
      }: any = useSelector((state: any) => state.contractReducerState);
      console.log("RtoIndexScreen typeId is",typeId,menuId)

      if(typeId && value===undefined){
        setValue(typeId)
    }
    useEffect(() => {
        console.log("inside effect")
        const where ='5000|117'
        if(typeId){
            const where='5000|'+menuId+'|'+typeId
            dispatch(getContractDetails(where,'A-V'))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
        }
    }, [])

    const onChange = (e: any) => {
        setValue(e.target.value);
        const where= '5000|'+menuId+'|'+e.target.value
        dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        refreshPage()
    };

      
    const storageInventoryTypes = [
        {
            id: 4002,
            name: AppConstants.perOrder
        },
        {
            id: 4003,
            name: AppConstants.orderSlab
        },
        {
            id: 4004,
            name: AppConstants.perPiece
        },
        {
            id: 4005,
            name: AppConstants.pieceSlab
        },
        {
            id: 4001,
            name: AppConstants.notApplicable
        }
    ]

    // const onChange = (e: any) => {
    //     setValue(e.target.value);
    // };

    const notApplicableView = () => {
        try {
            return (
                <div className='not-applicable-container'>
                    <div className='notes-view-container'>
                        <Row>
                            <Col span={1}>
                                <NotesIcon />
                            </Col>
                            <Col span={23}>
                                <div className='notes-title'>
                                    RTO B2C/D2C Process is not applicable
                                </div>
                            </Col>
                        </Row>
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
                    {(value === 4002) && <PerOrderScreen/>}
                    {(value === 4003) && <OrderSlabScreen/>}
                    {(value === 4004) && <PerPieceScreen/>}
                    {(value === 4005) && <PieceSlabScreen/>}
                    {(value === 4001) && notApplicableView()}
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
                        selectedKey={AppConstants.b2Cd2C}
                        openKey={AppConstants.rto} 
                        menu={null}/>
                    <Content>
                        <TitleContainer
                        title={AppConstants.rto}
                        screenPath="/return-b2cd2c"
                        screenPreviousPath="/order-processing">
                            <div className="rto-screen-container">
                                {contractTypeView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default RtoIndexScreen;