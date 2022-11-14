import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Layout, Radio, Row, Col, Button, Input, Select, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState,useEffect } from 'react'
import AppConstants from '../../Globals/AppConstants'
import NotesIcon from '../../Images/NotesIcon'
import NavbarLayout from '../Menu/NavbarLayout'
import SideMenu from '../Menu/SideMenu'
import TitleContainer from '../TitleContainer'
import "./LoadingScreen.scss";
import { useDispatch, useSelector } from 'react-redux';
import{getContractDetails, updateSelectedData,optionSelectedData,refreshPage} from '../../Store/Action/contractAction'



const { Option } = Select;

function LoadingIndexScreen() {

    const [loadingValue, setLoadingValue] = useState();
    const [count, setCount] = useState(2);
    const [value, setValue] = useState();
    const dispatch = useDispatch()
    const {
        typeId,
        menuId,
        C1,
        C2
      }: any = useSelector((state: any) => state.contractReducerState);
    console.log("LoadingIndexScreen is",typeId,menuId,loadingValue,C1,C2)

    if (typeId && loadingValue=== undefined) {
        setLoadingValue(typeId)
    }
    if (C1 && value=== undefined) {
        setValue(C1)
    }

    const onChangePrice =(e:any,key:any)=>{
        console.log(e.target.value,key)
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key, e.target.value))
    }
    const onChange = ({ target: { value } }: any,key:any) => {
        console.log("onchaanehe",value)
        const where = 'contractId=' + 5000 + " and menuId=" + menuId + " and ContractLineItemTypeID=" + typeId
        dispatch(optionSelectedData(where, 'A-UX', "contractlineitems", key,value))
        setValue(value);
        
      };

    useEffect(() => {
        const where ='5000|124'
        if(typeId){
            const where='5000|'+menuId+'|'+typeId
            dispatch(getContractDetails(where,'A-V'))
        }
        else{
            dispatch(getContractDetails(where,'A-V'))
        }
    }, [])

    const loadingOnChange = (e: any) => {
        setLoadingValue(e.target.value);
    };

    // const onChange = ({ target: { value } }: any) => {
    //     setValue(value);
    // };

    const options = [
        { label: AppConstants.vehicleType, value: "VT" },
        { label: AppConstants.tonnage, value: "T" },
        { label: AppConstants.perBox, value: "PB"},
    ]

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            vehicle: 'Container Truck 20 Ft',
            price: '200',
        },
        {
            key: '2',
            vehicle: 'Container Truck 30 Ft',
            price: '300',
        },
        {
            key: '3',
            vehicle: 'Container Truck 50 Ft',
            price: '500',
        },


    ])

    const handleAdd = () => {
        const newData: any = {
            key: count,
            grm: '',
            weightslab: `#${count}`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter(item => item.key !== key);
        setDataSource(newData);
        setCount(count - 1);
    };

    const displayButton = (item: any) => {
        const lastElement: any = dataSource[dataSource.length - 1]
        if (lastElement.key === item?.key) {
          return (
            <div className='action-container'>
              <Button onClick={handleAdd} className="Add-btn">
                <PlusOutlined />
              </Button>
            </div>
          )
        } else { 
          return (
            <div className='action-container'>
              <Button onClick={() => handleDelete(item?.key)} className="delete-btn">
                <CloseOutlined />
              </Button>
            </div>
          )
        }
      }


    const weightslabcolumns: any = [
        {
            title: <div className='col-header'>{AppConstants.selectVehicle}</div>,
            dataIndex: '',
            width: 400,
            render: (item: any) => {
                return (
                    <Select value={item?.vehicle} />
                )
            }
        },
        {
            title: <div className='col-header'>{AppConstants.priceTxt}</div>,
            dataIndex: 'price',
            render: (item: any) => {
                return (
                    <Input value={item} />
                )
            }
        },
        {
            dataIndex: '',
            render: (item: any) => {
                return (
                    displayButton(item)
                )
            }
        },
    ]

    const loadingType = () => {
        try {
            return (
                <div className="loading-type-selection">
                    <Radio.Group onChange={loadingOnChange} value={loadingValue}>
                        <Radio value={7001}>{AppConstants.applicable}</Radio>
                        <Radio value={7002}>{AppConstants.notApplicable}</Radio>
                    </Radio.Group>
                </div>
            );
        } catch (ex) {
            console.log("Error");
        }
    };

    const loadingCalculationEx = () => {
        try {
            return (
                <div className='loading-calculation-ex'>
                    {AppConstants.loadingCalculationEx}
                </div>
            )
        }
        catch (ex) {
            console.log("Error ")
        }
    }

    const chargeType = () => {
        try {
            return (
                <div className="charge-type">
                    <div className="title">{AppConstants.chargeType}</div>
                    <div className="charge-type-selection">
                        <Radio.Group
                            options={options}
                            onChange={(e:any)=>onChange(e,"C1")}
                            value={value?value:C1}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>
                    {contentView()}
                </div>
            );
        } catch (ex) {
            console.log("Error in contractTypeView::" + ex);
        }
    };

    const notesView = () => {
        try {
            return (
                <div className="notes-view-container">
                    <NotesIcon />
                    <div className='notes-container'>
                        <div className="notes-title">
                            <div className='notes-content'>
                                <div>{AppConstants.totalNoOfConsignments}</div>
                                <div className='count'>10</div>
                            </div>
                            <div className='notes-content'>
                                <div>Price per Consignment</div>
                                <div className='count'>₹800</div>
                            </div>
                            <div className='notes-content'>
                                <div>Example Billing Amount</div>
                                <div className='count'>₹8000</div>
                            </div>
                        </div>
                        <div className='consignment-calculation'>
                            (Total No Of Consignments X Price Per Consignment for the entire month)
                        </div>
                    </div>
                </div>
            )
        }
        catch (ex) {
            console.log("Error");
        }
    }

    const tonnagePerBoxnotesView = () => {
        try {
            return (
                <div className="notes-view-container">
                    <NotesIcon />
                    <div className='notes-container'>
                        <div className="notes-title">
                            <div className='notes-content'>
                                <div>{value === (AppConstants.perBox) ? AppConstants.totalNoOfBoxes : AppConstants.totalTons}</div>
                                <div className='count'>10</div>
                            </div>
                            <div className='notes-content'>
                                <div>{value === (AppConstants.perBox) ? AppConstants.pricePerBox : AppConstants.pricePerTon}</div>
                                <div className='price'>₹800</div>
                            </div>
                            <div className='notes-content'>
                                <div>{AppConstants.exampleBillingAmount}</div>
                                <div className='price'>₹8000</div>
                            </div>
                        </div>
                        <div className='consignment-calculation'>
                            {value === (AppConstants.perBox) ? AppConstants.totalNoOfBoxesForEntireMonth : AppConstants.totalNoOfTonsForEntireMonth}
                        </div>
                    </div>
                </div>
            )
        }
        catch (ex) {
            console.log("Error");
        }
    }
    const vehicleSelectTableView = () => {
        try {
            return (
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={weightslabcolumns}
                />
            )
        } catch (ex) {
            console.log("Error in vehicleSelectTableView::" + ex)
        }
    }

    const pricePerTon = () => {
        try {
            return (
                <div className="price-input-container">
                    <div>{value === (AppConstants.perBox) ? AppConstants.pricePerBox : AppConstants.pricePerTon}</div>
                    <div className='mx-4'>
                        <Input
                        value={C2}
                        type="number"
                        onChange={(e:any)=> onChangePrice(e,"C2")}
                        />
                    </div>
                </div>
            )
        }
        catch (ex) {
            console.log("Error")
        }
    }

    const notApplicableView = () => {
        try {
            return (
                <div className="not-applicable-noteview">
                    <NotesIcon />
                    <div className='content'>{AppConstants.unloadingNotApplicable}</div>
                </div>
            );
        } catch (ex) {
            console.log("Error in ");
        }
    };



    const contentView = () => {
        try {
            return (
                <div>
                    {value === "VT" &&
                        <div className='vehicle-view-container'>
                            <div className='select-vehicle-table'>
                                {vehicleSelectTableView()}
                            </div>
                            {loadingCalculationEx()}
                            {notesView()}
                        </div>
                    }
                    {(value === ("T") || value === ("PB")) &&
                        <div className='vehicle-view-container'>
                            {pricePerTon()}
                            {loadingCalculationEx()}
                            {tonnagePerBoxnotesView()}
                        </div>
                    }
                </div>
            )
        }
        catch (ex) {
            console.log("Error")
        }
    }

    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu 
                        selectedKey={AppConstants.unloading}
                        menu={null}/>
                        <Content>
                            <TitleContainer
                            title={AppConstants.unloading}
                            screenPath="/stickering"
                            screenPreviousPath="/loading">
                                <div className="loading-screen-container">
                                    {loadingType()}
                                    <div className="vehicle-chargeType-container">
                                        {loadingValue === 7001 && chargeType()}
                                        {loadingValue === 7002 && notApplicableView()}
                                    </div>    
                                </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
        
    )
}

export default LoadingIndexScreen