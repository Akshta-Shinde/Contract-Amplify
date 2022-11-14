import React, { useState } from 'react';
import AppConstants from '../../Globals/AppConstants';
import {
    Layout,
    Menu
} from 'antd';
import "./Menu.scss"
import WareHouseIcon from '../../Images/WareHouseIcon';
import InwardStickeringIcon from '../../Images/InwardStickeringIcon';
import OrderProcessingIcon from '../../Images/OrderProcessingIcon';
import RTOIcon from '../../Images/RTOIcon';
import ReturnIcon from '../../Images/ReturnIcon';
import LoadingIcon from '../../Images/LoadingIcon';
import UnloadingIcon from '../../Images/UnloadingIcon';
import StickeringIcon from '../../Images/StickeringIcon';
import CustomQCIcon from '../../Images/CustomQCIcon';
import PackagingIcon from '../../Images/PackagingIcon';
import OtherChargesIcon from '../../Images/OtherChargesIcon';
import InventoryIcon from '../../Images/InventoryIcon';
import EmizaLogo from '../../Images/EmizaLogo';

import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import StorageIcon from '../../Images/StorageIcon';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return (
        {
            key,
            icon,
            children,
            label,
            type
        } as MenuItem
    );
}


interface SideMenuProps {
    selectedKey: string,
    openKey?: any
    menu:any
}

function SideMenu({ selectedKey, openKey,menu }: SideMenuProps) {
    console.log("side menu",selectedKey,openKey,menu)
    const [openKeys, setOpenKeys] = useState([openKey]);
    // const refreshPage = (path:any)=>{
    //     window.location.reload();
    //  }

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload();
        }, 1);
        console.log('page to reload')
    }
    const items: MenuItem[] = [
        getItem(<Link to="/inventory" onClick={refreshPage}>{AppConstants.storage}</Link>, AppConstants.storage, <StorageIcon />, [
            getItem(<Link to="/inventory" onClick={refreshPage}>{AppConstants.inventory}</Link>, AppConstants.inventory),
            getItem(<Link to="/packaging-material" onClick={refreshPage}>{AppConstants.packagingMaterial}</Link>, AppConstants.packagingMaterial),
            getItem(<Link to="/free-storage" onClick={refreshPage}>{AppConstants.freeStorage}</Link>, AppConstants.freeStorage),
        ]),
        getItem(<Link to="/inward" onClick={refreshPage}>{AppConstants.inward}</Link>, AppConstants.inward, <InventoryIcon />),
        getItem(<Link to="/order-processing "onClick={refreshPage}>{AppConstants.orderProcessing}</Link>, AppConstants.orderProcessing, <OrderProcessingIcon />, [
            getItem(<Link to="/order-processing" onClick={refreshPage}>{AppConstants.b2Cd2C}</Link>, AppConstants.b2Cd2C),
            getItem(<Link to="/kitting" onClick={refreshPage}>{AppConstants.kitting}</Link>, AppConstants.kitting),
            getItem(<Link to="/b2b" onClick={refreshPage}>{AppConstants.b2B}</Link>, AppConstants.b2B),
            getItem(<Link to="/rTVsTN" onClick={refreshPage}>{AppConstants.rTVsTN}</Link>, AppConstants.rTVsTN),
            getItem(<Link to="/internalstocktransfer" onClick={refreshPage}>{AppConstants.internalStocktransfer}</Link>, AppConstants.internalStocktransfer),
        ]),
        getItem(<Link to="/rto-b2cd2c" onClick={refreshPage}>{AppConstants.rto}</Link>, AppConstants.rto, <RTOIcon />, [
            getItem(<Link to="/rto-b2cd2c" onClick={refreshPage}>{AppConstants.b2Cd2C}</Link>, AppConstants.b2Cd2C),
            getItem(<Link to="/rto-b2b" onClick={refreshPage}>{AppConstants.b2B}</Link>, AppConstants.b2B),
            getItem(<Link to="/rto-exemption" onClick={refreshPage}>{AppConstants.exemption}</Link>, AppConstants.exemption),
        ]),
        getItem(<Link to="/return-b2cd2c" onClick={refreshPage}>{AppConstants.return}</Link>, AppConstants.return, <ReturnIcon />, [
            getItem(<Link to="/return-b2cd2c" onClick={refreshPage}>{AppConstants.b2Cd2C}</Link>, AppConstants.b2Cd2C),
            getItem(<Link to="/return-b2b" onClick={refreshPage}>{AppConstants.b2B}</Link>, AppConstants.b2B),
        ]),
        getItem(<Link to="/loading" onClick={refreshPage}>{AppConstants.loading}</Link>, AppConstants.loading, <LoadingIcon />),
        getItem(<Link to="/unloading" onClick={refreshPage}>{AppConstants.unloading}</Link>, AppConstants.unloading, <UnloadingIcon />),
        getItem(<Link to="/stickering" onClick={refreshPage}>{AppConstants.stickering}</Link>, AppConstants.stickering, <StickeringIcon />),
        getItem(<Link to="/inward-stickering" onClick={refreshPage}>{AppConstants.inwardStickering}</Link>, AppConstants.inwardStickering, <InwardStickeringIcon />),
        getItem(<Link to="/customqc" onClick={refreshPage}>{AppConstants.customQC}</Link>, AppConstants.customQC, <CustomQCIcon />),
        getItem(<Link to="/packaging" onClick={refreshPage}>{AppConstants.packaging}</Link>, AppConstants.packaging, <PackagingIcon />),
        getItem(<Link to="/otherCharges" onClick={refreshPage}>{AppConstants.otherCharges}</Link>, AppConstants.otherCharges, <OtherChargesIcon />),
    ];

    const rootSubmenuKeys = [AppConstants.storage, AppConstants.orderProcessing, AppConstants.rto, AppConstants.return];

    
    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        console.log("latestOpenKeyis",latestOpenKey)
        
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Sider
        className="app-side-bar">
            <div className='side-bar-menu-container' style={{width: 250}}>
                <Menu
                    mode="inline"
                    className="menu"
                    items={items}
                    defaultSelectedKeys={[selectedKey]}
                    defaultOpenKeys={openKeys}
                    onOpenChange={onOpenChange}
                />
            </div>
        </Sider>
    );
}

export default SideMenu;