<template>
  <div>

    <a-row class="row">
      <a-col class="shallow item" :span="12">col-12</a-col>
      <a-col class="deep item" :span="12">col-12</a-col>
    </a-row>
    <a-row class="row">
      <a-col :span="8" class="shallow item">col-8</a-col>
      <a-col :span="8" class="deep item">col-8</a-col>
      <a-col :span="8" class="shallow item">col-8</a-col>
    </a-row>
    <a-row class="row">
      <a-col :span="6" class="shallow item">>col-6</a-col>
      <a-col :span="6" class="deep item">>col-6</a-col>
      <a-col :span="6" class="shallow item">>col-6</a-col>
      <a-col :span="6" class="deep item">>col-6</a-col>
    </a-row>

    基础栅格 #
    从堆叠到水平排列。
    使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。
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
    margin-bottom: 10px
  }
</style>
