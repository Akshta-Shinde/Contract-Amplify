import { Col, Input, Row, Table,Form } from 'antd';
import React,{useState, useEffect} from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import { useDispatch, useSelector } from 'react-redux'
import{optionSelectedData} from '../../../Store/Action/contractAction'


function PerBoxScreen() {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {
        typeId,
        C1

    }: any = useSelector((state: any) => state.contractReducerState);
    const [selectSqftKey, setSelectcfftKey] = useState<any>('')
    const [onLoad, setOnLoad] = useState<any>(false)
    console.log("typeId is", typeId)


    const setRtoPerPiece = (e: any, key: any, item: any) => {
        // console.log("C1 dgtryr optionSelectedData",C1)
        console.log("e.target.value", e.target.value, key, typeId)
        const where = 'contractId=' + 5000 + " and menuId=" + 118 + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }

    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.inwardBoxesForMonth}</div>,
            dataIndex: 'sqft',
            width: 300,
            align:'right',
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
            title: <div className='column-header'>{AppConstants.pricePerBox_}</div>,
            dataIndex: 'Sqftrack',
            align:'right'
        },
        {
            title: <div className='column-header'>{AppConstants.totalPrice}</div>,
            dataIndex: 'pricepersqft',
            align:'right'
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
                <div style={{ marginTop: 20 }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (AppConstants.boxBasedCalculationExampleMonthly)}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={2} align='right'>
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
                    <div className='price-per-box-container'>
                        <Row>
                            <Col span={4}>
                                <div className='price-per-box'>
                                    {AppConstants.pricePerBox}
                                </div>
                            </Col>
                            <Col span={6}>
                                <Input 
                                 type="number"
                                 onChange={(e: any) => setRtoPerPiece(e, "C1", null)}
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
                        <div  style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content1'>(Total Inward Boxes per Month) X (Price Per Box)</div>
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

export default PerBoxScreen;