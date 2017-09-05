<template>
  <div class='tmpl'>
    <div class="title">
      <h4>{{goodsDesc.title}}</h4>
    </div>
    <div v-html="goodsDesc.content" class="content"></div>
  </div>
</template>

<style scoped>

</style>

<script>
import common from '../../common/common.js'

export default {
  data() {
    return {
      goodsDesc: {}
    }
  },
  created() {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() {
      var url = common.hostIp + "api/goods/getdesc/" + this.$route.params.goodsId;
      console.log(url);
      this.$http.get(url).then(res => {
        this.goodsDesc = res.body.message[0];
        console.log(res.body.message[0]);
      })
    }
  }
}
</script>