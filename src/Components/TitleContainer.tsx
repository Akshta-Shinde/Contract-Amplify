import React from "react";
import { Button, Row, Col } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusCircleFilled } from "@ant-design/icons";
import "./TitleContainer.scss";
import { PreviewIcon } from "../Images/PreviewIcon";
import { CloseCircleFilled } from "@ant-design/icons";
import AppConstants from "../Globals/AppConstants";
import { Link } from 'react-router-dom';

interface TitleContainerProps {
  children: any;
  title?: any;
  screenPath?: any;
  screenPreviousPath?:any
}

function TitleContainer({ children,title,screenPath,screenPreviousPath }: TitleContainerProps) {

  const wareHouseDetailsView = () => {
    try {
      return (
        <div className="warehouse-details-container">
          <table className="w-100">
            <thead>
              <tr>
                
                {(title !== AppConstants.wareHouse) && (
                  <th className="details-heading-lbl">{AppConstants.warehouses}</th>
                )}
                <th className="details-heading-lbl">{AppConstants.type}</th>
                <th className="details-heading-lbl">{AppConstants.quotationCreated}</th>
                <th className="details-heading-lbl">{AppConstants.lastUpdated}</th>
                <th className="details-heading-lbl">{AppConstants.status}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              
                {(title !== AppConstants.wareHouse) && (
                  <td className="details-count">Nelamangala</td>
                )}
                <td className="details-value">B2C/D2C</td>
                <td className="details-value">01-July-2022</td>
                <td className="details-value">15-July-2022</td>
                <td className="details-value">Draft</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } catch (ex) {
      console.log("Error in wareHouseStatus::" + ex);
    }
  };

  const previewCloseView = () => {
    return(
      <div className="preview-close-container">
        <div className="preview-button-container">
          <PreviewIcon />
          <div>{AppConstants.preview}</div>
        </div>
        <div className="close-button-container">
          <CloseCircleFilled className="close-icon"/>
          <div>{AppConstants.close}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="title-container">
        <div className="title-container-header-bar">
          <Row gutter={8}>
            <Col span={4}>
              <div className="client-name-container">
                Mamaearth
              </div>
            </Col>
            <Col span={18}>
              {wareHouseDetailsView()}
            </Col>
            <Col span={2}>
              {previewCloseView()}
            </Col>
          </Row>
        </div>
        <div className="title-container-sub-header-bar">
          <Row className="align-item-center">
            <Col span={6}>
              <div className="screen-lbl">
                {title}
              </div>
            </Col>
            <Col span={6}>
              {(title === AppConstants.otherCharges || title === AppConstants.packaging ) &&
                <div className="price-header-lbl">{AppConstants.price}</div>
              }
            </Col>
            <Col span={6}>
              {(title === AppConstants.otherCharges || title === AppConstants.packaging ) &&
                <div className="uom-header-lbl">{AppConstants.uom}</div>
              }
            </Col>
            <Col span={6}>
              <div className="buttons-container">
                {title === AppConstants.otherCharges &&
                  <Button 
                  icon={<PlusCircleFilled />}
                  className="btn ml-auto me-2">
                      {AppConstants.add}
                  </Button>
                }
                {title !== AppConstants.wareHouse &&
                  <Button 
                  icon={<ArrowLeftOutlined />}
                  className={title === AppConstants.otherCharges ? "btn me-2" : "btn ml-auto"}>
                      {AppConstants.previous}
                  </Button>
                }
                {title !== AppConstants.otherCharges &&
                  <Button 
                  className={title === AppConstants.wareHouse ? "btn ml-auto" : "btn ms-2"}>
                    {AppConstants.next}
                    <ArrowRightOutlined />
                  </Button>
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="title-container-children">
        {children}
      </div>
    </div>
    
  );
}

export default TitleContainer;
