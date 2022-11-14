import React, { useState } from 'react';
import {
    Row,
    Col,
    Input,
    Table,
    Radio,
    Divider,
    Form
} from 'antd';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Storage.scss";
import { useDispatch, useSelector } from 'react-redux';
import { optionSelectedData } from '../../../Store/Action/contractAction'


function CFTView() {
    const [cftValue, setCftValue] = useState(1);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        C1,
        C2,
        cftTableData,
        menuId

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("typeId is", typeId)


    const setRtoPerPiece = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr optionSelectedData", C2)
        console.log("e.target.value", e.target.value, key, typeId,typeof e.target.value)
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const columns: any = [
        {
            title: <div className='column-header'>{(C2 == "R") ? AppConstants.skuBased : AppConstants.structureType}</div>,
            dataIndex: 'structuretype',
            align: "left",
            width: 200,
        },
        {
            title: <div className='column-header'>{(C2 == "S") ? AppConstants.cftTrack : AppConstants.cft}</div>,
            dataIndex: 'Sqftrack',
            align: "right",
            width: 150,
        },
        {
            title: <div className='column-header'>{(C2 == "R") ? AppConstants.inventory : AppConstants.actualUsed}</div>,
            dataIndex: 'sqft',
            align: "right",
            width: 150,
            render: (item: any) => {
                return (
                    <div className='input-field'>
                        <Input
                            value={item} />
                    </div>
                )
            }
        },
        {
            title: <div className='column-header'>{AppConstants.totalCft}</div>,
            dataIndex: 'sqft',
            align: "right",
            width: 120,
        },
        {
            title: <div className='column-header'>{(C2 == "R") ? AppConstants.pricePerCft : AppConstants.pricePerSku}</div>,
            dataIndex: 'pricepersqft',
            align: "right",
            width: 120,
        },
        {
            title: <div className='column-header'>{AppConstants.price}</div>,
            dataIndex: 'price',
            align: "right",
            width: 120,
        },
    ];

    const data = [
        {
            key: '1',
            structuretype: 'HDR - Pallet',
            Sqftrack: '22.5',
            sqft: '89',
            pricepersqft: "30",
            price: "40589"
        },
        {
            key: '2',
            structuretype: 'HDR - Pallet',
            Sqftrack: '22.5',
            sqft: '89',
            pricepersqft: "30",
            price: "40589"
        },
        {
            key: '3',
            structuretype: 'HDR - Pallet',
            Sqftrack: '22.5',
            sqft: '89',
            pricepersqft: "30",
            price: "40589"
        },
    ];

    const cftOnChange = (e: any) => {
        setCftValue(e.target.value);
    };

    const tableView = () => {
        try {
            return (
                <div className='table-container'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => AppConstants.rackBasedCalculationExample}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={5} align="right">
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
                <div className='cft-container'>
                    <div className='price-per-cft-container'>
                        <Row>
                            <Col span={4}>
                                <div className='price-per-cft'>{AppConstants.pricePerCFT}</div>
                            </Col>
                            <Col span={3}>
                                <div style={{ marginLeft: 10 }}>
                                    <Input
                                        type="number"
                                        onChange={(e: any) => setRtoPerPiece(e, "C1", null)}
                                        value={C1}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='rack-sku-option'>
                                    <Radio.Group onChange={(e: any) => setRtoPerPiece(e, 'C2', null)} value={C2}>
                                        <Radio value={"R"}>{AppConstants.rack}</Radio>
                                        <Radio value={"S"}>{AppConstants.sku}</Radio>
                                    </Radio.Group>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {tableView()}
                    <div className='notes-view-container'>
                        {(cftValue === 1) &&
                            <>
                                <NotesIcon />
                                <div style={{ marginLeft: 20 }}>
                                    <div className='notes-title' style={{ marginLeft: 30 }}>
                                        {AppConstants.monthlyCalculationDetailForActualUsed}
                                    </div>
                                    <Row>
                                        <Col span={6}>
                                            <div className='details-container'>
                                                <div className='details-info'>
                                                    <div className='week-heading'>{AppConstants.week1}</div>
                                                    <div className='info'>
                                                        {AppConstants.week1Info}
                                                    </div>
                                                </div>
                                                <Divider type="vertical" />

                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className='details-container'>
                                                <div className='details-info'>
                                                    <div className='week-heading'>{AppConstants.week2}</div>
                                                    <div className='info'>
                                                        {AppConstants.week2Info}
                                                    </div>
                                                </div>
                                                <Divider type="vertical" />

                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className='details-container'>
                                                <div className='details-info'>
                                                    <div className='week-heading'>{AppConstants.week3}</div>
                                                    <div className='info'>
                                                        {AppConstants.week3Info}
                                                    </div>
                                                </div>
                                                <Divider type="vertical" />

                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className='details-container'>
                                                <div className='details-info'>
                                                    <div className='week-heading'>{AppConstants.week4}</div>
                                                    <div className='info'>
                                                        {AppConstants.week4Info}
                                                    </div>
                                                </div>

                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='notes-title' style={{ marginBottom: 5, marginTop: 5 }}>Sum of (Week 1 + Week 2 + Week 3 + Week 4) / 4 to get Actual Used Per Month.</div>
                                </div>
                            </>
                        }
                        {(cftValue === 2) &&
                            <>
                                <NotesIcon />
                                <div style={{ marginLeft: 20 }}>
                                    <div className='notes-title'>{AppConstants.monthlyCalculationDetailForInventory}</div>
                                    <div className='note-content'>{AppConstants.calDetails}</div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }

    return (
        <>{contentView()}</>
    );
}

export default CFTView;