import React, { PropTypes } from 'react';
import { Form, Input, Select, Modal, Alert, Tree } from 'antd';
import { trimParam } from '../../../utils/index';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

const nodeParent = [];
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const modal = ({
   loading,
   visible,
   item,
   title,
   postArray,
   modalErr,
   modalErrValue,
   treeData,
   code,
   treeOption,
   onOk,
   onCancel,
   onCheck,
   form: {
     getFieldDecorator,
     validateFields,
     getFieldsValue,
     resetFields,
   },
 }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      };
      data.postName = trimParam(data.postName);
      data.postCode = Number(trimParam(data.postCode)).toString();
      onOk(data);
    });
  };
  // 生成选择树方法
  const loopTree = data => data.map((treeItem) => {
    if (treeItem.children && treeItem.children.length) {
      if (!nodeParent.includes(treeItem.id)) {
        nodeParent.push(treeItem.id);
      }
      return (<TreeNode key={treeItem.id} title={treeItem.menugroupsName}>
        {loopTree(treeItem.children)}
      </TreeNode>);
    }
    if (treeItem.id !== 'sa03' && treeItem.id !== 'sa04' && treeItem.id !== 'sa06') {
      return <TreeNode key={treeItem.id} title={treeItem.menugroupsName} />;
    }
    return false;
  });
  // 展示树过滤掉父节点
  let nodeArray = [];
  const filterNode = (val) => {
    if (val) {
      nodeArray = val;
      nodeParent.forEach((node) => {
        nodeArray = nodeArray.filter(key => key !== node);
      });
    }
    return nodeArray;
  };
  // 权重选项
  const postOptions = postArray.map(postItem => ((postItem.code < code) ?
    <Option value={postItem.code} key={postItem.code}>{postItem.name}</Option> : null));
  const modalOpts = {
    width: 600,
    title,
    visible,
    onOk: handleSubmit,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
    maskClosable: false,
    afterClose: resetFields,
  };
  return (
    <Modal {...modalOpts}>
      <div>
        {modalErr && <Alert message={modalErrValue} type="error" showIcon />}
        <Form
          onSubmit={handleSubmit}
          style={{ marginTop: 8 }}
        >
          <FormItem
            {...formItemLayout}
            label="角色名称"
          >
            {getFieldDecorator('postName', {
              initialValue: item.postName,
              rules: [
                { required: true, message: '角色名称未填写', whitespace: true },
                {
                  pattern: /^[_\-a-zA-Z0-9\u4e00-\u9fa5]+$/,
                  message: '请输入2到10位中文/英文/数字/下划线字符，可组合！',
                },
              ],
            })(
              <Input maxLength="10" placeholder="请输入2到10位中文/英文/数字/下划线字符，可组合！" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="权重"
          >
            {getFieldDecorator('postCode', {
              initialValue: item.postCode,
              rules: [
                { required: true, message: '权重不能为空' },
              ],
            })(
              <Select placeholder="请选择权重">
                {postOptions}
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="权限"
          >
            {getFieldDecorator('nodeIdList', {
              initialValue: '',
            })(
              <Tree
                checkable
                checkedKeys={filterNode(treeOption.checkedKeys)}
                // onCheck={onCheck}
                onCheck={(val, event) => onCheck(val, event)}
              >
                {loopTree(treeData)}
              </Tree>,
            )}
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  visible: PropTypes.bool,
  modalErr: PropTypes.bool,
  loading: PropTypes.bool,
  form: PropTypes.object,
  item: PropTypes.object,
  treeOption: PropTypes.object,
  title: PropTypes.string,
  modalErrValue: PropTypes.string,
  postArray: PropTypes.array,
  treeData: PropTypes.array,
  code: PropTypes.number,
  onCheck: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(modal);
