import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import moment from 'moment';
import _ from 'lodash';
import { proSpecModel } from './_common';
import { findProdSpecBom, updateAndAuditBom } from '../../services/inventory/$2$Details';

export default {
  namespace: '$2$DetailModule',
  state: {
    billNo: '123456', // info页的单号
    loading: false,
    savingStatus: false, // 点击保存时防止二次点击状态控制
    pageType: '', // 内页查看、编辑的状态保存
    goodsId: '',
    detailsInfo: {}, // 保存info页信息
    pageDetail: [
      {
        id: '',
      },
    ],
    editableMem: [],
    goodsList: [],
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    mergeData(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    setNewEditableMem(state, action) {
      return { ...state, editableMem: action.editableMem };
    },
    gotDetailList(state, action) {
      return { ...state, pageDetail: action.pageDetail, loading: false };
    },
  },
  effects: {
    // 获取表格数据
    * findProdSpecBom({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const data = yield call(findProdSpecBom, parse(payload));
      if (data.data && data.data.success) {
        const list = data.data.data.specBomDetailList;
        yield put({
          type: 'querySuccess',
          payload: {
            detailsInfo: data.data.data,
            pageDetail: list.length > 0 ? list : [{ id: '' }],
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
    // 点击添加行按钮在某一下标下添加一行
    * insertNewListItemAfterIndex({ payload }, { select, put }) {
      yield put({ type: 'showLoading' });
      const storeListData = yield select(state => state.$2$DetailModule.pageDetail);
      const newPageData = _.cloneDeep(storeListData); // 使用新对象
      const emptyItem = _.cloneDeep(proSpecModel);
      emptyItem.id = moment().toISOString();
      newPageData.splice(payload.index + 1, 0, emptyItem);
      yield put({ type: 'gotDetailList', pageDetail: newPageData });
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
      yield put({ type: 'setNewEditableMem', editableMem: storeEditableMem });
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
    * editableMem({ payload }, { put, select }) {
      const data = yield select(state => state.$2$DetailModule.pageDetail);
      const editableMemData = Array(data.length);
      for (let i = 0; i < data.length; i += 1) {
        editableMemData[i] = _.cloneDeep({});
      }
      yield put({ type: 'querySuccess', payload: { editableMem: editableMemData } });
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
      yield put({ type: 'mergeData', editableMem: storeEditableMem });
    },
    // 返回
    * cancelDetailData({ payload }, { put }) {
      const path = '/stock/$2$';
      yield put(routerRedux.push(path));
      // 初始化一些信息
      yield put({
        type: 'querySuccess',
        payload: {
          savingStatus: false,
        },
      });
    },
    // 点击删除行按钮在某一下标下添加一行
    * removeListItemAtIndex({ payload }, { select, put }) {
      yield put({ type: 'showLoading' });
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
      const { pageDetail, norId, goodsId } = yield select(state => state.$2$DetailModule);
      const newPageDetail = pageDetail.filter(item => item.goodsCode);
      const cloneListData = _.cloneDeep(newPageDetail);
      // 请求数据组装
      const detailsData = {
        cloneListData,
        id: norId,
        goodsId,
      };
      // 防止二次操作
      yield put({
        type: 'mergeData',
        payload: {
          savingStatus: true,
        },
      });
      // 请求接口
      const saveData = yield call(updateAndAuditBom, parse(detailsData));
      if (saveData.data && saveData.data.success === true) {
        message.success('操作成功！');
        yield put({
          type: 'cancelDetailData',
          payload: {},
        });
      } else {
        message.warning(`操作失败，请参考：${saveData.data.errorInfo}`);
        yield put({
          type: 'mergeData',
          payload: {
            savingStatus: false,
          },
        });
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
              pageRouterName: [{ edit: '编辑', view: ' 查看' }[pageType]],
            });
            // 初始化操作
            dispatch({
              type: 'mergeData',
              payload: {
                detailsInfo: {},
                pageType,
                goodsId,
                norId: id,
                pageDetail: [
                  {
                    id: '',
                  },
                ],
              },
            });
            dispatch({
              type: 'findProdSpecBom',
              payload: {
                goodsId,
                id,
              },
            });
          }
        }
      });
    },
  },
};
