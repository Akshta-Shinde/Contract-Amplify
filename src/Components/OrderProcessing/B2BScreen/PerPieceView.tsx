import React,{useState} from "react";
import { Row, Col, Input, Table } from "antd";
import AppConstants from "../../../Globals/AppConstants";
import NotesIcon from "../../../Images/NotesIcon";
import { useDispatch, useSelector } from 'react-redux';
import {
  optionSelectedData
} from '../../../Store/Action/contractAction';

function PerPieceView() {
  const dispatch = useDispatch()
  const {
    typeId,
    C3,
    C4,C5,
    C1,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);

  const [pieceValue,setPieceValue] = useState()
  const [pieceKey,setPieceKey] = useState('')

  if (C3 && pieceValue === undefined) {
    setPieceValue(C3)
    setPieceKey("C3")
  }
  else if (C1 && pieceValue === undefined) {
    setPieceValue(C1)
    setPieceKey("C1")
  }

  const setPiece = (e: any, key: any, item: any) => {
    const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
    dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
  }
  const columns: any = [
    {
      title: <div className='column-header'>{AppConstants.sku}</div>,
      width: 300,
      dataIndex: "structuretype",
      align: "left"
    },
    {
      title: <div className='column-header'>{AppConstants.inventoryQtyPerMonth}</div>,
      dataIndex: "sqft",
      align:"center",
      width: 200,
      render: (item: any) => {
        return (
            <Input value={item} />
        );
      },
    },
    {
      title: <div className='column-header'>{AppConstants.pricePerPieceCal}</div>,
      dataIndex: "Sqftrack",
      align: "right"
    },
    {
      title: <div className='column-header'>{AppConstants.totalPrice}</div>,
      dataIndex: "pricepersqft",
      align: "right"
    },
  ];

  const data = [
    {
      key: "1",
      structuretype: "sku1",
      Sqftrack: "22.5",
      sqft: "899",
      pricepersqft: "38678",
    },
    {
      key: "2",
      structuretype: "sku1",
      Sqftrack: "22.5",
      sqft: "899",
      pricepersqft: "38678",
    },
    {
      key: "3",
      structuretype: "sku1",
      Sqftrack: "22.5",
      sqft: "899",
      pricepersqft: "38678",
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
            title={() => AppConstants.pieceBasedCalculationExampleMonthly}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={1} colSpan={3} align="right">
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

  const contentView = () => {
    try {
      return (
        <>
          <div className="price-per-cft-container">
          <div className="price-per-order">
          <div className="weight-slab">{AppConstants.pricePerPiece}</div>
          <Input value={pieceValue}
          type="number"
          onChange={(e: any) => setPiece(e, pieceKey, null)}
          />
          </div>
            {tableView()}
            <div className='notes-view-container'>
                        <NotesIcon />
                        <div style={{ marginLeft: 20 }}>
                            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                            <div className='note-content1'>(Sum of each SKU for the entire Month) X (Price Per Piece)</div>
                            <div className='note-content'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing <br /> Bill Amount would be charged.</div>
                            <div className='note-content'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly <br /> Bill Amount would be charged</div>
                        </div>
            </div>
          </div>
        </>
      );
    } catch (ex) {
      console.log("Error in b2b-PerpieceView::" + ex);
    }
  };

  return <>{contentView()}</>;
}

export default PerPieceView;
