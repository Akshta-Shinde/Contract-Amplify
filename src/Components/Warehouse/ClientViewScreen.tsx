import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Drawer, Dropdown, Form, Input, Layout, Menu, Modal, Radio, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppConstants from '../../Globals/AppConstants';
import Edit from '../../Images/Edit';
import Email from '../../Images/Email';
import EmizaLogo from '../../Images/EmizaLogo';
import HamburgerIcon from '../../Images/hamburgerIcon';
import More from '../../Images/More';
import Phone from '../../Images/Phone';
import SiderBar from '../SideBar/SideBar';
import "./WarehouseScreen.scss";

const { Option } = Select;
const { confirm } = Modal;

function ClientViewScreen() {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [selectView, setSelectView] = useState<any>(false)
    const [title, setTitle] = useState<any>()
    const [editClient, setEditClient] = useState(false)
    const [industryView, setIndustryView] = useState<any>()

    const drawerOpenVew = () => {
        setOpen(true);
        setEditClient(true)
        setSelectView(null)
    };

    const showDrawer = (title: any) => {
        setOpen(true);
        setSelectView(true)
        setEditClient(false)
        setIndustryView(title)

    };

    const openDrawer = (title: any) => {
        setOpen(true);
        setSelectView(false);
        setTitle(title)
        setEditClient(false)
    }


    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    }

    const menu = () => {
        return (
            <Menu
                className="booth-representative-menu-view"
            >
                <Menu.Item className="booth-representative-menu-view-item" key={1}>
                    <div onClick={() => openDrawer("Edit Contact")}>{"Edit"}</div>
                </Menu.Item>
                <Menu.Item className="booth-representative-menu-view-item" key={1}>
                    <div >{"Delete"}</div>
                </Menu.Item>
            </Menu>
        )
    }

    const industrySelect = () => {
        try {
            return (
                <>
                    {industryView === "Industry" ?
                        <>
                            {([1, 3, 4, 6, 8, 2, 7] || []).map((x: any, index: any) => {
                                return (
                                    <div style={{ marginTop: 20 }}>
                                        <Checkbox onChange={onChange}>{"Lorem Ipsum - Industry"}<span style={{ marginLeft: 5 }}>{x}</span></Checkbox>
                                    </div>
                                )
                            })}
                            <div style={{ marginTop: 20 }}>
                                <Checkbox onChange={onChange}>Other</Checkbox>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
                                <div>
                                    <Button className="create-btn" onClick={onClose}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </> :
                        <>
                            {([1, 3, 4, 6, 8, 2, 7] || []).map((x: any, index: any) => {
                                return (
                                    <div style={{ marginTop: 20 }}>
                                        <Checkbox onChange={onChange}>{"Nelamangala"}<span style={{ marginLeft: 5 }}>{x}</span></Checkbox>
                                    </div>
                                )
                            })}
                            <Row>
                                <Col span={24} className="col-primary-warehouse">
                                    <Form.Item
                                        label="Primary Warehouse"
                                        name="Primary Warehouse"
                                        required
                                        rules={[{ required: true, message: 'Please input Primary Warehouse!' }]}
                                    >
                                        <Select
                                            className='select-field'
                                            placeholder="Select"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
                                <div>
                                    <Button className="cancel-btn" onClick={onClose}>
                                        Cancel
                                    </Button>
                                </div>
                                <div style={{marginLeft:10}}>
                                    <Button className="create-btn" onClick={onClose}>
                                        Associate
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                </>
            )
        } catch (ex) {
            console.log("Error in industrySelect::" + ex)
        }
    }

    const clientEditView = () => {
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
                                    className='text-field'
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
                    {/* {dataValue === true &&
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
                    } */}
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
                        <div>
                            <Button className="create-btn" onClick={onClose}>
                                {"Update"}
                            </Button>
                        </div>
                    </div>
                </>
            )
        } catch (ex) {
            console.log("Error in editClient::" + ex)
        }
    }

    const formView = () => {
        try {
            return (
                <>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Name"
                                label="Name"
                                required
                                rules={[{ required: true, message: 'Please enter Name' }]}
                            >
                                <Input
                                    placeholder="Enter "
                                    className='input-field' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Position"
                                label="Position"
                                required
                                rules={[{ required: true, message: 'Please enter Position' }]}
                            >
                                <Input
                                    placeholder="Enter "
                                    className='input-field' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Mail ID"
                                label="Mail ID"
                                required
                                rules={[{ required: true, message: 'Please enter Mail ID' }]}
                            >
                                <Input
                                    placeholder="Enter "
                                    className='input-field' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Phone Number"
                                label="Phone Number"
                                required
                                rules={[{ required: true, message: 'Please enter Phone Number' }]}
                            >
                                <Input
                                    placeholder="Enter "
                                    className='input-field' />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="Type"
                                label="Type"
                                required
                                rules={[{ required: true, message: 'Please Select Type' }]}
                            >
                                <Select
                                    placeholder="Select "
                                    className='select-field' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 40 }}>
                        <div>
                            <Button className="create-btn" onClick={onClose}>
                                {title === "Contact" ? "Add" : "Update"}
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
                            <div className='add-invoice-text'>{editClient === true ? "Edit Client" : selectView === false ? title : industryView}</div>
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
                        <>
                            {editClient === true &&
                                clientEditView()
                            }

                            {selectView === false &&
                                formView()
                            }
                            {
                                selectView === true &&
                                industrySelect()
                            }
                        </>
                    </Form>

                </Drawer>
            )
        } catch (ex) {
            console.log("Error in viewDrawer::" + ex)
        }
    }

    const viewPopup = () => {
        try {
            return (
                confirm({
                    title: (
                        <div className='popup-heading'>
                            Remove
                        </div>
                    ),
                    content: (
                        <div className='popup-description'>
                            <div className='description'>Do want to remove the Industry “Lorem Ipsum3” ?</div>
                            <div className='popup-info'>* This action can not be undone.</div>
                        </div>
                    ),
                    okText: 'Yes',
                    onOk() {
                        console.log('OK');
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                })
            )

        } catch (ex) {
            console.log("Error in viewpopup::" + ex)
        }
    }

    const ContentView = () => {
        try {
            return (
                <div className="select-right-container">
                    <div className="content-view-container" style={{ borderLeft: "none" }}>
                        <div className="title-header">
                            <div style={{ padding: 20 }}>Mamaearth</div>
                            <div className="btn-container" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button className="green-btn" onClick={() => drawerOpenVew()}>
                                    <Edit />
                                </Button>
                                <Link to='/Client'>
                                    <Button className="close-btn">
                                        <CloseOutlined />
                                    </Button>
                                </Link>
                            </div>

                        </div>
                        <div className='view-part-container' style={{ position: "relative" }}>
                            {/* <div className='client-name'>Mamaearth</div> */}
                            <Row gutter={16} style={{ marginBottom: 40 }}>
                                <Col span={10} className="col-border">
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <div className="content">
                                                <div className="title">GSTIN Number</div>
                                                <div className="value">GST-128464037464</div>
                                            </div>
                                        </Col>

                                        <Col span={6}>
                                            <div className="content">
                                                <div className="title">Type</div>
                                                <div className="value">Primary</div>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="content">
                                                <div className="title">Subsidiary</div>
                                                <div className="history-text">5</div>
                                            </div>
                                        </Col>
                                        <Col span={11}>
                                            <div className="content">
                                                <div className="title">Website</div>
                                                <div className="value">https://www.mamaearth.com</div>
                                            </div>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col span={14} style={{ paddingLeft: 30 }}>
                                    <Row>
                                        <Col span={24}>
                                            <div className="content">
                                                <div className="title">Address</div>
                                                <div className="value">Khasara No. 551/552, Nayak Moholla, Near Holi Chowk, V.P.O Bijwasan, New Delhi, Delhi, 110061</div>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div className="content">
                                                <div className="title">Bill To</div>
                                                <div className="value">Self</div>
                                            </div>
                                        </Col>

                                        {/* <Col span={14}>
                                            <div className="content">
                                                <div className="title">Industry</div>
                                                <div className="value">Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum</div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className='view-content-design'>
                            <div className="view-content " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="content-box content-box" style={{ width: 1375 }}>
                                    <div className="warehouse-container">
                                        <div >Contact</div>
                                        <Button className="view-btn" onClick={() => openDrawer("Contact")} >Manage</Button>
                                    </div>
                                    <Row gutter={16}>
                                        {([1, 2, 3] || []).map((x: any) => {
                                            return (
                                                <Col span={8}>
                                                    <div className='detailed-view'>
                                                        <div className='role-container' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <div className='role-box'>
                                                                <div className='name'>John Williams</div>
                                                                <div className='role'>Manager</div>
                                                            </div>
                                                            <div className='dropdown' style={{ cursor: "pointer" }}>
                                                                <Dropdown overlay={() => menu()} placement="bottomRight" trigger={['click']}>
                                                                    <div><More /></div>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                        <div className='contact-box'>
                                                            <Phone />
                                                            <span>+91 12345 12345</span>
                                                        </div>
                                                        <div className='contact-box'>
                                                            <Email />
                                                            <span>johnwilliams@gmail.com</span>
                                                        </div>
                                                        <div className='role-container' style={{ marginTop: 10 }}>
                                                            <div className='name'>Type<span> - Primary</span></div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })}

                                    </Row>

                                </div>

                            </div>
                            <div className="view-content" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="content-box" >
                                    <div className="warehouse-container">
                                        <div >Industry</div>
                                        <Button className="view-btn" onClick={() => showDrawer("Industry")} >Manage</Button>
                                    </div>
                                    <Row gutter={16}>
                                        {([1, 2, 3] || []).map((x: any) => {
                                            return (
                                                <Col span={8}>
                                                    <div className='view-industry' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <div>Lorem Ipsum - Industry 1</div>
                                                        <div onClick={() => viewPopup()} style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}><CloseOutlined /></div>
                                                    </div>
                                                </Col>
                                            )
                                        })}

                                    </Row>

                                </div>

                            </div>
                            <div className="view-content" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="content-box" >
                                    <div className="warehouse-container">
                                        <div >Warehouse Association</div>
                                        <Button className="view-btn" onClick={() => showDrawer("Warehouse Association")} >Manage</Button>
                                    </div>
                                    <Row gutter={16}>
                                        <Col span={4}>
                                            <div>
                                                <div className='content-title'>Primary Warehouse</div>
                                                <div className='content'>Sai dhara</div>
                                            </div>
                                        </Col>
                                        <Col span={20} className="other-warehouse-col">
                                            <div>
                                                <div className='content-title'>Other Warehouse</div>
                                                <div className='content'>Nelamangala 1, Nelamnagala 2, Lorem Ipsum</div>
                                            </div>
                                        </Col>

                                    </Row>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        } catch (ex) {
            console.log("Error")
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

export default ClientViewScreen;