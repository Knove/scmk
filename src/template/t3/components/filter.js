import React from 'react';
import { Form, Input, Button, Row, Col, Card, Tree, Select, Icon } from 'antd';
import $1$Table from './table';
import INVENTORY_PERMISSION from '../../common/Permission/inventoryPermission';
import Permission from '../../common/Permission/Permission';

const TreeNode = Tree.TreeNode;

const $1$Filter = ({
  // model state
  $2$Module,
  $2$TableData,
  selectTree,
  mergeData,
  searchAction,
}) => {
  const state = $2$Module;
  const objectOptions =
    state.goodsCateList &&
    state.goodsCateList.map(store => (
      <Select.Option value={store.id} key={store.id}>
        {store.cateName}
      </Select.Option>
    ));
  const gData = state.treeList;
  const dataList = [];
  const generateList = (data) => {
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i];
      const afterTitle = node.storeName || node.stallName;
      const afterKey = node.storeId || node.id;
      dataList.push({ key: afterKey, title: afterTitle });
      if (node.stallList) {
        generateList(node.stallList, afterKey);
      }
    }
  };
  generateList(gData);
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i += 1) {
      const node = tree[i];
      if (node.stallList) {
        if (node.stallList.some(item => item.storeId === key || item.id === key)) {
          parentKey = node.storeId || node.id;
        } else if (getParentKey(key, node.stallList)) {
          parentKey = getParentKey(key, node.stallList);
        }
      }
    }
    return parentKey;
  };
  const onChange = (e) => {
    const value = e.target.value;
    const expandedKeysList = dataList
      .map((item) => {
        if (item.title && item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    mergeData({
      expandedKeys: expandedKeysList,
      searchValue: value,
      autoExpandParent: true,
    });
  };
  const onExpand = (value) => {
    mergeData({
      expandedKeys: value,
      autoExpandParent: false,
    });
  };
  const loop = data =>
    data.map((item) => {
      const afterTitle = item.storeName || item.stallName;
      const afterKey = item.storeId || item.id;
      const index = afterTitle.indexOf(state.searchValue);
      const beforeStr = afterTitle.substr(0, index);
      const afterStr = afterTitle.substr(index + state.searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{state.searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{afterTitle}</span>
        );
      if (item.stallList && item.stallList.length) {
        return (
          <TreeNode key={afterKey} title={title} hasChildren>
            {loop(item.stallList)}
          </TreeNode>
        );
      }
      if (item.storeId) {
        return <TreeNode key={afterKey} title={title} hasChildren />;
      }
      return <TreeNode key={afterKey} title={title} />;
    });
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <Form.Item label="选择框">
              <Select
                placeholder="请选择..."
                style={{ minWidth: 215 }}
                value={state.objectId}
                onChange={(value) => {
                  mergeData({ objectId: value });
                  searchAction();
                }}
              >
                <Select.Option value="" key="">
                  请选择...
                </Select.Option>
                {objectOptions}
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
            <Form.Item>
              <Button type="primary" onClick={() => searchAction()}>
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row gutter={16}>
        <Col span={6} style={{ marginTop: 16 }}>
          <Card hoverable={false}>
            <Input prefix={<Icon type="filter" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ marginBottom: 8 }} placeholder="请输入..." onChange={onChange} />
            <Tree onExpand={onExpand} selectedKeys={state.selectedKeys} onSelect={selectTree} expandedKeys={state.expandedKeys} autoExpandParent={state.autoExpandParent}>
              {loop(gData)}
            </Tree>
          </Card>
        </Col>
        <Col span={18}>
          <div className="new-pageNum">
            <$1$Table {...$2$TableData} />
          </div>
        </Col>
      </Row>
      <div className="float-top">
        <Permission path={INVENTORY_PERMISSION.GOODS_RELATION.GOODS_COPY}>
          <Button onClick={() => {}}>
            右上角功能框
          </Button>
        </Permission>
      </div>
    </div>
  );
};

export default Form.create()($1$Filter);
