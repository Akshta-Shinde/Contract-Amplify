import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import React, { useState } from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Inward.scss";
import { 
  addVolumeTableDataAction, 
  updateTableValuesAction,
  volumnRowData,
  setSlabSelectedAction
} from '../../../Store/Action/contractAction';
import { useDispatch, useSelector } from 'react-redux';

function InwardBoxSlabScreen() {
    const [count, setCount] = useState(2);
    const dispatch = useDispatch();
  const {
    volumeTableHeaderArray,
    volumeTableDataArray,
    weightGmsTableData,
    addColumnOnLoad,
    pieceSlabValue,
    typeId
  }: any = useSelector((state: any) => state.contractReducerState);
    

  const handleAdd = () => {
    const newData: any = {
      key: count,
      grm: '',
      weightslab: `#${count}`,
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



  const weightslabcolumns: any = [
    {
      title: <div className='col-header'>{AppConstants.weightSlab}</div>,
      dataIndex: '',
      render: (item: any) => {
        return (
          <Input value={item?.weightslab} className="weight-slab-input" />
        )
      }
    },
    {
      title: <div className='col-header'>{AppConstants.weight}</div>,
      dataIndex: 'grm',
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
      grm: '500',
      weightslab: '#1'
    },
    {
      key: '2',
      grm: '400',
      weightslab: '#2'
    },

  ])





  const columns: any = [
    {
      title: <div className='column-header'>{AppConstants.sku}</div>,
      dataIndex: 'sku',
      align: 'center'
    },
    {
      title: <div className='column-header'>{AppConstants.weightGms}</div>,
      dataIndex: 'weightgms',
      align: 'right'
    },
    {
      title: <div className='column-header'>{AppConstants.weightSlab}</div>,
      dataIndex: 'weightslab',
      align: 'center'
    },
    {
      title: <div className='column-header'>{AppConstants.inventoryMonth}</div>,
      dataIndex: 'avginventorymonth',
      align: 'right',
      width: 200,
      render: (item: any) => {
        return (
          <Input
            value={item} />
        )
      }
    },
    {
      title: <div className='column-header'>{AppConstants.slabPrice}</div>,
      dataIndex: 'slabprice',
      align: 'right'
    },
    {
      title: <div className='column-header'>{AppConstants.totalPrice}</div>,
      dataIndex: 'totalprice',
      align: 'right'
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
        <div className='table-container'>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => (
              <div className='table-title-container'  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>{AppConstants.skuBasedCalculationExampleMonthly}</div>
                <div>{AppConstants.totalNoofOrdersMonth}9,200/-</div>
              </div>
            )}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={2} colSpan={6} align="right">
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

  // const weightGmsTableView = () => {
  //   try {
  //     return (
  //       <div className='weight-slab-container'>
  //         <Table
  //           bordered
  //           dataSource={dataSource}
  //           columns={weightslabcolumns}
  //           title={() => (
  //             <div>{AppConstants.weightGms}</div>
  //           )}
  //         />
  //       </div>
  //     );
  //   } catch (ex) {
  //     console.log("Error in weightGmsTableView::" + ex);
  //   }
  // };

  // const orderSlabTableView = () => {
  //   try {
  //     return (
  //       <div className="order-slab-container">
  //         <div className="tableView-container">
  //           <div className="order-slab">{AppConstants.volumnDiscountBox}</div>
  //           <table>
  //             <colgroup>
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
  //             </tr>
  //             <tr>
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
  //             </tr>
  //             <tr>
  //               <td>
  //                 <Input />
  //               </td>
  //               <td>
  //                 <Input />
  //               </td>
  //             </tr>
  //           </table>
  //         </div>
  //       </div>
  //     );
  //   } catch (ex) {
  //     console.log("Error in orderSlabTableView::" + ex);
  //   }
  // };

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

  const updateVolumeValues = (value: any,key: any,subKey: any,index: any) => {
    console.log("eeee",value,key,subKey,value,index)
    const split =key !=undefined?key.split('|'):[]
    const where ='contractId='+5000+" and C1="+split[1]+" and C2="+split[2]+ " and RecordNo="+'80'+typeId
    dispatch(updateTableValuesAction(value,key,subKey,value,index))
    dispatch(setSlabSelectedAction(where,value,"C3",'A-UX','contractratematrix','matrix'))
  }

  const orderSlabTableView = () => {
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
                    {(volumeTableHeaderArray || []).map((value: any, index: any) => {
                      console.log("valuevaluevaluevalue",value)
                      return (
                        <th id={"C|"+value.T}>
                           
                          <div className="volume-slab-input" >
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
                  {(volumeTableDataArray || []).map((data: any,index: any) => {
                      return (
                        <tr>
                          {(Object.keys(data) || []).map((v: any) => {
                            console.log("data is",data[v],index,data,v)
                            return (
                              <td className="volume-table-data" id = {v} >
                                <Input 
                                type='number'
                                onChange={(e: any) => updateVolumeValues(e.target.value,v,"volumeTableDataArray",index)}
                                value={data[v]}
                                />
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

  const weightVolumnView = () => {
    try {
      return (
        <div className="weight-gram-table">
          <div>{weightGmsTableView()}</div>
          <div> {orderSlabTableView()}</div>
        </div>
      )
    } catch (ex) {
      console.log("Error in weightSalbView::" + ex)
    }
  }

  const contentView = () => {
    try {
      return (
        <>
          <div>
            {weightVolumnView()}
          </div>
          {tableView()}
          <div className='notes-view-container'>
            <NotesIcon />
            <div style={{ marginLeft: 20 }}>
              <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
              <div className='note-content'>(Each SKU for the entire Month) X (Slab Price)</div>
            </div>
          </div>
        </>
      )
    } catch (ex) {
      console.log("Error in contentView::" + ex)
    }
  }
  return (
    <div className='box-slab-screen-container'>
      {contentView()}
    </div>
  );
}

export default InwardBoxSlabScreen;