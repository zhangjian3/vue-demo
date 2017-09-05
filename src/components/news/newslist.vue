<template>
  <div class='tmpl'>
    <div class="mui-content">
      <ul class="mui-table-view">
        <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
          <router-link :to="'/news/newsInfo/'+item.id">
            <a href="javascript:;">
              <img class="mui-media-object mui-pull-left" :src="item.img_url">
              <div class="mui-media-body">
                <h4>{{item.title}}</h4>
                <p class='mui-ellipsis'>
                  <span>{{item.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                  <span class="mui-pull-right">点击次数：{{item.click}}</span>
                </p>
              </div>
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mui-table-view-cell.mui-media {
  height: 80px;
}
.mui-media-object.mui-pull-left{
  height: 64px;
  min-width: 64px;
}
.mui-media-body h4{
  font-size: 14px;
  padding-top: 10px;
  /*white-space: nowrap;*/
  text-overflow: ellipsis;
  overflow: hidden;
}
.mui-ellipsis{
  margin-top: 20px;
}
</style>

<script>
import common from '../../common/common.js';

export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.getnewsList();
  },
  methods: {
    getnewsList() {
      var url = common.hostIp + 'api/getnewslist/';
      this.$http.get(url).then(response => {
        this.newsList = response.body.message;
      })
    }
  }
}
</script>