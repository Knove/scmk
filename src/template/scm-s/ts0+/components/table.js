import React from 'react';
import { Table, Form } from 'antd';

function $1$Table({ $2$Module, onPageChange, routerGo }) {
  const state = $2$Module;
  const columns = [
    {
      title: '物品名',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '物品规格',
      dataIndex: 'specName',
      key: 'specName',
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
  return (
    <div>
      <Table columns={columns} dataSource={state.listData} loading={state.loading} onChange={onPageChange} pagination={state.pagination} rowKey={record => record.id} />
    </div>
  );
}

export default Form.create()($1$Table);
