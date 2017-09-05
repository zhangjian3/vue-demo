<template>
  <div class='tmpl'>
    <discuss :commentId="$route.query.goodsId"></discuss>
  </div>
</template>

<style scoped>

</style>

<script>
import common from '../../common/common.js';
import discuss from '../subcomponents/discuss.vue';

export default {
  data() {
    return {
    }
  },
  created() {

  },
  methods: {

  },
  components:{
    discuss
  }
}
</script>