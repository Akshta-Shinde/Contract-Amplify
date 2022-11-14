import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import { log } from 'console';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AppConstants from '../../../../Globals/AppConstants';
import { isArrayNotEmpty } from '../../../../Globals/Helper';
import NotesIcon from '../../../../Images/NotesIcon';
import { 
  addVolumeTableDataAction 
} from '../../../../Store/Action/contractAction';

function PiecesProcessedScreen() {
  const [count, setCount] = useState(2);
  

  const dispatch = useDispatch();
  const {
    VolumnTableData,
    TableData
  }: any = useSelector((state: any) => state.contractReducerState);
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    //dispatch(addVolumeTableDataAction())
  }, [])

  const handleColumn = () => {
    {
        let newColumn: any = {
          key: columnCount,
          title: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className='col-header' style={{width:100}}><Input /></div>
              <div>{viewButton()}</div>
            </div>
          ),
          dataIndex: '',
          align: 'start',
          render: (item: any) => {
            return(
              <Input 
              value={item.value}/>
            )
          }

      }
        itemColumns.push(newColumn);
      setItemColumn([...itemColumns])
      setColumnCount(columnCount + 1);
  }
}

const [dataItems, setDataItems] = useState<any>([
  {
    key: 1,
    value: 7355,
    title: "Col1"
  },
  {
    key: 2,
    value: 308,
  },

])



const viewButton = () => {

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className='action-container'>
        <Button onClick={handleColumn} className="Add-btn">
          <PlusOutlined />
        </Button>
      </div>
      <div className='action-container'>
        <Button className="delete-btn">
          <CloseOutlined />
        </Button>
      </div>
    </div>
  )

}




const [itemColumns, setItemColumn] = useState<any>([
  {
    title: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className='col-header' style={{width:100}}>5000</div>
        <div>{viewButton()}</div>
      </div>
    ),
    dataIndex: '',
    width: 400,
    render: (item: any) => {
      return (
        <Input style={{width:100}} />
      )
    }
  },
])


const handleAdd = () => {
  const newData: any = {
    key: count,
    grm: '',
    weightslab: `#${count}`,
    price: '',
  };
  const dataValue: any = {
    key: count,
    value: 0
  }
  setDataSource([...dataSource, newData]);
  setDataItems([...dataItems, dataValue]);
  setCount(count + 1);
};

const handleDelete = (key: React.Key) => {
  const newData = dataSource.filter(item => item.key !== key);
  const filterData = dataItems.filter((x: any) => x.key !== key)
  setDataSource(newData);
  setDataItems(filterData)
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
        <Input value={item}  placeholder="Enter"/>
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
              <div>{AppConstants.totalNoofPiecesMonth}9,200/-</div>
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

const AddColumn = () => {
  const newColumn: any = {
    key: columnCount,
    title: <div onClick={AddColumn}><Input /></div>,
    dataIndex: '',
    align: 'start',
    render: (item: any) => {
      return (
        <>
          {(item.data || []).map((x: any) => {
            return (
              <Input />
            )
          })}

        </>
      )
    }

  }
  itemColumns.push(newColumn)
  setItemColumn([...itemColumns])
  setColumnCount(columnCount + 1);
  console.log("newColumn", newColumn, itemColumns)
};

const [columnData, setColumnData] = useState<any>([
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







const orderSlabTableView = () => {
  try {
    return (
      <div className="weight-slab-container">
        <Table
          bordered
          dataSource={dataItems}
          columns={itemColumns}
          title={() => (
            <div>{AppConstants.volumnDiscountOrder}</div>
          )}
        />
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

export default PiecesProcessedScreen;