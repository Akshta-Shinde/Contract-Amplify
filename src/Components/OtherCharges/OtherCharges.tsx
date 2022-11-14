import { Checkbox, Col, Input, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import AppConstants from '../../Globals/AppConstants';
import OtherChargesLineIcon from '../../Images/OtherChargesLineIcon';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import TitleContainer from '../TitleContainer';
import "./OtherCharges.scss"

function OtherCharges() {
    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const otherChargesList = [
        {
            id: 1,
            otherChargesName: AppConstants.reStickeringCharge,
            price: 10,
            uom: AppConstants.perSticker
        },
        {
            id: 2,
            otherChargesName: AppConstants.rePacking,
            price: 10,
            uom: AppConstants.perOrder
        },
        {
            id: 3,
            otherChargesName: AppConstants.invoiceAndShippingLabelPrintingCharges,
            price: 10,
            uom: AppConstants.perOrder
        },
        {
            id: 4,
            otherChargesName: AppConstants.reQC,
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 5,
            otherChargesName: AppConstants.softwareCharges,
            price: 10,
            uom: AppConstants.perMonth
        },
        {
            id: 6,
            otherChargesName: AppConstants.repairingPerson,
            price: 10,
            uom: AppConstants.perPerson
        },
        {
            id: 7,
            otherChargesName: AppConstants.rtoPerson,
            price: 10,
            uom: AppConstants.perPerson
        },
        {
            id: 8,
            otherChargesName: AppConstants.personAssistingForDelivery,
            price: 10,
            uom: AppConstants.perPerson
        },
        {
            id: 9,
            otherChargesName: AppConstants.productRefurbishment,
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 10,
            otherChargesName: AppConstants.executiveOvertime,
            price: 10,
            uom: AppConstants.perHour
        },
        {
            id: 11,
            otherChargesName: AppConstants.labourerOvertime,
            price: 10,
            uom: AppConstants.perHour
        },
        {
            id: 12,
            otherChargesName: AppConstants.additionalManpower,
            price: 10,
            uom: AppConstants.perDay
        },
        {
            id: 13,
            otherChargesName: AppConstants.serialization,
            price: 10,
            uom: AppConstants.perPiece
        },
        {
            id: 14,
            otherChargesName: AppConstants.internet,
            price: 10,
            uom: AppConstants.perMonth
        },
        {
            id: 15,
            otherChargesName: AppConstants.lifecycleManagementB2C,
            price: 10,
            uom: AppConstants.perPiece
        },
        {
            id: 16,
            otherChargesName: AppConstants.lifecycleManagementB2C,
            subOption:[
                {
                    id: 19,
                    typeName: 'Box',
                },
                {
                    id: 20,
                    typeName: 'Inner Carton',
                },
            ],
            price: 10,
            uom: AppConstants.perPiece
        },
        {
            id: 17,
            otherChargesName: AppConstants.holidayCharges,
            subOption:[
                {
                    id: 21,
                    typeName: 'Govt.Holiday',
                },
                {
                    id: 22,
                    typeName: 'Sundays',
                },
            ],
            price: 10,
            uom: AppConstants.perBox
        },
        {
            id: 18,
            otherChargesName: AppConstants.electricity,
            price: 10,
            uom: AppConstants.perDay
        },
    ]
    const contentView = () =>{
        try{
            return(
                <div className='packaging-material-box'>
                {(otherChargesList || []).map((value: any) => {
                    return (
                        <Row>
                            <Col span={6}>
                                <div className='checkbox-container'>
                                    <Checkbox onChange={onChange}>{value?.otherChargesName}</Checkbox>
                                </div>
                                {value?.subOption &&
                                    <div className='checkbox-container' style={{marginTop:10,display:'flex'}}>
                                        <OtherChargesLineIcon/>
                                        {(value?.subOption || []).map((item: any)=>{
                                            return(
                                                <Checkbox onChange={onChange} style={{marginTop:12}}>{item?.typeName}</Checkbox>
                                            )
                                        })}
                                       
                                    </div>
                                }
                               
                            </Col>
                            <Col span={6}>
                                <div className='price-container'>
                                    <div style={{marginTop:value?.subOption ? 25 : 0}}>
                                        <Input value={value?.price} />
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className='price-container'>
                                    <div style={{marginTop:value?.subOption ? 25 : 0}}>
                                        {value?.uom}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )
                })}

            </div>
            )
        }catch(ex){
            console.log("Error in contentView::"+ex);
        }
    }
    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu
                        selectedKey={AppConstants.otherCharges} 
                        menu={null}/>
                    <Content>
                        <TitleContainer 
                        title={AppConstants.otherCharges}
                        screenPreviousPath="/packaging">
                            <div className='other-charges-container'>
                                {contentView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default OtherCharges;