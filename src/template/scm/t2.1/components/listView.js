import React from 'react';
import _ from 'lodash';
import { Table, Icon, Button, Tooltip, Popconfirm, Affix } from 'antd';
import EditableCell from '../../_components/EditableCell2';

const $1$DetailsList = ({
  $2$DetailModule,
  mergeData,
  toNextMem, // 跳转到下一个编辑状态
  addGoodsList, // 弹窗选择的几条数据
  getGoodsListdata, // 获取弹窗的物资列表
  onSelectedTreeItem, // 选择tree的类别节点
  selectModalSearch, // modal的模糊搜索
  onCloseModel, // modal的关闭触发
  onPopupPageChange, // 弹窗物资翻页方法
  onUpdateAdd, // 校验是否选择加工间等
  renderColumns, // 表格可编辑
  onPopupPageSizeChange, // 修改页大小
  refreshList, // 更新值
  openGoodsModel, // 打开加工品弹窗
  openModel, // 打开加工品弹窗
  saveDetails, // 点击保存
  insertNewRowAfterIndex, // 添加一行
  removeRowAtIndex, // 删除一行
  cancelDetailPage, // 点击返回
}) => {
  const data = $2$DetailModule;
  let columnsConfig = [];
  const listData = data.pageDetail; // 可编辑表格内的内容
  // 弹出物资选择框的表格列
  const onPopColumns = [
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
      title: '规格',
      dataIndex: 'goodsSpec',
      key: 'goodsSpec',
    },
    {
      title: '标准单位',
      dataIndex: 'unitName',
      key: 'unitName',
    },
    {
      title: '辅助单位',
      dataIndex: 'dualUnitName',
      key: 'dualUnitName',
    },
    {
      title: '消耗单位',
      dataIndex: 'consUnitName',
      key: 'consUnitName',
    },
  ];
  if (data.pageType === 'view') {
    columnsConfig = [
      {
        title: '',
        dataIndex: 'index',
        key: 'index',
        width: 40,
        render: (text, record, index) => parseInt(index, 10) + 1,
      },
      {
        title: '加工品',
        children: [
          {
            title: '编码',
            dataIndex: 'goodsCode',
            key: 'goodsCode',
          },
          {
            title: '名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
          },
          {
            title: '规格',
            dataIndex: 'goodsSpec',
            key: 'goodsSpec',
          },
        ],
      },
      {
        title: '取料率',
        dataIndex: 'consTranRates',
        key: 'consTranRates',
      },
    ];
  } else if (data.pageType === 'add' || data.pageType === 'edit') {
    columnsConfig = [
      {
        title: '',
        dataIndex: 'index',
        key: 'index',
        width: 40,
        render: (text, record, index) => parseInt(index, 10) + 1,
      },
      {
        title: '加工品',
        children: [
          {
            title: '编码',
            dataIndex: 'goodsCode',
            key: 'goodsCode',
          },
          {
            title: '名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
          },
          {
            title: '规格',
            dataIndex: 'goodsSpec',
            key: 'goodsSpec',
          },
        ],
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
                disabled: data.pageType === 'edit',
                updateValue: (value, itemKey) => refreshList(value, itemKey, 'consGrossWeight', index),
                transValue: record.consGrossWeight,
                originalProps: {
                  min: 0,
                  onPressEnter: () => toNextMem(index, 'consTranRates'), // 跳转到下一个编辑状态
                },
              }),
          },
          {
            title: '单位',
            dataIndex: 'unitName',
            key: 'unitName',
          },
        ],
      },
      {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        fixed: 'right',
        width: 70,
        render: (text, record, index) => (
          <div>
            <Tooltip placement="top" title="添加一行">
              <Icon type="plus" style={{ fontSize: 20, color: '#08c', cursor: 'pointer' }} onClick={() => insertNewRowAfterIndex(index)} />
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
                okText="确认删除"
                onConfirm={() => removeRowAtIndex(index)}
              >
                <Icon type="minus" style={{ fontSize: 20, color: 'red', cursor: 'pointer' }} />
              </Popconfirm>
            ) : null}
          </div>
        ),
      },
    ];
  }
  // 更新数据
  refreshList = (value, itemKey, fieldName, rowIndex) => {
    const rowItem = _.find(listData, item => item.id === itemKey);
    rowItem[fieldName] = value;
  };
  // 打开加工品弹窗
  openModel = (value) => {
    openGoodsModel(value);
  };

  renderColumns = (text, record, index, field, configurations) => {
    const editable = '';
    const status = false;
    const currEditStatus = data.editableMem[index] || [];
    const listDataRenderError = _.cloneDeep(listData);
    const lineItem = listDataRenderError[index]; // 获取这一行数据
    const fields = currEditStatus && Object.keys(currEditStatus);
    let newdataSourceIndex = 1;
    newdataSourceIndex = data.dataSourceIndex && data.dataSourceIndex.length ? data.dataSourceIndex.length : newdataSourceIndex;
    if (!_.has(data.editableMem[index], field)) {
      if (index === data.editableMem.length - 1 && (field === fields[0] || fields.length === 0) && data.editableMem.length !== newdataSourceIndex) {
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
        openModel={openModel}
        goodsList={data.goodsList}
        rowIndex={index}
        editableMem={data.editableMem}
        mergeData={mergeData}
        clickToEdit={() => {
          currEditStatus[field] = !currEditStatus[field];
        }}
      />
    );
  };
  const configurations = {
    checkButton: true,
    goodsListLoading: data.popupListLoading, // loading 配置
    popListPagination: data.popupListPagination, // 翻页配置
    onPopPageChange: onPopupPageChange, // 翻页方法
    foundTreeList: data.foundTreeList, // tree 数据
    disabledList: (() => listData.map(item => item.goodsCode))(), // 指定下拉列表中和弹窗列表中已显示的不让其可选，匹配ID
    onSelectTreeItem: value => onSelectedTreeItem(value), // 选择tree的类别节点
    onModalSearch: value => selectModalSearch(value), // modal的模糊搜索
    onCloseModel: () => onCloseModel(),
    onPopPageSizeChange: onPopupPageSizeChange, // 修改页尺寸
    popListData: data.goodsPopListModel, // getPopListData 获取的 table 里的数据
    getPopListData: getGoodsListdata, // 第一次显示列表时触发获取数据的方法
    onPopColumns, // 自定义弹出物品选择框列
    type: 'button',
    style: { display: 'inline-block' },
    buttonType: 'primary', // 按钮样式
    buttonText: '添加物品', // button 里的字
    cbReceiveChoose: (datas) => {
      if (data.pageDetail.length === 1 && !data.pageDetail[0].goodsCode) {
        addGoodsList({ pageDetail: datas });
      } else {
        addGoodsList({ pageDetail: [...data.pageDetail, ...datas] }); // 最后一个参数判断是否是弹窗添加
      }
    },
  };
  return (
    <div className="components-detail-list">
      <div style={{ marginBottom: '10px' }}>
        <EditableCell configurations={configurations} useEditCell="false" />
      </div>
      <Table
        bordered
        size="small"
        columns={columnsConfig}
        loading={data.loading}
        dataSource={listData}
        pagination={false}
        onRowClick={onUpdateAdd}
        rowKey={record => record.id}
        rowClassName={() => 'editable-row'}
      />
      <Affix offsetBottom={0} className="detail-page-actions">
        {(data.pageType === 'add' || data.pageType === 'edit') && (
          <Button type="primary" onClick={() => saveDetails('save')} disabled={data.savingStatus}>
            保存
          </Button>
        )}
        <Button onClick={cancelDetailPage} disabled={data.savingStatus}>
          返回
        </Button>
      </Affix>
    </div>
  );
};

export default $1$DetailsList;
