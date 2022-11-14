import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Form, Input, Layout, Menu, Radio, Row, Select } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmizaLogo from '../../Images/EmizaLogo';
import HamburgerIcon from '../../Images/hamburgerIcon';
import SiderBar from '../SideBar/SideBar';
import "./WarehouseScreen.scss";

function CreateClientScreen() {
    const [form] = Form.useForm();
    const [value, setValue] = useState()
    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const onChange1 = (e: any) => {
        setValue(e.target.value)
        console.log(`checked = ${e.target.checked}`);
    }

    const formView = () => {

        const menu = () => {
            return (
                <Menu
                    className="booth-representative-menu-view"
                >
                    <Menu.Item className="booth-representative-menu-view-item" key={1}>
                        <Link to="/captureinvoicedetails">{"Edit"}</Link>
                    </Menu.Item>
                </Menu>
            )
        }
        try {
            return (
                <>
                    <div className='content-container-form'>
                        <Row gutter={16}>

                            <Col span={6}>
                                <Form.Item
                                    label="Company Name"
                                    name="Company Name"
                                    required
                                    rules={[{ required: true, message: 'Please input Company Name!' }]}
                                >
                                    <Input
                                        placeholder="Enter"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="Company Type"
                                    label="Company Type"
                                    required
                                    rules={[{ required: true, message: 'Please input Company Type!' }]}
                                >
                                    <Select
                                        placeholder="Select"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Primary"
                                    name="Primary"
                                    required
                                    rules={[{ required: true, message: 'Please input Primary!' }]}
                                >
                                    <Select
                                        placeholder="Select"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="GSTIN Number"
                                    label="GSTIN Number"
                                    required
                                    rules={[{ required: true, message: 'Please input GSTIN Number!' }]}
                                >
                                    <Input
                                        placeholder="Enter"
                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16} style={{ marginTop: 10, marginBottom: 10 }}>
                            <Col span={12}>
                                <Form.Item
                                    label="Website"
                                    name="Website"
                                    required
                                    rules={[{ required: true, message: 'Please input Website!' }]}
                                >
                                    <Input
                                        placeholder="Enter"
                                    />
                                </Form.Item></Col>

                            <Col span={6}>
                                <Form.Item
                                    label="Mail ID"
                                    name="Mail ID"
                                    required
                                    rules={[{ required: true, message: 'Please input Mail ID!' }]}
                                >
                                    <Input
                                        placeholder="Enter"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}></Col>
                        </Row>
                    </div>
                    <div className='content-container-form' style={{ marginTop: 20 }}>
                        <div className='label'>Address</div>
                        <Row gutter={16} style={{ marginTop: 10 }}>
                            <Col span={24}>
                                <Form.Item
                                    label="Address"
                                    name="Address"
                                    required
                                    rules={[{ required: true, message: 'Please input Address!' }]}
                                >
                                    <Input
                                        placeholder="Enter"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 10 }}>
                            <Col span={6}>
                                <Form.Item
                                    label="City"
                                    name="City"
                                    required
                                    rules={[{ required: true, message: 'Please input City!' }]}
                                >
                                    <Input
                                        placeholder="Enter"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="Postal Code"
                                    label="Postal Code"
                                    required
                                    rules={[{ required: true, message: 'Please input Postal Code!' }]}
                                >
                                    <Input
                                        placeholder="Select"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="State"
                                    name="State"
                                    required
                                    rules={[{ required: true, message: 'Please input State!' }]}
                                >
                                    <Input
                                        placeholder="Select"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                            </Col>

                        </Row>
                    </div>
                    <div className='content-container-form' style={{ marginTop: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className='label'>Contact</div>
                            <Checkbox onChange={onChange}>Multiple Primary</Checkbox>
                        </div>
                        <div className='contact-container'>
                            <Row gutter={16}>

                                <Col span={9}>
                                    <Row gutter={16}>

                                        <Col span={12}>
                                            <Form.Item
                                                label="Name"
                                                name="Name"
                                                required
                                                rules={[{ required: true, message: 'Please input  Name!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Position"
                                                label="Position"
                                                required
                                                rules={[{ required: true, message: 'Please input Position!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter"
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                </Col>
                                <Col span={9}>
                                    <Row gutter={16}>

                                        <Col span={12}>
                                            <Form.Item
                                                label="Mail ID"
                                                name="Mail ID"
                                                required
                                                rules={[{ required: true, message: 'Please input Mail ID!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Phone Number"
                                                label="Phone Number"
                                                required
                                                rules={[{ required: true, message: 'Please input Phone Number!' }]}
                                            >
                                                <Input
                                                    placeholder="Enter"
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                </Col>

                                <Col span={6}>
                                    <Row gutter={16}>

                                        <Col span={18}>
                                            <Form.Item
                                                name="Type"
                                                label="Type"
                                                required
                                                rules={[{ required: true, message: 'Please input Type!' }]}
                                            >
                                                <Select
                                                    placeholder="Select"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} style={{ display: "flex", justifyContent: "center", alignItems:"center",marginTop:15 }}>
                                            <div className='btn-container'>
                                                <Button className='green-btn'>Add</Button>
                                            </div>
                                        </Col>

                                    </Row>

                                </Col>


                            </Row>
                        </div>
                        {([1, 2, 3] || []).map((x: any) => {
                            return (
                                <div className='detail-container'>
                                    <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={6}>
                                            <div className='label' style={{ marginBottom: 0 }}>John Williams (Manager)</div>
                                        </Col>
                                        <Col span={6}>
                                            <div className='label' style={{ marginBottom: 0 }}>johnwilliams@mail.com</div>
                                        </Col>
                                        <Col span={6}>
                                            <div className='label' style={{ marginBottom: 0 }}>+91 12345 12345</div>
                                        </Col>
                                        <Col span={6}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div className='type'>Primary</div>
                                                <div className='dropdown' style={{ cursor: "pointer" }}>
                                                    <Dropdown overlay={() => menu()} placement="bottomRight" trigger={['click']}>
                                                        <MoreOutlined />
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>
                                </div>
                            )
                        })}

                    </div>
                    {([1, 2] || []).map((x: any) => {
                        return (
                            <div className='content-container-form' style={{ marginTop: 20 }}>
                                <Row gutter={16}>
                                    <Col span={4}>
                                        <div className='label' style={{ marginBottom: 0 }}>Bill to</div>
                                    </Col>
                                    <Col span={20}>
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
                        )
                    })}
                </>
            )
        } catch (ex) {
            console.log("Error")
        }
    }

    const ContentView = () => {
        try {
            return (
                <div className="select-right-container">
                    <div className="content-view-container" style={{ borderLeft: "none" }}>
                        <div className="title-header">
                            <div style={{ padding: 20 }}>Add/Edit Profile</div>
                            <div className="btn-container" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Link to='/Client'>
                                    <Button className="close-btn">
                                        <CloseOutlined />
                                    </Button>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className='content-form-container'>
                        <Form
                            id='form'
                            form={form}
                            autoComplete="off"
                            noValidate
                            layout="vertical"
                        >
                            {formView()}
                        </Form>
                        <div className="btn-container" style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}>
                            <Link to='/Client'>
                                <Button className='close-btn'>
                                    Cancel
                                </Button>
                            </Link>
                            <div style={{marginLeft: 10}}>
                                <Button className='green-btn' >
                                    Save
                                </Button>
                            </div>
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
                            <div className="create-wareHouse-Container" style={{ marginBottom: 50 }}>
                                {ContentView()}
                            </div>
                        </>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default CreateClientScreen;