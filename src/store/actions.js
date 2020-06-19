import * as types from './mutation-types'

const actions = {
	addToCart({state, commit}, info) {
		return new Promise((resolve) => {
			// 1.查看该商品是否已经添加到cartList中
			const oldInfo = state.cartList.find(item => item.iid === info.iid)

			// 2.如果该商品已经在购物车中存在, 那么商品数量加1
			if (oldInfo) { // 商品数量+1
				const index = state.cartList.indexOf(oldInfo)
				commit(types.INCREMENT_COUNT, index)
				resolve('当前的商品数量+1')
			} else { // 将商品添加到购物车
				info.count = 1
				info.checked = true
				commit(types.ADD_TO_CART, info)
				resolve('成功添加到购物车')
			}

			resolve()
		})
	}
}

export default actions
