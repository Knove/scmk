import request from '../../utils/request';

export async function findDataForPage(params) {
  return request('/ipos-chains/process/scmprodspecbom/findDataForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function querySetingInfo(params) {
  return request('/ipos-chains/process/scmprodspecbom/findProdSpec', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function add(params) {
  return request('/ipos-chains/process/scmprodspecbom/add', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return request('/ipos-chains/process/scmprodspecbom/update', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function deletes(params) {
  return request('/ipos-chains/process/scmprodspecbom/delete', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function findProdSpecBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/findProdSpecBom', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function findGoodsForData(params) {
  return request('/ipos-chains/process/scmprodspecbom/findGoodsForPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function addBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/addBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function auditBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/auditBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function batchAuditBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/batchAuditBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function findBatchAuditGoods(params) {
  return request('/ipos-chains/process/scmprodspecbom/findBatchAuditGoods', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function findBatchReplaceGoods(params) {
  return request('/ipos-chains/process/scmprodspecbom/findBatchReplaceGoods', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function batchReplaceGoods(params) {
  return request('/ipos-chains/process/scmprodspecbom/batchReplaceGoods', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function abolish(params) {
  return request('/ipos-chains/process/scmprodspecbom/abolish', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function rebutBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/rebutBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function updateBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/updateBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}

export async function addAndAuditBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/addAndAuditBom', {
    method: 'post',
    needToken: true,
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

export async function batchRebutBom(params) {
  return request('/ipos-chains/process/scmprodspecbom/batchRebutBom', {
    method: 'post',
    needToken: true,
    body: JSON.stringify(params),
  });
}
