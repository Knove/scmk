import React from 'react';
import { Table, Badge, Form, Button } from 'antd';

function $1$Table({ selectedRowKeys, $2$TableData, onPageChange, onPageSizeChange, }) {
    const state = $2$TableData;
    const columns = [
    {
      title: '菜品编码',
      dataIndex: 'dishCode',
      key: 'dishCode',
    },
    {
      title: '菜品名称',
      dataIndex: 'dishName',
      key: 'dishName',
    },
    {
      title: '菜品类别',
      dataIndex: 'cateName',
      key: 'cateName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => <Badge status={record.stallId ? 'success' : 'default'} text={record.stallId ? '已设置' : '未设置'} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      render: (text, record) => <a>查看</a>,
    },
  ];
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (selectedKeys, selectedRows) => {
//       onSelectedDish(selectedKeys, selectedRows);
//     },
//   };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={state.listData}
        loading={state.loading}
        onChange={onPageChange}
        onShowSizeChange={onPageSizeChange}
        pagination={state.pagination}
        rowKey={record => record.id}
        // rowSelection={rowSelection}
      />
    </div>
  );
}

export default Form.create()($1$Table);
