import { Layout } from "antd";
import React,{useState,useEffect} from "react";
import AppConstants from "../../Globals/AppConstants";
import SideMenu from "../Menu/SideMenu";
import RadioGroupContainer from "../RadioGroupContainer";
import TitleContainer from "../TitleContainer";
import BothView from "./B2BScreen/BothView";
import PerBoxView from "./B2BScreen/PerBoxView";
import PerPieceView from "./B2BScreen/PerPieceView";
import NavbarLayout from "../Menu/NavbarLayout";
import { useDispatch, useSelector } from 'react-redux';
import "./OrderProcessing.scss";

import {
  updateSelectedData,
  optionSelectedData,
  getContractDetails,
  refreshPage
} from '../../Store/Action/contractAction';


const { Content } = Layout;


function InternalStockScreen(){
    //const [value, setValue] = useState();
  const [value, setValue] = useState();
  const dispatch = useDispatch()
    const {
      typeId,
      C1,
      C2,
      menuId
    }: any = useSelector((state: any) => state.contractReducerState);
    console.log(" InternalStockScreen typeId b3c",typeId,C1,C2,menuId)
  

    if (typeId && value === undefined){
      setValue(typeId)
    }  

  

    const onChange = (e: any) => {
      setValue(e.target.value);
      console.log("tsttss",e,menuId,e.target.value,typeId)
        const where= '5000|'+menuId+'|'+e.target.value
        dispatch(updateSelectedData(where,'A-U','contractlineitems'))
        refreshPage()
    
    }

useEffect(() => {
  const where ='5000|115'
  console.log("shshhshhshsh dhshsh")
  if(typeId){
      const where='5000|'+menuId+'|'+typeId
      dispatch(getContractDetails(where,'A-V'))
  }
  else{
      dispatch(getContractDetails(where,'A-V'))
  }
  
}, [])

const internalStockTypes = [
    {
      id: 3013,
      name: AppConstants.perBox,
    },
    {
      id: 3014,
      name: AppConstants.perPiece,
    },
    {
      id: 3015,
      name: AppConstants.both,
    },
  ];

const InternalStockScreen = () => {
    
    try {
      return (
        <RadioGroupContainer
          options={internalStockTypes}
          handleRadioSelect={onChange}
          value={value}
        >
          {value === 3013 && <PerBoxView />}
          {value === 3014 && <PerPieceView />}
          {value === 3015 && <BothView />}
        </RadioGroupContainer>
      );
    } catch (ex) {
      console.log("Error in internalStockScreenTypes::" + ex);
    }
  };
    return(
        <Layout>
           <NavbarLayout>
           <Layout>
        <SideMenu
          selectedKey={AppConstants.internalStocktransfer}
          openKey={AppConstants.orderProcessing}
          menu={null}
        />
        <Content>
          <TitleContainer>
            <div className="b2bScreen-container">
              {InternalStockScreen()}
            </div>
          </TitleContainer>
        </Content>
        </Layout>
        </NavbarLayout>
      </Layout>
    )
}

export default InternalStockScreen;