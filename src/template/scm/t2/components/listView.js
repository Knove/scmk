import React from 'react';
import _ from 'lodash';
import { Table, Icon, Button, Tooltip, Popconfirm, Affix } from 'antd';
import EditableCell from '../../_components/EditableCell2';

const $1$DetailsList = ({
  $2$DetailModule,
  toNextMem, // 跳转到下一个编辑状态
  selectedAGoods, // 选择手动输入后列表的一个项目
  showGoodsListByTyping, // 手动输入的回调
  selectedListGoods, // 弹窗选择的几条数据
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
  getGoodsListByTyping, // 手动输入的回调
  syncSeletedItemIntoRow, // 插入手动输入或弹窗选择的数据
  saveDetails, // 点击保存
  insertNewRowAfterIndex, // 添加一行
  removeRowAtIndex, // 删除一行
  cancelDetailPage, // 点击返回
  mergeData,
}) => {
  const data = $2$DetailModule;
  const listData = data.pageDetail; // 可编辑表格内的内容
  let columnsConfig = [];
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
        title: '标准',
        children: [
          {
            title: '毛重',
            dataIndex: 'consGrossWeight',
            key: 'consGrossWeight',
          },
          {
            title: '单位',
            dataIndex: 'unitName',
            key: 'unitName',
          },
        ],
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
        title: '物品',
        children: [
          {
            title: '编码',
            dataIndex: 'goodsCode',
            key: 'goodsCode',
            width: '143',
            className: 'editable-col',
            render: (text, record, index) =>
              renderColumns(text, record, index, 'goodsCode', {
                rowIdent: record.id,
                type: 'select',
                onKeyEnter: () => toNextMem(index, 'goodsCode'),
                onChange: showGoodsListByTyping, // 手动输入的回调
                selectItem: (itemValue, itemId) => {
                  toNextMem(index, 'goodsCode');
                  selectedAGoods(itemValue, itemId, index, 'goodsCode');
                }, // 选择手动输入后列表的一个项目
                keyValues: data.goodsList, // 显示响应手动输入的列表数据
                disabledList: (() => listData.map(item => item.goodsCode))(), // 指定下拉列表中和弹窗列表中已显示的不让其可选，匹配ID
                getPopListData: getGoodsListdata, // 获取弹窗的物资列表
                popListData: data.goodsPopListModel, // getPopListData 获取的 table 里的数据
                onPopColumns, // 弹窗列表表头
                cbReceiveChoose: (datas) => {
                  // 选择的几条数据
                  const selectedList = _.cloneDeep(datas);
                  selectedListGoods(selectedList, index, 'goodsCode', true); // 最后一个参数判断是否是弹窗添加
                },
                foundTreeList: data.foundTreeList, // tree 数据
                onSelectTreeItem: value => onSelectedTreeItem(value), // 选择tree的类别节点
                onModalSearch: value => selectModalSearch(value), // modal的模糊搜索
                onCloseModel: value => onCloseModel(value), // modal的关闭触发
                goodsListLoading: data.popupListLoading,

                popListPagination: data.popupListPagination, // 翻页配置
                onPopPageChange: onPopupPageChange, // 翻页方法
                onPopPageSizeChange: onPopupPageSizeChange, // 修改页尺寸
                originalProps: {
                  // onFocusInput: () => toggleMemStatus(index, 'goodsCode'), // 修改其他的编辑状态为非编辑状态
                },
              }),
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
                disabled: data.pageType === 'edit' && record.status === '0',
                updateValue: (value, itemKey) => refreshList(value, itemKey, 'consGrossWeight', index),
                transValue: record.consGrossWeight,
                originalProps: {
                  style: { width: 50 },
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
  // 选择手动输入后列表的一个项目
  selectedAGoods = (itemValue, itemId, index, fieldName) => {
    const selectedItem = _.find(data.goodsList, item => item.goodsCode === itemValue);
    syncSeletedItemIntoRow([selectedItem], index, fieldName);
  };
  // 弹窗选择的几条数据
  selectedListGoods = (selectedList, index, fieldName, isModal) => {
    syncSeletedItemIntoRow(selectedList, index, fieldName, isModal);
  };
  // 手动输入的回调
  showGoodsListByTyping = (value) => {
    getGoodsListByTyping(value);
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
  return (
    <div className="components-detail-list">
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
        {data.pageType !== 'view' && (
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
