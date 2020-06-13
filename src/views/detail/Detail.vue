<template>
  <div class="detail">
    <detail-nav-bar />
    <detail-swiper :swiperImages="swiperImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        swiperImages: []
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据 iid 请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        this.swiperImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>