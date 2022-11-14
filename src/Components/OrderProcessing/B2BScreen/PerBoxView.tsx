import React, { useState } from "react";
import { Row, Col, Input, Table } from "antd";
import AppConstants from "../../../Globals/AppConstants";
import NotesIcon from "../../../Images/NotesIcon";
import { useDispatch, useSelector } from 'react-redux';
import {
  optionSelectedData
} from '../../../Store/Action/contractAction';

function PerBoxView() {
  const dispatch = useDispatch()
  const {
    typeId,
    C3,
    C4,C5,
    C1,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  console.log("PerBoxView is ",typeId,C3,C4,C1)
  const [boxValue,setBoxValue] = useState()
  const [boxKey,setBoxKey] = useState('')

  if(C3 && boxValue === undefined){
    console.log("boxx c3",C3)
    setBoxValue(C3)
    setBoxKey("C3")

  }
  else if(C1 && boxValue === undefined){
    console.log("boxx c1",C1)
    setBoxValue(C1)
    setBoxKey("C1")
  }

  const setPiece = (e: any, key: any, item: any) => {
    const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
    setBoxValue(e.target.value)
    dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
  }

  const columns: any = [
    {
      title: <div className='column-header'>{AppConstants.inwardBoxesForMonth}</div>,
      dataIndex: "sqft",
      align:"right",
      width: 300,
      render: (item: any) => {
        return (
            <Input value={item} />
        );
      },
    },
    {
      title: <div className='column-header'>{AppConstants.pricePerBox_}</div>,
      dataIndex: "Sqftrack",
      align: "right"
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
          <div className="weight-slab">{AppConstants.pricePerBox}</div>
          <Input value={boxValue}
          type="number"
           onChange={(e: any) => setPiece(e, boxKey, null)}
          />
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
            title={() => AppConstants.boxBasedCalculationExampleMonthly}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={1} colSpan={2} align="right">
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
        <div className='notes-view-container'>
                        <NotesIcon />
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content1'>(Total Inward Boxes per Month) X (Price Per Box)</div>
                            <div className='note-content'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing Bill<br /> Amount would be charged.</div>
                            <div className='note-content'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly Bill <br /> Amount would be charged</div>
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

export default PerBoxView;
