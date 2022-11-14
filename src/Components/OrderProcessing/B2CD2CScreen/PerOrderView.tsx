import React from "react";
import { Row, Col, Input, Table } from "antd";
import AppConstants from "../../../Globals/AppConstants";
import NotesIcon from "../../../Images/NotesIcon";
import { useDispatch, useSelector } from 'react-redux';
import {
  optionSelectedData
} from '../../../Store/Action/contractAction';

function PerOrderView() {
  const {
    typeId,
    C3,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  const dispatch = useDispatch()
  console.log("PerOrderView is",typeId,C3,menuId)

  const setRtoPerPiece = (e: any, key: any, item: any) => {
    console.log("e.target.value", e.target.value, key,typeId)
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
    console.log("where is",where)
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
}

  const columns: any = [
    {
      title: <div className='column-header'>{AppConstants.totalOrdersForMonth}</div>,
      dataIndex: "sqft",
      align:"right",
      width: 300,
      render: (item: any) => {
        return (
          <div >
            <Input value={item} style={{textAlign:'right'}}/>
          </div>
        );
      },
    },
    {
      title: <div className='column-header'>{AppConstants.pricePerOrder}</div>,
      dataIndex: "Sqftrack",
      align: "center"
    },
    {
      title: <div className='column-header'>{AppConstants.totalPrice}</div>,
      dataIndex: "sqft",
      align: "right"
    },
  ];

  const data = [
    {
      key: "1",
      structuretype: "HDR - Pallet",
      Sqftrack: "22.5",
      sqft: "89",
      pricepersqft: "30",
      price: "40589",
    },
  ];

  const pricePerOrder = () => {
    return (
      <div className="price-per-order">
          <div className="weight-slab">{AppConstants.pricePerOrderTxt}</div>
          <Input value={C3}
          type= "number"
          onChange={(e: any) => setRtoPerPiece(e, "C3", null)}/>
      </div>
    );
  };

  const tableView = () => {
    try {
      return (
        <div style={{marginTop:20}}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => AppConstants.orderBasedCalculationMonthly}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={1} colSpan={2} align={"right"}>
                    <div>
                      {AppConstants.exampleBillAmount}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align={"right"}>
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
        <div className='notes-view-container'>
                        <NotesIcon />
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content1'>(Total no of Orders per Month) X (Price Per Order)</div>
                            <div className='note-content'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing <br /> Bill Amount would be charged.</div>
                            <div className='note-content'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly <br /> Bill Amount would be charge</div>
                        </div>
                    </div>
      );
    } catch (ex) {
      console.log("Error in notesView::" + ex);
    }
  };

  return (
    <div className="per-order-view-container">
      {pricePerOrder()}
      {tableView()}
      {notesView()}
    </div>
  );
}

export default PerOrderView;
