import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppConstants from '../../Globals/AppConstants';
import TitleContainer from '../TitleContainer';
import SideMenu from '../Menu/SideMenu';
import "./StickeringScreen.scss";
import NotesIcon from '../../Images/NotesIcon';
import Input from 'antd/lib/input/Input';
import {
    Radio,
    Row,
    Col,
    Form
} from 'antd';
import NavbarLayout from '../Menu/NavbarLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getContractDetails, updateSelectedData, optionSelectedData } from '../../Store/Action/contractAction'


const { Content } = Layout;

function StickeringScreen() {

    const [value, setValue] = useState();
    const [boxType, boxTypeValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        menuId,
        C1,
        C2,
    }: any = useSelector((state: any) => state.contractReducerState);
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("vjnfksfs typeId", typeId)

    if (typeId && value === undefined) {
        setValue(typeId)
    }
    if (C2 && boxType === undefined) {
        boxTypeValue(C2)
    }

    useEffect(() => {
        console.log("inside effect", typeId)
        const where = '5000|125|'
        if (typeId) {
            const where = '5000|125|' + typeId
            dispatch(getContractDetails(where, 'A-V'))
        }
        else {
            dispatch(getContractDetails(where, 'A-V'))
        }
    }, [])

    const setRtoPerPiece = (e: any, key: any, item: any) => {
        // console.log("C1 dgtryr optionSelectedData",C1)
        console.log("e.target.value", e.target.value, key, typeId)
        const where = 'contractId=' + 5000 + " and menuId=" + 125 + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const onChange = (e: any) => {
        console.log("sggsgsg", e.target.value)
        setValue(e.target.value);
        const where = '5000|125|' + e.target.value
        console.log("wherewhere", where)
        dispatch(updateSelectedData(where, 'A-U', 'contractlineitems'))
    };

    const onChangeset = (e: any, key: any, item: any) => {
        boxTypeValue(e.target.value);
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        console.log("wherewhere", where, e.target.value)
        dispatch(optionSelectedData(where, 'A-UX', 'contractlineitems', key, e.target.value))
    }



    const pricePerSticker = () => {
        try {
            return (
                <div className="select-container">
                    <div className='title-input-container'>
                        <div className="title">
                            {AppConstants.pricepersticker}
                        </div>
                        <div className="input">
                            <Input
                                onChange={(e: any) => onChangeset(e, "C1", 'Price')}
                                value={C1}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="skus-selection">
                        <Radio.Group
                            onChange={(e: any) => onChangeset(e, "C2", null)}
                            value={boxType}
                        >
                            <Radio value={"AS"}>{AppConstants.allskus}</Radio>
                            <Radio value={"PS"}>{AppConstants.partialskus}</Radio>
                        </Radio.Group>
                    </div>




                </div>
            )
        }
        catch (ex) {
            console.log("Error in pricePerSticker::" + ex)
        }
    }

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
                                <div className="not-applicable-font">
                                    Stickering Not applicable
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in Stickering Page")
        }
    }

    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu
                        selectedKey={AppConstants.stickering}
                        menu={null} />
                    <Content>
                        <TitleContainer
                            title={AppConstants.stickering}
                            screenPath="/inward-stickering"
                            screenPreviousPath="/unloading">
                            <div className="stickering-container">

                                <Radio.Group
                                    onChange={(e: any) => onChange(e)}
                                    value={value}
                                >
                                    <Radio value={8001}>{AppConstants.applicable}</Radio>
                                    <Radio value={8002}>{AppConstants.notApplicable}</Radio>
                                </Radio.Group>
                                <div className="price-per-piece-container">
                                    {value === 8001 && pricePerSticker()}
                                    {value === 8002 && notApplicableView()}
                                </div>

                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>

    )
}

export default StickeringScreen;