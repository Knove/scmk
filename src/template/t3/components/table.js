import React from 'react';
import { Table, Form } from 'antd';

function $1$Table({ $2$Module, mergeData, onPageChange }) {
  const state = $2$Module;
  const columns = [
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '档口名称',
      dataIndex: 'stallName',
      key: 'stallName',
    },
    {
      title: '物品编码',
      dataIndex: 'goodsCode',
      key: 'goodsCode',
    },
    {
      title: '物品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '物品类别',
      dataIndex: 'cateName',
      key: 'cateName',
    },
  ];
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedKeys) => {
      mergeData({ selectedRowKeys: selectedKeys });
    },
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={state.listData}
        loading={state.loading}
        onChange={onPageChange}
        pagination={state.pagination}
        rowKey={record => record.id}
      />
    </div>
  );
}

export default Form.create()($1$Table);
