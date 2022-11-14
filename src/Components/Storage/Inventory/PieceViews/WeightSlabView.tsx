import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Table } from 'antd';
import React, { useState,useEffect} from 'react';
import AppConstants from '../../../../Globals/AppConstants';
import NotesIcon from '../../../../Images/NotesIcon';
import "../../Storage.scss";
import { useDispatch, useSelector } from 'react-redux';
import { 
    addVolumeTableDataAction, 
    updateTableValuesAction,
    volumnRowData,
    setSlabSelectedAction,
    tableData
  } from '../../../../Store/Action/contractAction';

function WeightSlabView() {
    const [count, setCount] = useState(2);
    const dispatch = useDispatch();
    const {
        weightGmsTableData,
        typeId,
        menuId
      }: any = useSelector((state: any) => state.contractReducerState);

      const [onLoad, setOnLoad] = useState(false)
      console.log("WeightSlabView",typeId,menuId)
      console.log("weightGmsTableData",weightGmsTableData)
    //   console.log("volumeTableDataArray",volumeTableDataArray)
    //   console.log("volumeTableHeaderArray",volumeTableHeaderArray)
    //   useEffect(() => {
    //     const where='5000|'+menuId+'|'+typeId
    //     if(onLoad){
    //         dispatch(tableData(where))
    //     }
        
    //   }, []);

    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.sku}</div>,
            dataIndex: 'sku',
            align: "center"
        },
        {
            title: <div className='column-header'>{AppConstants.weightGms}</div>,
            dataIndex: 'weightgms',
            align: "right"

        },
        {
            title: <div className='column-header'>{AppConstants.weightSlab}</div>,
            dataIndex: 'weightslab',
            align: 'center'
        },
        {
            title: <div className='column-header'>{AppConstants.avgInventoryMonth}</div>,
            dataIndex: 'avginventorymonth',
            align: "right",
            width: 200,
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

    const weightslabcolumns: any = [
        {
            title: <div className='col-header'>
                    {AppConstants.weightSlabGms}
                </div>,
            dataIndex: '',
            width:500,
            render: (item: any) => {
                console.log("item is",item)
                return (
                    <div className='weight-slab-table-container'>
                        <Row>
                            <Col span={4}>
                                <div className='weight-slab'>
                                    {item?.weightslab}
                                </div>
                            </Col>
                            <Col span={20}>
                                <Input value={item?.W} />
                            </Col>
                        </Row>
                    </div>
                )
            }
        },
        {
            title: <div className='col-header'>{AppConstants.priceTxt}</div>,
            dataIndex: 'T',
            width:300,
            render: (item: any) => {
                return (
                    <Input value={item} />
                )
            }
        },
        // {
        //     dataIndex: '',
        //     render: (item: any) => {
        //         return (
        //             displayButton(item)
        //         )
        //     }
        // },
    ]

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            grm: '500',
            weightslab: '#1',
            price: '7',
        },
        {
            key: '2',
            grm: '400',
            weightslab: '#2',
            price: '7',
        },
        {
            key: '3',
            grm: '400',
            weightslab: '#3',
            price: '7',
        },
        {
            key: '4',
            grm: '400',
            weightslab: '#4',
            price: '7',
        },

    ])

    const tableView = () => {
        try {
            return (
                <div className='table-container'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (AppConstants.skuBasedCalculationExampleMonthly)}
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
    const weightSalbView = () => {
        try {
            return (
                <div className='weight-slab-table-container'>
                    <Table
                        bordered
                        dataSource={weightGmsTableData}
                        columns={weightslabcolumns}
                    />
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
                    <div className='weight-slab-container'>
                        {weightSalbView()}
                    </div>
                    {tableView()}
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content'>{AppConstants.monthlyCalInfo}</div>
                        </div>
                    </div>
                </>
            )
        } catch (ex) {
            console.log("Error in contentView::" + ex)
        }
    }

    return (
        <div className='piece-weight-slab-screen-container'>
            {contentView()}
        </div>
    );
}

export default WeightSlabView;