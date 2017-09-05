<template>
  <div class='tmpl' :v-show="!isloading">
    <!--商品列表-->
    <ul class="mui-table-view mui-grid-view">
      <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
        <div class="goodStyle">
          <router-link :to="'/goods/goodsInfo/'+item.id">
            <img class="mui-media-object" :src="item.img_url">
            <div class="mui-media-body">{{item.title}}</div>
            <p class="price">
              <span>{{item.sell_price}}</span>&nbsp;&nbsp;
              <del>{{item.market_price}}</del>
            </p>
            <p class="goodsCountInfo">
              <span class="mui-pull-left">热卖中</span>
              <span class="mui-pull-right">剩余{{item.stock_quantity}}件</span>
            </p>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.goodStyle {
  padding: 10px;
  border: 1px solid rgba(92, 92, 92, 0.3);
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(92, 92, 92, 0.3);
}

.mui-grid-view .goodsContentStyle .mui-media-body {
  height: 100px;
}

.price {
  margin-top: 10px;
  text-align: left;
  height: 35px;
  padding-top: 10px;
  background-color: #f0f0f0;
}

.price span {
  font-size: 16px;
  color: red;
}

.goodsCountInfo {
  padding-top: 15px;
  padding-bottom: 10px;
  text-align: left;
  height: 40px;
  background-color: #f0f0f0;
}
</style>

<script>
import common from '../../common/common.js';
import { Indicator } from 'mint-ui';

export default {
  data() {
    return {
      isloading: true,
      goodsList: []
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var url = common.hostIp + "api/getgoods";
      var _this = this;
      Indicator.open({
        text: '拼命加载中...',
        spinnerType: 'triple-bounce'
      });
      this.$axios.get(url).then(res => {
        _this.goodsList = res.data.message;
        _this.isloading = false;
        Indicator.close();
      })
    }
  }
}
</script>