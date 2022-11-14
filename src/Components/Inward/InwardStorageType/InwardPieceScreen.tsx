import { Col, Input, Row, Table } from 'antd';
import React from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Inward.scss";
import { useDispatch, useSelector } from 'react-redux';
import {
    getContractDetails,
    updateSelectedData,
    optionSelectedData
  } from '../../../Store/Action/contractAction';

function InwardPieceScreen() {
    const dispatch = useDispatch()
    const {
        typeId,
        menuId,
        C1
      }: any = useSelector((state: any) => state.contractReducerState);


    const setPiece = (e: any, key: any, item: any) => {
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }
    
    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.sku}</div>,
            width: 300,
            dataIndex: 'structuretype',
            align: "left"
        },
        {
            title: <div className='column-header'>{AppConstants.inwardQtyPerMonth}</div>,
            dataIndex: 'sqft',
            align: "center",
            width: 200,
            render: (item: any) => {
                return (
                    <Input
                        value={item} />
                )
            }
        },
        {
            title: <div className='column-header'>{AppConstants.pricePerPieceCal}</div>,
            dataIndex: 'Sqftrack',
            align: "right"
        },
        {
            title: <div className='column-header'>{AppConstants.totalPrice}</div>,
            dataIndex: 'pricepersqft',
            align: "right"
        },
    ];

    const data = [
        {
            key: '1',
            structuretype: 'sku1',
            Sqftrack: '22.5',
            sqft: '899',
            pricepersqft: "38678",
        },
        {
            key: '2',
            structuretype: 'sku1',
            Sqftrack: '22.5',
            sqft: '899',
            pricepersqft: "38678",
        },
        {
            key: '3',
            structuretype: 'sku1',
            Sqftrack: '22.5',
            sqft: '899',
            pricepersqft: "38678"
        },
    ];
    const tableView = () => {
        try {
            return (
                <div className='table-container' style={{marginTop:20}}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (AppConstants.pieceBasedCalculationExampleMonthly)}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={3}  align="right">
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
                            <Col span={5}>
                                <div className='price-per-cft'>{AppConstants.pricePerPiece}</div>
                            </Col>
                            <Col span={6}>
                                <div style={{marginLeft:10}}>
                                    <Input 
                                    type="number"
                                    onChange={(e: any) => setPiece(e, "C1", null)}
                                    value={C1} 
                                    />
                                </div>
                            </Col>
                            <Col span={8}>
                            </Col>
                        </Row>
                    </div>
                    {tableView()}
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div style ={{marginLeft:20}}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content'>(Sum of each Sku for entire Month) X (Price per Piece)</div>
                        </div>
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }

    return (
        <div className='inward-piece-screen-container'>
            {contentView()}
        </div>
    );
}

export default InwardPieceScreen;