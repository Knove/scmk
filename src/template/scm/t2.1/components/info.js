import React from 'react';
import { DetailTable } from '../../_components/hermes-react/components/index.jsx';

const $1$DetailsFilter = ({ $2$DetailModule }) => {
  const state = $2$DetailModule;
  const detailsInfo = state.detailsInfo;
  const detailConfig = [
    {
      label: '单号',
      value: detailsInfo.billNo,
    },
  ];
  return (
    <div className="components-search">
      <DetailTable dataSource={detailConfig} columnCount={6} />
    </div>
  );
};

export default $1$DetailsFilter;
