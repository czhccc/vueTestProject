import {request} from "./network";

// 获取首页相关的多个数据
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function getProductData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}