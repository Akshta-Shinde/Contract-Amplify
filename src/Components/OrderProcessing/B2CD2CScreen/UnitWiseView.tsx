import React from "react";
import { Row, Col, Input, Table } from "antd";
import AppConstants from "../../../Globals/AppConstants";
import NotesIcon from "../../../Images/NotesIcon";
import { useDispatch, useSelector } from 'react-redux';
import {
  optionSelectedData
} from '../../../Store/Action/contractAction';

function UnitWiseView() {
  const dispatch = useDispatch()
  const {
    typeId,
    C3,
    C4,C5,
    C1,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  console.log("C3,C4,C5",C3,
  C4,C5)


  
  const setRtoPerPiece = (e: any, key: any, item: any) => {
    console.log("e.target.value", e.target.value, key,typeId,C3,C4,C5)
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
    console.log("where is",where)
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
}
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
      align: "center"
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

  const tableView = () => {
    try {
      return (
        <div style={{marginTop:20}}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => 
            <div className="unit-wise-table-header">
              <div>{AppConstants.calculationExampleMonthly}</div>
              <div>{AppConstants.totalNumberOfOrdersPerMonth} 9,500/-</div>
            </div>}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={1} colSpan={4} align="right">
                    <div className="examplebillamount">
                      {AppConstants.exampleBillAmount}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <div className="total-amt">78346</div>
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

  const monthlyCalculationDetail = () => {
    
    try{
      return(
        <Row>
              <Col span={8}>
                  <div className="title"> 
                      {AppConstants.uptoUnits}
                      <Input value={C3}
                      type = "number"
                      onChange={(e: any) => setRtoPerPiece(e, "C3", null)}/>
                  </div>
              </Col>
              <Col span={6}>
                  <div className="title">
                      {AppConstants.priceTxt}
                      <Input value={C4}
                      type = "number"
                      onChange={(e: any) => setRtoPerPiece(e, "C4", null)}
                      /> 
                  </div> 
              </Col>
              <Col span={10}>
                  <div className="title">
                      {AppConstants.priceperAddlunit}
                      <Input value={C5}
                      type = "number"
                      onChange={(e: any) => setRtoPerPiece(e, "C5", null)}
                      />
                  </div>
              </Col>
        </Row>
      )
    }
    catch(ex){
      console.log("Error in monthlyCalcutionDetail::"+ex)
    }
  }

  const notesView = () => {
    try{
      return(
        <div className='notes-view-container'>  
            <NotesIcon />
            <div style={{ marginLeft: 20 }}>
              <div className='notes-title'>
                <div>{AppConstants.monthlyCalculationDetail}</div>
                <div style={{marginTop:10}}>{AppConstants.priceDetermined}</div>
            </div>
            <div className="note-content">Each Additional Unit SKU would be charged.</div>
            <div className="note-content">Total Price Per Order would be calculated as per the following formulae.</div>
            <div className="note-content">(Price for Upto Units) + (Sum of Price for each additional SKU)</div>
            </div>
        </div>
      )
    }
    catch(ex){
      console.log("Error in notesView::"+ex)
    }
  }


  return (
    <div className="unit-wise-view-container">
     {monthlyCalculationDetail()}
     {tableView()}
     {notesView()} 

    </div>
  );
}

export default UnitWiseView;
