import { parse } from 'qs';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import _ from 'lodash';
import { proSpecModel } from './_common';
import { findProdSpecBom, findGoodsForData, addBom, updateAndAuditBom, addAndAuditBom } from '../../services/inventory/$2$Details';
import { findTreeList } from '../../services/inventory/common';

export default {
  namespace: '$2$DetailModule',
  state: {
    billNo: '123456', // info页的单号
    scmk: 'SCMK', // info页的创建人
    loading: false,
    checkFlag: false,
    popupListLoading: false, // 弹窗的物资选择表格的loading
    savingStatus: false, // 点击审核或者保存时防止二次点击状态控制
    pageType: '', // 内页 查看 编辑 新增的状态保存
    goodsId: '',
    detailsInfo: {}, // 保存info页信息
    pageDetail: [
      {
        id: '',
      },
    ],
    editableMem: [],
    queryModalString: '', // 弹窗的物资选择表格的模糊搜索框
    goodsList: [],
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
    changeSavingStatus(state, action) {
      return { ...state, savingStatus: action.savingStatus, tamplateId: action.tamplateId };
    },
  },
  effects: {
    // Jump to this, get Data
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
            loading: false,
          },
        });
        yield put({
          type: 'editableMem',
          payload: { dataSource: [] },
        });
      } else {
        message.warning(`操作失败，请参考：${data.data.errorInfo}`);
        yield put({ type: 'hideLoading' });
      }
    },
    * queryGoodsCoding({ payload }, { call, put }) {
      // 查询物资
      yield put({ type: 'showLoading' });
      const data = yield call(findGoodsForData, parse(payload));
      if (data.data && data.data.success) {
        yield put({
          type: 'mergeData',
          payload: {
            goodsList: data.data.data.list,
          },
        });
      } else {
        message.warning(`操作失败，请参考：${data.data.errorInfo}`);
        yield put({ type: 'hideLoading' });
      }
    },
    // 获取弹窗的物资列表
    * getPopListData({ payload }, { select, call, put }) {
      const { popupListPagination, queryModalString } = yield select(state => state.$2$DetailModule);
      const pageNo = payload.pageNo || popupListPagination.current;
      const pageSize = payload.pageSize || popupListPagination.pageSize;
      const queryString = payload.queryString || payload.queryString === '' ? payload.queryString : queryModalString;
      if (payload.queryString || payload.queryString === '') {
        yield put({ type: 'mergeData', payload: { queryModalString: payload.queryString, popupListLoading: true } });
      } else {
        yield put({ type: 'mergeData', payload: { popupListLoading: true } });
      }
      let reqParams = {};
      const thisCateId = payload.cateId;
      if (thisCateId) {
        reqParams = {
          cateId: thisCateId,
          page: pageNo, // 查看第几页内容 默认1
          rows: pageSize, // 一页展示条数 默认10
          queryString, // 查询条件
        };
      } else {
        reqParams = {
          page: pageNo, // 查看第几页内容 默认1
          rows: pageSize, // 一页展示条数 默认10}
          queryString, // 查询条件
          cateId: '',
        };
      }
      const goodsData = yield call(findGoodsForData, parse(reqParams));
      if (goodsData && goodsData.data) {
        yield put({
          type: 'mergeData',
          payload: {
            popupListLoading: false,
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
      }
    },
    // 选择物品的左侧 类别栏
    * searchTreeList({ payload }, { call, put, select }) {
      const { selectedStallId, selectedStoreId } = yield select(state => state.$2$DetailModule);
      payload.storeId = selectedStoreId;
      payload.stallId = selectedStallId;
      // 查找物资类别
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
    * syncSeletedItemIntoList({ payload }, { select, put }) {
      // 将选择的物资对象合并到表格对象中
      yield put({ type: 'showLoading' });
      const storeListData = yield select(state => state.$2$DetailModule.pageDetail);
      const newPageData = _.cloneDeep(storeListData); // 使用新对象
      const selectedObjs = _.cloneDeep(payload.selectedObjs); // 使用新对象
      selectedObjs.map((item) => {
        item.goodsId = item.id;
        delete item.consTranRates;
        if (!item.lastInDepotPrice) item.lastInDepotPrice = 0;
        if (!item.cost) item.cost = 0;
        return null;
      });
      newPageData.splice(payload.index + 1, 0, ...selectedObjs); // Insert selectedObjs to newPageData at payload.index
      newPageData.splice(payload.index, 1); // Remove the old item at index
      yield put({ type: 'gotDetailList', pageDetail: newPageData });
      const storeEditableMem = yield select(state => state.$2$DetailModule.editableMem);
      storeEditableMem[payload.index][payload.fieldName] = false;
      yield put({ type: 'setNewEditableMem', editableMem: storeEditableMem });
      yield put({
        type: 'querySuccess',
        payload: {
          cateId: '',
          queryModalString: '',
          popupListPagination: {
            current: 1,
            pageSize: 10,
          },
        },
      });
      if (payload.isModal) {
        yield put({
          type: 'editableMem',
          payload: { dataSource: [] },
        });
      }
    },
    * insertNewListItemAfterIndex({ payload }, { select, put }) {
      // 点击添加行按钮在某一下标下添加一行
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
    * toggleMemStatus({ payload }, { select, put }) {
      // 指控其他所有的焦点状态
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
    * syncMemFields({ payload }, { put, select }) {
      // 初始化可编辑列
      const storeEditableMem = yield select(state => state.$2$DetailModule.editableMem);
      const storeListData = yield select(state => state.$2$DetailModule.pageDetail);
      const fieldName = payload.fieldName;
      storeListData.map((item, index) => {
        const memRowColumns = storeEditableMem[index] && Object.keys(storeEditableMem[index]);
        if (!storeEditableMem[index]) {
          storeEditableMem[index] = {};
          storeEditableMem[index][fieldName] = false;
        } else if (memRowColumns && memRowColumns.length > 0 && !memRowColumns.includes(fieldName)) {
          storeEditableMem[index][fieldName] = false;
        }
        return false;
      });
      yield put({ type: 'setNewEditableMem', editableMem: storeEditableMem });
    },
    * editableMem({ payload }, { put, select }) {
      const data = yield select(state => state.$2$DetailModule.pageDetail);
      const editableMemData = Array(data.length);
      for (let i = 0; i < data.length; i += 1) {
        editableMemData[i] = _.cloneDeep({});
      }
      yield put({ type: 'querySuccess', payload: { editableMem: editableMemData } });
    },
    * toNextMemByCurr({ payload }, { select, put }) {
      // 自动换焦点
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
      yield put({ type: 'setNewEditableMem', editableMem: storeEditableMem });
    },
    * cancelDetailData({ payload }, { put }) {
      // 返回
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
    * removeListItemAtIndex({ payload }, { select, put }) {
      // 点击删除行按钮在某一下标下添加一行
      yield put({ type: 'showLoading' });
      const storeListData = yield select(state => state.$2$DetailModule.pageDetail);
      const editableMem = yield select(state => state.$2$DetailModule.editableMem);
      const newPageData = _.cloneDeep(storeListData); // 使用新对象
      const newEditableMem = _.cloneDeep(editableMem); // 使用新对象
      newPageData.splice(payload.index, 1);
      newEditableMem.splice(payload.index, 1);
      yield put({ type: 'mergeData', payload: { pageDetail: newPageData, editableMem: newEditableMem } });
    },
    * saveRequisitionDetails({ payload }, { call, put, select }) {
      // 提交访问后台操作。（审核，保存等）
      if (payload.displaySavingMessage !== false) {
        const { pageDetail, norId, goodsId } = yield select(state => state.$2$DetailModule);
        yield put({ type: 'querySuccess', payload: { checkFlag: true } });

        const newPageDetail = pageDetail.filter(item => item.goodsCode);
        const cloneListData = _.cloneDeep(newPageDetail);

        if (!cloneListData.length) {
          message.error('第一行物资编码不能为空');
          return false;
        }
        // 数据规整删减
        cloneListData.map((item) => {
          delete item.id;
          delete item.createTime; // 不需要手动保存创建时间
          delete item.updateTime;
          delete item.updateUser;
          delete item.deleteFlag;
          return null;
        });

        // 数据审核
        const invalidiGoodsCode = _.findIndex(cloneListData, item => !item.goodsCode);
        if (invalidiGoodsCode >= 0) {
          message.error(`第${invalidiGoodsCode + 1}行“物品编码”数据无效，请检查！`, 3);
          return null;
        }

        // 数据组装
        const detailsData = {
          specBomDetailList: _.cloneDeep(cloneListData),
          id: norId,
          goodsId,
        };
        let saveData = null;
        yield put({
          type: 'mergeData',
          payload: {
            savingStatus: true,
            loadingList: true,
          },
        });
        // 根据页面状态 请求不同接口
        if (payload.status === 'save') {
          saveData = yield call(addBom, parse(detailsData));
        } else if (payload.status === 'add') {
          saveData = yield call(addAndAuditBom, parse(detailsData));
        } else if (payload.status === 'edit') {
          saveData = yield call(updateAndAuditBom, parse(detailsData));
        }
        if (saveData.data.code === '200' && saveData.data.success === true) {
          message.success('操作成功！');
          yield put({
            type: 'cancelDetailData',
            payload: {},
          });
        } else {
          message.warning(`操作失败，请参考：${saveData.data.errorInfo}`, 5);
          yield put({
            type: 'mergeData',
            payload: {
              loadingList: false,
            },
          });
          yield put({
            type: 'changeSavingStatus',
            savingStatus: false,
            tamplateId: {},
          });
        }
      }
      return null;
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
              pageRouterName: [{ edit: '内页 - 编辑', view: '内页 - 查看', add: '内页 - 增加' }[pageType]],
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
            // 如果是查看或者编辑，请求后台
            if (pageType === 'edit' || pageType === 'view') {
              // 获取info信息以及可编辑表格数据
              dispatch({
                type: 'findProdSpecBom',
                payload: {
                  goodsId,
                  id,
                },
              });
            } else {
              // 如果是新增，则直接初始化
              dispatch({
                type: 'querySuccess',
                payload: {
                  detailsInfo: [],
                  pageDetail: [{ id: '' }],
                  loading: false,
                },
              });
              dispatch({
                type: 'editableMem',
                payload: { dataSource: [] },
              });
            }
          }
        }
      });
    },
  },
};
