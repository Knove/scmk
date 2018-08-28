import React from 'react';
import { DetailTable } from '../../_components/hermes-react/components/index.jsx';

const $1$DetailsFilter = ({
  $2$DetailModule,
}) => {
  const state = $2$DetailModule;
  const detailConfig = [
    {
      label: '单号',
      value: state.billNo,
      isSkipped: !state.billNo, // 是否显示，创建时不显示请购单
    },
    {
      label: '创建人',
      value: state.scmk,
      isSkipped: !state.scmk, // 是否显示，创建时不显示请购单
    },
  ];
  return (
    <div className="components-search">
      <DetailTable dataSource={detailConfig} columnCount={6} />
    </div>
  );
};

export default $1$DetailsFilter;
