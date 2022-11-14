import { Layout } from "antd";
import React,{useState,useEffect} from "react";
import AppConstants from "../../Globals/AppConstants";
import NavbarLayout from "../Menu/NavbarLayout";
import SideMenu from "../Menu/SideMenu";
import RadioGroupContainer from "../RadioGroupContainer";
import TitleContainer from "../TitleContainer";
import BothView from "./B2BScreen/BothView";
import PerBoxView from "./B2BScreen/PerBoxView";
import PerPieceView from "./B2BScreen/PerPieceView";
import "./OrderProcessing.scss";
import { useDispatch, useSelector } from 'react-redux';

import {
  updateSelectedData,
  optionSelectedData,
  getContractDetails,
  refreshPage
} from '../../Store/Action/contractAction';


const { Content } = Layout;



function RTVSTNScreen(){
    const [value, setValue] = useState();
    const dispatch = useDispatch()
    const {
      typeId,
      C1,
      C2,
      menuId
    }: any = useSelector((state: any) => state.contractReducerState);
    console.log(" RTVSTNScreen typeId b3c",typeId,C1,C2,menuId)

  
  
const onChange = (e: any) => {
  setValue(e.target.value);
  console.log("tsttss",e,menuId,e.target.value,typeId)
  const where= '5000|'+menuId+'|'+e.target.value
  dispatch(updateSelectedData(where,'A-U','contractlineitems'))
  refreshPage()

}

if (typeId && value === undefined){
  setValue(typeId)
}

useEffect(() => {
  const where ='5000|114'
  console.log("shshhshhshsh dhshsh")
  if(typeId){
      const where='5000|'+menuId+'|'+typeId
      dispatch(getContractDetails(where,'A-V'))
  }
  else{
      dispatch(getContractDetails(where,'A-V'))
  }
  
}, [])

const rTVsTNTypes = [
    {
      id: 3010,
      name: AppConstants.perBox,
    },
    {
      id: 3011,
      name: AppConstants.perPiece,
    },
    {
      id: 3012,
      name: AppConstants.both,
    },
  ];

const RTVSTNScreenTypes = () => {
    
    try {
      return (
        <RadioGroupContainer
          options={rTVsTNTypes}
          handleRadioSelect={onChange}
          value={value}
        >
          {value === 3010 && <PerBoxView />}
          {value === 3011 && <PerPieceView />}
          {value === 3012 && <BothView />}
        </RadioGroupContainer>
      );
    } catch (ex) {
      console.log("Error in RTVSTNScreenTypes::" + ex);
    }
  };
    return(
      <Layout>
        <NavbarLayout>
          <Layout>
            <SideMenu
              selectedKey={AppConstants.rTVsTN}
              openKey={AppConstants.orderProcessing}
              menu={null}
            />
            <Content>
              <TitleContainer
              title={AppConstants.orderProcessing}>

                <div className="b2bScreen-container">
                  {RTVSTNScreenTypes()}
                </div>
              </TitleContainer>
            </Content>
          </Layout>
        </NavbarLayout>
      </Layout>
    )
}

export default RTVSTNScreen;