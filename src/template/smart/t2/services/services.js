import request from '../../utils/request';

// 查询角色列表
export async function inquire(params) {
    return request('/api/$2$/queryPosts', {
        method: 'post',
        body: JSON.stringify(params),
    });
}

// 修改状态-启用停用
export async function enable(params) {
    return request('/api/$2$/changeStatus', {
        method: 'post',
        body: params,
    });
}

// 删除角色
export async function remove(params) {
    return request('/api/$2$/deletePost', {
        method: 'post',
        body: params,
    });
}

// 新增编辑角色
export async function create(params) {
    return request('/api/$2$/savePost', {
        method: 'post',
        body: JSON.stringify(params),
    });
}

// 查询权限列表树
export async function inquireTree(params) {
    return request('/api/$2$/query$1$', {
        method: 'post',
        body: params,
    });
}

// 取得权重
export async function inquireCode() {
    return request(' /api/$2$/queryPostCode', {
        method: 'post',
    });
}
