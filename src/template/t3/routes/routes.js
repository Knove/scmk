import React from 'react';
import { connect } from 'dva';
import $1$Filter from '../../components/Inventory/$1$/filter';

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
    selectTree(selectedKey, e) {
      dispatch({
        type: '$2$Module/mergeData',
        payload: {
          selectedKeys: selectedKey,
        },
      });
      if (e.node.props.hasChildren) {
        dispatch({
          type: '$2$Module/mergeData',
          payload: {
            stallId: '',
            storeId: selectedKey[0],
          },
        });
        dispatch({
          type: '$2$Module/getList',
          payload: {
            storeId: selectedKey[0],
            page: 1,
            rows: 10,
          },
        });
      } else {
        dispatch({
          type: '$2$Module/mergeData',
          payload: {
            stallId: selectedKey[0],
          },
        });
        dispatch({
          type: '$2$Module/getList',
          payload: {
            stallId: selectedKey[0],
            page: 1,
            rows: 10,
          },
        });
      }
    },
  };

  const $2$TableData = {
    $2$Module,
    onPageChange(page) {
      dispatch({
        type: '$2$Module/getList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      dispatch({
        type: '$2$Module/mergeData',
        payload,
      });
    },
  };
  $2$FilterData.$2$TableData = $2$TableData;
  return (
    <div className="routes">
      <$1$Filter {...$2$FilterData} />
    </div>
  );
};

function mapStateToProps({ $2$Module }) {
  return { $2$Module };
}
export default connect(mapStateToProps)($1$);
