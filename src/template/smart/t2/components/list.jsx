import React, { PropTypes } from 'react';
import { Table, Row, Col, Badge } from 'antd';
import { codeToString, codeToArray } from '../../../utils/index';

const list = ({
   code,
   dataList,
   choosedCodes,
   loading,
   pagination,
   $2$Button,
   onEdit,
   onSelect$1$,
   onDelete$1$,
   onPageChange,
 }) => {
  const disabled = $2$Button && $2$Button.edit;
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'postName',
      key: 'postName',
    }, {
      title: '所含员工数',
      dataIndex: 'userCount',
      key: 'userCount',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let statusTxt = '';
        if (text === 1) {
          statusTxt = <Badge status="success" text="正常" />;
        } else if (text === 0) {
          statusTxt = <Badge status="default" text="停用" />;
        }
        return statusTxt;
      },
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => (
        <span>
          { record.postCode < code && record.isSuper === 0 && disabled && <button className="btn-link" onClick={() => onEdit(record)}>编辑</button> }
          { (record.postCode >= code || !disabled) && <span>编辑</span> }
        </span>
      ),
    },
  ];
  // 表格选择对象
  const rowSelection = {
    selectedRowKeys: choosedCodes,
    type: 'checkbox',
    onSelect: (record, selected) => {
      if (!selected) {
        onDelete$1$(record.id);
      } else {
        const dataArray = [];
        dataArray.push(record);
        const $2$Param = {
          selectedCodes: codeToArray(dataArray, 'id'),
          selected$1$: dataArray,
        };
        onSelect$1$($2$Param);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (!selected) {
        onDelete$1$(codeToString(changeRows, 'id'));
      } else {
        const $2$Param = {
          selectedCodes: codeToArray(changeRows, 'id'),
          selected$1$: changeRows,
        };
        onSelect$1$($2$Param);
      }
    },
    getCheckboxProps: record => ({
      disabled: record.isSuper === 1, // 超级管理员不可选择跟编辑
    }),
  };
  return (<div>
    <Row gutter={16} className="list">
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={dataList}
          pagination={pagination}
          loading={loading}
          bordered
          rowSelection={rowSelection}
          rowKey={record => record.id}
          onChange={onPageChange}
        />
      </Col>
    </Row>
  </div>);
};
list.propTypes = {
  loading: PropTypes.bool,
  code: PropTypes.number,
  dataList: PropTypes.array,
  choosedCodes: PropTypes.array,
  pagination: PropTypes.object,
  $2$Button: PropTypes.object,
  onEdit: PropTypes.func,
  onSelect$1$: PropTypes.func,
  onDelete$1$: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default list;
