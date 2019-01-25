import request from '../../utils/request';

// 获取详情页数据
export async function findProdSpecBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/findProdSpecBom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
// 保存操作
export async function addBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/addBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}
