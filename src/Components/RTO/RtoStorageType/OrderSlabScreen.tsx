import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import React, { useState,useEffect } from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../RtoScreen.scss";
import { useDispatch, useSelector } from 'react-redux'
import{optionSelectedData,addVolumeTableDataAction,volumnRowData,
    updateTableValuesAction,
    setSlabSelectedAction
} from '../../../Store/Action/contractAction'

function OrderSlabScreen() {
    const dispatch = useDispatch()
    const {
        typeId,
        C1,
        menuId,
        volumeTableHeaderArray,
        volumeTableDataArray,
        weightGmsTableData,
        additionalTableDataArray

    }: any = useSelector((state: any) => state.contractReducerState);
    console.log("OrderSlabScreen typeId is",typeId,menuId,C1)
    console.log("volumeTableHeaderArray",volumeTableHeaderArray)
    console.log("volumeTableDataArray",volumeTableDataArray)
    console.log("weightGmsTableData",weightGmsTableData)
    console.log("additionalTableDataArray",additionalTableDataArray)

    const [count, setCount] = useState(2);
    useEffect(() => {
        initiatePage()
      }, []);
    
      const initiatePage = () => {
        const where='5000|'+menuId+'|'+typeId
        dispatch(addVolumeTableDataAction(where))
        dispatch(volumnRowData(where))
      }

    const setPrice = (e: any, key: any, item: any) => {
        console.log("C1 dgtryr",C1)
        console.log("e.target.value", e.target.value, typeId)
        const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
    }

    const updateVolumeValues = (value: any,key: any,subKey: any,index: any,tableType:any) => {
        console.log("eeee tableType",value,key,subKey,value,index,tableType)
        const split =key !=undefined?key.split('|'):[]
        const record =tableType==="additional"?"81":"80"
        const where ='contractId='+5000+" and C1="+split[1]+" and C2="+split[2]+ " and RecordNo="+record+typeId
        console.log("where is",where)
        dispatch(updateTableValuesAction(value,key,subKey,value,index))
        dispatch(setSlabSelectedAction(where,value,"C3",'A-UX','contractratematrix','matrix'))
      }
    
      const updateTableValues = (e: any,key: any,subKey: any,index: any) => {
        const actualValue = e?.target?.id
        const split = actualValue!=undefined?actualValue.split('|'):[]
        const updatedvalue = e?.target?.value
        console.log("typeId is",typeId)
        const where ='contractId='+5000+" and "+key+"="+split[1]+ " and RecordNo="+'80'+typeId
        dispatch(updateTableValuesAction(updatedvalue,key,subKey,actualValue,index))
        dispatch(setSlabSelectedAction(where,updatedvalue,key,'A-UX','contractratematrix','matrix'))
      }

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
            width: 300
        },
        {
            title: <div className='column-header'>{AppConstants.totalUnits}</div>,
            dataIndex: "totalUnits",
            align: "right",
            width: 150
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
            align: "right",
            width: 200
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

    const weightslabcolumns: any = [
        {
          title: <div className='col-header'>{AppConstants.weightSlab}</div>,
          dataIndex: 'weightslab',
          render: (weightslab: any) => {
            return (
              // <Input value={weightslab} 
              // className="weight-slab-input" />
              <div
              className="weight-slab-input">{weightslab}</div>
            )
          }
        },
        {
          title: <div className='col-header'>{AppConstants.weight}</div>,
          dataIndex: 'C1',
          render: (item: any,record: any,index: any) => {
            return (
              <Input 
              type="number"
              value={item} 
              id={'R|'+item}
             onChange={(e) => updateTableValues(e,"C1","weightGmsTableData",index)}
              />
            )
          }
        },
        // {
        //   dataIndex: '',
        //   render: (item: any,record: any, index: any) => {
        //     return (
        //       displayButton(index)
        //     )
        //   }
        // },
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
                        dataSource={weightGmsTableData}
                        columns={weightslabcolumns}
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

    // const orderSlabTableView = () => {
    //     try {
    //         return (
    //             <div className="order-slab-container">
    //                 <div className="order-slab">{AppConstants.orderSlab_}</div>
    //                 <table>

    //                     <tr>
    //                         <th>
    //                             <Input />
    //                         </th>
    //                         <th>
    //                             <Input />
    //                         </th>
    //                     </tr>
    //                     <tr>
    //                         <td>
    //                             <Input />
    //                         </td>
    //                         <td>
    //                             <Input />
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td>
    //                             <Input />
    //                         </td>
    //                         <td>
    //                             <Input />
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td>
    //                             <Input />
    //                         </td>
    //                         <td>
    //                             <Input />
    //                         </td>
    //                     </tr>
    //                 </table>
    //             </div>
    //         );
    //     } catch (ex) {
    //         console.log("Error in orderSlabTableView::" + ex);
    //     }
    // };


    const orderSlabTableView = (tableHeaderArray:any,tableDataArray:any,tableType:any) => {
        try {
          return (
            <div className="order-slab-container">
              <div className="tableView-container">
                <div className="order-slab">{AppConstants.volumnDiscountOrder}</div>
                <div
                className="overflow-x-scroll">
                  <table className="volume-custom-table"> 
                    <thead>
                      <tr>
                        {(tableHeaderArray || []).map((value: any, index: any) => {
                          console.log("valuevaluevaluevalue",value)
                          return (
                            <th>
                               
                              <div className="volume-slab-input" id={"C|"+value.T}>
                                  {value.T}
                                  {/* <Input 
                                  onChange={(e: any) => updateTableValues(e.target.value,"title","volumeTableHeaderArray",index)}
                                  style={{minWidth: 80}}
                                  placeholder={"Title "+(index+ 1)}
                                  value={value.t} /> */}
                                 {/* {viewButton(index)} */}
                              </div>
                            </th>
                            
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {(tableDataArray || []).map((data: any,index: any) => {
                          return (
                            <tr>
                              {(Object.keys(data) || []).map((v: any) => {
                                //console.log("data is",data[v],index,data,v)
                                return (
                                  <td className="volume-table-data">
                                    <Input 
                                    type="number"
                                    onChange={(e: any) => updateVolumeValues(e.target.value,v,tableType+"TableDataArray",index,tableType)}
                                    value={data[v]}
                                    id = {v} />
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  {/* <Row>
                    {(array || []).map((item: any,colIndex: any) => {
                      return(
                        <Col>
                          {(item.data || []).map((item: any,rowIndex: any) => {
                            return(
                              <Row>
                                <Col>
                                  <div className="d-flex align-c">
                                    <Input 
                                    style={{minWidth: 80}}
                                    placeholder={"Title "+(colIndex+ 1)} />
                                    {viewButton(colIndex,rowIndex)}
                                  </div>
                                </Col>
                              </Row>
                            )
                          })}
                        </Col>
                      )
                    })}
                  </Row> */}
                </div>
              </div>
            </div>
          )
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
                                <Input 
                                type='number'   
                                    value={C1}
                                    onChange={(e: any) => setPrice(e, "C1", "price")}
                                
                                />
                            </Col>
                            <Col span={19}>
                                <div className="unit-box">{AppConstants.units}</div>
                            </Col>
                        </Row>
                    </div>
                    <div className="weight-gram-table">
                        <div>{weightGmsTableView()}</div>
                        <div>  {orderSlabTableView(volumeTableHeaderArray,volumeTableDataArray,"volume")}</div>
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
                        <div> {orderSlabTableView(volumeTableHeaderArray,additionalTableDataArray,"additional")}</div>
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
                            <div>{AppConstants.totalNoofOrdersMonth}9,200</div>
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
                        <div style={{ marginLeft: 20 }}>
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
                        <div style={{ marginLeft: 20 }}>
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