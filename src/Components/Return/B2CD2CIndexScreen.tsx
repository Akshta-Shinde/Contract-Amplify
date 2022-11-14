import { Col, Layout, Row,Form } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import RadioGroupContainer from '../RadioGroupContainer';
import TitleContainer from '../TitleContainer';
import "./Return.scss";
//import OrderSlabScreen from './ReturnStorageType/OrderSlabScreen';
import PerOrderScreen from './ReturnStorageType/PerOrderScreen';
import PerPieceScreen from './ReturnStorageType/PerPieceScreen';
import PieceSlabScreen from './ReturnStorageType/PieceSlabScreen';
import OrderSlabScreen from '../RTO/RtoStorageType/OrderSlabScreen';
import { useDispatch, useSelector } from 'react-redux'
import{getContractDetails, updateSelectedData,optionSelectedData,refreshPage} from '../../Store/Action/contractAction'


function B2CD2CIndexScreen() {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        menuId,
        C1,
        dataLoad
    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("B2CD2CIndexScreen typeId",typeId,C1,onLoad,value)
    
    if(typeId && value == undefined){
        setValue(typeId)
    }
    useEffect(() => {
        const where ='5000|121'
        //dispatch(getContractDetails(where,'A-V'))
        if(typeId){
            const where='5000|'+menuId+'|'+typeId
            dispatch(getContractDetails(where,'A-V'))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
        }
        
    }, [])

    const onChange = (e: any) => {
        console.log("sggsgsg",e.target.value)
        setValue(e.target.value);
        const where= '5000|'+menuId+'|'+e.target.value
        console.log("wherewhere",where)
        dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        refreshPage()
    };
    const storageInventoryTypes = [
        {
            id: 5002,
            name: AppConstants.perOrder
        },
        {
            id: 5003,
            name: AppConstants.orderSlab
        },
        {
            id: 5004,
            name: AppConstants.perPiece
        },
        {
            id: 5005,
            name: AppConstants.pieceSlab
        },
        {
            id: 5001,
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
                                <div  className='notes-title'>
                                    Return B2C/D2C Process is not applicable
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
                    {(value === 5002) && <PerOrderScreen/>}
                    {(value === 5003) && <OrderSlabScreen/>}
                    {(value === 5004) && <PerPieceScreen/>}
                    {(value === 5005) && <PieceSlabScreen/>}
                    {(value === 5001) && notApplicableView()}
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
                        openKey={AppConstants.return} 
                        menu={null}/>
                    <Content>
                        <TitleContainer 
                        title={AppConstants.return}
                        screenPath="/loading"
                        screenPreviousPath="/rto-b2cd2c"
                        >
                            <div className="return-screen-container">
                                {contractTypeView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default B2CD2CIndexScreen;