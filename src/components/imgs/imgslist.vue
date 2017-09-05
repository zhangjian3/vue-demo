<template>
  <div class='tmpl'>
    <!--图片分类标题-->
    <div class="imgCategoryStyle">
      <ul>
        <li @click="getImgListById(0)">全部</li>
        <li v-for="item in imgsList" :key="item.id" @click="getImgListById(item.id)">{{item.title}}</li>
      </ul>
    </div>
    <!--图片列表-->
    <div class="imgStyle">
      <ul>
        <li v-for="item in imgs" :key="item.id">
          <router-link :to="'/imgs/imgsInfo/'+item.id">
            <img :src="item.img_url" v-lazy="item.img_url">
            <p class="imgTitle">
              <span>{{item.title}}</span>
              <br> {{item.zhaiyao}}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.imgCategoryStyle,
.imgStyle {
  padding: 0 5px;
}

.imgCategoryStyle {
  overflow-x: auto;
}

ul {
  list-style: none;
  padding: 0;
}

.imgCategoryStyle ul {
  margin: 5px 0;
  white-space: nowrap;
}

.imgCategoryStyle li {
  display: inline-block;
  margin: 0 5px;
  color: #0094ff;
}

.imgStyle li {
  position: relative;
}

img {
  width: 100%;
  height: 400px;
}

img[lazy=loading] {
  width: 100%;
  height: 400px;
  margin: auto;
}

.imgTitle {
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 0;
  background-color: rgba(0, 0, 0, .3);
  color: #fff;
}

.imgTitle span {
  font-size: 16px;
  font-weight: 700;
}
</style>

<script>
import common from '../../common/common.js'
import { Indicator } from 'mint-ui';

export default {
  data() {
    return {
      imgsList: [],
      imgs: []
    }
  },
  created() {
    this.getImgsCategory();
    this.getImgListById(0);
  },
  methods: {
    //获取图片分类列表数据
    getImgsCategory() {
      var url = common.hostIp + "api/getimgcategory";
      this.$http.get(url).then(res => {
        this.imgsList = res.body.message;
        
      })
    },
    //根据分类ID获取图片列表数据
    getImgListById(id) {
      var url = common.hostIp + "api/getimages/" + id;
      Indicator.open({
        text: '拼命加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.get(url).then(res => {
        this.imgs = res.body.message;
        console.log(res.body.message);
        Indicator.close();
      })
    }
  }
}
</script>