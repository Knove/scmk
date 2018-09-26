/* CREATE BY YBY 2017/12/29 下午1:48:16*/
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Search from '../../components/System/$1$/search';
import List from '../../components/System/$1$/list';
import Modal from '../../components/System/$1$/modal';
import { deleteArray, deleteCodes } from '../../utils/index';

const $1$ = ({ dispatch, cloudState }) => {
  const {
    dataList,
    nodeIdList,
    choosedCodes,
    selected$1$,
    pagination,
    currentItem,
    modalVisible,
    modalType,
    modalError,
    modalErrorValue,
    treeData,
    treeOption,
    code,
  } = cloudState.$2$;
  const loading = cloudState.loading.effects;
  // 取得$2$页面的button权限
  const $2$Button = cloudState.account.buttonPermissions.system.set.$2$;
  const searchProps = {
    choosedCodes,
    selected$1$,
    $2$Button,
    // 新增角色
    onAdd() {
      // 打开弹窗
      dispatch({
        type: '$2$/showModal',
        payload: {
          modalType: 'create',
        },
      });
      // 新增时清空已选权限
      dispatch({
        type: '$2$/updateState',
        payload: {
          treeOption: {
            ...treeOption,
            checkedKeys: [],
          },
        },
      });
    },
    // 启用、停用
    onChangeStatus(status, array) {
      dispatch({
        type: '$2$/onOff',
        payload: {
          ids: array.join(','),
          status,
        },
      });
    },
    // 删除
    onDelete(param) {
      dispatch({
        type: '$2$/delete',
        payload: {
          ids: param.join(','),
        },
      });
    },
  };
  const listProps = {
    code,
    dataList,
    choosedCodes,
    loading: loading['$2$/query'] || loading['$2$/reload'],
    selected$1$,
    pagination,
    $2$Button,
    // 分页
    onPageChange(page) {
      const currPage = page.pageSize === pagination.pageSize ? page.current : 1;
      dispatch({
        type: '$2$/query',
        payload: {
          pageno: currPage,
          rowcount: page.pageSize,
        },
      });
    },
    // 编辑角色
    onEdit(item) {
      dispatch({
        type: '$2$/showModal',
      });
      //  console.log(item)
      dispatch({
        type: '$2$/updateState',
        payload: {
          modalType: 'update',
          currentItem: item,
          nodeIdList: item.nodeIdList,
          treeOption: {
            ...treeOption,
            checkedKeys: item.nodeIdList,
          },
        },
      });
    },
    // 勾选
    onSelect$1$(data) {
      let codeArray = [];
      if (choosedCodes) {
        codeArray = [...choosedCodes, ...data.selectedCodes];
      } else {
        codeArray = data.selectedCodes;
      }
      dispatch({
        type: '$2$/updateState',
        payload: {
          selected$1$: [...selected$1$, ...data.selected$1$],
          choosedCodes: codeArray,
        },
      });
    },
    // 取消勾选
    onDelete$1$(codes) {
      dispatch({
        type: '$2$/updateState',
        payload: {
          selected$1$: deleteArray(selected$1$, codes, 'id'),
          choosedCodes: deleteCodes(choosedCodes, codes),
        },
      });
    },
  };
  const modalProps = {
    postArray: cloudState.account.postArray,
    loading: loading['$2$/add'],
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    title: modalType === 'create' ? '新增角色' : '编辑角色',
    visible: modalVisible,
    modalErr: modalError,
    modalErrValue: modalErrorValue,
    treeData,
    treeOption,
    nodeIdList,
    code,
    // 弹窗确认
    onOk(data) {
      const param = data;
      param.nodeIdList = nodeIdList;
      dispatch({
        type: '$2$/add',
        payload: param,
      });
    },
    // 弹窗取消
    onCancel() {
      dispatch({
        type: '$2$/hideModal',
      });
      dispatch({
        type: '$2$/updateState',
        payload: {
          modalError: false,
          modalErrorValue: null,
        },
      });
    },
    // 勾选权限
    onCheck(val, event) {
      if (val.includes('sa01')) {
        val.splice(-1, 0, 'sa03', 'sa06');
      }
      if (val.includes('sa02')) {
        val.splice(-1, 0, 'sa04');
      }
      dispatch({
        type: '$2$/updateState',
        payload: {
          nodeIdList: val.concat(event.halfCheckedKeys),
          treeOption: {
            ...treeOption,
            checkedKeys: val,
          },
        },
      });
    },
  };
  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <Modal {...modalProps} />
    </div>
  );
};
function mapStateToProps(cloudState) {
  return { cloudState };
}

$1$.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object,
};
export default connect(mapStateToProps)($1$);
