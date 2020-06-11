<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><template v-slot:center>购物街</template></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";

  import {getHomeMultiData} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend
    },
    data() {
      return {
        banners: [], // 轮播图的数据
        recommend: [], // 推荐的数据

      }
    },
    created() {
      // 1.请求多个数据
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list // 保存轮播图的数据
        this.recommend = res.data.recommend.list // 保存推荐的数据
      })
    }
  }
</script>

<style scoped>
  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
</style>