import React from 'react';
import moment from 'moment';
import { Form, Select, Button, Radio, DatePicker, Input, Row, Col } from 'antd';

const $1$Filter = ({
  // model state
  $2$Module,
  mergeData,
  searchAction,
  routerGo,
  supplierSearchAction,
}) => {
  const state = $2$Module;
  const orgOptions =
    state.supplierList &&
    state.supplierList.map(supplier => (
      <Select.Option value={supplier.id} key={supplier.id}>
        {supplier.suppName}
      </Select.Option>
    ));
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <Form.Item label="下拉选择">
              <Select
                style={{ minWidth: 215 }}
                value={state.supplierId}
                filterOption={false}
                showSearch
                onSearch={(value) => {
                  supplierSearchAction(value);
                }}
                onChange={(value) => {
                  mergeData({ supplierId: value });
                  searchAction();
                }}
              >
                {orgOptions}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="输入框">
              <Input
                style={{ minWidth: 215 }}
                value={state.inputValue}
                onChange={(event) => {
                  mergeData({ inputValue: event.target.value });
                }}
                placeholder="请输入..."
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="日期选择">
              <DatePicker.RangePicker
                style={{ minWidth: 215 }}
                allowClear={false}
                format="YYYY-MM-DD"
                onChange={(value) => {
                  mergeData({ datePicker: value });
                  searchAction();
                }}
                value={state.datePicker}
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
              <Radio.Group
                onChange={(event) => {
                  mergeData({ status: event.target.value });
                  searchAction();
                }}
                value={state.status}
              >
                <Radio.Button value="962">已审核</Radio.Button>
                <Radio.Button value="961">待审核</Radio.Button>
                <Radio.Button value="960">已作废</Radio.Button>
                <Radio.Button value="">全部</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" onClick={() => searchAction()}>
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="float-top">
        <Button
          onClick={() => {
            routerGo('/stock/$2$/detail/add/0/0');
          }}
        >
          新增
        </Button>
      </div>
    </div>
  );
};

export default Form.create()($1$Filter);
