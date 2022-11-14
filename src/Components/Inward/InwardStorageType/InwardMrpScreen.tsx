import { Col, Input, Row, Table } from 'antd';
import React from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
    optionSelectedData
  } from '../../../Store/Action/contractAction';

function InwardMrpScreen() {
    const dispatch = useDispatch()
    const {
        C1,
        typeId,
        menuId

      }: any = useSelector((state: any) => state.contractReducerState);
    const setPiece = (e: any, key: any, item: any) => {
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }
    
    const columns: any = [
        {
            title:<div className='column-header'>{AppConstants.sku}</div>,
            dataIndex: 'sku',
            width: 200,
            align:"left"
        },
        {
            title:<div className='column-header'>{ AppConstants.skuMrp}</div>,
            dataIndex: 'weightgms',
            align:"right"
        },
        {
            title:<div className='column-header'>{AppConstants.mrpPercentage}</div> ,
            dataIndex: 'weightgms',
            align:"center"
        },
        {
            title:<div className='column-header'>{AppConstants.mrpPrice}</div> ,
            dataIndex: 'weightgms',
            align:"center"
        },
        {
            title:<div className='column-header'>{AppConstants.inwardUnitsPerMonth}</div> ,
            dataIndex: 'avginventorymonth',
            align:"right",
            width: 200,
            render: (item: any) => {
                return (
                    <Input
                        value={item} />
                )
            }
        },
        {
            title:<div className='column-header'>{AppConstants.totalPrice}</div> ,
            dataIndex: 'totalprice',
            align:"right"
        },
    ];

    const data = [
        {
            key: '1',
            sku: 'sku 1',
            weightgms: '450',
            weightslab: "#1",
            avginventorymonth: "60",
            slabprice: '6',
            totalprice: '420'
        },
        {
            key: '2',
            sku: 'sku 1',
            weightgms: '450',
            weightslab: "#1",
            avginventorymonth: "60",
            slabprice: '6',
            totalprice: '420'
        },
        {
            key: '3',
            sku: 'sku 1',
            weightgms: '450',
            weightslab: "#1",
            avginventorymonth: "60",
            slabprice: '6',
            totalprice: '420'
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
                        title={() => (
                            AppConstants.mrpBasedCalculationExample
                        )}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                <Table.Summary.Cell index={1} colSpan={5}  align="right">
                                        <div>{AppConstants.exampleBillAmount}</div>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}  align="right">
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
                    <div className='price-per-mrp-container'>
                        <Row>
                            <Col span={3}>
                                <div className='mrp'>{AppConstants.mrpPercentage}</div>
                            </Col>
                            <Col span={7}>
                                <Input 
                                type="number"
                                onChange={(e: any) => setPiece(e, "C1", null)}
                                value={C1}
                                />
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                    </div>
                    {tableView()}
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div style ={{marginLeft:20}}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content1'>(Inward Units Per Month) X (MRP % Price)</div>
                        </div>
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }
    return (
        <div className='inward-mrp-screen-container'>
            {contentView()}
        </div>
    );
}

export default InwardMrpScreen;