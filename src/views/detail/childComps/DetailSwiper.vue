<template>
  <div>
    <!-- 修复轮播图bug，需要加上 v-if="banners.length" ，有图片时才渲染轮播图 -->
    <swiper class="detail-swiper" v-if="swiperImages.length">
      <swiper-item v-for="(item, index) in swiperImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      swiperImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>