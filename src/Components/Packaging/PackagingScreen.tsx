import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Input, Layout, Row, Select, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import AppConstants from '../../Globals/AppConstants';
import NavbarLayout from '../Menu/NavbarLayout';
import SideMenu from '../Menu/SideMenu';
import TitleContainer from '../TitleContainer';
import "./Packaging.scss"

function PackagingScreen() {
    const [count, setCount] = useState(5);

    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleAdd = () => {
        const newData: any = {
            key: count,
            grm: '',
            weightslab: `#${count}`,
            price: '',
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

    const boxescolumns: any = [
        {
            title:<div className='col-header'>{AppConstants.selectBox}</div>,
            dataIndex: '',
            width:400,
            render: (item: any) => {
                return (
                    <Select value={item?.grm} />
                )
            }
        },
        {
            title:<div className='col-header'>{ AppConstants.pricePerUnit}</div>,
            dataIndex: 'price',
            width:200,
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

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            grm: AppConstants.customCartonBox1,
            price: '7',
        },
        {
            key: '2',
            grm: AppConstants.customCartonBox1,
            price: '7',
        },
        {
            key: '3',
            grm: AppConstants.customCartonBox1,
            price: '7',
        },
        {
            key: '4',
            grm: AppConstants.customCartonBox1,
            price: '7',
        },

    ])

    const cartonBoxesList = [
        {
            id: 1,
            boxName: "Box 1",
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 2,
            boxName: "Box 2",
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 3,
            boxName: "Box 3",
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 4,
            boxName: "Box 4",
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 5,
            boxName: "Box 5",
            price: 10,
            uom: AppConstants.perUnit
        },
    ]

    const packagingMaterialList = [
        {
            id: 1,
            packagingMaterialName: AppConstants.bubbleWrap,
            price: 10,
            uom: AppConstants.perBundle
        },
        {
            id: 2,
            packagingMaterialName: AppConstants.brownPapers,
            price: 10,
            uom: AppConstants.perBundle
        },
        {
            id: 3,
            packagingMaterialName: AppConstants.packingTapes,
            price: 10,
            uom: AppConstants.perUnit
        },
        {
            id: 4,
            packagingMaterialName: AppConstants.customizedPackingTapes,
            price: 10,
            uom: AppConstants.perUnit
        },
    ]



    const customCartonBoxView = () => {
        try {
            return (
                <div className='custom-carton-box-cantainer'>
                    <div className='title-Container'>
                        {AppConstants.customizedCartonBoxes}
                    </div>
                    <div className='weight-slab-container'>
                        <Table
                            bordered
                            dataSource={dataSource}
                            columns={boxescolumns}
                        />
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in customCartonBoxView::" + ex);
        }
    }

    const standardSkuView = () => {
        try {
            return (
                <div className='standard-sku-container'>
                    <div className='title-Container'>
                        {AppConstants.standardSKUwiseCartonBoxes}
                    </div>
                    <div className='packaging-material-box'>
                        {(cartonBoxesList || []).map((value: any) => {
                            return (
                                <Row>
                                    <Col span={6}>
                                        <div className='checkbox-container'>
                                            <Checkbox onChange={onChange}>{value?.boxName}</Checkbox>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className='price-container'>
                                            <div className='input-field'>
                                                <Input value={value?.price} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className='price-container'>
                                            <div className='per-calculation'>
                                                {value?.uom}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })}

                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in standardSkuView::" + ex);
        }
    }

    const packagingMaterialView = () => {
        try {
            return (
                <div className="packaging-material-container">
                    <div className='title-Container'>
                        {AppConstants.emizaProvidedPackingMaterials}
                    </div>
                    <div className='packaging-material-box'>
                        {(packagingMaterialList || []).map((value: any) => {
                            return (
                                <Row>
                                    <Col span={6}>
                                        <div className='checkbox-container'>
                                            <Checkbox onChange={onChange}>{value?.packagingMaterialName}</Checkbox>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className='price-container'>
                                            <div className='input-field'>
                                                <Input value={value?.price} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className='price-container'>
                                            <div className='per-calculation'>
                                                {value?.uom}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in packagingMaterialView::" + ex);
        }
    }
    const contentView = () => {
        try {
            return (
                <div className="packaging-screen-container">
                    {packagingMaterialView()}
                    {standardSkuView()}
                    {customCartonBoxView()}
                </div>
            )
        } catch (ex) {
            console.log("Error in contentView" + ex);
        }
    }
    return (
        <Layout>
            <NavbarLayout>
                <Layout>
                    <SideMenu
                        selectedKey={AppConstants.packaging} 
                        menu={null}/>
                    <Content>
                        <TitleContainer 
                        title={AppConstants.packaging}
                        screenPath="/otherCharges"
                        screenPreviousPath="/customqc">
                            <div>
                                {contentView()}
                            </div>
                        </TitleContainer>
                    </Content>
                </Layout>
            </NavbarLayout>
        </Layout>
    );
}

export default PackagingScreen;