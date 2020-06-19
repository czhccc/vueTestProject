<template>
  <div class="bottom-bar">
    <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"/>
    <span>全选</span>

    <span class="total-price">合计: ¥{{totalPrice}}</span>

    <span class="buy-product">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      totalPrice() { // 计算总价格
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      isSelectAll() { // 是否全部选中
        if(this.cartLength === 0) return false // 如果购物车中没有商品，则返回 false
        return !this.cartList.find(item => !item.checked) // 如果有不被选中的商品，则返回 false
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) { // 如果商品全部被选中
          this.cartList.forEach(item => item.checked = false)
        } else { // 商品 全部不选中 或者 部分不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
    },

	}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-bar .check-button {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
