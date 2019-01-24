import React from 'react';
import { Table, Badge, Form } from 'antd';

function $1$Table({ $2$Module, onPageChange, mergeData }) {
  const state = $2$Module;
  const columns = [
    {
      title: '供应商名',
      dataIndex: 'suppName',
      key: 'suppName',
    },
    {
      title: '单号',
      dataIndex: 'billNo',
      key: 'billNo',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => <Badge status={record.status === 962 ? 'success' : 'default'} text={record.status === 962 ? '已设置' : '未设置'} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      render: () => <a>查看</a>,
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
        columns={columns}
        dataSource={state.listData}
        loading={state.loading}
        onChange={onPageChange}
        pagination={state.pagination}
        rowKey={record => record.id}
        rowSelection={rowSelection}
      />
    </div>
  );
}

export default Form.create()($1$Table);
