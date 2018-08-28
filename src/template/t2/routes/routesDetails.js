import React from 'react';
import { connect } from 'dva';
import { Spin, message, Modal } from 'antd';
import DetailsFilter from '../../components/Inventory/CostsList/details/filter';
import DetailListView from '../../components/Inventory/CostsList/details/listView';

const CostsListDetails = ({ costsListDetailsModule, dispatch }) => {
  const {
    storeId,
    opType,
    user,
    bussDate,
    detailList,
    pageDetail,
    editableMem,
    goodsList,
    pageStatus,
    savingStatus,
    goodsPopListModel,
    popupListPagination,
    dataSourceIndex,
    billInfo,
    foundTreeList,
    popupListLoading,
    loadingList,
    selectedReposes,
    selectedSupplier,
    selectedStore,
    // storeListOfSupplier,
    // orgList,
    billStatus,
    confilictionRows,
    supplierList,
    belongsAllStore,
    currentRemarks,
    selectedTableRows,
    currBatchRange,
    showFinalConfim,
    isLoadingPage,
    selectedTypeIndex,
    cateId,
    i,
    orgList, // 配送中心数据
    storeListOfSupplier, // 门店列表数据
    storeOrgLeftTreeList, // 构分类组件中类别树
    selectValue,
    parentId,
    paginationSelectorItems, // 机构分类组件中的分页
  } = costsListDetailsModule;
  const SearchData = {
    opType, // 当前单据操作类型
    user,
    bussDate,
    supplierList, // 供应商列表
    billInfo, // 单据信息
    selectedReposes, // 选中的仓库
    selectedSupplier, // 选中的机构
    selectedStore, // 已经选择的门店
    // storeListOfSupplier, // 所有可用门店列表
    belongsAllStore, // 是否使用所有门店
    currentRemarks, // 备注信息
    // orgList,
    selectedTypeIndex,
    i,
    selectValue, // 搜索数据
    orgList, // 配送中心数据
    storeListOfSupplier, // 门店列表数据
    storeOrgLeftTreeList, // 构分类组件中类别树
    paginationSelectorItems, // 机构分类组件中的分页
    onSelectorPageChange(page) {
      // 分页功能
      console.log('parentId', parentId, page);
      if (parentId) {
        // 有类别 分页
        dispatch({
          type: 'costsListDetailsModule/getStoreById',
          payload: {
            rowcount: page.pageSize,
            pageno: page.current,
            orgType: 1,
            parentId,
          },
        });
      } else {
        //  无类别 分页
        dispatch({
          type: 'costsListDetailsModule/getOrgStoreByPage',
          payload: {
            rowcount: page.pageSize,
            pageno: page.current,
            orgType: 3,
            parentId,
          },
        });
      }
      // dispatch({
      //   type: 'costsListDetailsModule/querySuccess',
      //   payload: {
      //     paginationSelectorItems: {
      //       current: page.current,
      //       pageSize: page.pageSize,
      //     },
      //   },
      // });
    },
    onCheckSelected(value) {
      // 构分类组件中点击类别搜索
      // console.log('value[0]', value);
      if (value.length) {
        dispatch({
          type: 'costsListDetailsModule/getStoreById',
          payload: {
            parentId: value[0],
            orgType: 3,
          },
        });
        dispatch({
          type: 'costsListDetailsModule/mergeData',
          payload: {
            parentId: value[0],
          },
        });
      } else {
        dispatch({
          type: 'costsListDetailsModule/getOrgStoreByPage',
          payload: {
            rowcount: 50,
            pageno: 1,
            orgType: 3,
          },
        });
        dispatch({
          type: 'costsListDetailsModule/mergeData',
          payload: {
            parentId: '',
          },
        });
      }
    },
    onModalChange(value) {
      dispatch({
        type: 'costsListDetailsModule/mergeData',
        payload: {
          selectValue: value,
        },
      });
    },
    onModalSearch(value) {
      dispatch({
        type: 'costsListDetailsModule/getOrgInfoList',
        payload: {
          queryString: value,
          orgType: 3,
        },
      });
    },
    searchOrgs(value) {
      dispatch({
        type: 'costsListDetailsModule/querySupplierList',
        payload: {
          queryString: value,
          rows: 10000,
          status: 1,
        },
      });
    },
    setRemarks(value) {
      dispatch({
        type: 'costsListDetailsModule/saveRemarks',
        payload: {
          value,
        },
      });
    },
    selectSupplier(value) {
      if (i) {
        Modal.warning({
          title: '警告',
          content: '切换供应商后，本业内的物资将会被清空！',
        });
      }
      console.log(i);
      dispatch({
        type: 'costsListDetailsModule/setSelectedSupplier',
        payload: {
          value,
        },
      });
      dispatch({
        // 保存机构ID并且获取门店列表
        type: 'costsListModule/setOrgId',
        payload: {
          distribId: value,
        },
      });
      dispatch({
        type: 'costsListDetailsModule/mergeData',
        payload: {
          i: i + 1,
          pageDetail: [
            {
              id: 1,
              storeId: '',
              storeName: null,
              createUser: null,
              createUserName: null,
              createTime: '',
              updateUser: null,
              updateTime: null,
              deleteFlag: null,
              tenantId: null,
              tenName: null,
              queryString: null,
              isSystem: null,
              delIds: null,
              delIdsList: null,
              page: 0,
              rows: 0,
              orderProperty: null,
              orderDirection: null,
              storeIds: null,
              applyOrderId: '',
              goodsId: '',
              goodsCode: '',
              goodsName: '',
              goodsSpec: null,
              purcUnitId: '',
              purcUnitName: '',
              purcUnitNum: 0,
              unitId: '',
              unitName: '',
              unitNum: 0,
              remarks: '',
              sequence: 0,
              supplyId: null,
              supplyName: null,
              dualUnitId: null,
              dualUnitName: null,
              dualUnitNum: null,
              arrivalDate: null,
            },
          ],
        },
      });
    },
    selectedBussDate(date, dateString) {
      dispatch({
        type: 'costsListDetailsModule/setBussinessDate',
        payload: {
          date,
          dateString,
        },
      });
    },
    updateSelectedStoreList(storeList) {
      dispatch({
        type: 'costsListDetailsModule/setSelectedStoreList',
        payload: {
          storeList,
        },
      });
    },
    updateStoreBelong(belongsAllStore) {
      dispatch({
        type: 'costsListDetailsModule/setSelectedStoreBelong',
        payload: {
          belongsAllStore,
        },
      });
    },
    changeSelectedIndex(index) {
      dispatch({
        type: 'costsListDetailsModule/setSelectedTypeIndex',
        payload: {
          index,
        },
      });
    },
    resetTableListData() {
      dispatch({
        type: 'costsListDetailsModule/resetListData',
        payload: {},
      });
    },
  };
  // console.log("dataSourceIndex",dataSourceIndex)
  const ListData = {
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

  const DetailsFilterData = {
    ...SearchData,
  };

  const DetailsListData = {
    ...ListData,
  };

  return (
    <div className="routes">
      <DetailsFilter {...DetailsFilterData} />
      {(() => {
        // if (opType === 'create' || opType === 'edit') {
        //   return <DetailListCreate {...DetailsListData} />;
        // }
        // return <DetailListView {...DetailsListData} />;
      })()}
      <DetailListView {...DetailsListData} />
    </div>
  );
};

function mapStateToProps({ costsListDetailsModule }) {
  return { costsListDetailsModule };
}
export default connect(mapStateToProps)(CostsListDetails);
