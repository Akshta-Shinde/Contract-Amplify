import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppConstants from '../../../../Globals/AppConstants';
import NotesIcon from '../../../../Images/NotesIcon';
import {  
  addVolumeTableDataAction, 
  updateTableValuesAction,
  volumnRowData,
  setSlabSelectedAction
} from '../../../../Store/Action/contractAction';
import "../../Inward.scss";

function OrderProcessedScreen() {

  const dispatch = useDispatch();
  const {
    volumeTableHeaderArray,
    volumeTableDataArray,
    weightGmsTableData,
    addColumnOnLoad,
    pieceSlabValue,
    typeId,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  const [onLoad, setOnLoad] = useState(false)

  console.log("volumeTableDataArray",typeId,menuId)
  console.log("volumeTableHeaderArray",volumeTableHeaderArray)
  useEffect(() => {
    console.log("shshshhshshshs ")
    initiatePage()
  }, []);

  const initiatePage = () => {
    const where='5000|'+menuId+'|'+typeId
    dispatch(addVolumeTableDataAction(where))
    dispatch(volumnRowData(where))
  }

  useEffect(() => {
    if (onLoad === true && addColumnOnLoad === false) {
      //dispatch(getInwardPieceTable())
    }
  }, [onLoad, addColumnOnLoad])

  // const handleAdd = () => {
  //   dispatch(addColumnToTableAction("AddRow"))
  //   const newData: any = {
  //     key: count,
  //     grm: '',
  //     weightslab: `#${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  // const handleDelete = (key: React.Key) => {
  //   const newData = dataSource.filter(item => item.key !== key);
  //   setDataSource(newData);
  //   setCount(count - 1);
  // };


  const displayButton = (index: any) => {
    let lastRow = weightGmsTableData.length - 1 === index;
    if (lastRow) {
      return (
        <div className='action-container'>
          <Button 
          //onClick={() => dispatch(addWightGrmTableDataAction(AppConstants.add))} 
          className="Add-btn">
            <PlusOutlined />
          </Button>
        </div>
      )
    } else {
      return (
        <div className='action-container'>
          <Button 
          //onClick={() => dispatch(addWightGrmTableDataAction(AppConstants.remove,index))} 
          className="delete-btn">
            <CloseOutlined />
          </Button>
        </div>
      )
    }
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
          type = "number"
          onChange={(e) => updateTableValues(e,"C1","weightGmsTableData",index)}/>
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
              <div className='table-title-container'>
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

  const updateTableValues = (e: any,key: any,subKey: any,index: any) => {
    const actualValue = e?.target?.id
    const split = actualValue!=undefined?actualValue.split('|'):[]
    const updatedvalue = e?.target?.value
    console.log("typeId is",typeId)
    const where ='contractId='+5000+" and "+key+"="+split[1]+ " and RecordNo="+'80'+typeId
    dispatch(updateTableValuesAction(updatedvalue,key,subKey,actualValue,index))
    dispatch(setSlabSelectedAction(where,updatedvalue,key,'A-UX','contractratematrix','matrix'))
  }

  const updateVolumeValues = (value: any,key: any,subKey: any,index: any) => {
    console.log("eeee",value,key,subKey,value,index)
    const split =key !=undefined?key.split('|'):[]
    const where ='contractId='+5000+" and C1="+split[1]+" and C2="+split[2]+ " and RecordNo="+'80'+typeId
    dispatch(updateTableValuesAction(value,key,subKey,value,index))
    dispatch(setSlabSelectedAction(where,value,"C3",'A-UX','contractratematrix','matrix'))
  }

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

  const viewButton = (index: any) => {
    let lastColumn = volumeTableHeaderArray.length - 1 === index;
    if (lastColumn) {
      return (
        <div 
        style={{marginLeft: 5}}
        className='action-container'>
          <Button 
            //onClick={() => dispatch(addVolumeTableColumnAction(AppConstants.remove, index))} 
            className="delete-btn">
              <CloseOutlined />
            </Button>
          <Button 
          //onClick={() => dispatch(addVolumeTableColumnAction(AppConstants.add))} 
          className="Add-btn">
            <PlusOutlined />
          </Button>
        </div>
      )
    } else {
      if(index > 0){
        return (
          <div 
          style={{marginLeft: 5}}
          className='action-container'>
            
          </div>
        )
      }
    }
  }

  let array = [
    {
      data: [
        {
          volume: 2000
        },
        {
          volume: 40
        },
        {
          volume: 40
        },
        {
          volume: 40
        },
      ]
    },
    {
      data: [
        {
          volume: 4000
        },
        {
          volume: 40
        },
        {
          volume: 40
        },
        {
          volume: 40
        },
      ]
    }
  ]


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
                                type = "number"
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
        <Row 
        gutter={8}
        className="weight-gram-table">
          <Col span={10}>{weightGmsTableView()}</Col>
          <Col span={14}> {orderSlabTableView()}</Col>
        </Row>
      )
    } catch (ex) {
      console.log("Error in weightSalbView::" + ex)
    }
  }

  const contentView = () => {
    try {
      return (
        <>
          <div style={{ marginTop: 30 }}>
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
    <div className='order-processed-screen-container'>
      {contentView()}
    </div>
  );
}

export default OrderProcessedScreen;

