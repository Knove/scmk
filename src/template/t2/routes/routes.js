import React from 'react';
import { connect } from 'dva';
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
    supplierSearchAction(value) {
      dispatch({
        type: '$2$Module/querySupplier',
        payload: {
          queryString: value,
        },
      });
    }
  };

  const $2$TableData = {
    $2$Module,
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
    onPageSizeChange(current, pageSize) {
      dispatch({
        type: '$2$Module/getList',
        payload: {
          pageNo: 1,
          pageSize,
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
