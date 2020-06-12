<template>
  <div class="home">
    <nav-bar class="home-nav-bar"><template v-slot:center>购物街</template></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <home-recommend :recommend="recommend" />
      <home-feature />
      <tab-control class="tab-control"
                   :tabControl="tabControl"
                   @tabClick="tabClick" />
      <goods-list :goodsDate="goods[goodsType].list" />
    </scroll>

    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goodsList/GoodsList";

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [], // 轮播图的数据
        recommend: [], // 推荐的数据
        tabControl: ['流行', '新款', '精选'], // tabControl中要展示的文字
        goods: { // 展示的商品的数据结构，page记录当前请求的页数，list存放请求到的数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsType: 'pop', // 当前的商品数据的类型，默认为 'pop'
        isShowBackTop: false // 是否显示 BackTop 按钮
      }
    },
    created() {
      // 1.请求多个数据
      this.getMultiData()

      // 2.请求展示的商品的数据
      this.getGoodsData('pop') // 请求'流行'相关数据
      this.getGoodsData('new') // 请求'新款'相关数据
      this.getGoodsData('sell') // 请求'精选'相关数据
    },
    mounted() {
      // 监听item中图片的加载完成 采用事件总线的方式，由 GoodsListItem组件 emit 事件，在这里进行接收
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /*
      网络请求相关的方法
       */
      getMultiData() { // 请求多个数据
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list // 保存轮播图的数据
          this.recommend = res.data.recommend.list // 保存推荐的数据
        })
      },
      getGoodsData(type) { // 请求展示的商品的数据
        const page = this.goods[type].page + 1 // 请求下一页的数据，因此先取得下一页的页码
        getHomeGoods(type, page).then(res => { // 发送请求，获取数据
          this.goods[type].list.push(...res.data.list) // 将请求到的数据保存
          this.goods[type].page += 1 // 数据获取完成后，当前的页码需要+1

          this.$refs.scroll.finishPullUp() // 上拉加载更多后
        })
      },

      /*
      事件监听相关的方法
       */
      tabClick(index) { // 改变展示的商品的类型
        switch (index) {
          case 0:
            this.goodsType = 'pop';break;
          case 1:
            this.goodsType = 'new';break;
          case 2:
            this.goodsType = 'sell';break
        }
      },
      backClick() { // 右下角按钮返回顶部
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) { // 监听滚动的位置，用于判断是否要显示 BackTop 按钮
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getGoodsData(this.goodsType)
      }
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
    position: relative;
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>