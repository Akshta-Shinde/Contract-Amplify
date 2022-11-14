import {
    Menu,
    Layout
} from "antd";
import React from "react";
import { Link } from 'react-router-dom';
import ClientIcon from "../../Images/ClientIcon";
import ContractIcon from "../../Images/ContractIcon";
import './SideBar.scss';

const {
    Sider
} = Layout;

function SiderBar(props: any) {
    const {
        menuId = 1
    } = props;

    const headers: any = [
        {
            id: 1,
            label: "Contracts",
            icon: <ContractIcon />,
            path: "/warehouse"
        },
        {
            id:2,
            label:"Clients",
            icon:<ClientIcon/>,
            path:"/Client"
        }

    ]

    return (
        <Sider className='sider-bar-container'>
            <Menu
                mode="inline"
                className="menu"
                defaultSelectedKeys={[menuId]}>
                {(headers || []).map((menu: any, index: any) => {
                    return (
                        <Menu.Item key={menu.id}>
                            <div className="icon-bg">
                                <Link to={menu.path} state={{ Option: 1 }}>

                                    <div style={{marginTop:5}}>
                                        {menu.icon}
                                    </div>
                                    <div className="icon-label"style={{marginTop:10,marginBottom:10}}>{menu.label}</div>
                                    <div className="count"></div>


                                </Link>
                            </div>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
    )
}

export default SiderBar