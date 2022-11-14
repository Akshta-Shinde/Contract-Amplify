import { Col, Layout, Row, Form } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import RadioGroupContainer from '../RadioGroupContainer';
import TitleContainer from '../TitleContainer';
import BoxSlabScreen from './RtoStorageType/BoxSlabScreen';
import PerBoxScreen from './RtoStorageType/PerBoxScreen';
import PerOrderScreen from './RtoStorageType/PerOrderScreen';
import PerPieceScreen from './RtoStorageType/PerPieceScreen';
import PieceSlabScreen from './RtoStorageType/PieceSlabScreen';
import { useDispatch, useSelector } from 'react-redux'
import{getContractDetails, updateSelectedData,refreshPage} from '../../Store/Action/contractAction'

function RtoB2BIndexScreen() {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        menuId,

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("vjnfksfs typeId",typeId)
    if(typeId && value===undefined){
        setValue(typeId)
    }
    useEffect(() => {
        console.log("inside effect")
        const where ='5000|118'
        if(typeId){
            const where='5000|118'+typeId
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
            id: 4007,
            name: AppConstants.perBox
        },
        {
            id: 4008,
            name: AppConstants.perPiece
        },
        {
            id: 4009,
            name: AppConstants.pieceSlab
        },
        {
            id: 4006,
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
                                    RTO B2B Process is not applicable
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
                    {(value === 4007) && <PerBoxScreen/>}
                    {/* {(value === 5) && <BoxSlabScreen/>} */}
                    {(value === 4008) && <PerPieceScreen/>}
                    {(value === 4009) && <PieceSlabScreen/>}
                    {(value === 4006) && notApplicableView()}
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
                        selectedKey={AppConstants.b2B}
                        openKey={AppConstants.rto} 
                        menu={null}/>
                    <Content>
                        <TitleContainer>
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

export default RtoB2BIndexScreen;