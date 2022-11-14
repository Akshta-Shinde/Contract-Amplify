import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Input,
    Table,
    Select,
    Button,
    Form,
    message
} from 'antd';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Storage.scss";
import { useDispatch, useSelector } from 'react-redux';
import {
    getSquareFeetTableDataAction,
    setPricePerSqftAction,
    squareFeetSelectAction
} from '../../../Store/Action/squareFeetTableAction';
import { numInIndianFormat } from '../../../Globals/Helper';
import { CloseOutlined } from '@ant-design/icons';
import { getContractDetails, updateSelectedData, optionSelectedData } from '../../../Store/Action/contractAction'

const { Option } = Select;


function SqureFeetView() {

    // const dispatch = useDispatch();
    // const [form] = Form.useForm();
    // const {
    //     squareFeetTableData,
    //     TotalCount,
    //     sqftSelectedList,
    //     minimumMonthlyBill,
    //     sqftOnLoad
    // }: any = useSelector((state: any) => state.squareFeetReducerState);
    // const [selectSqftKey, setSelectSqftKey] = useState<any>('')
    // const [onLoad, setOnLoad] = useState<any>(false)
    // let sqftSelectedListArr: any = sqftSelectedList
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {

        typeId,
        C1,
        C2,
        sqftSelectedList,
        minimumMonthlyBill,
        squareFeetTableData


    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectSqftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    let sqftSelectedListArr: any = sqftSelectedList
    console.log("typeId is", typeId,C1,C2)

    // useEffect(() => {
    //     dispatch(getSquareFeetTableDataAction())
    // }, [])

    

    const setRtoPerPiece = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr optionSelectedData", C2)
        console.log("e.target.value", e.target.value, key, typeId)
        const where = 'contractId=' + 5000 + " and menuId=" + 101 + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const squareFeetSelect = (value: any, item: any, array: any) => {
        form.setFieldsValue({
            [`SelectSQFT`]: null
        })
        dispatch(squareFeetSelectAction(value, item, array))
    }

    const setPricePerSqft = (e: any, item: any, key: any) => {
        console.log("e.target.value", e.target.value, key,item)
        dispatch(setPricePerSqftAction(e.target.value, item, key))
       
       
        
    }

    const getTotalPrice = () => {
        let newArr = sqftSelectedList.map((x: any) => x.price)
        let TotalCount = newArr.reduce(function (a: any, b: any) { return a + b; }, 0);
        if ((minimumMonthlyBill.pricePerSqft * minimumMonthlyBill.minimumSqft)>= TotalCount) {
            return numInIndianFormat(minimumMonthlyBill.pricePerSqft * minimumMonthlyBill.minimumSqft)
        }else if((minimumMonthlyBill.pricePerSqft * minimumMonthlyBill.minimumSqft) < TotalCount) {
            return numInIndianFormat(TotalCount);
        }else{
            return 0
        }

    }



    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.structureType}</div>,
            dataIndex: 'structuretype',
            align: 'left'
        },
        {
            title: <div className='column-header'>{AppConstants.SqfTrack}</div>,
            dataIndex: 'Sqftrack',
            align: 'right'
        },
        {
            title: <div className='column-header'>{AppConstants.actualUsed}</div>,
            dataIndex: 'actualValue',
            align: 'right',
            width: 150,
            render: (item: any, index: any) => {
                return (
                    <Input
                        type="number"
                        onChange={(e: any) => setPricePerSqft(e, 'actualValue', index)}
                        value={item}
                    />
                )
            }
        },
        {
            title: <div className='column-header'>{AppConstants.sqft}</div>,
            dataIndex: '',
            align: 'center',
            render: (item: any, index: any) => {
                return (
                    <div>{item.Sqftrack * item.actualValue}</div>
                )
            }
        },
        {
            title: <div className='column-header'>{AppConstants.pricePerSqft}</div>,
            dataIndex: '',
            align: 'right',
            width: 150,
            render: (item: any, index: any) => {
                return (
                    <div>{numInIndianFormat(minimumMonthlyBill.pricePerSqft)}</div>
                )
            }
        },
        {
            title: <div className='column-header'>{AppConstants.price}</div>,
            dataIndex: '',
            align: 'right',
            render: (item: any, index: any) => {
                return (
                    <div>{numInIndianFormat(item.sqft * (minimumMonthlyBill.pricePerSqft ? minimumMonthlyBill.pricePerSqft : item.pricepersqft))}</div>
                )
            }
        },
        {
            title: <div className='column-header'>{AppConstants.action}</div>,
            dataIndex: '',
            align: 'center',
            render: (item: any) => {
                return (
                    <Button onClick={() => squareFeetSelect(item?.key, "remove", null)} className="delete-btn">
                        <CloseOutlined />
                    </Button>
                )
            }
        },
    ];



    const titleView = () => {
        return (
            <Row>
                <Col span={14}>
                    <div>{AppConstants.calculationExample}</div>
                </Col>
                <Col span={10}>
                    <div className='select-add-btn'>
                        <Form.Item
                            name="SelectSQFT"
                        >
                            <Select
                            placeholder="Select"
                            onChange={(e: any) => setSelectSqftKey(e)}
                        >
                            {(squareFeetTableData || []).map((value: any) => {
                                return (
                                    <Option
                                        key={value?.key}
                                        value={value?.key}
                                        disabled={sqftSelectedListArr.find((x: any) => x.key === value.key)}
                                    >
                                        {value?.structuretype}
                                    </Option>
                                )
                            })}
                        </Select>
                        </Form.Item>
                        
                        <Button 
                        id='form'
                        className='add-btn' 
                        onClick={() => squareFeetSelect(selectSqftKey, "add", squareFeetTableData)}
                        >
                            {AppConstants.add}
                        </Button>
                    </div>
                </Col>
            </Row>
        )

    }

    const tableView = () => {
        try {
            return (
                <div className='table-container'>
                    <Table
                        columns={columns}
                        dataSource={sqftSelectedListArr}
                        bordered
                        title={() =>
                            <Form
                            id='form'
                            form={form}
                            autoComplete="off"
                            noValidate
                            
                        >
                            {titleView()}
                        </Form>
                             }
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={5} align={"right"}>
                                        <div>{AppConstants.exampleBillAmount}</div>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} colSpan={2} align={"left"}>
                                        <div style={{ marginLeft: 65 }}>
                                            {sqftSelectedListArr.length > 0 ? getTotalPrice():0}
                                        </div>
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

    return (
        <div className='square-feet-container'>
            <div className='minimum-monthly-bill-card-container'>
                <Row>
                    <Col span={3}></Col>
                    <Col span={6}>
                        <div className='title'> {AppConstants.priceSqFt}</div>
                    </Col>
                    <Col span={6}>
                        <div className='title'>{AppConstants.minimumSqFt}</div>
                    </Col>
                    <Col span={8}>
                        <div className='title'>{AppConstants.minimumMonthlyBillAmount}</div>
                    </Col>
                </Row>
            </div>
            <div className='minimum-monthly-bill-Value-card-container'>
                <Row>
                    <Col span={3}>
                        <div className='title' style={{ padding: 10 }}>{AppConstants.fixed}</div>
                    </Col>
                    <Col span={6}>
                        <div style={{ padding: 10 }}>
                            <Input
                                type="number"
                                onBlur={()=> message.success({
                                    content: (
                                        <>
                                            <div className='green-box'></div>
                                            <div className='success-msg'>
                                                Price/Sqft Updated Successfully
                                            </div>
                                        </>
                                    ),
                                
                                   
                                })}
                                // onChange={(e: any) => setPricePerSqft(e, "PricePerSqft", null)}
                                // value={minimumMonthlyBill.pricePerSqft}
                                onChange={(e: any) => setRtoPerPiece(e, "C1", null)}
                                value={C1}
                            />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ padding: 10 }}>
                            <Input
                                type="number"
                                // onChange={(e: any) => setPricePerSqft(e, "minimumSqft", null)}
                                // value={minimumMonthlyBill.minimumSqft}
                                onChange={(e: any) => setRtoPerPiece(e, "C2", null)}
                                value={C2}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='total-value' style={{ padding: 10 }}>
                            {numInIndianFormat(C1*C2)}
                        </div>
                    </Col>
                </Row>
            </div>
            {tableView()}
            <div className='notes-view-container'>
                <Row>
                    <Col span={1}>
                        <NotesIcon />
                    </Col>
                    <Col span={23}>
                        <div className='note-content'>
                            If the transaction amount is lesser than the Minimum Monthly Bill Amount then Minimum Monthly Bill Amount would be charged.
                            <br />
                            If the transaction amount is greater than the Minimum Monthly Bill Amount then Transaction Monthly Bill Amount would be charged.
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SqureFeetView;