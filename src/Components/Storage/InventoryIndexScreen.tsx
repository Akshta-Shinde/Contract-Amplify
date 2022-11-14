import { Col, Divider, Input, Layout, Radio, Row, Space, Table,Form } from 'antd';
import { text } from 'stream/consumers';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import SideMenu from '../Menu/SideMenu';
import RadioGroupContainer from '../RadioGroupContainer';
import TitleContainer from '../TitleContainer';
import CFTView from './Inventory/CFTView';
import SqureFeetView from './Inventory/SqureFeetView';
import PieceIndexScreen from './Inventory/PieceIndexScreen';
import "./Storage.scss";
import NavbarLayout from '../Menu/NavbarLayout';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{getContractDetails, updateSelectedData,refreshPage} from '../../Store/Action/contractAction'


const { Content } = Layout;

function InventoryIndexScreen() {

    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        C1,
        C2

    }: any = useSelector((state: any) => state.contractReducerState);

    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("vjnfksfs typeId",C2)

    if(typeId && value===undefined){
        console.log("type od",typeof typeId)
        setValue(typeId)
    }

    useEffect(() => {
        console.log("inside effect")
        const where ='5000|101'

        if(typeId){
            const where='5000|101'+typeId
            dispatch(getContractDetails(where,'A-V'))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
        }
    }, [])

    const onChange = (e: any) => {
        console.log("sggsgsg",e.target.value)
        setValue(e.target.value);
        const where= '5000|101|'+e.target.value
        console.log("wherewhere",where)
        dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        refreshPage()
    };

    const storageInventoryTypes = [
        {
            id: 1001,
            name: AppConstants.squareFeet
        },
        {
            id: 1002,
            name: AppConstants.cft
        },
        {
            id: 1003,
            name: AppConstants.piece
        },
        {
            id: 1000,
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
                                    Storage Inventory is not applicable
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
                    value={value}
                >
                    {(value === 1001) && <SqureFeetView/>}
                    {(value === 1002) && <CFTView/>}
                    {(value === 1003) && <PieceIndexScreen />}
                    {(value === 1000) && notApplicableView()}
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
                    selectedKey={AppConstants.inventory}
                    openKey={AppConstants.storage}
                    menu={null}/>
                    <Content>
                        <TitleContainer
                        title={AppConstants.inventory}
                        screenPath="/inward"
                        screenPreviousPath="/warehouse">
                            <div className="inventory-screen-container">
                                {contractTypeView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default InventoryIndexScreen;