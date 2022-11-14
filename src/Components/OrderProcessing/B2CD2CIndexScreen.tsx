import React, { useState,useEffect } from "react";
import TitleContainer from "../TitleContainer";
import RadioGroupContainer from "../RadioGroupContainer";
import { Layout, Row, Col, Input, Checkbox } from "antd";
import AppConstants from "../../Globals/AppConstants";
import SideMenu from "../Menu/SideMenu";
import UnitWiseView from "./B2CD2CScreen/UnitWiseView";
import SlabView from "./B2CD2CScreen/SlabView";
import PerOrderView from "./B2CD2CScreen/PerOrderView";
import "./OrderProcessing.scss";
import NavbarLayout from "../Menu/NavbarLayout";
import {
  getContractDetails,
  updateSelectedData,
  optionSelectedData
} from '../../Store/Action/contractAction';
import { useDispatch, useSelector } from 'react-redux';

const { Content } = Layout;
function B2CD2CScreen() {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const {
    typeId,
    C1,
    C2,
    C3,
    C4,
    C5,
    volumeTableHeaderArray,
    volumeTableDataArray,
    weightGmsTableData,
    addColumnOnLoad,
    additionalTableDataArray,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);

  
  console.log("typeId b3c",typeId,C1,C2,)
  if(typeId && value===undefined){
    setValue(typeId)
  }
  const changeOption =(e: any, key: any, item: any)=>{
    console.log("tsttss",e,menuId,e.target.value,typeId)
    setValue(e.target.value)
    const where= '5000|'+menuId+'|'+e.target.value
    dispatch(updateSelectedData(where,'A-U','contractlineitems'))
    refreshPage()
  }
  const onChange = (e: any, key: any, item: any) => {
    console.log("e.target.value",e.join('|'),typeId)
    const selectedOption = e.join('|')
    //setValue(selectedOption);
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
        console.log("wherewhere",where)
        //dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,selectedOption))
        setValue(typeId)
  };
  const setRtoPerPiece = (e: any, key: any, item: any) => {
    console.log("C1 dgtryr optionSelectedData",C1)
    console.log("e.target.value", e.target.value, key,typeId)
    const where ='contractId='+5000+" and menuId="+menuId+ " and ContractLineItemTypeID="+typeId
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
}

function refreshPage() {
  setTimeout(()=>{
      window.location.reload();
  }, 0);
  console.log('page to reload')
}


  useEffect(() => {
    dispatch(getContractDetails('5000|111','A-V'))
    
}, [])
  const options = [
    { label: 'RTO', value: 'R' },
    { label: 'Inward', value: 'I' },
    { label: 'Order Processing', value: 'O' },
  ];

  const b2cd2cTypes = [
    {
      id: 3001,
      name: AppConstants.unitwise,
    },
    {
      id: 3002,
      name: AppConstants.slab,
    },
    {
      id: 3003,
      name: AppConstants.perorder,
    },
  ];

  
  const minimumOrderProcessing = () => {
    try {
      return (<div className="minimumOrderProcessing-container">
        <div className="title">{AppConstants.minimumorderprocessing}</div>
        <div className="monthlycharges-container">
          <div className="monthly-charges">
            {AppConstants.monthycharges}
          </div>
          <Input value={C1}
          onChange={(e: any) => setRtoPerPiece(e, "C1", null)}
          />
          <div className="asteric">
            <Checkbox.Group
              options={options}
              //defaultValue={['Apple']}
              onChange={(e: any) => onChange(e, "C2", null)}
              value = {C2}
            />
          </div>
        </div>
      </div>

      );
    } catch (ex) {
      console.log("Error in minimumOrderProcessing::" + ex);
    }
  };

  const B2CD2CScreenTypes = () => {
    try {
      return (
        <RadioGroupContainer
          options={b2cd2cTypes}
          handleRadioSelect={(e: any) => changeOption(e, "C", null)}

          value={value?value:typeId}
        >
          {value === 3001 && <UnitWiseView />}
          {value === 3002 && <SlabView />}
          {value === 3003 && <PerOrderView />}
        </RadioGroupContainer>
      );
    } catch (ex) {
      console.log("Error in B2CD2CScreenTypes::" + ex);
    }
  };

  return (
    <Layout>
      <NavbarLayout>
        <Layout>
          <SideMenu
            selectedKey={AppConstants.b2Cd2C}
            openKey={AppConstants.orderProcessing}
            menu={null}
          />
          <Content>
            <TitleContainer
              title={AppConstants.orderProcessing}
              screenPath="/rto-b2cd2c"
              screenPreviousPath="/inward">
              <div className="b2cd2cScreen-container">
                {minimumOrderProcessing()}
                {B2CD2CScreenTypes()}
              </div>
            </TitleContainer>
          </Content>
        </Layout>
      </NavbarLayout>
    </Layout>
  );
}

export default B2CD2CScreen;
