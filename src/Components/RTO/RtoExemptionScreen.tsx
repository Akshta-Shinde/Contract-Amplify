import { Col, Input, Layout, Radio, Row,Form } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import TitleContainer from '../TitleContainer';
import "./RtoScreen.scss";
import { useDispatch, useSelector } from 'react-redux'
import{getContractDetails, updateSelectedData,optionSelectedData,refreshPage} from '../../Store/Action/contractAction'


function RtoExemptionScreen() {

    // const [rtoStorageValue, setRtoStorageValue] = useState();
    const [rtoStorageValue, setRtoStorageValue] = useState();
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        C1,
        menuId

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("vjnfksfs typeId",typeId,menuId)
    if(typeId && value===undefined){
        setValue(typeId)
    }
    useEffect(() => {
        console.log("inside effect")
        const where ='5000|119'
        if(typeId){
            const where='5000|'+menuId+'|'+typeId
            dispatch(getContractDetails(where,'A-V'))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
        }
    }, [])

    const setRtoPerOrder = (e: any, key: any, item: any) => {
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
    }

    const onChange = (e: any) => {
        setValue(e.target.value);
        const where= '5000|'+menuId+'|'+e.target.value
        dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        refreshPage()
    };

    const rtoStorageOnChange = (e: any) => {
        setRtoStorageValue(e.target.value);
    };
    const applicableView = () => {
        try {
            return (
                <div className='price-per-mrp-container'>
                    <div className='exemption-container'>
                        <div>{AppConstants.exemptionOfTotalOrders}</div>
                        <Input 
                         type="number"
                         onChange={(e: any) => setRtoPerOrder(e, "C1", "price")}
                         value={C1}
                        />
                    </div>
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div className='notes-title'>
                            If RTO  exceeds the % Exemption of total orders, the orders above the exemption would be charged.
                        </div>
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in ")
        }
    }
    const notApplicableView = () => {
        try {
            return (
                <div style={{width:500}} className='notes-view-container'>
                    <NotesIcon />
                    <div  className='notes-title'>
                        RTO Exemption is not applicable
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in ")
        }
    }
    const contentView = () => {
        try {
            return (
                <div className="rto-exemption-screen-container">
                    <div className='piece-option-container'>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={4011}>{AppConstants.applicable}</Radio>
                            <Radio value={4010}>{AppConstants.notApplicable}</Radio>
                        </Radio.Group>
                    </div>
                    <div className='price-per-piece-container'>
                        {(value === 4011) && applicableView()}
                        {(value === 4010) && notApplicableView()}
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in ContentView::" + ex);

        }
    }
    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu
                        selectedKey={AppConstants.exemption}
                        openKey={AppConstants.rto}
                        menu={null} />
                    <Content>
                        <TitleContainer>
                            <div className="rto-screen-container">
                                {contentView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default RtoExemptionScreen;