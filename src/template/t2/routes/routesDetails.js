import React from 'react';
import { connect } from 'dva';
import { message, Modal } from 'antd';
import DetailsFilter from '../../components/Inventory/$1$/details/info';
import DetailListView from '../../components/Inventory/$1$/details/listView';

const $1$Details = ({ $2$Module, dispatch }) => {
  const DetailsFilterData = {
    $2$Module,
    mergeData(payload) {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload,
      });
    },
  };
  const DetailsListData = {
    opType,
    pageStatus,
    detailList,
    pageDetail,
    editableMem,
    goodsList,
    savingStatus,
    bussDate,
    goodsPopListModel,
    popupListPagination,
    foundTreeList,
    popupListLoading,
    dataSourceIndex,
    loadingList,
    billStatus,
    confilictionRows,
    selectedTableRows,
    currBatchRange,
    showFinalConfim,
    isLoadingPage,
    selectedSupplier,
    cateId,
    shouldGoForward: () => {
      // busiId || !storeAddId || !busiId
      if (!(selectedSupplier && selectedSupplier.id)) {
        message.error('请选择供应商后继续！');
        return false;
      }
      return null;
    },
    switchFinalConfirm: () => {
      dispatch({
        type: 'costsListDetailsModule/changeFinalConfirm',
      });
    },
    setCurrBatchRange: (batchRange) => {
      dispatch({
        type: 'costsListDetailsModule/saveCurrBatchRange',
        payload: { batchRange },
      });
    },
    batchSaveRange: (range) => {
      dispatch({
        type: 'costsListDetailsModule/saveRangeInBatch',
        payload: {},
      });
      // dispatch({
      //   type: 'costsListDetailsModule/saveSelectedTableRows',
      //   payload: {
      //     rows: [],
      //   },
      // });
    },
    setSelectedTableRows: (rows) => {
      dispatch({
        type: 'costsListDetailsModule/saveSelectedTableRows',
        payload: {
          rows,
        },
      });
    },
    switchType: (type) => {
      dispatch({
        type: 'costsListDetailsModule/startWithType',
        payload: {
          opType: type,
        },
      });
    },
    resyncDataSource: (listData) => {
      dispatch({
        type: 'costsListDetailsModule/resyncListData',
        payload: {
          listData,
        },
      });
    },
    syncMem: (fieldName) => {
      dispatch({
        type: 'costsListDetailsModule/syncMemFields',
        payload: {
          fieldName,
        },
      });
    },
    getGoodsListByTyping: (queryString) => {
      dispatch({
        type: 'costsListDetailsModule/queryGoodsCoding',
        payload: { limit: 20, status: 1, storeId, queryString },
      });
    },
    syncSeletedItemIntoRow: (selectedObjs, index, fieldName, isModal) => {
      dispatch({
        type: 'costsListDetailsModule/syncSeletedItemIntoList',
        payload: { selectedObjs, index, fieldName, isModal },
      });
      // dispatch({
      //   type: 'costsListDetailsModule/toNextMemByCurr',
      //   payload: { index, fieldName },
      // });
    },
    toNextMem: (rowIndex, fieldName, isShow) => {
      dispatch({
        type: 'costsListDetailsModule/toNextMemByCurr',
        payload: { rowIndex, fieldName, isShow },
      });
    },
    toggleMemStatus: (rowIndex, fieldName) => {
      dispatch({
        type: 'costsListDetailsModule/toggleMemStatus',
        payload: { rowIndex, fieldName },
      });
    },
    updateEditableMem(targetField, index) {
      // console.log('targetField in updateEditableMem', targetField,index+1);
      dispatch({
        type: 'costsListDetailsModule/updateEditableMem',
        payload: { targetField, index },
      });
    },
    insertNewRowAfterIndex: (index) => {
      dispatch({
        type: 'costsListDetailsModule/insertNewListItemAfterIndex',
        payload: { index },
      });
    },
    removeRowAtIndex: (index) => {
      dispatch({
        type: 'costsListDetailsModule/removeListItemAtIndex',
        payload: { index },
      });
    },
    saveDetails: (status) => {
      dispatch({
        type: 'costsListDetailsModule/saveCostsListDetails',
        payload: { status },
      });
    },
    cancelDetailPage: () => {
      dispatch({
        type: 'costsListDetailsModule/cancelDetailData',
        payload: {},
      });
      dispatch({
        type: 'costsListModule/getList', // getOrderLibByFilter
        payload: {},
      });
      dispatch({
        type: 'costsListDetailsModule/querySuccess',
        payload: {
          dataSourceIndex: [],
          // pageDetail: [],
        },
      });
    },
    switchEditingStatus: (rowIndex, fieldName, status) => {
      dispatch({
        type: 'costsListDetailsModule/changeEditingStatus',
        payload: { rowIndex, fieldName, status },
      });
    },
    openGoodsModel: (value) => {
      dispatch({
        type: 'costsListDetailsModule/openGoodsModel',
        payload: {
          goodsVisible: true,
          modalRowIndex: value,
        },
      });
    },

    getGoodsListdata: (value) => {
      dispatch({
        type: 'costsListDetailsModule/getPopListData',
        payload: {},
      });
      dispatch({
        type: 'costsListDetailsModule/searchTreeList',
        payload: { type: 0 }, // 0,1
      });
      // dispatch({
      //   type: 'costsListDetailsModule/mapPopListDataToModel',
      //   payload: {
      //   },
      // });
    },
    resetGoodsListdata: (value) => {
      dispatch({
        type: 'costsListDetailsModule/resetGoodsListdata',
        payload: {},
      });
    },

    onPopupPageChange: (page) => {
      dispatch({
        type: 'costsListDetailsModule/getPopListData',
        payload: {
          cateId,
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    onPopupPageSizeChange: (current, pageSize) => {
      dispatch({
        type: 'costsListDetailsModule/getPopListData',
        payload: {
          cateId,
          pageNo: 1,
          pageSize,
        },
      });
    },
    onSelectedTreeItem(selectedKeys) {
      // 根据类别跳转
      // if (selectedKeys[0]) {
      console.log('selectedKeys', selectedKeys);
      dispatch({
        type: 'costsListDetailsModule/getPopListData',
        payload: {
          cateId: selectedKeys[0] ? selectedKeys[0] : '',
          // storeId,
          // limit: '20',
          //
          pageSize: 10,
          pageNo: 1,
        },
      });
      // dispatch({
      //   type: 'costsListDetailsModule/saveCateId',
      //   payload: {
      //     cateId: selectedKeys[0],
      //   },
      // });
      // }
    },
    selectModalSearch: (value) => {
      dispatch({
        type: 'costsListDetailsModule/getPopListData',
        payload: {
          pageNo: 1,
          pageSize: 10,
          queryString: value,
        },
      });
    },
    onCloseModel: () => {
      dispatch({
        type: 'costsListDetailsModule/querySuccess',
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
    confirmConfiliction: () => {
      dispatch({
        type: 'costsListDetailsModule/confirmConfilictionRows',
        payload: {},
      });
    },
    deleteAGoods: (item) => {
      dispatch({
        type: 'costsListDetailsModule/deleteAGoodsItem',
        payload: {
          item,
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

function mapStateToProps({ costsListDetailsModule }) {
  return { costsListDetailsModule };
}
export default connect(mapStateToProps)($1$Details);
