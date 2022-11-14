import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import React, { useState } from 'react';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import "../Return.scss";

function BoxSlabScreen() {
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
        title: <div className='column-header'>{AppConstants.sku}</div>,
        dataIndex: 'sku',
        width: 100,
      },
      {
        title: <div className='column-header'>{AppConstants.weightGms}</div>,
        dataIndex: 'weightgms',
        width: 150,
      },
      {
        title: <div className='column-header'>{AppConstants.weightSlab}</div>,
        dataIndex: 'weightslab',
        width: 150,
      },
      {
        title: <div className='column-header'>{AppConstants.inventoryMonth}</div>,
        dataIndex: 'avginventorymonth',
        align:'right',
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
        width: 200,
        align: "right"
      },
      {
        title: <div className='column-header'>{AppConstants.totalPrice}</div>,
        dataIndex: 'totalprice',
        width: 200,
        align: "right"
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
  
  
    const tableView = () => {
      try {
        return (
          <div style={{ marginTop: 20 }}>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              title={() => (
                <div className='table-title-container'>
                  <div>{AppConstants.skuBasedCalculationExampleMonthly}</div>
                  <div>{AppConstants.totalNoofOrdersMonth}9,7200/-</div>
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
  
  
    const orderSlabTableView = () => {
      try {
        return (
          <div className="order-slab-container">
            <div className="tableView-container">
              <div className="order-slab">{AppConstants.volumnDiscountOrder}</div>
              <table>
                <colgroup>
                  <col span={1} />
                  <col span={1} />
                  <col span={1} />
                </colgroup>
  
                <tr>
                  <th>
                    <Input />
                  </th>
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
                  <td>
                    <Input />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        );
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
            <div style={{ marginTop: 20 }}>
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
      <div className='piece-slab-screen-container'>
        {contentView()}
      </div>
    );
}

export default BoxSlabScreen;