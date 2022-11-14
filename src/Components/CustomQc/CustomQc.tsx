import React, { useState, useEffect } from "react";
import { Input, Layout, Divider, Radio, Form } from 'antd';
import AppConstants from '../../Globals/AppConstants';
import TitleContainer from '../TitleContainer';
import SideMenu from '../Menu/SideMenu';
import "./CustomQc.scss";
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from "../Menu/NavbarLayout";
import { useDispatch, useSelector } from 'react-redux';
import { getContractDetails, updateSelectedData, optionSelectedData,refreshPage } from '../../Store/Action/contractAction'


const { Content } = Layout;

function CustomQcScreen() {

    const [value, setValue] = useState();
    const [boxType, boxTypeValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        menuId,
        C1,
        C2,
        C3

    }: any = useSelector((state: any) => state.contractReducerState);
    console.log("vjnfksfs typeId", typeId)

    if (typeId && value === undefined) {
        setValue(typeId)
    }
    if (C3 && value === undefined) {
        boxTypeValue(C3)
    }

    useEffect(() => {
        console.log("inside effect", typeId)
        const where = '5000|127|'
        if (typeId) {
            const where = '5000|127|' + typeId
            dispatch(getContractDetails(where, 'A-V'))
        }
        else {
            dispatch(getContractDetails(where, 'A-V'))
        }
    }, [])

    const setRtoPerPiece = (e: any, key: any, item: any) => {
        // console.log("C1 dgtryr optionSelectedData",C1)
        console.log("e.target.value", e.target.value, key, typeId)
        const where = 'contractId=' + 5000 + " and menuId=" + 127 + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const onChange = (e: any) => {
        console.log("sggsgsg", e.target.value)
        setValue(e.target.value);
        const where = '5000|127|' + e.target.value
        console.log("wherewhere", where)
        dispatch(updateSelectedData(where, 'A-U', 'contractlineitems'))
        refreshPage()
    };

    const onChangeset = (e: any, key: any, item: any) => {
        boxTypeValue(e.target.value);
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        console.log("wherewhere", where, e.target.value)
        dispatch(optionSelectedData(where, 'A-UX', 'contractlineitems', key, e.target.value))
    }





    const CustomQcpricePerSticker = () => {
        try {
            return (
                <div className='price-per-mrp-container'>
                    <div className="price-per-box">
                        <div className='mrp'>{AppConstants.customqcpricepersticker}</div>
                        <Input type="number"
                            onChange={(e: any) => setRtoPerPiece(e, "C1", null)}
                            value={C1} />

                    </div>
                    <Divider />
                    <div className="qc-to-perform">
                        <div className='percentage-Qc'>{AppConstants.percentageforqc}</div>
                        <Input type="number"
                            onChange={(e: any) => setRtoPerPiece(e, "C2", null)}
                            value={C2} />
                    </div>
                    <div className="p-box">
                        <Radio.Group
                            onChange={(e: any) => onChangeset(e, "C3", null)}
                            value={boxType}

                        >
                            <Radio value={"PB"}>{AppConstants.perBox}</Radio>

                            <Radio value={"CO"}>{AppConstants.consignment}</Radio>


                        </Radio.Group>
                        {notesView()}
                    </div>
                </div>

            )
        } catch (ex) {
            console.log("Error in CustomQc Page" + ex)
        }
    }
    const notesView = () => {
        try {
            return (
                <div className='notes-view-container'>
                    <NotesIcon />
                    <div className="content">
                        {AppConstants.qcApplNotesView}
                    </div>
                </div>

            )
        }
        catch (ex) {
            console.log("Error in CustomQC" + ex)
        }
    }


    const notApplicableView = () => {
        try {
            return (
                <div className='notes-view-container'>
                    <NotesIcon />
                    <div className="content">
                        {AppConstants.customQCnotApplicable}
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in Custom Qc Page" + ex)
        }
    }


    const RadioGroupView = () => {
        try {
            return (
                <div className="CustomQc-container">
                    <Radio.Group
                        onChange={(e: any) => onChange(e)}
                        value={value}
                    >
                        <Radio value={1100}>Applicable</Radio>
                        <Radio value={1101}>Not Applicable</Radio>
                    </Radio.Group>
                    <div className="price-per-piece-container">
                        {value === 1100 && CustomQcpricePerSticker()}
                        {value === 1101 && notApplicableView()}
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
                        selectedKey={AppConstants.customQC}
                        menu={null} />
                    <Content>
                        <TitleContainer
                            title={AppConstants.customQC}
                            screenPath="/packaging"
                            screenPreviousPath="/inward-stickering">
                            {RadioGroupView()}
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    )
}

export default CustomQcScreen;