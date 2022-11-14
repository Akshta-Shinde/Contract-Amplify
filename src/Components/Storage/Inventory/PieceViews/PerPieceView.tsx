import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Input,
    Table,
    Form
} from 'antd';
import AppConstants from '../../../../Globals/AppConstants';
import NotesIcon from '../../../../Images/NotesIcon';
import "../../Storage.scss";
import { optionSelectedData } from '../../../../Store/Action/contractAction'

function PerPieceView() {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        C1,
        C2,
        pieceTableData,
        pieceSelectedList

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("typeId is", typeId)

    const setRtoPerPiece = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr optionSelectedData", C2)
        console.log("e.target.value", e.target.value, key, typeId)
        const where = 'contractId=' + 5000 + " and menuId=" + 101 + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.sku}</div>,
            width: 300,
            dataIndex: 'structuretype',
            align: 'left'
        },
        {
            title: <div className='column-header'>{AppConstants.inventoryAvgPerMonth}</div>,
            dataIndex: 'sqft',
            align: "center",
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
            align: 'right'
        },
        {
            title: <div className='column-header'>{AppConstants.totalPrice}</div>,
            dataIndex: 'pricepersqft',
            align: 'right'
        },
    ];

    const data = [
        {
            key: '1',
            structuretype: 'sku1',
            Sqftrack: '30',
            sqft: '899',
            pricepersqft: "38678",
        },
        {
            key: '2',
            structuretype: 'sku1',
            Sqftrack: '30',
            sqft: '899',
            pricepersqft: "38678",
        },
        {
            key: '3',
            structuretype: 'sku1',
            Sqftrack: '30',
            sqft: '899',
            pricepersqft: "38678"
        },
    ];

    const tableView = () => {
        try {
            return (
                <div className='table-container'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (AppConstants.pieceBasedCalculationExample)}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={3} align="right">
                                        <div className='examplebillamount'>{AppConstants.exampleBillAmount}</div>
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
                    <div className='price-per-cft-container'>
                        <Row>
                            <Col span={4}>
                                <div className='price-per-cft'>{AppConstants.pricePerPiece}</div>
                            </Col>
                            <Col span={4}>
                                <div style={{ marginLeft: 15 }}>
                                    <Input
                                        style={{ width: 100 }}
                                        type="number"
                                        onChange={(e: any) => setRtoPerPiece(e, "C1", "piece")}
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
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content'>{AppConstants.calInfo}</div>
                        </div>
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }

    return (
        <>
            {contentView()}
        </>
    );
}

export default PerPieceView;