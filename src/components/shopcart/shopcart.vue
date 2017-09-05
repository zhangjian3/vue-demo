<template>
  <div class='tmpl'>
    <div class="goodsContentStyle" v-show="!isloading">
      <div v-for="(item,index) in goodsList" :key="item.id" class="goodsitemStyle">
        <div class="left">
          <mt-switch v-model="switchValue[index]" @change="statisticsTotalCountAndTotalPrice()"></mt-switch>
        </div>
        <div class="right">
          <div class="imgStyle">
            <img :src="item.thumb_path">
          </div>
          <div class="contentStyle">
            <h4>{{item.title}}</h4>
            <span>销售价：{{item.sell_price}}</span>
          </div>
          <mt-button :disabled="!switchValue[index]" type="danger" size="small" class="deleBtn" @click="deleteGoodsItemByIndex(index)">删除</mt-button>
        </div>
      </div>
    </div>
    <div class="count">
      <p>购物车清单</p>
      合计
      <span>{{totalCount}}</span>件商品,总计
      <span>{{totalPrice}}</span>元
      <mt-button type="danger" size="small" class="mui-pull-right">去结算</mt-button>
    </div>
  </div>
</template>

<style scoped>
.goodsContentStyle,
.count {
  padding: 8px;
}

.goodsitemStyle {
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid rgba(92, 92, 92, .3);
}

.left {
  width: 60px;
  margin: auto;
}

.right {
  flex: 1;
  display: flex;
}

.imgStyle {
  border: 1px solid rgba(92, 92, 92, .3);
}

.imgStyle img {
  width: 60px;
  height: 60px;
  padding: 10px;
}

.contentStyle {
  margin-left: 10px;
  width: 150px;
}

.contentStyle h4 {
  font-size: 14px;
}

.contentStyle span {
  color: red;
  font-size: 12px;
}

.deleBtn {
  margin: auto;
}

.count {
  width: 100%;
  height: 100px;
  background-color: rgba(92, 92, 92, .3);
  position: fixed;
  left: 0;
  bottom: 0;
}

.count p {
  font-size: 16px;
  padding: 10px 0;
}

.count span {
  color: red;
}
</style>

<script>
import common from '../../common/common.js';
import { Indicator } from 'mint-ui';


export default {
  data() {
    return {
      isloading: true,
      goodsList: [],
      switchValue: [],
      totalCount: 0,
      totalPrice: 0
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //获取购物车列表数据
    getGoodsList() {
      const goodsArr = this.$store.getters.getGoodsList;
      if (goodsArr.length <= 0) return;
      //将获取的商品数据转换成{goodsId:count}===>{88:3，89:4}
      const goodsObj = {};
      for (var i = 0; i < goodsArr.length; i++) {
        if (goodsObj[goodsArr[i].goodsId]) {
          goodsObj[goodsArr[i].goodsId] += goodsArr[i].count;
        } else {
          goodsObj[goodsArr[i].goodsId] = goodsArr[i].count;
        }
      }
      // console.log(goodsObj);
      //将{goodsId:count}===>{88:3，89:4}转换成字符串88,89
      const templArr = [];
      for (var key in goodsObj) {
        templArr.push(key);
      }
      // console.log(templArr);
      const urlIdString = templArr.join(",");
      // console.log(urlIdString);
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      var url = common.hostIp + "api/goods/getshopcarlist/" + urlIdString;
      this.$http.get(url).then(res => {
        this.goodsList = res.body.message;
        this.goodsList.forEach(item => {
          item.count = goodsObj[item.id];
          // 设置开关按钮对应数组值
          this.switchValue.push(true);
        })
        this.isloading = false;
        Indicator.close();
        this.statisticsTotalCountAndTotalPrice();
        // console.log(this.goodsList);
      })
    },
    //统计合计数据
    statisticsTotalCountAndTotalPrice() {
      let tempCount = 0;
      let tempPrice = 0;
      for (var i = 0; i < this.switchValue.length; i++) {
        if (this.switchValue[i]) {
          tempCount += this.goodsList[i].count;
          tempPrice += this.goodsList[i].count * this.goodsList[i].sell_price;
        }
      }
      this.totalCount = tempCount;
      this.totalPrice = tempPrice;
    },
    //删除 1.获取id,删除仓库中对应索引的商品  2.删除开关及商品对应元素
    deleteGoodsItemByIndex(index) {
      const goodsId = this.goodsList[index].id;
      this.$store.commit('deleteGoods', goodsId);
      // 2.删除开关switchValue及商品goodsList
      this.switchValue.splice(index,1);
      this.goodsList.splice(index,1);

      this.statisticsTotalCountAndTotalPrice();
    }
  }
}
</script>