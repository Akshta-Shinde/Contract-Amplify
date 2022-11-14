import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import React, { useState } from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Return.scss";

function OrderSlabScreen() {
    const [count, setCount] = useState(2);

    const handleAdd = () => {
        const newData: any = {
            key: count,
            grm: '',
            weightslab: `#${count}`,
            price: '',
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter(item => item.key !== key);
        setDataSource(newData);
        setCount(count - 1);
    };

    const displayButton = (item: any) => {
        const lastElement: any = dataSource[dataSource.length - 1]
        if (lastElement.key === item?.key) {
          return (
            <div className='action-container'>
              <Button onClick={handleAdd} className="Add-btn">
                <PlusOutlined />
              </Button>
            </div>
          )
        } else { 
          return (
            <div className='action-container'>
              <Button onClick={() => handleDelete(item?.key)} className="delete-btn">
                <CloseOutlined />
              </Button>
            </div>
          )
        }
      }

    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.orders}</div>,
            dataIndex: "orders",
            align: "left",
            width: 250
        },
        {
            title: <div className='column-header'>{AppConstants.totalUnits}</div>,
            dataIndex: "totalUnits",
            align: "right",
            width: 100
        },
        {
            title: <div className='column-header'>{AppConstants.oneUnits}</div>,
            dataIndex: "fourUnits",
            align: "right",
            width: 150
        },
        {
            title: <div className='column-header'>{AppConstants.addlUnits}</div>,
            dataIndex: "additionalUnits",
            align: "center",
            width: 150
        },
        {
            title: <div className='column-header'>{AppConstants.price}</div>,
            dataIndex: "price",
            align: "right"
        },
    ];

    const data = [
        {
            key: "1",
            orders: "HDR - Pallet",
            totalUnits: "22.5",
            fourUnits: "89",
            additionalUnits: "30",
            price: "40589",
        },
        {
            key: "2",
            orders: "HDR - Pallet",
            totalUnits: "22.5",
            fourUnits: "89",
            additionalUnits: "30",
            price: "40589",
        },
        {
            key: "3",
            orders: "HDR - Pallet",
            totalUnits: "22.5",
            fourUnits: "89",
            additionalUnits: "30",
            price: "40589",
        },
    ];

    const boxescolumns: any = [
        {
            title: <div className='col-header'>{AppConstants.weightSlab}</div>,
            dataIndex: '',
            width: 400,
            render: (item: any) => {
                return (
                    <Input value={item?.grm} className="weight-slab-input" />
                )
            }
        },
        {
            title: <div className='col-header'>{AppConstants.weight}</div>,
            dataIndex: 'price',
            width: 200,
            render: (item: any) => {
                return (
                    <Input value={item} />
                )
            }
        },
        {
            dataIndex: '',
            render: (item: any) => {
                return (
                    displayButton(item)
                )
            }
        },
    ]

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            grm: '#1',
            price: '7',
        },
        {
            key: '2',
            grm: '#1',
            price: '7',
        },

    ])

    const weightGmsTableView = () => {
        try {
            return (
                <div className='weight-slab-container'>
                    <Table
                        bordered
                        dataSource={dataSource}
                        columns={boxescolumns}
                        title={() => (
                            <div>{AppConstants.weightGms}</div>
                        )}
                    />
                </div>
            );
        } catch (ex) {
            console.log("Error in weightGmsTableView::" + ex);
        }
    };

    const orderSlabTableView = () => {
        try {
            return (
                <div className="order-slab-container">
                    <div className="order-slab">{AppConstants.orderSlab_}</div>
                    <table>

                        <tr>
                            <th>
                                <Input />
                            </th>
                            <th>
                                <Input />
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <Input />
                            </td>
                            <td>
                                <Input />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input />
                            </td>
                            <td>
                                <Input />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input />
                            </td>
                            <td>
                                <Input />
                            </td>
                        </tr>
                    </table>
                </div>
            );
        } catch (ex) {
            console.log("Error in orderSlabTableView::" + ex);
        }
    };

    const uptoUnitsTableView = () => {
        try {
            return (
                <div>
                    <div className="units-container">
                        <Row>
                            <Col span={1}>
                                <div className="upto-box">{AppConstants.upto}</div>
                            </Col>
                            <Col span={3}>
                                <Input />
                            </Col>
                            <Col span={19}>
                                <div className="unit-box">{AppConstants.units}</div>
                            </Col>
                        </Row>
                    </div>
                    <div className="weight-gram-table">
                        <div>{weightGmsTableView()}</div>
                        <div> {orderSlabTableView()}</div>
                    </div>
                </div>
            );
        } catch (ex) {
            console.log("Error in tableView::" + ex);
        }
    };

    const additionalUnitsTableView = () => {
        try {
            return (
                <div>
                    <div className="additional-units-container">
                        {AppConstants.perAdditionalUnit}
                    </div>
                    <div className="weight-gram-table">
                        <div>{weightGmsTableView()}</div>
                        <div> {orderSlabTableView()}</div>
                    </div>
                </div>
            );
        } catch (ex) {
            console.log("Error in tableView::" + ex);
        }
    };

    const tableView = () => {
        try {
            return (
                <div style={{ marginTop: 20 }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() =>
                        (<div className='table-title-container'>
                            <div>{AppConstants.calculationExampleMonthly}</div>
                            <div>{AppConstants.totalNoofOrdersMonth}9,200/-</div>
                        </div>)}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={1} colSpan={4} align="right">
                                        <div>
                                            {AppConstants.exampleBillAmount}
                                        </div>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} align="right">
                                        <div>78346</div>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </div>
            );
        } catch (ex) {
            console.log("Error in tableView::" + ex);
        }
    };

    const notesView = () => {
        try {
            return (
                <>
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div >
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className="notes-sub-title">Based on the Total No. Of orders Per Month, Orders Slab would be determined.</div>
                            <div className="notes-sub1-title">Price would be determined based on the Upto Units and Weight Slab of each SKU.</div>
                            <div className='note-content'>Each Additional Unit SKU could have different Price based on it's weight. Price would be determined based on the Weight Slab for each additional unit SKU.</div>
                            <div className='note-content'>Total Price Per Order would be calculated as per the following formulae</div>
                            <div className='note-content'>(Price for Upto Units) + (Sum of Price for each additional SKU based on it's weight)</div>
                        </div>
                    </div>
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div>
                            <div className='note-content1'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing Bill Amount would be charged.</div>
                            <div className='note-content1'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly Bill Amount would be charge</div>
                        </div>
                    </div>
                </>

            );
        } catch (ex) {
            console.log("Error in notesView::" + ex);
        }
    };
    const contentView = () => {
        try {
            return (
                <div className='order-slab-screen-container'>
                    {uptoUnitsTableView()}
                    {additionalUnitsTableView()}
                    {tableView()}
                    {notesView()}
                </div>
            )
        } catch (ex) {
            console.log("Error in contentView::" + ex)
        }
    }
    return (
        <div>
            {contentView()}
        </div>

    );
}

export default OrderSlabScreen;