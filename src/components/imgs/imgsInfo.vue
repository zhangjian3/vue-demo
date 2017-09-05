<template>
  <div class='tmpl'>
    <!--图片详情标题-->
    <div class="titleStyle">
      <h4>{{imgsInfo.title}}</h4>
      <p>
        {{imgsInfo.add_time | dateFormat}} &nbsp;&nbsp;&nbsp;{{imgsInfo.click}}次浏览
      </p>
    </div>
    <!--缩略图-->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li v-for="(item,index) in thumimages" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="$preview.open(index,thumimages )">
          <img class="preview-img" :src="item.src">
        </li>
      </ul>
    </div>
    <!--内容-->
    <div class="content">
      <p v-html="imgsInfo.content"></p>
    </div>
  
    <!--评价-->
    <discuss :commentId="this.$route.params.imgId"></discuss>
  </div>
</template>

<style scoped>
/*标题*/

.titleStyle {
  padding: 5px 8px;
}

h4 {
  color: #0094ff;
}


/*缩略图*/

.mui-table-view.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}

.mui-table-view.mui-grid-view.mui-grid-9 img {
  width: 100px;
  height: 100px;
}


/*内容*/

.content {
  padding: 5px 8px;
}
</style>

<script>
import common from '../../common/common.js'
import discuss from '../subcomponents/discuss.vue'

export default {
  data() {
    return {
      imgsInfo: {},
      thumimages: []
    }
  },
  created() {
    this.getImgsInfo();
    this.getthumimages();
  },
  methods: {
    // 获取图片详情信息
    getImgsInfo() {
      var url = common.hostIp + "api/getimageInfo/" + this.$route.params.imgId;
      this.$http.get(url).then(res => {
        this.imgsInfo = res.body.message[0];
      })
    },
    // 获取图片缩略图
    getthumimages() {
      var url = common.hostIp + "api/getthumimages/" + this.$route.params.imgId;
      this.$http.get(url).then(res => {
        res.body.message.forEach(item => {
          item.w = 600;
          item.h = 400;
        })
        this.thumimages = res.body.message;
      })
    }
  },
  components: { discuss }
}
</script>