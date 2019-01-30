import request from '../../utils/request';

export async function fetchList(params) {
  return request('/ipos-chains/scmzb/directSupplierPrice/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function example(params) {
  return request('/ipos-chains/example', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
