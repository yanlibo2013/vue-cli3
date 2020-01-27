<template>
  <div class="container">

    <a-row type="flex">
      <a-col :span="6" :order="4" class="item shallow">1 col-order-4</a-col>
      <a-col :span="6" :order="3" class="item deep">2 col-order-3</a-col>
      <a-col :span="6" :order="2" class="item shallow">3 col-order-2</a-col>
      <a-col :span="6" :order="1" class="item deep">4 col-order-1</a-col>
    </a-row>
    Flex 排序 #
    从堆叠到水平排列。
    通过 Flex 布局的 Order 来改变元素的排序
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
