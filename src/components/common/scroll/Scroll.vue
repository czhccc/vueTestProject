<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: { // 用于判断是否需要实时监听滚动的位置
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      pullUpLoad: { // 是否需要上拉加载更多
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      // 返回顶部
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 完成上拉
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      // 刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>