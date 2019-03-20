import { parse } from 'qs';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import _ from 'lodash';
import { proSpecModel } from './_common';
import { findProdSpecBom, addBom } from '../../services/inventory/$2$Details';
import { findTreeList, findGoodsForPage } from '../../services/inventory/common';

export default {
  namespace: '$2$DetailModule',
  state: {
    loading: false,
    popupListLoading: false, // 弹窗的物资选择表格的loading
    savingStatus: false, // 点击审核或者保存时防止二次点击状态控制
    pageType: '', // 内页的状态
    goodsId: '',
    detailsInfo: {}, // 内页信息
    pageDetail: [{ id: '' }], // 内页表格信息
    editableMem: [],
    queryModalString: '', // 弹窗的物资选择表格的模糊搜索框
    cateId: '', // 物资的类别id
    goodsList: [], // 弹窗的物资list
    goodsPopListModel: '', // 弹窗的物资选择表格的表格数据
    popupListPagination: {
      // 弹窗的物资选择表格的分页信息
      size: 'small',
      showTotal: total => `共 ${total} 条`,
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
    foundTreeList: [], // 弹窗的物资选择表格的左侧树
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    mergeData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 获取表格数据
    * findProdSpecBom({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const data = yield call(findProdSpecBom, parse(payload));
      if (data.data && data.data.success) {
        const detailsInfo = data.data.data;
        yield put({
          type: 'mergeData',
          payload: {
            detailsInfo,
            pageDetail: detailsInfo.specBomDetailList.length > 0 ? detailsInfo.specBomDetailList : [{ id: '' }],
          },
        });
        yield put({
          type: 'editableMem',
          payload: { dataSource: [] },
        });
      } else {
        message.warning(`操作失败，请参考：${data.data.errorInfo}`);
      }
      yield put({ type: 'hideLoading' });
    },
    // 获取弹窗的物资列表
    * getPopListData({ payload }, { select, call, put }) {
      yield put({ type: 'mergeData', payload: { popupListLoading: true } });
      const { popupListPagination, queryModalString, cateId } = yield select(state => state.$2$DetailModule);
      const pageNo = payload.pageNo || popupListPagination.current;
      const pageSize = payload.pageSize || popupListPagination.pageSize;
      const reqParams = {
        page: pageNo,
        rows: pageSize,
        queryString: queryModalString,
        cateId: cateId === 'default' ? '' : cateId,
      };
      const goodsData = yield call(findGoodsForPage, parse(reqParams));
      if (goodsData && goodsData.data) {
        yield put({
          type: 'mergeData',
          payload: {
            goodsPopListModel: goodsData.data,
            popupListPagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              total: goodsData.data.data.total,
              current: goodsData.data.data.pageNum,
              showTotal: total => `共 ${total} 条`,
              pageSize: goodsData.data.data.pageSize,
              size: 'small',
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.warning(`操作失败，请参考：${goodsData.data.errorInfo}`);
      }
      yield put({ type: 'mergeData', payload: { popupListLoading: false } });
    },
    // 弹窗左侧类别栏
    * searchTreeList({ payload }, { call, put }) {
      const data = yield call(findTreeList, parse(payload));
      if (data.data && data.data.success) {
        yield put({
          type: 'mergeData',
          payload: {
            foundTreeList: data.data.data,
          },
        });
      } else {
        message.warning(`操作失败，请参考：${data.data.errorInfo}`);
      }
    },
    // 点击添加行按钮在某一下标下添加一行
    * insertNewListItemAfterIndex({ payload }, { select, put }) {
      const storeListData = yield select(state => state.$2$DetailModule.pageDetail);
      const newPageData = _.cloneDeep(storeListData); // 使用新对象
      const emptyItem = _.cloneDeep(proSpecModel);
      emptyItem.id = moment().toISOString();
      newPageData.splice(payload.index + 1, 0, emptyItem);
      yield put({ type: 'mergeData', payload: { pageDetail: newPageData } });
      // 重新添加一行mem记录
      const storeEditableMem = yield select(state => state.$2$DetailModule.editableMem);
      const tempRow = _.cloneDeep(storeEditableMem[0]);
      const tempRowKeys = Object.keys(tempRow);
      tempRowKeys.map((key, index) => {
        if (index === 0) {
          tempRow[key] = true;
        } else {
          tempRow[key] = false;
        }
        return false;
      });
      storeEditableMem.splice(payload.index + 1, 0, tempRow);
      yield put({ type: 'mergeData', payload: { editableMem: storeEditableMem } });
      yield put({ type: 'toggleMemStatus', payload: { rowIndex: payload.index + 1, fieldName: tempRowKeys[0] } });
    },
    // 指控其他所有的焦点状态
    * toggleMemStatus({ payload }, { select, put }) {
      const storeNewEditableMem = yield select(state => state.$2$DetailModule.editableMem);
      const storeEditableMem = _.cloneDeep(storeNewEditableMem);
      storeEditableMem.map((item, rowIndex) => {
        const itemKeys = Object.keys(item);
        const itemVales = Object.values(item);
        itemVales.map((value, colIndex) => {
          if (value === true && rowIndex === payload.rowIndex && itemKeys[colIndex] === payload.fieldName) {
            // item[itemKeys[colIndex]] = true; // keep status
          } else {
            item[itemKeys[colIndex]] = false;
          }
          return null;
        });
        return null;
      });
      yield put({ type: 'mergeData', payload: { editableMem: storeEditableMem } });
    },
    // 初始化可编辑列
    * editableMem({ payload }, { put, select }) {
      const data = yield select(state => state.$2$DetailModule.pageDetail);
      const editableMemData = Array(data.length);
      for (let i = 0; i < data.length; i += 1) {
        editableMemData[i] = _.cloneDeep({});
      }
      yield put({ type: 'mergeData', payload: { editableMem: editableMemData } });
    },
    // 自动换焦点
    * toNextMemByCurr({ payload }, { select, put }) {
      const storeEditableMem = yield select(state => state.$2$DetailModule.editableMem);
      let hasBeenSet = false;
      // let arrivedLastRowIndex = -1;
      storeEditableMem.map((item) => {
        const itemKeys = Object.keys(item);
        const itemVales = Object.values(item);
        itemVales.map((value, colIndex) => {
          if (value !== true) {
            return null;
          }
          if (hasBeenSet === false) {
            item[itemKeys[colIndex]] = false;
            if (colIndex === itemKeys.length - 1) {
              const nextRowObj = storeEditableMem[payload.rowIndex + 1];
              if (nextRowObj) {
                nextRowObj[itemKeys[0]] = true;
                hasBeenSet = true;
              } else {
                // arrivedLastRowIndex = currRowIndex;
              }
            } else {
              let indexCol = colIndex + 1;
              if (payload.isShow && indexCol < itemKeys.length - 1) {
                indexCol += 1;
              } else if (payload.isShow) {
                const nextRowObj = storeEditableMem[payload.rowIndex + 1];
                nextRowObj[itemKeys[0]] = true;
              }
              item[itemKeys[indexCol]] = true;
              hasBeenSet = true;
            }
          }
          return null;
        });
        return null;
      });
      yield put({ type: 'mergeData', payload: { editableMem: storeEditableMem } });
    },
    // 返回
    * cancelDetailData({ payload }, { put }) {
      const path = '/stock/$2$';
      yield put(routerRedux.push(path));
      // 初始化一些信息
      yield put({
        type: 'initValue',
        payload: {},
      });
    },
    // 初始化一些信息
    * initValue({ payload }, { put }) {
      yield put({
        type: 'mergeData',
        payload: {
          loading: false,
          popupListLoading: false, // 弹窗的物资选择表格的loading
          savingStatus: false, // 点击审核或者保存时防止二次点击状态控制
          detailsInfo: {}, // 内页信息
          pageDetail: [{ id: '' }], // 内页表格信息
          editableMem: [],
          queryModalString: '', // 物资的模糊搜索框
          goodsList: [], // 弹窗的物资list
          goodsPopListModel: '', // 弹窗的物资选择表格的表格数据
          popupListPagination: {
            // 弹窗的物资选择表格的分页信息
            size: 'small',
            showTotal: total => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
            current: 1,
            total: 0,
            pageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100'],
          },
          foundTreeList: [], // 弹窗的物资选择表格的左侧树
        },
      });
    },
    // 点击删除行按钮在某一下标下删除一行
    * removeListItemAtIndex({ payload }, { select, put }) {
      const storeListData = yield select(state => state.$2$DetailModule.pageDetail);
      const editableMem = yield select(state => state.$2$DetailModule.editableMem);
      const newPageData = _.cloneDeep(storeListData); // 使用新对象
      const newEditableMem = _.cloneDeep(editableMem); // 使用新对象
      newPageData.splice(payload.index, 1);
      newEditableMem.splice(payload.index, 1);
      yield put({ type: 'mergeData', payload: { pageDetail: newPageData, editableMem: newEditableMem } });
    },
    // 提交访问后台操作
    * saveRequisitionDetails({ payload }, { call, put, select }) {
      yield put({ type: 'mergeData', payload: { savingStatus: true } });
      const { pageDetail, norId, goodsId } = yield select(state => state.$2$DetailModule);
      const newPageDetail = pageDetail.filter(item => item.goodsCode);
      const cloneListData = _.cloneDeep(newPageDetail);
      // 数据组装
      const detailsData = {
        specBomDetailList: _.cloneDeep(cloneListData),
        id: norId,
        goodsId,
      };
      let saveData = null;
      // 根据页面状态 请求不同接口
      if (payload.status === 'save') {
        saveData = yield call(addBom, parse(detailsData));
      }
      if (saveData.data.code === '200' && saveData.data.success === true) {
        message.success('操作成功！');
        yield put({
          type: 'cancelDetailData',
          payload: {},
        });
      } else {
        message.warning(`操作失败，请参考：${saveData.data.errorInfo}`);
        yield put({ type: 'mergeData', payload: { savingStatus: false } });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname;
        if (location.pathname.indexOf('/stock/$2$/detail') >= 0) {
          const re = pathToRegexp('/stock/$2$/detail/:status/:goodsId/:id');
          const match = re.exec(pathname);
          if (match) {
            const pageType = match[1];
            const goodsId = match[2];
            const id = match[3] === '0' ? '' : match[3];
            // 设置当前页的面包屑路径
            dispatch({
              type: 'merchantApp/changePageRouter',
              pageRouterName: [{ edit: '编辑', view: '查看', add: '增加' }[pageType]],
            });
            // 初始化信息
            dispatch({
              type: 'initValue',
              payload: {},
            });
            dispatch({
              type: 'mergeData',
              payload: {
                pageType,
                goodsId,
                norId: id,
              },
            });
            dispatch({
              type: 'editableMem',
              payload: {},
            });
            // 获取info信息以及可编辑表格数据
            if (pageType !== 'add') {
              dispatch({
                type: 'findProdSpecBom',
                payload: {
                  goodsId,
                  id,
                },
              });
            }
          }
        }
      });
    },
  },
};
