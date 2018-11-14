import React from 'react';
import { DetailTable } from '../../../Inventory/_components/hermes-react/components/index';

const $1$DetailsFilter = ({ $2$DetailModule }) => {
  const state = $2$DetailModule;
  const detailConfig = [
    {
      label: '单号',
      value: state.billNo,
      isSkipped: !state.billNo,
    },
  ];
  return (
    <div className="components-search">
      <DetailTable dataSource={detailConfig} columnCount={6} />
    </div>
  );
};

export default $1$DetailsFilter;
