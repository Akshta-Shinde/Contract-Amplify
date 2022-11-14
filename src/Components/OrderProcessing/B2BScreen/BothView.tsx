import React, { useState } from 'react';
import {Row,Col,Input,Table} from 'antd';
import AppConstants from '../../../Globals/AppConstants';
import NotesIcon from '../../../Images/NotesIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
  optionSelectedData
} from '../../../Store/Action/contractAction';

function BothView(){
    const dispatch = useDispatch()
  const {
    typeId,
    C3,
    C4,C5,
    C1,
    C2,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  const [value,setValue] = useState()
  const [piecekey,setPieceKey] = useState('')
  const [box,setBox] = useState()
  const [boxKey,setBoxKey] = useState('')
  console.log("BothView is",typeId,C1,C2,C3,C4,C5)

  if (C3 && value === undefined) {
    console.log("boxx c3", C3)
    setValue(C3)
    setPieceKey("C3")

  }
  else if (C1 && value === undefined) {
    console.log("boxx c1", C1)
    setValue(C1)
    setPieceKey("C1")
  }

  if (C2 && value === undefined) {
    console.log("boxx c1", C2)
    setBox(C2)
    setBoxKey("C2")
  }
  if (C4 && value === undefined) {
    console.log("boxx c4", C4)
    setBox(C4)
    setBoxKey("C4")
  }

  const setPiece = (e: any, key: any, item: any) => {
    console.log("e.target.value", e.target.value, key, typeId)
    const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
    console.log("where is", where)
    if (key === 'C3') {
      setValue(e.target.value)
    }
    if (key === 'C1') {
      setValue(e.target.value)
    }
    if (key === 'C2') {
      setBox(e.target.value)
    }
    if (key === 'C4') {
      setBox(e.target.value)
    }
    dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
  }

    const columns: any = [
        {
            title: <div className="both-header">{AppConstants.boxBasedCalculationExample}</div>,
            dataIndex: "sqft",
            width: 600,
            render: (item: any) => {
                return (
                    <div className='total-no-of-pieces'>
                        <div className='pieces-per-month'>Total Number Of Piece Per Month</div>
                        <Input value={item} />
                    </div>
                );
            },
        },
        {
          title: <div className="both-header">{AppConstants.price}</div>,
          dataIndex: "Sqftrack",
          width: 200,
          align: "right"
        },
        {
          title: <div className="both-header">{AppConstants.totalPrice}</div>,
          dataIndex: "pricepersqft",
          width: 200,
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
          }
      ];

    const tableView = () => {
        try {
            return (
                    <div style={{marginTop:20}}>
                        <Table
                        columns={columns}
                            dataSource={data}
                            bordered
                            summary={() => (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={1} colSpan={2} align="right">
                                            <div>{AppConstants.exampleBillAmount}</div>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="right">
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

    const bothBoxPiece = () => {
        return (
          <div className="price-per-order">
            <div className="weight-slab">
                <div style={{marginLeft:20}}>{AppConstants.pricePerBox}</div>
                  <Input 
                  value={value}
                   type = "number"
                  onChange={(e: any) => setPiece(e, piecekey, null)}
                  />
                </div>                  
            <div className="weight-slab">
                <div style={{marginLeft:20}}>{AppConstants.pricePerPieces}</div>
                <Input 
                value={box}
                type = "number"
                onChange={(e: any) => setPiece(e, boxKey, null)}/>
                </div>
          </div>
        );
    };


    const notesViewContainer = () => {
        try{
            return(
              <div className='notes-view-container'>
              <NotesIcon />
              <div style={{ marginLeft: 20 }}>
                  <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
                  <div className='note-content1'>(Total no of Piece per Month) X (Price Per Piece)</div>
                  <div className='note-content1'>(Total no of Box per Month) X (Price Per Box)</div>
                  <div className='note-content'>If the transaction amount is lesser than the Minimum Order Processing Bill Amount then Minimum Order Processing <br /> Bill Amount would be charged.</div>
                  <div className='note-content'>If the transaction amount is greater than the Minimum Order Processing Bill Amount then Transaction Monthly <br /> Bill Amount would be charged</div>
              </div>
              </div>
            )
        }
        catch(ex){
            console.log("Error in notesViewContainer::",ex)
        }
    }


    return(
        <div className="both-view-container">
        {bothBoxPiece()}
        {tableView()}
        {notesViewContainer()}
        </div>
    )
}

export default BothView