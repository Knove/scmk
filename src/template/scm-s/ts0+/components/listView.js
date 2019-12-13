import React from 'react';
import { Table, Icon, Button, Tooltip, Popconfirm, Affix } from 'antd';
import _ from 'lodash';
import EditableCell from '../../../Inventory/_components/EditableCell2';

const $1$DetailsList = ({
  $2$DetailModule,
  mergeData,
  cancelDetailPage,
  removeRowAtIndex,
  toNextMem,
  renderColumns,
  refreshList,
  saveDetails,
  insertNewRowAfterIndex
}) => {
  const data = $2$DetailModule;
  let columnsConfig = [];
  const listData = data.pageDetail; // 可编辑表格内的内容
  if (data.pageType === 'view') {
    columnsConfig = [
      {
        title: '',
        dataIndex: 'index',
        key: 'index',
        width: 40,
        render: (text, record, index) => parseInt(index, 10) + 1
      },
      {
        title: '标准',
        children: [
          {
            title: '毛重',
            dataIndex: 'consGrossWeight',
            key: 'consGrossWeight'
          },
          {
            title: '单位',
            dataIndex: 'unitName',
            key: 'unitName'
          }
        ]
      }
    ];
  } else if (data.pageType === 'edit') {
    columnsConfig = [
      {
        title: '',
        dataIndex: 'index',
        key: 'index',
        width: 40,
        render: (text, record, index) => parseInt(index, 10) + 1
      },
      {
        title: '标准',
        children: [
          {
            title: '毛重',
            dataIndex: 'consGrossWeight',
            key: 'consGrossWeight',
            width: '90',
            className: 'editable-col',
            render: (text, record, index) =>
              renderColumns(text, record, index, 'consGrossWeight', {
                type: 'number',
                rowIdent: record.id,
                disabled: data.pageType === 'edit' && record.status === '0',
                updateValue: (value, itemKey) =>
                  refreshList(value, itemKey, 'consGrossWeight', index),
                transValue: record.consGrossWeight,
                originalProps: {
                  style: { width: 80 },
                  min: 0,
                  onPressEnter: () =>
                    toNextMem(index, 'consTranRates', !record.consTranRates) // 跳转到下一个编辑状态
                }
              })
          },
          {
            title: '单位',
            dataIndex: 'unitName',
            key: 'unitName'
          }
        ]
      },
      {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        fixed: 'right',
        width: 70,
        render: (text, record, index) => (
          <div>
            <Tooltip placement='top' title='添加一行'>
              <Icon
                type='plus'
                style={{ fontSize: 20, color: '#08c', cursor: 'pointer' }}
                onClick={() => insertNewRowAfterIndex(index)}
              />
            </Tooltip>
            {listData.length > 1 ? (
              <Popconfirm
                title={
                  <div>
                    <span style={{ color: '#f04134' }}>危险操作！</span>
                    <br />
                    <span>删除后可能无法恢复，确定继续删除吗？</span>
                  </div>
                }
                okText='确认删除'
                cancelText='取消'
                onConfirm={() => removeRowAtIndex(index)}
              >
                <Icon
                  type='minus'
                  style={{ fontSize: 20, color: 'red', cursor: 'pointer' }}
                />
              </Popconfirm>
            ) : null}
          </div>
        )
      }
    ];
  }
  refreshList = (value, itemKey, fieldName, rowIndex) => {
    const rowItem = _.find(listData, item => item.id === itemKey);
    rowItem[fieldName] = value;
    // 联动更新处
  };
  renderColumns = (text, record, index, field, configurations) => {
    const editable = '';
    const status = false;
    const currEditStatus = data.editableMem[index] || [];
    const listDataRenderError = _.cloneDeep(listData);
    const lineItem = listDataRenderError[index]; // 获取这一行数据
    const fields = currEditStatus && Object.keys(currEditStatus);
    let newdataSourceIndex = 1;
    newdataSourceIndex =
      data.dataSourceIndex && data.dataSourceIndex.length
        ? data.dataSourceIndex.length
        : newdataSourceIndex;
    if (!_.has(data.editableMem[index], field)) {
      if (
        index === data.editableMem.length - 1 &&
        (field === fields[0] || fields.length === 0) &&
        data.editableMem.length !== newdataSourceIndex
      ) {
        currEditStatus[field] = true;
      } else {
        currEditStatus[field] = false; // 默认不在编辑状态
      }
    }

    if (typeof editable === 'undefined') {
      return text;
    }

    return (
      <EditableCell
        configurations={configurations}
        inEditStatus={currEditStatus}
        field={field}
        inValue={text}
        validation={lineItem}
        onChange={value => this.handleChange(field, index, value)}
        status={status}
        goodsList={data.goodsList}
        editableMem={data.editableMem}
        mergeData={mergeData}
        rowIndex={index}
        clickToEdit={() => {
          currEditStatus[field] = !currEditStatus[field];
        }}
      />
    );
  };
  return (
    <div className='components-detail-list'>
      <Table
        bordered
        size='small'
        columns={columnsConfig}
        loading={data.loading}
        dataSource={listData}
        pagination={false}
        rowKey={record => record.id}
        rowClassName={() => 'editable-row'}
      />
      <Affix offsetBottom={0} className='detail-page-actions'>
        <div>
          {data.pageType === 'edit' && (
            <Button onClick={() => saveDetails()} disabled={data.savingStatus}>
              保存
            </Button>
          )}
          <Button onClick={cancelDetailPage}>返回</Button>
        </div>
      </Affix>
    </div>
  );
};

export default $1$DetailsList;
