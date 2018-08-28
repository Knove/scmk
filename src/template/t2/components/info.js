import React from 'react';
import { DetailTable } from '../../_components/hermes-react/components/index.jsx';

const CostsListDetailsFilter = ({
  $2$Module,
}) => {
  const state = $2$Module;
  const detailConfig = [
    {
      label: '定价单号',
      value: billInfo.billNo,
      isSkipped: opType === 'create' || !billInfo.billNo, // 是否显示，创建时不显示请购单
    },
    {
      label: '创建人',
      value: billInfo.createUserName,
      isSkipped: opType === 'create' || !billInfo.createUserName, // 是否显示，创建时不显示请购单
    },
  ];
  return (
    <div className="components-search">
      <DetailTable dataSource={detailConfig} columnCount={6} />
    </div>
  );
};

export default CostsListDetailsFilter;
