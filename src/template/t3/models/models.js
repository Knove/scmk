import { parse } from 'qs';
import { message } from 'antd';
import { fetchList, findGoodsCate, findScmApplyOrderGoods } from '../../services/inventory/$2$';

export default {
  namespace: '$2$Module',
  state: {
    loading: false, // 加载状态
    goodsCateList: [], // 物品类别的List
    listData: [], // 表格数据
    objectId: '', // 选择框数据
    inputValue: '', // 输入框数据
    treeList: [], // 左侧表格数据
    selectedKeys: [], // 左侧树 选中的key
    searchValue: '', // 左侧搜索，搜索框里的value
    expandedKeys: [], // 左侧搜索，展开用的key集合
    autoExpandParent: true, // 首页的树用
    selectedRowKeys: [], // 表格多选的数据集合
    // 分页
    pagination: {
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
    // Update state.
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
    // get list data from server
    * getList({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { objectId, inputValue, pagination } = yield select(state => state.$2$Module);
      payload.page = payload.pageNo || pagination.current;
      payload.rows = payload.pageSize || pagination.pageSize;
      payload.cateId = objectId;
      payload.goodsName = inputValue;
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
              showTotal: total => `共 ${total} 条`,
              pageSize: listData.data.data.pageSize,
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.warning(`操作失败，请参考：${listData.data.errorInfo}`);
      }
      yield put({ type: 'hideLoading' });
    },
    // 获取物品类别
    * getGoodsCate({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const goodsCateList = yield call(findGoodsCate, parse(payload));
      if (goodsCateList.data && goodsCateList.data.code === '200') {
        const list = goodsCateList.data.data;
        yield put({
          type: 'mergeData',
          payload: {
            goodsCateList: list,
          },
        });
      } else {
        message.warning(`操作失败，请参考：${goodsCateList.data.errorInfo}`);
        yield put({ type: 'hideLoading' });
      }
    },
    // 获取左侧树
    * getTreeList({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const treeList = yield call(findScmApplyOrderGoods, parse(payload));
      if (treeList.data && treeList.data.code === '200') {
        const treeListData = treeList.data.data;
        yield put({
          type: 'mergeData',
          payload: {
            treeList: treeListData,
            loading: false,
          },
        });
      } else {
        message.warning(`操作失败，请参考：${treeList.data.errorInfo}`);
        yield put({ type: 'hideLoading' });
      }
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
            payload: { page: 1, rows: 10 },
          });
          dispatch({
            type: 'getGoodsCate',
            payload: {},
          });
          dispatch({
            type: 'getTreeList',
            payload: {},
          });
        }
      });
    },
  },
};
