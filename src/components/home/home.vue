<template>
  <div class="tmpl">
    <!--轮播图-->
    <mt-swipe :auto="time">
      <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
        <img :src="item.img_url">
      </mt-swipe-item>
    </mt-swipe>
    <!--九宫格-->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/news/newslist">
            <span class="mui-icon mui-icon-home"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/imgs/imgslist">
            <span class="mui-icon mui-icon-email"></span>
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/goods/goodslist">
            <span class="mui-icon mui-icon-chatbubble"></span>
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
  
      </ul>
    </div>
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





/*九宫格*/

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}

.mui-icon-home::before,
.mui-icon-email::before,
.mui-icon-chatbubble::before,
.mui-icon-location::before,
.mui-icon-search::before,
.mui-icon-phone::before {
  content: '';
}

.mui-icon {
  width: 3rem;
  height: 3rem;
  background-size: cover;
}

.mui-icon-home {
  background-image: url('../../static/images/menu3.png');
  /*background-repeat: round;*/
}

.mui-icon-email {
  background-image: url('../../static/images/menu4.png');
}

.mui-icon-chatbubble {
  background-image: url('../../static/images/menu5.png');
}

.mui-icon-location {
  background-image: url('../../static/images/menu6.png');
}

.mui-icon-search {
  background-image: url('../../static/images/menu9.png');
}

.mui-icon-phone {
  background-image: url('../../static/images/menu10.png');
}
</style>

<script>
import common from '../../common/common.js'
export default {
  data() {
    return {
      time: 3000,
      lunboArray: []
    }
  },
  created() {
    this.getlunboUrl();
  },
  methods: {
    getlunboUrl() {
      var url = common.hostIp + "api/getimages/17";
      this.$http.get(url).then(response => {
        this.lunboArray = response.body.message;
        console.log(response.body.message)
      })
    }
  }
}
</script>
