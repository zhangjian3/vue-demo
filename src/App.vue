<template>
  <div>
    <!--1.0 头部 标题栏-->
    <mt-header fixed title="Vue项目"></mt-header>
    <div @click="goback()" v-show="!isShowTabBar" class="mui-icon mui-icon-back goBack"></div>
    <!--2.0 路由视图-->
    <router-view></router-view>
    <!--3.0 底部 tabBar-->
    <mt-tabbar v-show="isShowTabBar" fixed>
      <mt-tab-item>
        <router-link to="/home">
          <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/category">
          <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/shopcart">
          <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
          <span class="badgeStyle">{{myCount}}</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/mine">
          <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<style scoped>
.goBack {
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: fixed;
  left: 10px;
  top: 0;
  color: #fff;
  font-size: 24px;
  z-index: 2;
}

img {
  width: 42px;
  height: 35px;
}

.mint-tabbar .mint-tab-item.is-selected {
  background-color: #fafafa;
}

.badgeStyle {
  font-size: 11px;
  line-height: 1.3;
  position: absolute;
  top: 7px;
  left: 63%;
  text-align: center;
  padding: 1px 5px;
  color: #fff;
  border-radius: 11px;
  background: red;
}
</style>

<script>
export default {
  data() {
    return {
      isShowTabBar: true,
      myCount: 0
    }
  },
  created() {
    this.isShowTabBarorHeader(this.$route.path);
  },
  updated() {
    this.myCount = this.$store.getters.getGoodsCount;
  },
  methods: {
    isShowTabBarorHeader(path) {
      if (path == '/home') {
        this.isShowTabBar = true;
      } else {
        this.isShowTabBar = false;
      }
    },
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route": function (newValue, oldValue) {
      this.isShowTabBarorHeader(newValue.path);
    }
  }
}
</script>
