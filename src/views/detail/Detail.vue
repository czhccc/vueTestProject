<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :swiperImages="swiperImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo
    },
    data() {
      return {
        iid: null, // 从主页跳转所携带的信息
        swiperImages: [], // 轮播图的图片
        goods: {}, // 商品信息
        shop: {}, // 店铺信息
        detailInfo: {}, // 商品的详情信息
        paramInfo: {}, // 参数的信息
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据 iid 请求数据
      getDetail(this.iid).then(res => {
        const data = res.result
        this.swiperImages = data.itemInfo.topImages // 保存轮播图的图片
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) // 保存商品信息
        this.shop = new Shop(data.shopInfo) // 保存店铺信息
        this.detailInfo = data.detailInfo // 保存商品的详情信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>