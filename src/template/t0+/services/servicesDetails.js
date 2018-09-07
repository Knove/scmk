import request from '../../utils/request';

export async function findProdSpecBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/findProdSpecBom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
export async function updateAndAuditBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/updateAndAuditBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}
