import React from 'react';
import { Table, Badge, Form } from 'antd';

function $1$Table({ $2$Module, onPageChange, mergeData, routerGo }) {
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
      render: (text, record) => <Badge status={record.status === 962 ? 'success' : 'default'} text={record.stallId ? '已设置' : '未设置'} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              routerGo(`/stock/$2$/detail/view/0/${record.id}`);
            }}
          >
            查看
          </a>
          <span className="ant-divider" />
          <a
            onClick={() => {
              routerGo(`/stock/$2$/detail/edit/0/${record.id}`);
            }}
          >
            编辑
          </a>
        </span>
      ),
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
