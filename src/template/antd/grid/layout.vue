<template>
  <div class="container">
    <p>sub-element align left</p>
    <a-row type="flex" justify="start" class="a-row">
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
    </a-row>
    <p>sub-element align center</p>
    <a-row type="flex" justify="center" class="a-row">
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
    </a-row>
    <p>sub-element align right</p>
    <a-row type="flex" justify="end" class="a-row">
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
    </a-row>
    <p>sub-element monospaced arrangement</p>
    <a-row type="flex" justify="space-between" class="a-row">
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
    </a-row>
    <p>sub-element align full</p>
    <a-row type="flex" justify="space-around" class="a-row">
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
      <a-col :span="4" class="item a-col">col-4</a-col>
    </a-row>
    Flex 布局 # Flex 布局基础。 使用 row-flex 定义 flex 布局，其子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。
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

    .a-row{
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
