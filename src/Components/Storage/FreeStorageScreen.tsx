import { Col, Input, Layout, Radio, Row,Form } from 'antd';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NotesIcon from '../../Images/NotesIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import TitleContainer from '../TitleContainer';
import { useDispatch, useSelector } from 'react-redux';
import{getContractDetails, updateSelectedData,optionSelectedData,refreshPage} from '../../Store/Action/contractAction'
import "./Storage.scss";



const { Content } = Layout;

function FreeStorageScreen() {

    // const [freeStorageValue, setFreeStorageValue] = useState();
    const [freeStorageValue, setFreeStorageValue] = useState();
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

       
    if (typeId && value === undefined) {
        setValue(typeId)
    }
    useEffect(() => {
        console.log("inside effect")
        const where = '5000|103'
        if (typeId) {
            const where = '5000|103' + typeId
            dispatch(getContractDetails(where, 'A-V'))
        }
        else {
            dispatch(getContractDetails(where, 'A-V'))
        }
    }, [])

    const setRtoPerOrder = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr",C1)
        console.log("e.target.value", e.target.value, typeId)
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
    }

    const onChange = (e: any) => {
        console.log("sggsgsg", e.target.value)
        setValue(e.target.value);
        const where = '5000|'+menuId+'|' + e.target.value
        //const where ='contractId='+5000+" and menuId="+117
        console.log("wherewhere", where)
        dispatch(updateSelectedData(where, 'A-U', 'contractlineitems'))
        refreshPage()
    };

    const freeStorageOnChange = (e: any) => {
        setFreeStorageValue(e.target.value);
    };
    const applicableView = () => {
        try {
            return (
                <div className='price-per-mrp-container'>
                    <div className='free-storage-container'>
                        <div className='mrp'>{AppConstants.freeStorage}</div>
                        <Input value={C1}
                        type="number"
                        
                        onChange={(e: any) => setRtoPerOrder(e, "C1", null)}

                        />
                        <div className='days'>{AppConstants.days}</div>
                    </div>
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div className='notes-title'>
                            30 days for every new inward
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
                <div className='price-per-mrp-container'>
                   <div className='notes-view-container'>
                        <NotesIcon />
                        <div className='notes-title'>
                            Free Storage is not applicable
                        </div>
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
                <>
                    <div className='piece-option-container'>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1005}>{AppConstants.applicable}</Radio>
                            <Radio value={1006}>{AppConstants.notApplicable}</Radio>
                        </Radio.Group>
                    </div>
                    <div className='price-per-piece-container'>
                        {(value === 1005) && applicableView()}
                        {(value === 1006) && notApplicableView()}
                    </div>
                </>
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
                        selectedKey={AppConstants.freeStorage}
                        openKey={AppConstants.storage}
                        menu={null} />
                    <Content>
                        <TitleContainer
                            title={AppConstants.freeStorage}>
                            <div className='free-storage-screen-container'>
                                {contentView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default FreeStorageScreen;