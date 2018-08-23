import React from 'react';
import moment from 'moment';
import { Form, Select, Button, Radio, DatePicker, Input, Row, Col } from 'antd';

const $1$Filter = ({
  // model state
  $2$Module,
  mergeData,
}) => {
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <Form.Item label="供应商">
              <Select style={{ minWidth: 215 }} filterOption={false} showSearch>
                <Select.Option value="" key="option">
                  请选择供应商
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="单号">
              <Input style={{ minWidth: 215 }} onChange={() => {}} placeholder="请输入单据编号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="操作日期">
              <DatePicker.RangePicker
                style={{ minWidth: 215 }}
                allowClear={false}
                format="YYYY-MM-DD"
                onChange={() => {}}
                renderExtraFooter={() => <div style={{ textAlign: 'center', color: '#bfbfbf' }}>请点选两个时间以确定一个时间范围</div>}
                ranges={{
                  前1月: [moment().subtract(1, 'month'), moment()],
                  前15天: [moment().subtract(15, 'day'), moment()],
                  前7天: [moment().subtract(7, 'day'), moment()],
                  前3天: [moment().subtract(3, 'day'), moment()],
                  今天: [moment(), moment()],
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item label="状态">
              <Radio.Group onChange={() => {}} value="" >
                <Radio.Button value="962">已审核</Radio.Button>
                <Radio.Button value="961">待审核</Radio.Button>
                <Radio.Button value="960">已作废</Radio.Button>
                <Radio.Button value="">全部</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" onClick={() => {}}>
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="float-top">
        <Button type="primary" size="large" onClick={() => {}}>
          添加单据
        </Button>
      </div>
    </div>
  );
};

export default Form.create()($1$Filter);
