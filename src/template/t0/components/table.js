import React from 'react';
import { Table, Form } from 'antd';

function $1$Table({ $2$Module, onPageChange }) {
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
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      render: () => <a>查看</a>,
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={state.listData} loading={state.loading} onChange={onPageChange} pagination={state.pagination} rowKey={record => record.id} />
    </div>
  );
}

export default Form.create()($1$Table);
