import React, { useState,useEffect } from "react";
import TitleContainer from "../TitleContainer";
import RadioGroupContainer from "../RadioGroupContainer";
import { Layout, Row, Col, Input, Checkbox } from "antd";
import AppConstants from "../../Globals/AppConstants";
import SideMenu from "../Menu/SideMenu";
import "./OrderProcessing.scss";
import PerBoxView from "./B2BScreen/PerBoxView";
import PerPieceView from "./B2BScreen/PerPieceView";
import BothView from "./B2BScreen/BothView";
import NavbarLayout from "../Menu/NavbarLayout";
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSelectedData,
  optionSelectedData,
  getContractDetails
} from '../../Store/Action/contractAction';

const { Content } = Layout;

function B2BScreen() {
  const dispatch = useDispatch()
  const [value, setValue] = useState();
  const {
    typeId,
    C1,
    C2,
    menuId
  }: any = useSelector((state: any) => state.contractReducerState);
  console.log("B2BScreen typeId b3c",typeId,C1,C2,)

  if(typeId && value===undefined){
    setValue(typeId)
  }

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload();
    }, 1);
    console.log('page to reload')
  }

  const onChange = (e: any, key: any, item: any) => {
    console.log("e.target.value",e.join('|'),typeId)
    const selectedOption = e.join('|')
    //setValue(selectedOption);
    const where= '5000|'+menuId+'|'+typeId
    console.log("wherewhere",where)
    //dispatch(updateSelectedData(where,'A-U','contractlineitems'))
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,selectedOption))
    setValue(typeId)
    refreshPage()
  };

  

  useEffect(() => {
    // dispatch(loadSlabDataAction('5000|113','A-V'))
    const where ='5000|113'
    if(typeId){
        const where='5000|'+menuId+'|'+typeId
        dispatch(getContractDetails(where,'A-V'))
    }
    else{
        dispatch(getContractDetails(where,'A-V'))
    }
    
}, [])

  const options = [
    { label: 'RTO', value: 'R' },
    { label: 'Inward', value: 'I' },
    { label: 'Order Processing', value: 'O' },
  ];

  const b2cd2cTypes = [
    {
      id: 3006,
      name: AppConstants.perBox,
    },
    {
      id: 3007,
      name: AppConstants.perPiece,
    },
    {
      id: 3008,
      name: AppConstants.both,
    },
  ];

  const setPiece = (e: any, key: any, item: any) => {
    console.log("e.target.value", e.target.value, key,typeId)
    const where ='contractId='+5000+" and menuId="+113+ " and ContractLineItemTypeID="+typeId
    console.log("where is",where)
    dispatch(optionSelectedData(where,'A-UX',"contractlineitems",key,e.target.value))
}

  const minimumOrderProcessing = () => {
    try {
      return (<div className="minimumOrderProcessing-container">
        <div className="title">{AppConstants.minimumorderprocessing}</div>
        <div className="monthlycharges-container">
          <div className="monthly-charges">
            {AppConstants.monthycharges}
          </div>
          <Input value={C1}
          type = "number"
          onChange={(e: any) => setPiece(e, "C1", null)}
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

  const changeOption =(e: any, key: any, item: any)=>{
    console.log("tsttss",e)
    setValue(e.target.value)
    const where= '5000|113|'+e.target.value
    dispatch(updateSelectedData(where,'A-U','contractlineitems'))
  }

  const B2BScreenTypes = () => {
    try {
      return (
        <RadioGroupContainer
          options={b2cd2cTypes}
          handleRadioSelect={(e: any) => changeOption(e, "C", null)}

          value={value?value:typeId}
        >
          {value === 3006 && <PerBoxView />}
          {value === 3007 && <PerPieceView />}
          {value === 3008 && <BothView />}
        </RadioGroupContainer>
      );
    } catch (ex) {
      console.log("Error in B2BScreenTypes::" + ex);
    }
  };

  return (
    <Layout>
      <NavbarLayout>
        <Layout>
          <SideMenu
            selectedKey={AppConstants.b2B}
            openKey={AppConstants.orderProcessing}
            menu={null}
          />
          <Content>
            <TitleContainer
              title={AppConstants.orderProcessing}>
              <div className="b2bScreen-container">
                {minimumOrderProcessing()}
                {B2BScreenTypes()}
              </div>
            </TitleContainer>
          </Content>
        </Layout>
      </NavbarLayout>
    </Layout>
  );
}

export default B2BScreen;
