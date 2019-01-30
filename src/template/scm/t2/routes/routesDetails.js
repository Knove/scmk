import React from 'react';
import { connect } from 'dva';
import DetailsFilter from '../../components/Inventory/$1$/details/info';
import DetailListView from '../../components/Inventory/$1$/details/listView';

const $1$Details = ({ $2$DetailModule, dispatch }) => {
  const DetailsFilterData = {
    $2$DetailModule,
    mergeData(payload) {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload,
      });
    },
  };
  const DetailsListData = {
    $2$DetailModule,
    mergeData(payload) {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload,
      });
    },
    // 手动输入的回调
    getGoodsListByTyping: (queryString) => {
      dispatch({
        type: '$2$DetailModule/queryGoodsCoding',
        payload: {
          pageSize: 10,
          pageNo: 1,
          queryString,
        },
      });
    },
    // 插入手动输入或弹窗选择的数据
    syncSeletedItemIntoRow: (selectedObjs, index, fieldName, isModal) => {
      dispatch({
        type: '$2$DetailModule/syncSeletedItemIntoList',
        payload: { selectedObjs, index, fieldName, isModal },
      });
    },
    // 跳转到下一个编辑状态
    toNextMem: (rowIndex, fieldName, isShow) => {
      dispatch({
        type: '$2$DetailModule/toNextMemByCurr',
        payload: { rowIndex, fieldName, isShow },
      });
    },
    // 修改其他的编辑状态为非编辑状态
    toggleMemStatus: (rowIndex, fieldName) => {
      dispatch({
        type: '$2$DetailModule/toggleMemStatus',
        payload: { rowIndex, fieldName },
      });
    },
    // 添加一行
    insertNewRowAfterIndex: (index) => {
      dispatch({
        type: '$2$DetailModule/insertNewListItemAfterIndex',
        payload: { index },
      });
    },
    // 删除一行
    removeRowAtIndex: (index) => {
      dispatch({
        type: '$2$DetailModule/removeListItemAtIndex',
        payload: { index },
      });
    },
    // 点击保存
    saveDetails: (status) => {
      dispatch({
        type: '$2$DetailModule/saveRequisitionDetails',
        payload: { status },
      });
    },
    // 点击返回
    cancelDetailPage: () => {
      dispatch({
        type: '$2$DetailModule/cancelDetailData',
        payload: {},
      });
    },
    // 获取弹窗的物资列表
    getGoodsListdata: () => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {},
      });
      dispatch({
        type: '$2$DetailModule/searchTreeList',
        payload: {},
      });
    },
    // 选择tree的类别节点
    onSelectedTreeItem(selectedKeys) {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload: {
          cateId: selectedKeys[0],
        },
      });
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {},
      });
    },
    // modal的模糊搜索
    selectModalSearch: (value) => {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload: {
          queryModalString: value,
        },
      });
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {},
      });
    },
    // modal的关闭触发
    onCloseModel: () => {
      const { popupListPagination } = $2$DetailModule;
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload: {
          cateId: '',
          queryModalString: '',
          popupListPagination: {
            ...popupListPagination,
            current: 1,
            pageSize: 10,
          },
          goodsList: [],
          foundTreeList: [],
          goodsPopListModel: {},
        },
      });
    },
    // 弹窗物资翻页方法
    onPopupPageChange: (page) => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    // 修改页大小
    onPopupPageSizeChange: (current, pageSize) => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {
          pageSize,
        },
      });
    },
  };

  return (
    <div className="routes">
      <DetailsFilter {...DetailsFilterData} />
      <DetailListView {...DetailsListData} />
    </div>
  );
};

function mapStateToProps({ $2$DetailModule }) {
  return { $2$DetailModule };
}
export default connect(mapStateToProps)($1$Details);
