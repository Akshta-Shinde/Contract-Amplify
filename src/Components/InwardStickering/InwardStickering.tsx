import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppConstants from '../../Globals/AppConstants';
import TitleContainer from '../TitleContainer';
import SideMenu from '../Menu/SideMenu';
import "./InwardStickering.scss";
import NotesIcon from '../../Images/NotesIcon';
import Input from 'antd/lib/input/Input';
import {
    Select,
    Radio,
    Row,
    Col,
    Form
} from 'antd';
import NavbarLayout from '../Menu/NavbarLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getContractDetails, updateSelectedData, optionSelectedData } from '../../Store/Action/contractAction'


const { Content } = Layout;

function InwardStickeringScreen() {

    const [value, setValue] = useState();
    const [boxType, boxTypeValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        C1,
        menuId

    }: any = useSelector((state: any) => state.contractReducerState);
    const [onLoad, setOnLoad] = useState<any>(false)

    if (typeId && value === undefined) {
        setValue(typeId)
    }

    useEffect(() => {
        const where = '5000|126|'
        if (typeId) {
            const where = '5000|'+menuId+'|' + typeId
            dispatch(getContractDetails(where, 'A-V'))
        }
        else {
            dispatch(getContractDetails(where, 'A-V'))
        }
    }, [])

    const setRtoPerPiece = (e: any, key: any, item: any) => {
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const onChange = (e: any) => {
        setValue(e.target.value);
        const where = '5000|'+menuId+'|' + e.target.value
        dispatch(updateSelectedData(where, 'A-U', 'contractlineitems'))
    };


    const InwardpricePerSticker = () => {
        try {
            return (
                <div className='price-per-mrp-container'>
                    <div className='mrp'>{AppConstants.pricePerSticker}</div>
                    <Input type='Number'
                        onChange={(e: any) => setRtoPerPiece(e, "C1", null)}
                        value={C1}
                    />
                </div>
            )
        } catch (ex) {
            console.log("Error in ")
        }
    }
    const notApplicableView = () => {
        try {
            return (
                <div className='notes-view-container'>
                    <NotesIcon />
                    <div className="content">
                        {AppConstants.inwardStickeringNotApplicable}
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in Inward Stickering Page")
        }
    }


    const RadioGroupView = () => {
        try {
            return (<div className="Inward-stickering-container">

                <Radio.Group
                    onChange={(e: any) => onChange(e)}
                    value={value}
                >
                    <Radio value={9001}>Applicable</Radio>
                    <Radio value={9002}>Not Applicable</Radio>
                </Radio.Group>
                <div className="price-per-piece-container">
                    {value === 9001 && InwardpricePerSticker()}
                    {value === 9002 && notApplicableView()}
                </div>

            </div>)
        }
        catch (ex) {

        }
    }

    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu
                        selectedKey={AppConstants.inwardStickering}
                        menu={null} />
                    <Content>
                        <TitleContainer
                            title={AppConstants.inwardStickering}
                            screenPath="/customqc"
                            screenPreviousPath="/stickering">
                            {RadioGroupView()}
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    )
}

export default InwardStickeringScreen;