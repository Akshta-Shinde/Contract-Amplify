import { CloseOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Dropdown, Form, Input, Layout, Menu, Radio, Row, Select, } from 'antd';
import form from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppConstants from '../../Globals/AppConstants';
import Add from '../../Images/Add';
import EmizaLogo from '../../Images/EmizaLogo';
import Filter from '../../Images/Filter';
import HamburgerIcon from '../../Images/hamburgerIcon';
import More from '../../Images/More';
import SiderBar from '../SideBar/SideBar';
import "./WarehouseScreen.scss";

const suffix = (

    <SearchOutlined
        style={{
            fontSize: 20,
            color: 'black',
            marginRight: 10
        }}
    />
);

const { Option } = Select;

function ClientScreen() {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState()
    const [dataValue,setDataValue] = useState(false)

    const onChange1 = (e: any) => {
        setValue(e.target.value)
        console.log(`checked = ${e.target.checked}`);
    }

    const drawerViewOpen = () =>{
        setDataValue(true)
        setOpen(true);
    }

    const menu = () => {
        return (
            <Menu
                className="booth-representative-menu-view"
            >
                <Menu.Item className="booth-representative-menu-view-item" key={1}>
                    <div onClick={() => setOpen(true)}>{"Edit"}</div>
                </Menu.Item>
                <Menu.Item className="booth-representative-menu-view-item" key={1}>
                    <div>{"Delete"}</div>
                </Menu.Item>
            </Menu>
        )
    }

    const onClose = () => {
        setOpen(false);
    };

    const formView = () => {
        try {
            return (
                <>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Company Name"
                                name="Company Name"
                                required
                                rules={[{ required: true, message: 'Please input Company Name!' }]}
                            >
                                <Input
                                    className='input-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="GSTIN Number"
                                label="GSTIN Number"
                                required
                                rules={[{ required: true, message: 'Please input GSTIN Number!' }]}
                            >
                                <Input
                                    className='input-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Company Type"
                                label="Company Type"
                                required
                                rules={[{ required: true, message: 'Please input Company Type!' }]}
                            >
                                <Select
                                    className='select-field'
                                    placeholder="Select"
                                >
                                    <Option value="primary">Primary</Option>
                                    <Option value="Secondary">Secondary</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Website"
                                name="Website"
                                required
                                rules={[{ required: true, message: 'Please input Website!' }]}
                            >
                                <Input
                                    className='input-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className='bill-container' style={{ marginTop: 20, marginBottom: 20 }}>Address</div>
                    <Row >
                        <Col span={24}>
                            <Form.Item
                                label="Address"
                                name="Address"
                                required
                                rules={[{ required: true, message: 'Please input Address!' }]}
                            >
                                <TextArea
                                    className='text-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="City"
                                name="City"
                                required
                                rules={[{ required: true, message: 'Please input City!' }]}
                            >
                                <Input
                                    className='input-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="State"
                                name="State"
                                required
                                rules={[{ required: true, message: 'Please input State!' }]}
                            >
                                <Select
                                    className='select-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Postal Code"
                                label="Postal Code"
                                required
                                rules={[{ required: true, message: 'Please input Postal Code!' }]}
                            >
                                <Input
                                    className='input-field'
                                    placeholder="Enter"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {dataValue === true &&
                    <div className='bill-container' style={{ marginTop: 20 }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div className='label'>Bill to</div>
                            </Col>
                            <Col span={12}>
                                <Radio.Group
                                    onChange={(e: any) => onChange1(e)}
                                    value={value}
                                >
                                    <Radio value={1}>Self</Radio>

                                    <Radio value={2}>Parent</Radio>


                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                    }
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
                        <div>
                            <Button className="create-btn" onClick={onClose}>
                                {dataValue === true ? "Create":"Update"}
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
        console.log("viewDrawer")
        try {
            return (
                <Drawer
                    title={(
                        <div className="client-drawer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                            <div className='add-invoice-text'>{dataValue === true ? "Create Client":"Edit Client"}</div>
                            <div className="btn-container" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button className="close-btn" onClick={() => setOpen(false)}>
                                    <CloseOutlined />
                                </Button>
                            </div>
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


    const ContentView = () => {
        try {
            return (
                <div className="select-right-container">
                    <div className="content-view-container" style={{ borderLeft: "none" }}>
                        <div className="title-header">
                            <div style={{ padding: 20 }}>All Clients</div>
                            <div className="btn-container" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Input placeholder="Search By Customer Name" className="search-input" prefix={suffix} />
                                <Button className="green-btn">
                                    <Filter />
                                </Button>
                                <Button className="create-btn" onClick={()=>drawerViewOpen()}><Add />Create Client</Button>

                            </div>

                        </div>
                        <div className="view-content" style={{ background: "white" }}>
                            <Row gutter={16}>
                                {([1, 2, 3, 4] || []).map((x: any) => {
                                    return (

                                        <Col span={12}>
                                            <div className="content-box content-box-design">
                                                <div className="warehouse-create-container">
                                                    <div >Mamaearth</div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <Link to="/view-client">
                                                            <Button className="view-btn" >View Full Profile</Button>
                                                        </Link>
                                                        <div className='dropdown' style={{ cursor: "pointer" }}>
                                                            <Dropdown overlay={() => menu()} placement="bottomRight" trigger={['click']}>
                                                                <div><More /></div>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Row gutter={16}>
                                                    <Col span={9}>
                                                        <div className="content">
                                                            <div className="title">GSTIN Number</div>
                                                            <div className="value">GST-128464037464</div>
                                                        </div>
                                                    </Col>
                                                    <Col span={11}>
                                                        <div className="content">
                                                            <div className="title">Website</div>
                                                            <div className="value">https://www.mamaearth.com</div>
                                                        </div>
                                                    </Col>
                                                    <Col span={4}>
                                                        <div className="content">
                                                            <div className="title">Type</div>
                                                            <div className="value">Primary</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row gutter={16} style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
                                                    <Col span={20}>
                                                        <div className="contract-container" style={{ width: 505 }}>
                                                            <div className="title">Contact</div>
                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                <div className="value" style={{ width: 205 }}>Primary <span>- 1</span></div>
                                                                <div className="value" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>Secondary<span>- 3</span></div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={4}>
                                                        <div className="content">
                                                            <div className="title">Subsidiary</div>
                                                            <div className="history-text">5</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={21}>
                                                        <div className="content">
                                                            <div className="title">Address</div>
                                                            <div className="value">Khasara No. 551/552, Nayak Moholla, Near Holi Chowk, V.P.O Bijwasan, New Delhi, Delhi, 110061</div>
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Col>

                                    )
                                })}
                            </Row>
                        </div>
                    </div>
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
                                <Link to="/inventory" state={{ Option: 1 }}> <EmizaLogo /></Link>
                            </div>
                        </div>
                    </Col>
                    <Col span={21}>
                        <Row>
                            <Col span={23} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <div className="title">Clients</div>
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
                        menuId="2" />
                    <Content>
                        <>
                            <div className="create-wareHouse-Container">
                                {ContentView()}
                            </div>
                            {open && <div className='view-container'>{viewDrawer()}</div>}
                        </>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default ClientScreen;