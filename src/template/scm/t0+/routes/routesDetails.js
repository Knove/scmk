import React from 'react';
import { connect } from 'dva';
import DetailsFilter from '../../components/Inventory/$1$/details/info';
import DetailListView from '../../components/Inventory/$1$/details/listView';

const $1$Details = ({ $2$DetailModule, dispatch }) => {
  const DetailsFilterData = {
    $2$DetailModule,
  };
  const DetailsListData = {
    $2$DetailModule,
    mergeData(payload) {
      dispatch({
        type: '$2$DetailModule/mergeData',
        payload,
      });
    },
    // 自动换焦点
    toNextMem: (rowIndex, fieldName, isShow) => {
      dispatch({
        type: '$2$DetailModule/toNextMemByCurr',
        payload: { rowIndex, fieldName, isShow },
      });
    },
    // 添加一行
    insertNewRowAfterIndex: (index) => {
      dispatch({
        type: '$2$DetailModule/insertNewListItemAfterIndex',
        payload: { index },
      });
    },
    // 删除一行
    removeRowAtIndex: (index) => {
      dispatch({
        type: '$2$DetailModule/removeListItemAtIndex',
        payload: { index },
      });
    },
    saveDetails: () => {
      dispatch({
        type: '$2$DetailModule/saveRequisitionDetails',
        payload: {},
      });
    },
    cancelDetailPage: () => {
      dispatch({
        type: '$2$DetailModule/cancelDetailData',
        payload: {},
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

function mapStateToProps({ $2$DetailModule }) {
  return { $2$DetailModule };
}
export default connect(mapStateToProps)($1$Details);
