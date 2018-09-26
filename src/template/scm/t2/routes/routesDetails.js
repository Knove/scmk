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
    sureModalHandle: (type) => {
      dispatch({
        type: '$2$DetailModule/updateSureModal',
        payload: type,
      });
    },
    complexModalHandle: (type) => {
      dispatch({
        type: '$2$DetailModule/updateComplexModal',
        payload: type,
      });
    },
    switchType: (type) => {
      dispatch({
        type: '$2$DetailModule/startWithType',
        payload: {
          pageType: type,
        },
      });
    },
    resyncDataSource: (listData) => {
      dispatch({
        type: '$2$DetailModule/resyncListData',
        payload: {
          listData,
        },
      });
    },
    syncMem: (fieldName) => {
      dispatch({
        type: '$2$DetailModule/syncMemFields',
        payload: {
          fieldName,
        },
      });
    },
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
    syncSeletedItemIntoRow: (selectedObjs, index, fieldName, isModal) => {
      dispatch({
        type: '$2$DetailModule/syncSeletedItemIntoList',
        payload: { selectedObjs, index, fieldName, isModal },
      });
    },
    toNextMem: (rowIndex, fieldName, isShow) => {
      dispatch({
        type: '$2$DetailModule/toNextMemByCurr',
        payload: { rowIndex, fieldName, isShow },
      });
    },
    toggleMemStatus: (rowIndex, fieldName) => {
      dispatch({
        type: '$2$DetailModule/toggleMemStatus',
        payload: { rowIndex, fieldName },
      });
    },
    updateEditableMem(targetField, index) {
      dispatch({
        type: '$2$DetailModule/updateEditableMem',
        payload: { targetField, index },
      });
    },
    insertNewRowAfterIndex: (index) => {
      dispatch({
        type: '$2$DetailModule/insertNewListItemAfterIndex',
        payload: { index },
      });
    },
    removeRowAtIndex: (index) => {
      dispatch({
        type: '$2$DetailModule/removeListItemAtIndex',
        payload: { index },
      });
    },
    saveDetails: (status) => {
      dispatch({
        type: '$2$DetailModule/saveRequisitionDetails',
        payload: { status },
      });
    },
    cancelDetailPage: () => {
      dispatch({
        type: '$2$DetailModule/cancelDetailData',
        payload: {},
      });

      dispatch({
        type: '$2$DetailModule/querySuccess',
        payload: {
          findList: [],
        },
      });
    },
    switchEditingStatus: (rowIndex, fieldName, status) => {
      dispatch({
        type: '$2$DetailModule/changeEditingStatus',
        payload: { rowIndex, fieldName, status },
      });
    },
    updateRedFlag: (redFlag, row, type) => {
      dispatch({
        type: '$2$DetailModule/updateRedFlag',
        payload: {
          flag: redFlag,
          rowIndex: row,
          types: type,
        },
      });
    },
    updateReadyOutDataArraynow(value) {
      dispatch({
        type: '$2$DetailModule/updateReadyOutDataArraynow',
        payload: value,
      });
    },
    updateComplexDataArraynow(value) {
      dispatch({
        type: '$2$DetailModule/updateComplexDataArraynow',
        payload: value,
      });
    },
    getGoodsListdata: () => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {},
      });
      dispatch({
        type: '$2$DetailModule/searchTreeList',
        payload: { type: 0 },
      });
    },
    onSelectedTreeItem(selectedKeys) {
      // 根据类别跳转
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {
          cateId: selectedKeys[0],
          pageSize: 10,
          pageNo: 1,
        },
      });
      dispatch({
        type: '$2$DetailModule/saveCateId',
        payload: {
          cateId: selectedKeys[0],
        },
      });
    },
    selectModalSearch: (value) => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {
          pageNo: 1,
          pageSize: 10,
          queryString: value,
        },
      });
    },
    onCloseModel: () => {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload: {
          cateId: '',
          queryModalString: '',
          popupListPagination: {
            current: 1,
            pageSize: 10,
          },
        },
      });
    },
    onPopupPageChange: (page) => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {
          cateId: $2$DetailModule.cateId,
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    onPopupPageSizeChange: (current, pageSize) => {
      dispatch({
        type: '$2$DetailModule/getPopListData',
        payload: {
          cateId: $2$DetailModule.cateId,
          pageNo: 1,
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
