# myvue

1.完成视频中的内容

2.解决轮播图bug，不能进行轮播的问题（完成）

    原因：数据没有请求到时，轮播图相关内容已经进行渲染
    
	  解决方法：在<Swiper>组件中添加：v-if="banners.length"
	  
3.解决Home页面离开返回后不会停留在原来位置的问题（完成，尝试20+次，没有再出现bug）

	  原因：未知
	  
	  解决方法：在deactivated()生命周期函数中记录离开时的Y值时，不要像视频中一样进行封装，而是直接获取
	  
		  正确：this.saveY = -this.$refs.scroll.scroll.y
		  
		  错误：this.saveY = -this.$refs.scroll.scrollY （scrollY为Scroll.vue中的方法：scrollY() {return this.scroll.y}）

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
