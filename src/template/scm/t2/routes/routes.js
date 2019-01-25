import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import $1$Filter from '../../components/Inventory/$1$/filter';
import $1$Table from '../../components/Inventory/$1$/table';

const $1$ = ({ $2$Module, dispatch }) => {
  const $2$FilterData = {
    $2$Module,
    mergeData(payload) {
      dispatch({
        type: '$2$Module/mergeData',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: '$2$Module/getList',
        payload: {},
      });
    },
    routerGo(path) {
      dispatch({
        type: '$2$Module/routerGo',
        payload: {
          path,
        },
      });
    },
    clearAction() {
      dispatch({
        type: '$2$Module/mergeData',
        payload: {
          supplyId: '', // 下拉选中的数据
          inputValue: '', // 输入框数据
          status: '', // 状态数据
          datePicker: [moment().subtract(1, 'months'), moment()], // 日期选择框数据
          selectedRowKeys: [], // 表格多选的数据集合
        },
      });
      dispatch({
        type: '$2$Module/getList',
        payload: {
          pageNo: 1,
          pageSize: 10,
        },
      });
    },
  };

  const $2$TableData = {
    $2$Module,
    routerGo(path) {
      dispatch({
        type: '$2$Module/routerGo',
        payload: {
          path,
        },
      });
    },
    mergeData(payload) {
      dispatch({
        type: '$2$Module/mergeData',
        payload,
      });
    },
    onPageChange(page) {
      dispatch({
        type: '$2$Module/getList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
  };

  return (
    <div className="routes">
      <$1$Filter {...$2$FilterData} />
      <$1$Table {...$2$TableData} />
    </div>
  );
};

function mapStateToProps({ $2$Module }) {
  return { $2$Module };
}
export default connect(mapStateToProps)($1$);
