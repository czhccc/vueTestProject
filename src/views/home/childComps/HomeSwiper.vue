<template>
  <div>
    <Swiper>
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false,
      }
    },
    methods: {
      imgLoad() { // 监听轮播图的图片加载完成之后，获取 offsetTop，用来计算商品切换栏（tabControl）下拉到什么时候才需要吸顶效果
        // 只需要一张图片加载完成即可，不需要执行四次发送事件，因此，用 isLoad 进行判断
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>