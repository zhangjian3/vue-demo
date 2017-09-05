//导入包
import Vue from 'vue';
import Mint from 'mint-ui';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import moment from 'moment';
import VuePreview from 'vue-preview';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Mint);
Vue.use(vueRouter); //Vue实例添加$route  $router
Vue.use(vueResource);
Vue.use(VuePreview);
Vue.use(Vuex);//$store

Vue.prototype.$axios = axios;

import 'mint-ui/lib/style.min.css';
import './static/mui/css/mui.min.css';
import './static/mui/fonts/mui.ttf';
import './static/css/common.css';

//全局过滤器 格式化时间
Vue.filter('dateFormat', (input, formatStr) => {
  const lastformat = formatStr || 'YYYY-MM-DD HH:mm:ss';
  return moment(input).format(lastformat);
})

//导入组件
import App from './App.vue';
import home from './components/home/home.vue';
import category from './components/category/category.vue';
import shopcart from './components/shopcart/shopcart.vue';
import mine from './components/mine/mine.vue';
import newslist from './components/news/newslist.vue';
import newsInfo from './components/news/newsInfo.vue';
import imgslist from './components/imgs/imgslist.vue';
import imgsInfo from './components/imgs/imgsInfo.vue';
import goodslsit from './components/goods/goodslist.vue';
import goodsInfo from './components/goods/goodsInfo.vue';
import goodscomment from './components/goods/goodscomment.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
//创建路由并定义路由规则
var router = new vueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/category', component: category },
    { path: '/shopcart', component: shopcart },
    { path: '/mine', component: mine },
    { path: '/news/newslist', component: newslist },
    { path: '/news/newsInfo/:newsId', component: newsInfo },
    { path: '/imgs/imgslist', component: imgslist },
    { path: '/imgs/imgsInfo/:imgId', component: imgsInfo },
    { path: '/goods/goodslist', component: goodslsit },
    { path: '/goods/goodsInfo/:goodsId', component: goodsInfo },
    { path: '/goods/goodscomment', component: goodscomment },
    // { name: "goodsdesc", path: '/goods/goodsdesc', component: goodsdesc }
    { path: "/goods/goodsdesc/:goodsId", component: goodsdesc }
  ]
})

//创建一个仓库
const store = new Vuex.Store({
  state: {  //存储仓库数据
    goodsList: []
  },
  getters: { //获取仓库中数据
    getGoodsList(state) { //获取加入购物车的数组
      return state.goodsList
    },
    getGoodsCount(state) {
      let totalCount = 0;
      for (var i = 0; i < state.goodsList.length; i++) {
        totalCount += state.goodsList[i].count;
      }
      return totalCount
    }
  },
  mutations: { //同步更改数据
    /**
   * 添加商品到购物车的方法
   * 其中参数1固定的，就是代表我们的state
   * 参数2：商品信息的对象
   */
    addGoods(state, goodsObj) {
      //goodsObj ==> {goodsId:87,count:3}
      state.goodsList.push(goodsObj);
      console.log(state.goodsList)
    },
    //删除数据   为避免遍历过程中出错，从后往前删除
    deleteGoods(state, goodsId) {
      for (var i = state.goodsList.length - 1; i >= 0; i--) {
        if (state.goodsList[i].goodsId == goodsId) {
          state.goodsList.splice(i, 1);
        }
      }
    }
  },
  actions: { //异步更改数据

  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: function (createElement) {
    return createElement(App);
  }
})