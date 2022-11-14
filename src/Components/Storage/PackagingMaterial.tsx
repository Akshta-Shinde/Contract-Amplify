import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Input, Layout, Row, Table, Form } from "antd";
import SideMenu from "../Menu/SideMenu";
import TitleContainer from "../TitleContainer";
import AppConstants from "../../Globals/AppConstants";
import NotesIcon from "../../Images/NotesIcon";
import "./Storage.scss";
import NavbarLayout from "../Menu/NavbarLayout";
import { optionSelectedData } from '../../Store/Action/contractAction'
import{getContractDetails, updateSelectedData} from '../../Store/Action/contractAction'



const { Content } = Layout;

function PackagingMaterial() {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {

    typeId,
    C1,
    menuId

  }: any = useSelector((state: any) => state.contractReducerState);
  const [selectSqftKey, setSelectcfftKey] = useState<any>('')
  const [onLoad, setOnLoad] = useState<any>(false)
  console.log("PackagingMaterial is",typeId,C1,menuId)

  useEffect(() => {
    console.log("inside effect")
    const where ='5000|102'

    if(typeId){
        const where='5000|102'+typeId
        dispatch(getContractDetails(where,'A-V'))
    }
    else{
        dispatch(getContractDetails(where,'A-V'))
    }
}, [])

  const setRtoPerOrder = (e: any, key: any, item: any) => {
    console.log("C1 dgtryr", C1)
    console.log("e.target.value", e.target.value, typeId)
    const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
    dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
  }


  const columns: any = [
    {
      title: <div className='column-header'>{AppConstants.structureType}</div>,
      dataIndex: "packingmaterial",
      align: "left",
      width: 300,
    },
    {
      title: <div className='column-header'>{AppConstants.cft}</div>,
      dataIndex: "cftSku",
      align: "right",
      width: 250,
    },
    {
      title: <div className='column-header'>{AppConstants.actualused}</div>,
      dataIndex: "totalcft",
      align: "right",
      width: 200,
      render: (item: any) => {
        return (
          <div className="input-field">
            <Input value={item} />
          </div>
        );
      },
    },
    {
      title: <div className='column-header'>{AppConstants.totalCft}</div>,
      dataIndex: "totalcft",
      align: "right",
      width: 120,
    },
    {
      title: <div className='column-header'>{AppConstants.pricePerCFT}</div>,
      dataIndex: "pricepercft",
      align: "right",
      width: 120,
    },
    {
      title: <div className='column-header'>{AppConstants.price}</div>,
      dataIndex: "price",
      align: "right",
      width: 120,
    },
  ];

  const data = [
    {
      key: "1",
      packingmaterial: "HDR - Pallet",
      cftSku: "22.5",
      totalcft: "89",
      pricepercft: "30",
      price: "40589",
    }
  ];

  const tableView = () => {
    try {
      return (
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => AppConstants.packingmaterialcalculation}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={1} colSpan={5} align="right">
                    <div>
                      {AppConstants.exampleBillAmount}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <div >78346</div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
          {/* <div className="exa">
            <div className="examplebillamount">
              {AppConstants.examplebillamount}
            </div>
            <div className="total-amt">78346</div>
          </div> */}

        </div>
      );
    } catch (ex) {
      console.log("Error in tableView::" + ex);
    }
  };

  const packagingMaterialView = () => {
    try {
      return (
        <div className="packaging-container">
          <div className="price-per-cft-container">
            <Row>
              <Col span={4}>
                <div className="price-per-cft">{AppConstants.pricePerCFT}</div>
              </Col>
              <Col span={3}>
                <div className="input">
                  <Input
                    type="number"
                    onChange={(e: any) => setRtoPerOrder(e, "C1", "price")}
                    value={C1}
                  />
                </div>
              </Col>
            </Row>
          </div>
          {tableView()}
          <div className="notes-view-container">
            <Row>
              <Col span={1}>
                <NotesIcon />
              </Col>
              <Col span={23}>
                <div>
                  <div className="notes-title">Monthly Calculation Detail</div>
                  <div className="note">
                    Total CFT X Price Per CFT
                  </div>
                  <div className="note">
                    To be converted a pallete to 50 CFT
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    } catch (ex) {
      console.log("Error in cftView::" + ex);
    }
  };

  return (
    <Layout>
      <NavbarLayout>
        <Layout>
          <SideMenu
            selectedKey={AppConstants.packagingMaterial}
            openKey={AppConstants.storage}
            menu={null} />
          <Content>
            <TitleContainer
              title={AppConstants.packagingMaterial}>
              <div className="packagingMaterial-screen-container">
                {packagingMaterialView()}
              </div>
            </TitleContainer>
          </Content>
        </Layout>
      </NavbarLayout>
    </Layout>
  );
}

export default PackagingMaterial;
