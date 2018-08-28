import request from '../../utils/request';

export async function fetchList(params) {
  return request('/ipos-chains/scm/scmstallgoods/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 获取左侧树
export async function findScmApplyOrderGoods(params) {
  return request('/ipos-chains/scm/scmstallgoods/storeStallTreeForStallManage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function findGoodsCate(params) {
  return request('/ipos-chains/scm/scmstallgoods/findGoodsCate', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
