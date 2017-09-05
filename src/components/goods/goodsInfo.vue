<template>
  <div class='tmpl' v-show="!isloading">
    <!--商品轮播图-->
    <div class="lunboStyle">
      <subswipe :swipeUrl="'api/getthumimages/'+$route.params.goodsId" :lunbo_time="time"></subswipe>
    </div>
    <!--商品标题-->
    <div class="contentStyle">
      <h4>{{goodsInfo.title}}</h4>
      <subnumber v-on:numberChange="getShopCartNunber"></subnumber>
      <p class="price">
        市场价:
        <del>{{goodsInfo.market_price}}</del>&nbsp;&nbsp; 销售价:
        <span>{{goodsInfo.sell_price}}</span>
      </p>
      <mt-button size="small" type="primary">立即购买</mt-button>
      <mt-button size="small" type="danger" @click="addToShopCart">加入购物车</mt-button>
    </div>
    <!--商品参数-->
    <div class="goodsParamsStyle">
      <h5>商品参数</h5>
      <ul>
        <li>商品货号：{{goodsInfo.goods_no}}</li>
        <li>库存情况：剩余{{goodsInfo.stock_quantity}}件</li>
        <li>上架时间：{{goodsInfo.add_time|dateFormat}}</li>
      </ul>
    </div>
    <!--商品评价-->
    <div class="commentStyle">
      <mt-button size="large" type="primary" plain @click="goodsDesc()">图文详情</mt-button>
      <mt-button size="large" type="danger" plain class="goodscommentStyle" @click="goodscomment()">商品评价</mt-button>
    </div>
  </div>
</template>

<style scoped>
.lunboStyle,
.contentStyle,
.goodsParamsStyle,
.commentStyle {
  margin: 10px;
  padding: 10px;
  border: 1px solid rgba(92, 92, 92, .3);
  border-radius: 5px;
}

h4 {
  font-size: 16px;
  color: #0094ff;
  border-bottom: 1px solid rgba(92, 92, 92, 0.3);
  padding-bottom: 10px;
}

.price span {
  color: red;
  font-size: 16px;
}

.goodsParamsStyle ul {
  padding: 0px;
  margin: 0px;
}

.goodsParamsStyle li {
  list-style: none;
  font-size: 14px;
}

.goodscommentStyle {
  margin-top: 15px;
}
</style>

<script>
import common from '../../common/common.js';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import subswipe from '../subcomponents/subswipe.vue';
import subnumber from '../subcomponents/subnumber.vue';


export default {
  data() {
    return {
      time: 2000,
      isloading: true,
      goodsInfo: {},
      myCount: 1
    }
  },
  created() {
    this.getGoodsInfoById()
  },
  methods: {
    getGoodsInfoById() {
      var url = common.hostIp + "api/goods/getinfo/" + this.$route.params.goodsId;
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.get(url).then(res => {
        this.goodsInfo = res.body.message[0];
        this.isloading = false;
        Indicator.close();
      })
    },
    goodsDesc() {//跳转至商品图文介绍页
      // this.$router.push({
      //   name: 'goodsdesc', params: { goodsId: this.$route.params.goodsId }
      // })
      this.$router.push({
        path: '/goods/goodsdesc/' + this.$route.params.goodsId
      })
    },
    goodscomment() { //跳转至商品评价页
      this.$router.push({
        path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }
      })
    },
    getShopCartNunber(count) {//获取子组件传递过来的选购数量值
      console.log(count);
      this.myCount = count;
    },
    addToShopCart() {
      const goodsObj = { goodsId: this.$route.params.goodsId, count: this.myCount };
      this.$store.commit('addGoods', goodsObj);
      Toast({
        message: '已成功加入购物车',
        position: 'middle',
        duration: 2000
      });
    }
  },
  components: {
    subswipe,
    subnumber
  }
}
</script>