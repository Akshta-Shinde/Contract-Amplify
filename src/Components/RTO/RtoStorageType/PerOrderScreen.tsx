import { Col, Input, Row, Table } from 'antd';
import React from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../RtoScreen.scss";
import { useDispatch, useSelector } from 'react-redux'
import{optionSelectedData} from '../../../Store/Action/contractAction'

function PerOrderScreen() {
    const dispatch = useDispatch()
    const {
        typeId,
        C1,
        menuId

    }: any = useSelector((state: any) => state.contractReducerState);

    const setPrice = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr",C1)
        console.log("e.target.value", e.target.value, typeId)
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
    }
    const columns: any = [
        {
            title:  <div className='column-header'>{AppConstants.totalOrdersForMonth}</div>,
            dataIndex: 'sqft',
            align:'right',
            width: 300,
            render: (item: any) => {
                return (
                    <Input
                        value={item} />
                )
            }
        },
        {
            title: <div className='column-header'>{ AppConstants.pricePerOrder}</div>,
            dataIndex: 'Sqftrack',
            align:"right"
        },
        {
            title:<div className='column-header'>{AppConstants.totalPrice}</div> ,
            dataIndex: 'pricepersqft',
            align:"right"
        },
    ];

    const data = [
        {
            key: '1',
            Sqftrack: '22.5',
            sqft: '899',
            pricepersqft: "38678",
        },
        {
            key: '2',
            Sqftrack: '22.5',
            sqft: '899',
            pricepersqft: "38678",
        },
    ];
    const tableView = () => {
        try {
            return (
                <div style={{marginTop:20}}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (AppConstants.orderBasedCalculationMonthly)}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={2} align="right">
                                        <div>{AppConstants.exampleBillAmount}</div>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} align="right">
                                        <div>78346</div>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </div>
            )
        } catch (ex) {
            console.log("Error in tableView::" + ex)
        }
    }

    const contentView = () => {
        try {
            return (
                <>
                    <div className='price-per-box-container'>
                        <Row>
                            <Col span={5}>
                                <div className='price-per-box'>
                                    {AppConstants.pricePerOrderTxt}
                                </div>
                            </Col>
                            <Col span={6}>
                                <Input 
                                type='number'   
                                value={C1}
                                onChange={(e: any) => setPrice(e, "C1", "price")}
                                />
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                    </div>
                    {tableView()}
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content1'>(Total no of Orders per Month) X (Price Per Order)</div>
                            <div className='note-content'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing Bill Amount would be charged.</div>
                            <div className='note-content'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly Bill Amount would be charge</div>
                        </div>
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }
    return (
        <div className='per-order-screen-container'>
            {contentView()}
        </div>
    );
}

export default PerOrderScreen;