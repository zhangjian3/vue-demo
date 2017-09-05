<template>
  <div class='tmpl'>
    <div class="subNumberStyle">
      <div class="left" @click="subtraction">-</div>
      <div class="middle">{{count}}</div>
      <div class="right" @click="add">+</div>
    </div>
  </div>
</template>

<style scoped>
.left,
.middle,
.right {
  display: inline-block;
  border: 1px solid rgba(92, 92, 92, 0.3);
  width: 35px;
  text-align: center;
  margin-bottom: 5px;
  line-height: 30px;
}

.middle {
  width: 40px;
}
</style>

<script>
import common from '../../common/common.js'

export default {
  data() {
    return {
      count: 1
    }
  },
  created() {

  },
  methods: {
    subtraction() {//数量减
      if (this.count <= 1) {
        return
      } else {
        this.count--;
        this.notify();
      }
    }
    ,
    add() {
      this.count++;
      this.notify();
    },
    notify() {
      // 利用$emit实现传递数据至父组件
      // 参数1：自定义事件的名称，参数2：传递的值
      this.$emit('numberChange', this.count);
    }
  }
}
</script>