<template>
  <div class="container">
    <a-row class="a-row">
      <a-col :span="8" class="item a-col">col-8</a-col>
      <a-col :span="8" class="item a-col" :offset="8">col-8</a-col>
    </a-row>
    <a-row class="a-row">
      <a-col :span="6" class="item a-col" :offset="6">col-6 col-offset-6</a-col>
      <a-col :span="6" class="item a-col" :offset="6">col-6 col-offset-6</a-col>
    </a-row>
    <a-row class="a-row">
      <a-col class="item a-col" :span="12" :offset="3">col-12 col-offset-6</a-col>
    </a-row>
    左右偏移 # 列偏移。 使用 offset 可以将列向右侧偏。例如，:offset="4" 将元素向右侧偏移了 4 个列（column）的宽度
  </div>
</template>
<script>
export default {
  data: function() {
    return {}
  }
}
</script>

<style lang="scss">
    .container {
        text-align: center;
    }
    .deep {
        background: #00a0e9;
    }
    .shallow {
        background: rgba(0, 160, 233, .7);
    }
    .item {
        padding: 16px 0;
    }
    .row {
        margin-bottom: 10px;
        background: #f5f5f5;
    }
    .height-100 {
        height: 100px;
        line-height: 100px
    }
    .height-50 {
        height: 50px;
        line-height: 50px
    }
    .height-120 {
        height: 120px;
        line-height: 120px
    }
    .height-80 {
        height: 80px;
        line-height: 80px
    }
    .ant-row-flex-center {
        justify-content: center;
    } // 奇数元素
    .a-row {
        margin-bottom: 10px;
        background: #f5f5f5;
    }
    .a-row>.a-col:nth-of-type(odd) {
        background: #00a0e9;
    } //偶数元素
    .a-row>.a-col:nth-of-type(even) {
        background: rgba(0, 160, 233, .7);
    }
</style>
