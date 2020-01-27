<template>
  <div class="container">
    <a-row class="a-row">
      <a-col :span="18" :push="6" class="item a-col">col-18 col-push-6</a-col>
      <a-col :span="6" :pull="18" class="item a-col">col-6 col-pull-18</a-col>
    </a-row>
    栅格排序 # 列排序。 通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序
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
