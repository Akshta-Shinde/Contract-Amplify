import { Row, Col, Select, Drawer } from "antd";
import { useState } from "react";
import AppConstants from "../../Globals/AppConstants";
import EmizaLogo from "../../Images/EmizaLogo";
import './Menu.scss';

const { Option } = Select;

interface NavbarLayoutProps{
    children: any
}

function NavbarLayout(props: NavbarLayoutProps) {
    const {
        children
    } = props;

    return (
        <div>
            <Row className="nav-bar-layout-container">
                <Col 
                span={4}
                className="emiza-icon">
                    <EmizaLogo />
                </Col>
                <Col span={20}>
                    <Row 
                    className="align-item-center"
                    gutter={8}>
                        <Col span={4}>
                            <span className="selection-title">{AppConstants.module + ": "}</span>
                            <span className="selection-value">{"Contract"}</span>
                        </Col>
                        <Col span={4}>
                            <span className="selection-title">{AppConstants.process + ": "}</span>
                            <span className="selection-value">{"Creation"}</span>
                        </Col>
                        <Col span={16} className="img-col">
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
            <div className="children-container">
                {children}
            </div>
        </div>
    )
}
export default NavbarLayout;