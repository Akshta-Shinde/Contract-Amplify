import { Col, Radio, Row, Space } from 'antd';
import React, { useState } from 'react';
import AppConstants from '../Globals/AppConstants';

interface RadioGroupContainerProps {
    children: any;
    options: any;
    handleRadioSelect: (value: any) => void;
    value: any;
}

function RadioGroupContainer({ children, options, handleRadioSelect, value }: RadioGroupContainerProps) {
    return (
        <Row>
            <Col span={5}>
                <div className='inventory-option'>
                    <Radio.Group 
                    onChange={handleRadioSelect} 
                    value={value}>
                        <Space direction="vertical">
                            {(options || []).map((option: any) => {
                                return (
                                    <Radio
                                        value={option?.id}
                                        key={option?.id}>
                                        {option?.name}
                                    </Radio>
                                )
                            })}
                        </Space>
                    </Radio.Group>
                </div>
            </Col>
            <Col span={19}>
                {children}
            </Col>
        </Row>
    );
}

export default RadioGroupContainer;