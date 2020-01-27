<template>
  <div class="container">

    <p>Align Top</p>
    <a-row type="flex" justify="center" align="top" class="row ">
      <a-col :span="4" class="item shallow "><p class="height-100">col-4</p></a-col>
      <a-col :span="4" class="item deep"><p class="height-50">col-4</p></a-col>
      <a-col :span="4" class="item shallow"><p class="height-120">col-4</p></a-col>
      <a-col :span="4" class="item deep"><p class="height-80">col-4</p></a-col>
    </a-row>

    <p>Align Center</p>
    <a-row type="flex" justify="space-around" align="middle" class="row">
      <a-col :span="4" class="item shallow"><p class="height-100">col-4</p></a-col>
      <a-col :span="4" class="item deep"><p class="height-50">col-4</p></a-col>
      <a-col :span="4" class="item shallow"><p class="height-120">col-4</p></a-col>
      <a-col :span="4" class="item deep"><p class="height-80">col-4</p></a-col>
    </a-row>

    <p>Align Bottom</p>
    <a-row type="flex" justify="space-between" align="bottom" class="row">
      <a-col :span="4" class="item shallow"><p class="height-100">col-4</p></a-col>
      <a-col :span="4" class="item deep"><p class="height-50">col-4</p></a-col>
      <a-col :span="4" class="item shallow"><p class="height-120">col-4</p></a-col>
      <a-col :span="4" class="item deep"><p class="height-80">col-4</p></a-col>
    </a-row>
    Flex 对齐 #
    Flex 子元素垂直对齐。
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
   .container{
       text-align: center;
   }
  .deep {
    background: #00a0e9;
  }
  .shallow {
    background: rgba(0, 160, 233, .7);
  }

  .item{
    padding: 16px 0;
  }

  .row{
    margin-bottom: 10px;
    background: #f5f5f5;
  }

  .height-100{
      height: 100px;
      line-height: 100px

  }

  .height-50{
      height: 50px;
      line-height: 50px

  }

  .height-120{
      height: 120px;
      line-height: 120px
  }

  .height-80{
      height: 80px;
      line-height: 80px
  }

  .ant-row-flex-center {
    justify-content: center;
}
</style>
