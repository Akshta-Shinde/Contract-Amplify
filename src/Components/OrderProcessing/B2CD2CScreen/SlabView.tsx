import { Input, Row, Col, Table, Button } from "antd";
import React,{useState,useEffect} from "react";
import AppConstants from "../../../Globals/AppConstants";
import NotesIcon from "../../../Images/NotesIcon";
import { CloseOutlined , PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { 
  addVolumeTableDataAction, 
  updateTableValuesAction,
  volumnRowData,
  setSlabSelectedAction,
  optionSelectedData
} from '../../../Store/Action/contractAction';


function SlabView() {

  const [count, setCount] = useState(2);
  const dispatch = useDispatch();
  const {
    volumeTableHeaderArray,
    volumeTableDataArray,
    weightGmsTableData,
    addColumnOnLoad,
    additionalTableDataArray,
    C3,
    typeId,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  console.log("weightGmsTableData is",weightGmsTableData)

  useEffect(() => {
    initiatePage()
  }, []);

  const initiatePage = () => {
    const where='5000|'+menuId+'|'+typeId
    dispatch(addVolumeTableDataAction(where))
    dispatch(volumnRowData(where))
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

const boxescolumns: any = [
  {
      title:<div className='col-header'>{AppConstants.weightSlab}</div>,
      dataIndex: '',
      width:400,
      render: (item: any) => {
          return (
            <Input className="weight-slab-input" value={item?.grm} />
          )
      }
  },
  {
      title:<div className='col-header'>{AppConstants.weight}</div>,
      dataIndex: 'price',
      width:200,
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
  {
      key: '3',
      grm: '#1',
      price: '7',
  },

])
  const columns: any = [
    {
      title: <div className='column-header'>{AppConstants.orders}</div>,
      dataIndex: "orders",
      width:350,
      align: "left"
    },
    {
      title: <div className='column-header'>{AppConstants.totalUnits}</div>,
      dataIndex: "totalUnits",
      width:150,
      align: "right"
    },
    {
      title: <div className='column-header'>{AppConstants.fourUnits}</div>,
      dataIndex: "fourUnits",
      width:200,
      align: "right"
    },
    {
      title: <div className='column-header'>{AppConstants.addlUnits}</div>,
      dataIndex: "additionalUnits",
      width:200,
      align: "right"
    },
    {
      title: <div className='column-header'>{AppConstants.price}</div>,
      dataIndex: "price",
      width:200,
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

  // const weightGmsTableView = () => {
  //   try {
  //     return (
  //       // <div className="tableView-container">
  //       //   <div className="weight-grms">{AppConstants.weightGms}</div>
  //       //   <table>
  //       //     <tr>
  //       //       <th>
  //       //         <div className="weight-slab-head">
  //       //           {AppConstants.weightSlab}
  //       //         </div>
  //       //       </th>
  //       //       <th>
  //       //         <div className="weight-head">Weight</div>
  //       //       </th>
  //       //     </tr>
  //       //     <tr>
  //       //       <td>
  //       //         <div className="weight-slab-box">#1</div>
  //       //       </td>
  //       //       <td>
  //       //         <Input />
  //       //       </td>
  //       //     </tr>
  //       //     <tr>
  //       //       <td>
  //       //         <div className="weight-slab-box">#2</div>
  //       //       </td>
  //       //       <td>
  //       //         <Input />
  //       //       </td>
  //       //     </tr>
  //       //     <tr>
  //       //       <td>
  //       //         <div className="weight-slab-box">#3</div>
  //       //       </td>
  //       //       <td>
  //       //         <Input />
  //       //       </td>
  //       //     </tr>
  //       //   </table>
  //       // </div>
  //       <div className='weight-slab-container'>
  //         <Table
  //           bordered
  //           dataSource={dataSource}
  //           columns={boxescolumns}
  //           title={() => (
  //               <div>{AppConstants.weightGms}</div>
  //           )}
  //         />
  //       </div>
  //     );
  //   } catch (ex) {
  //     console.log("Error in weightGmsTableView::" + ex);
  //   }
  // };

  const updateTableValues = (e: any,key: any,subKey: any,index: any) => {
    const actualValue = e?.target?.id
    const split = actualValue!=undefined?actualValue.split('|'):[]
    const updatedvalue = e?.target?.value
    console.log("typeId is",typeId)
    const where ='contractId='+5000+" and "+key+"="+split[1]+ " and RecordNo="+'80'+typeId
    dispatch(updateTableValuesAction(updatedvalue,key,subKey,actualValue,index))
    dispatch(setSlabSelectedAction(where,updatedvalue,key,'A-UX','contractratematrix','matrix'))
  }

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
          value={item} 
          id={'R|'+item}
          type="number"
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

  const updateVolumeValues = (value: any,key: any,subKey: any,index: any,tableType:any) => {
    console.log("eeee tableType",value,key,subKey,value,index,tableType)
    const split =key !=undefined?key.split('|'):[]
    const record =tableType==="additional"?"81":"80"
    const where ='contractId='+5000+" and C1="+split[1]+" and C2="+split[2]+ " and RecordNo="+record+typeId
    console.log("where is",where)
    dispatch(updateTableValuesAction(value,key,subKey,value,index))
    dispatch(setSlabSelectedAction(where,value,"C3",'A-UX','contractratematrix','matrix'))
  }
  
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
  // const orderSlabTableView = () => {
  //   try {
  //     return (
  //       <div className="order-slab-container">
  //           <div className="order-slab">{AppConstants.orderSlab_}</div>
  //           <table>
  //             <colgroup>
  //               <col span={1} />
  //               <col span={1} />
  //               <col span={1} />
  //             </colgroup>

  //             <tr>
  //               <th>
  //                 <Input />
  //               </th>
  //               <th>
  //                 <Input />
  //               </th>
  //               <th>
  //                 <Input />
  //               </th>
  //             </tr>
  //             <tr>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //             </tr>
  //             <tr>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //             </tr>
  //             <tr>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //             </tr>
  //           </table>
  //       </div>
  //     );
  //   } catch (ex) {
  //     console.log("Error in orderSlabTableView::" + ex);
  //   }
  // };

  const setRtoPerPiece = (e: any, key: any, item: any) => {
    console.log("e.target.value", e.target.value, key,typeId)
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
    console.log("where is",where)
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
}

  const uptoUnitsTableView = () => {
    try {
      return (
        <>
          <div className="units-container">
                <div style={{marginLeft:5}}>{AppConstants.upto}</div>
                <Input value={C3}
                type="number"
                onChange={(e: any) => setRtoPerPiece(e, "C3", null)}
                />
                <div className="unit-box">{AppConstants.units}</div>
          </div>
          <div className="weight-gram-table">
             {weightGmsTableView()}
            {orderSlabTableView(volumeTableHeaderArray,volumeTableDataArray,"volume")}
          </div>
          </>
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
              {weightGmsTableView()}
              {orderSlabTableView(volumeTableHeaderArray,additionalTableDataArray,"additional")}
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
        <div style={{marginTop:20}}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => AppConstants.calculationExampleMonthly}
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
                <div className="notes-view-container">
                            <NotesIcon />
                            <div style={{marginLeft:10}}>
                            <div className="notes-title">
                                {AppConstants.monthlyCalculationDetail}
                            </div>
                            <div className="notes-sub-title">Based on the Total No. Of orders Per Month, Orders Slab would be determined.</div>
                            <div className="notes-sub1-title">Price would be determined based on the Upto Units and Weight Slab of each SKU.</div>
                            <div className="slab-content1">
                              <div style={{marginTop:10}}>Each Additional Unit SKU could have different Price based on it's weight. Price would be determined based on the 
                                <br />
                                Weight Slab for each additional unit SKU.
                              </div>
                              <div style={{marginTop:10}}>Total Price Per Order would be calculated as per the following formulae</div>
                            <div style={{marginTop:10}}>(Price for Upto Units) + (Sum of Price for each additional SKU based on it's weight)</div>
                            </div>
                            </div>
                </div>
                <div className="notes-view-container">
                            <NotesIcon />
                            <div className='note-content'>
                              <div>
                              If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing 
                              <br />
                              Bill Amount would be charged.
                              </div>
                              <div style={{marginTop:10}}>
                              If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly 
                              <br />
                              Bill Amount would be charge
                              </div>
                            </div>
                </div>

            </>

        );
    } catch (ex) {
        console.log("Error in notesView::" + ex);
    }
};

  return (
    <div className="slab-view-container">
      {uptoUnitsTableView()}
      {additionalUnitsTableView()}
      {tableView()}
      {notesView()}
    </div>
  );
}

export default SlabView;
