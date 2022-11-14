import { Col, Input, Row, Table,Form } from 'antd';
import React,{useState} from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Return.scss";
import { useDispatch, useSelector } from 'react-redux'
import{getContractDetails, updateSelectedData,optionSelectedData} from '../../../Store/Action/contractAction'


function PerPieceScreen() {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        menuId,
        typeId,
        C1

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("PerPieceScreen is", typeId,menuId)

    const setRtoPerPiece = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr optionSelectedData", C1)
        console.log("e.target.value", e.target.value, key, typeId)
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
                <div className="table-Cantainer">
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (AppConstants.pieceBasedCalculationExampleMonthly)}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={3} align='right'>
                                        <div>{AppConstants.exampleBillAmount}</div>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} align='right'>
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
                            <Col span={6}>
                                <div style={{ marginLeft: 15 }}>
                                    <Input 
                                    onChange={(e: any) => setRtoPerPiece(e, "C1", 'price')}
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
                        <div >
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='notes-content1' >(Sum of each Sku for entire Month)X(Price per Piece)</div>
                            <div className='notes-content'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing Bill Amount would be charged.</div>
                            <div className='notes-content'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly Bill Amount would be charge</div>
                        </div>
                    </div>
                </>
            )

        } catch (ex) {
            console.log("Error in cftView::" + ex)
        }
    }
    return (
        <div className='per-piece-screen-container'>
            {contentView()}
        </div>
    );
}

export default PerPieceScreen;