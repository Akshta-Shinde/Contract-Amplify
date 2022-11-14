import React, { useState } from "react";
import "./WarehouseScreen.scss";
import {
    Layout,
    Row,
    Col,
    Radio,
    Divider,
    Button,
    Drawer,
    Form,
    Input,
    Select,
    DatePicker,
    Menu
} from "antd";
import ColdIcon from "../../Images/coldIcon";
import FilterIcon from "../../Images/filterIcon";
import ThermoIcon from "../../Images/thermoIcon";
import HotIcon from "../../Images/HotIcon";
import ConvertedIcon from "../../Images/convertedIcon";
import BeingRevicesdIcon from "../../Images/BeingRevicesdIcon";
import ExpiredIcon from "../../Images/expiredIcon";
import Discontinued from "../../Images/discontinued";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import NavbarLayout from "../Menu/NavbarLayout";
import type { DatePickerProps } from 'antd';
import SiderBar from "../SideBar/SideBar";
import AppConstants from "../../Globals/AppConstants";
import { Header } from "antd/lib/layout/layout";
import HamburgerIcon from "../../Images/hamburgerIcon";
import { Link } from "react-router-dom";
import EmizaLogo from "../../Images/EmizaLogo";

const { Content } = Layout;


const contractMenu: any = [
    {
        id: 1,
        label: "Mamaearth",
    },
    {
        id: 2,
        label: "Wow Skin Care",
    },
    {
        id: 3,
        label: "Swiss Militiary",
    },
    {
        id: 4,
        label: "Butterfly",
    },
]

const menus: any = [
    {
        id: 1,
        icon: <ColdIcon />,
        label: "Cold",
    },
    {
        id: 2,
        icon: <FilterIcon />,
        label: "Lead",
    },
    {
        id: 3,
        icon: <ThermoIcon />,
        label: "Warm",
    },
    {
        id: 4,
        icon: <HotIcon />,
        label: "Hot",
    },
    {
        id: 5,
        icon: <ConvertedIcon />,
        label: "Converted (live)",
    }, {
        id: 6,
        icon: <BeingRevicesdIcon />,
        label: "Being Revised (live)",
    },
    {
        id: 7,
        icon: <ExpiredIcon />,
        label: "Expired",
    },
    {
        id: 8,
        icon: <Discontinued />,
        label: "Discontinued",
    },
]

function WarehouseScreen() {

    const [form] = Form.useForm();
    const [value, setValue] = useState(1);
    const [contractValue, setContractValue] = useState(1)
    const [open, setOpen] = useState(false);
    const [contractType, setContractType] = useState(1);

    const radioOnChange = (e: any) => {
        setContractType(e.target.value);
    };


    const showDrawer = (item: any) => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e: any) => {
        setValue(e.target.value);
    };

    const contractOnChange = (e: any) => {
        setContractValue(e.target.value);
    }

    const dateOnChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const formView = () => {
        try {
            return (
                <>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Select Client"
                                label="Select Client"
                                required
                                rules={[{ required: true, message: 'Please Select Client' }]}
                            >
                                <Select
                                    placeholder="Select "
                                    className='select-field' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Select Warehouse"
                                label="Select Warehouse"
                                required
                                rules={[{ required: true, message: 'Please Select Warehouse' }]}
                            >
                                <Select
                                    placeholder="Select "
                                    className='select-field' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Start Date"
                                label="Start Date"
                                required
                                rules={[{ required: true, message: 'Please Select Start Date' }]}
                            >
                                <DatePicker onChange={dateOnChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="End Date"
                                label="End Date"
                                required
                                rules={[{ required: true, message: 'Please Select Client' }]}
                            >
                                <DatePicker onChange={dateOnChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="Contract Type"
                        label="Contract Type"
                        required
                        rules={[{ required: true, message: 'Please Select Contract Type' }]}
                    >
                        <div className="contracttype-selection">
                            <Radio.Group
                                onChange={(e: any) => radioOnChange(e)}
                                value={contractType}
                            >
                                <Radio value={1}>{AppConstants.b2Cd2C}</Radio>
                                <Radio value={2}>{AppConstants.b2b}</Radio>
                                <Radio value={3}>{AppConstants.both}</Radio>
                            </Radio.Group>
                        </div>
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
                        <Button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </Button>
                        <div>
                            <Button className="create-btn" onClick={onClose}>
                                Create
                            </Button>
                        </div>
                    </div>
                </>
            )
        } catch (ex) {
            console.log("Error in formView::" + ex)
        }
    }

    const viewDrawer = () => {
        try {
            return (
                <Drawer
                    title={(
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className='add-invoice-box'>
                            <div className='add-invoice-text'>Create Contract</div>
                            <Button onClick={onClose} className="cross-btn">
                                <CloseOutlined />
                            </Button>
                        </div>
                    )}
                    width={400}
                    open={open}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form
                        id='form'
                        form={form}
                        autoComplete="off"
                        noValidate
                        layout="vertical"
                    >
                        {formView()}
                    </Form>

                </Drawer>
            )
        } catch (ex) {
            console.log("Error in viewDrawer::" + ex)
        }
    }

    const warehouseDetails = () => {
        try {
            return (
                <div className="content-view-container">
                    <div className="title-header">
                        <div style={{ padding: 20 }}>Mamaearth</div>
                        <Button className="create-btn" onClick={() => showDrawer(null)}><PlusOutlined />Create Contract</Button>
                    </div>
                    <div className="view-content">
                        {([1, 2, 3, 4] || []).map((x: any) => {
                            return (
                                <div className="content-box">
                                    <div className="warehouse-create-container">
                                        <div >Delhi - Bijwasan, Delhi - Bamnoli</div>
                                        <Button className="view-btn" onClick={() => showDrawer(null)}>View Contract</Button>
                                    </div>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <div className="content">
                                                <div className="title">Start Date</div>
                                                <div className="value">March 28,2022</div>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="content">
                                                <div className="title">End Date</div>
                                                <div className="value">March 28,2022</div>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="content">
                                                <div className="title">Verson No.</div>
                                                <div style={{ display: "flex", alignItems: "center" }} className="value">
                                                    <div>
                                                        3
                                                    </div>
                                                    <span style={{ marginLeft: 20 }} className="history-text">History</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="approved-status">
                                        <div >Approved : </div>
                                        <span>John - March 28,2023</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error in warehouseDetails::" + ex)
        }
    }

    const ContentView = () => {

        try {
            return (
                <div className="create-wareHouse-Container">
                    <Row>
                        <Col span={4}>
                            <div className="contract-header">
                                <div>Contract</div>
                                <span>30</span>
                            </div>
                            <div className="radio-container">
                                <Radio.Group
                                    buttonStyle="solid"
                                    onChange={onChange}
                                    value={value} >
                                    {(menus || []).map((item: any) => {
                                        return (
                                            <Radio.Button value={item.id}>
                                                <div className="card-title" >
                                                    <div>{item.icon}</div>
                                                    <div style={{ marginLeft: 5 }}>{item.label}</div>
                                                </div>
                                                <div className="count">
                                                    0
                                                    {/* <Input readOnly/> */}
                                                </div>
                                            </Radio.Button>
                                        )
                                    })}
                                </Radio.Group>


                            </div>
                        </Col>
                        <Col span={20}>
                            <div className="select-right-container">
                                <Row>
                                    <Col span={5} style={{ backgroundColor: "white", paddingLeft: 5 }}>
                                        <div className="header">
                                            <div>Cold</div>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><SearchOutlined /></div>
                                        </div>
                                        <div className="content-container">
                                            <Radio.Group
                                                buttonStyle="solid"
                                                onChange={contractOnChange}
                                                value={contractValue} >
                                                {(contractMenu || []).map((item: any) => {
                                                    return (
                                                        <Radio.Button value={item.id}>
                                                            <div className="card-title" >
                                                                <div >{item.label}</div>
                                                                <div className="count">
                                                                    8
                                                                </div>
                                                            </div>
                                                        </Radio.Button>
                                                    )
                                                })}
                                            </Radio.Group>


                                        </div>
                                    </Col>
                                    <Col span={19}>
                                        {warehouseDetails()}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        } catch (ex) {
            console.log("Error in ContentView::" + ex)
        }
    }


    return (
        <>
            <Layout>
                <Row className="main-header">
                    <Col span={3}>
                        <div className="d-flex align-c">
                            <div className="menu-icon">
                                <HamburgerIcon />
                            </div>
                            <div className="emiza-icon">
                                <Link to="/SAN" state={{ Option: 1 }}> <EmizaLogo /></Link>
                            </div>
                        </div>
                    </Col>
                    <Col span={21}>
                        <Row>
                            <Col span={23} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <div className="title">Contract</div>
                            </Col>
                            <Col span={1} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                <div className="profile-pic-container">
                                    <div className="profile-pic-inner-container">
                                        <div className="inner-container">
                                            <img
                                                src={"https://media.istockphoto.com/photos/portrait-of-smiling-caucasian-man-pose-in-office-picture-id1303206644?k=20&m=1303206644&s=612x612&w=0&h=B_CmLsEzLVKNb11awhk2S8HZkIoNpgBEe-dECLlYq0Y="}
                                                alt="profile-pic"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Col>

                </Row>
                <Layout style={{ padding: "none" }} className="children-container">
                    <SiderBar
                        menuId="1" />
                    <Content>
                        <>
                            {ContentView()}
                            {open && <div className='view-container'>{viewDrawer()}</div>}
                        </>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default WarehouseScreen;
