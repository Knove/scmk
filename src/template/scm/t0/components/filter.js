import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';

const $1$Filter = ({
  // model state
  $2$Module,
  mergeData,
  searchAction,
}) => {
  const state = $2$Module;
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
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
          <Col span={8} />
          <Col span={8}>
            <Form.Item>
              <Button type="primary" onClick={() => searchAction()}>
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create()($1$Filter);
