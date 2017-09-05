<template>
  <div class='tmpl'>
    <!--轮播图子组件-->
    <mt-swipe :auto="lunbo_time">
      <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  /*height: 250px;*/
  height: 250px;
}

.mint-swipe {
  width: 100%;
  /*height: 250px;*/
  height: 250px;
}
</style>

<script>
import common from '../../common/common.js'

export default {
  data() {
    return {
      lunboArray:[]
    }
  },
  created() {
    this.getlunboUrl();
  },
  methods: {
    getlunboUrl() {
      var url = common.hostIp + this.swipeUrl;
      this.$http.get(url).then(response => {
        this.lunboArray = response.body.message;
      })
    }
  },
  props: ["swipeUrl", "lunbo_time"]
}
</script>