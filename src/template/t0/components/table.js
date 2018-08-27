import React from 'react';
import { Table, Form } from 'antd';

function $1$Table({ $2$Module, onPageChange, mergeData }) {
  const state = $2$Module;
  const columns = [
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      render: () => <a>查看</a>
    }
  ];
  return (
    <div>
      <Table
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
