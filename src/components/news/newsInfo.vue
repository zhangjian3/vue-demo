<template>
  <div class='tmpl'>
    <!--新闻详情标题 -->
    <div class="title">
      <h5>
        {{newsInfo.title}}
      </h5>
      <p>
        {{newsInfo.add_time | dateFormat('YYYY-MM-DD')}}&nbsp;&nbsp;&nbsp; {{newsInfo.click}}次浏览&nbsp;&nbsp;&nbsp;分类：民生经济
      </p>
    </div>
    <!--新闻详情内容-->
    <div class="content" v-html="newsInfo.content">
    </div>
    <!--评论子组件-->
    <discuss :commentId="this.$route.params.newsId"></discuss>
  </div>
</template>

<style scoped>
.title,
.content {
  padding: 6px;
}

.title h5 {
  font-size: 16px;
  font-weight: 700;
  color: #0094ff;
}

.title p {
  margin-top: 10px;
}

.title {
  border-bottom: 1px solid rgba(92, 92, 92, 0.4);
}
</style>

<script>
import common from '../../common/common.js'
import discuss from '../../components/subcomponents/discuss.vue'

export default {
  data() {
    return {
      newsInfo: {}
    }
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      var url = common.hostIp + 'api/getnew/' + this.$route.params.newsId;
      console.log(url);
      this.$http.get(url).then(res => {
        this.newsInfo = res.body.message[0];
      })
    }
  },
  components: {
    discuss: discuss
  }

}
</script>