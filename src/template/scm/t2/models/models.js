import { parse } from 'qs';
import { message } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { querySupplier } from '../../services/inventory/common';
import { fetchList } from '../../services/inventory/$2$';

export default {
  namespace: '$2$Module',
  state: {
    loading: false, // 加载状态
    listData: [], // 表格数据
    supplyId: '', // 下拉选中的数据
    supplyString: '', // 输入的数据
    supplyList: '', // 下拉框List数据
    inputValue: '', // 输入框数据
    status: '', // 状态数据
    datePicker: [moment().subtract(1, 'months'), moment()], // 日期选择框数据
    selectedRowKeys: [], // 表格多选的数据集合
    pagination: {
      // 分页
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
  },
  reducers: {
    mergeData(state, action) {
      return { ...state, ...action.payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },
  effects: {
    // 获取表格数据
    * getList({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { supplyId, pagination, datePicker, status } = yield select(state => state.$2$Module);
      payload.suppId = supplyId;
      payload.page = payload.pageNo || pagination.current;
      payload.rows = payload.pageSize || pagination.pageSize;
      payload.startDate = moment(datePicker[0]).format('YYYY-MM-DD');
      payload.endDate = moment(datePicker[1]).format('YYYY-MM-DD');
      payload.status = status;
      const data = yield call(fetchList, parse(payload));
      if (data.data && data.data.success) {
        const listData = data.data.data;
        yield put({
          type: 'mergeData',
          payload: {
            listData: listData.list,
            pagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              total: listData.total,
              current: listData.pageNum,
              showTotal: total => `共 ${total} 条`,
              pageSize: listData.pageSize,
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.warning(`操作失败，请参考：${data.data.errorInfo}`);
      }
      yield put({ type: 'hideLoading' });
    },
    // 获取下拉框中的数据
    * querySupplier({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const data = yield call(querySupplier, parse(payload));
      if (data.data && data.data.success) {
        const dataList = data.data.data.page.data;
        let currStoreId = '';
        if (dataList.length > 1) {
          dataList.unshift({ suppName: '请选择', id: '' });
        } else if (dataList.length === 1) {
          currStoreId = dataList[0].suppName;
          yield put({
            type: 'getList',
            payload: {
              supplyId: currStoreId,
            },
          });
        }
        yield put({
          type: 'mergeData',
          payload: {
            supplyId: currStoreId,
            supplyList: dataList.map(item => ({
              id: item.id,
              name: item.suppName,
            })),
          },
        });
      } else {
        message.warning(`操作失败，请参考：${data.data.errorInfo}`);
      }
      yield put({ type: 'hideLoading' });
    },
    // 跳转控制
    * routerGo({ payload }, { put }) {
      const path = payload.path;
      yield put(routerRedux.push(path));
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/stock/$2$') {
          dispatch({
            // 设置当前页的面包屑路径
            type: 'merchantApp/changePageRouter',
            pageRouterName: [''], // 数组项目会在面包屑中展开
          });
          // 初始化请求表格
          dispatch({
            type: 'getList',
            payload: {},
          });
          // 初始化请求下拉框内容
          dispatch({
            type: 'querySupplier',
            payload: { rows: 100000, orgType: 1 }, // orgType:1 门店 2:总部
          });
        }
      });
    },
  },
};
