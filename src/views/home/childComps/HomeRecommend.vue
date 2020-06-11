<template>
  <div class="home-recommend">
    <div class="home-recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommend: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommend {
    display: flex;
    margin-top: 3px;
    font-size: 14px;
    padding-bottom: 6px;
    border-bottom: 8px solid #eee;
  }

  .home-recommend-item {
    flex: 1;
    text-align: center;
  }

  .home-recommend img {
    width: 70px;
    height: 70px;
    margin-bottom: 4px;
  }
</style>