import React, { useState, useEffect } from "react";
import { Select, Layout, Radio, Row, Col, Input } from "antd";
import SideMenu from "../Menu/SideMenu";
import AppConstants from "../../Globals/AppConstants";
import TitleContainer from "../TitleContainer";
import "./OrderProcessing.scss";
import NotesIcon from "../../Images/NotesIcon";
import NavbarLayout from "../Menu/NavbarLayout";
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSelectedData,
  optionSelectedData,
  getContractDetails,
  refreshPage
} from '../../Store/Action/contractAction';

const { Content } = Layout;
const { Option } = Select;

function KittingScreen() {
  const [kittingValue, setValue] = useState();
  const dispatch = useDispatch()
  //const [value, setValue] = useState();
  const {
    typeId,
    C1,
    C2,
    C3,
    C4,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  console.log(" KittingScreentypeId b3c",typeId,C1,C2,C3,C4)

  if(C1 && kittingValue === undefined ){
    setValue(C1)
  }

  

useEffect(() => {
  // dispatch(loadSlabDataAction('5000|113','A-V'))
  const where ='5000|112'
  if(typeId){
      const where='5000|'+menuId+'|'+typeId
      dispatch(getContractDetails(where,'A-V'))
  }
  else{
      dispatch(getContractDetails(where,'A-V'))
  }
  
}, [])

  const kittingOnChange = (e: any,key: any, item: any) => {
    setValue(e.target.value);
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
    refreshPage()
  };

  const setPrice = (e: any, key: any, item: any) => {
    console.log("C1 dgtryr optionSelectedData",C1)
    console.log("e.target.value", e.target.value, key,typeId)
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
}

  const kittingView = () => {
    try {
      return (
        <div className="kitting-screen-container">
          <div className="kitting-type-selection">
            <Radio.Group 
            onChange={(e: any) => kittingOnChange(e, "C1", null)} 
            value={kittingValue}>
              <Radio value={"A"}>{AppConstants.applicable}</Radio>
              <Radio value={"NA"}>{AppConstants.notApplicable}</Radio>
            </Radio.Group>
          </div>
          <div className="price-per-piece-container">
            {kittingValue === "A" && monthlyCalculationDetail()}
            {kittingValue === "NA" && notApplicableView()}
          </div>
        </div>
      );
    } catch (ex) {
      console.log("Error");
    }
  };

  const monthlyCalculationDetail = () => {
    
    try{
      return(
        <>
        <Row>
              <Col span={7}>
                  <div className="title"> 
                      {AppConstants.uptoUnits}
                      <Input 
                      type="number"
                      value={C2}
                      onChange={(e: any) => setPrice(e, "C2", null)}
                      />
                  </div>
              </Col>
              <Col span={6}>
                  <div className="title">
                      {AppConstants.priceTxt}
                      <Input 
                      type="number"
                      value={C3}
                      onChange={(e: any) => setPrice(e, "C3", null)}
                      /> 
                  </div> 
              </Col>
              <Col span={10}>
                  <div className="title">
                      {AppConstants.priceperAddlunit}
                      <Input 
                      type="number"
                      value={C4}
                      onChange={(e: any) => setPrice(e, "C4", null)}
                      />
                  </div>
              </Col>
        </Row>
        {notesView()}
        </>
      )
    }
    catch(ex){
      console.log("Error in monthlyCalcutionDetail::"+ex)
    }
  }

  const notesView = () => {
    try {
      return (
        <div className='notes-container'>
          <NotesIcon />
          <div style={{ marginLeft: 20}}>
            <div className='notes-title'>{AppConstants.monthlyCalculationDetail}</div>
            <div className='note-content'>(Price for Upto Units) + (Sum of price for each additional SKU)</div>
          </div>
        </div>
      );
    }
    catch (ex) {
      console.log("Error in ");
    }
  }

  const notApplicableView = () => {
    try {
      return (
        <div className='notes-view-container'>
          <NotesIcon />
          <div className="notes-title ">{AppConstants.orderProcessingNotApplicable}</div>
        </div>
      );
    } catch (ex) {
      console.log("Error in ");
    }
  };

  return (
    <Layout>
      <NavbarLayout>
        <Layout>
          <SideMenu
            selectedKey={AppConstants.kitting}
            openKey={AppConstants.orderProcessing}
            menu={null}
          />
          <Content>
            <TitleContainer
              title={AppConstants.kitting}>
              {kittingView()}
            </TitleContainer>
          </Content>
        </Layout>
      </NavbarLayout>
    </Layout>
  );
}

export default KittingScreen;
