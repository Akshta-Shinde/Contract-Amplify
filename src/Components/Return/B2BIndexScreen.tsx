import { Col, Layout, Row,Form } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import SideMenu from '../Menu/SideMenu';
import RadioGroupContainer from '../RadioGroupContainer';
import TitleContainer from '../TitleContainer';
import PerBoxScreen from './ReturnStorageType/PerBoxScreen';
import PerPieceScreen from './ReturnStorageType/PerPieceScreen';
import PieceSlabScreen from './ReturnStorageType/PieceSlabScreen';
import "./Return.scss";
import NavbarLayout from '../Menu/NavbarLayout';
import BoxSlabScreen from './ReturnStorageType/BoxSlabScreen';
import InwardPieceSlabIndexScreen from '../Inward/InwardStorageType/InwardPieceSlabIndexScreen';
import { useDispatch, useSelector } from 'react-redux'
import{getContractDetails, updateSelectedData,optionSelectedData,refreshPage} from '../../Store/Action/contractAction'


function B2BIndexScreen() {
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
    console.log("B2BIndexScreen typeId",typeId,C1,onLoad)
    if(typeId && value == undefined){
        setValue(typeId)
    }

    useEffect(() => {
        console.log("inside effect")
        const where ='5000|122'
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
            id: 5007,
            name: AppConstants.perBox
        },
        {
            id: 5008,
            name: AppConstants.perPiece
        },
        {
            id: 5009,
            name: AppConstants.pieceSlab
        },
        {
            id: 5006,
            name: AppConstants.notApplicable
        }
    ]
    // const [returnValue, setReturnValue] = useState();
    // const storageInventoryTypes = [
    //     {
    //         id: 1,
    //         name: AppConstants.perBox
    //     },
    //     {
    //         id: 5,
    //         name: AppConstants.boxSlab
    //     },
    //     {
    //         id: 2,
    //         name: AppConstants.perPiece
    //     },
    //     {
    //         id: 3,
    //         name: AppConstants.pieceSlab
    //     },
    //     {
    //         id: 4,
    //         name: AppConstants.notApplicable
    //     }
    // ]

    // const onChange = (e: any) => {
    //     setReturnValue(e.target.value);
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
                                    Return B2B Process is not applicable
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
                    {(value === 5007) && <PerBoxScreen/>}
                    {/* {(returnValue === 5) && <BoxSlabScreen/>} */}
                    {(value === 5008) && <PerPieceScreen/>}
                    {(value === 5009) && <PieceSlabScreen/>}
                    {(value === 5006) && notApplicableView()}
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
                        openKey={AppConstants.return} 
                        menu={null}/>
                    <Content>
                        <TitleContainer>
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

export default B2BIndexScreen;