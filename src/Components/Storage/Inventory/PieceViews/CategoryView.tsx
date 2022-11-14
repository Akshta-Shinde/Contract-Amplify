import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import AppConstants from '../../../../Globals/AppConstants';
import NotesIcon from '../../../../Images/NotesIcon';
import "../../Storage.scss";
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedData,getContractDetails,optionSelectedData,tableData } from '../../../../Store/Action/contractAction'


function CategoryView() {

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

    const columns: any = [
        {
            title: <div className='column-header'>{AppConstants.sku}</div>,
            dataIndex: 'sku',
            align: "center"
        },
        {
            title: <div className='column-header'>{AppConstants.category}</div>,
            dataIndex: 'category',
            align: "center"
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
            align: "right"

        },
        {
            title: <div className='column-header'>{AppConstants.totalPrice}</div>,
            dataIndex: 'totalprice',
            align: "right"
        },
    ];

    const data = [
        {
            key: '1',
            sku: 'sku 1',
            category: 'category 1',
            avginventorymonth: "60",
            slabprice: '6',
            totalprice: '420'
        },
        {
            key: '2',
            sku: 'sku 1',
            category: 'category 1',
            avginventorymonth: "60",
            slabprice: '6',
            totalprice: '420'
        },
        {
            key: '3',
            sku: 'sku 1',
            category: 'category 1',
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
            title: <div>
                <Select  placeholder={AppConstants.categories}/>
                </div>,
            dataIndex: '',
            width:300,
            render: (item: any) => {
                return (
                    <Input value={item?.grm} />
                )
            }
        },
        {
            title: <div className='col-header'>{AppConstants.priceTxt}</div>,
            dataIndex: 'price',
            width:300,
            render: (item: any) => {
                return (
                    <div className='input-field'>
                        <Input value={item} />
                    </div>
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
            grm: 'Category 1',
            weightslab: '#1',
            price: '7',
        },
        {
            key: '2',
            grm: 'Category 1',
            weightslab: '#2',
            price: '7',
        },
        {
            key: '3',
            grm: 'Category 1',
            weightslab: '#3',
            price: '7',
        },
        {
            key: '4',
            grm: 'Category 1',
            weightslab: '#4',
            price: '7',
        },

    ])

    const categorypriceView = () => {
        try {
            return (
                <div className='weight-slab-table-container'>
                    <Table
                        bordered
                        dataSource={dataSource}
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
                        {categorypriceView()}
                    </div>
                    {tableView()}
                    <div className='notes-view-container'>
                        <NotesIcon />
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content'>{AppConstants.categoryCalInfo}</div>
                        </div>
                    </div>
                </>
            )
        } catch (ex) {
            console.log("Error in contentView::" + ex)
        }
    }
    return (
        <div className='piece-category-screen-container'>
            {contentView()}
        </div>
    );
}

export default CategoryView;