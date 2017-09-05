<template>
  <div>
    <!--评论内容输入及提交-->
    <div class="postDiscuss">
      <h4>评论</h4>
      <div>
        <textarea cols="30" rows="5" ref="discussText" placeholder="请输入评论内容"></textarea>
        <mt-button type="primary" @click="postDiscuss()" size="large">提交评论</mt-button>
      </div>
    </div>
  
    <!--展示评论区域列表（评论列表和加载更多）-->
    <div class="discussList">
      <h4>评论列表</h4>
      <div v-for="(item,i) in discussList" :key="i" class="discussItem">
        <p class="discussItemTitle">{{item.content}}</p>
        <p class="discussItemUserAndAddtime">
          <span class="left">{{item.user_name}}</span>
          <span class="right">{{item.add_time | dateFormat('YYYY-MM-DD HH-mm-ss')}}</span>
        </p>
      </div>
      <div class="loadMore">
        <mt-button @click="getMoreDiscuss" size="large" plain type="danger">加载更多</mt-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.postDiscuss,
.discussList {
  padding: 6px;
}

h4 {
  padding: 5px 5px 10px 5px;
}

.discussItem {
  padding: 5px;
  border-bottom: 1px solid rgba(92, 92, 92, 0.4);
}

.discussItemUserAndAddtime {
  margin-top: 10px;
  max-height: 70px;
  overflow-y: auto;
  font-size: 12px;
  color: #0094ff;
}

.left {
  float: left;
  width: 50%;
}

.right {
  float: right;
}

.loadMore {
  margin-top: 10px;
}
</style>

<script>
import common from '../../common/common.js';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      pageIndex: 1,
      discussList: []
    }
  },
  created() {
    this.getDiscussList();
  },
  methods: {
    // 获取评论列表信息

    // 提交评论内容

  },
  props: ["commentId"]
}
</script>