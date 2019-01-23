import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { fetchList } from '../../services/inventory/$2$';

export default {
  namespace: '$2$Module',
  state: {
    loading: false, // 加载状态
    listData: [], // 表格数据
    inputValue: '', // 输入框数据
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
      const { pagination } = yield select(state => state.$2$Module);
      payload.page = payload.pageNo || pagination.current;
      payload.rows = payload.pageSize || pagination.pageSize;
      const listData = yield call(fetchList, parse(payload));
      if (listData.data && listData.data.success) {
        yield put({
          type: 'mergeData',
          payload: {
            listData: listData.data.data.list,
            pagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              total: listData.data.data.total,
              current: listData.data.data.pageNum,
              pageSize: listData.data.data.pageSize,
              showTotal: total => `共 ${total} 条`,
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.warning(`操作失败，请参考：${listData.data.errorInfo}`);
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
        }
      });
    },
  },
};
