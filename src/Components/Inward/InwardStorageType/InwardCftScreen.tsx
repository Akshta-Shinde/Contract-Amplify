import { Col, Input, Row, Table } from 'antd';
import React from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
    optionSelectedData
  } from '../../../Store/Action/contractAction';

function InwardCftScreen() {
    const dispatch = useDispatch()
    const {
        C1,
        typeId,
        menuId

      }: any = useSelector((state: any) => state.contractReducerState);
      const setPiece = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr InwardPieceScreen",C1)
        console.log("e.target.value", e.target.value, key,typeId)
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
    }
    console.log("InwardCftScreen C1 is",C1)
    const columns: any = [
        {
            title:<div className='column-header'>{AppConstants.sku}</div> ,
            dataIndex: 'sku',
            width:320,
            align:'left'
        },
        {
            title:<div className='column-header'>{ AppConstants.skuCFT}</div>,
            dataIndex: 'weightgms',
            width:120,
            align:'right'
        },
        {
            title:<div className='column-header'>{ AppConstants.orderedQtyPerMonth}</div>,
            dataIndex: 'avginventorymonth',
            align:'right',
            width: 300,
            render: (item: any) => {
                return (
                    <Input
                        value={item}
                    />
                )
            }
        },
        
        {
            title:<div className='column-header'>{AppConstants.calculatedCFT}</div> ,
            dataIndex: 'weightslab',
            width:200,
            align:'right'
        },
        {
            title:<div className='column-header'>{AppConstants.pricePerCFT}</div> ,
            dataIndex: 'slabprice',
            width:200,
            align:'right'
        },
        {
            title:<div className='column-header'>{AppConstants.price}</div> ,
            dataIndex: 'totalprice',
            width:200,
            align:'right'
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
                            AppConstants.skuBasedCalculationExample
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
                    <div className='price-per-cft-container'>
                        <Row>
                            <Col span={4}>
                                <div className='price-per-cft'>{AppConstants.pricePerCFT}</div>
                            </Col>
                            <Col span={6}>
                                <div style={{marginLeft:15}}>
                                    <Input 
                                    type="number"
                                    onChange={(e: any) => setPiece(e, "C1", null)}
                                    value={C1}
                                    />
                                </div>
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
                            <div className='note-content'>(Calculated CFT) X (Price per CFT)</div>
                        </div>
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }
    return (
        <div className='inward-cft-screen-container'>
            {contentView()}
        </div>
    );
}

export default InwardCftScreen;