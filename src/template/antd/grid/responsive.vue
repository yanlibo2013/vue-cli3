<template>
  <div class="container">
    <a-row class="a-row">
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" class="item a-col">Col</a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4" class="item a-col">Col</a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" class="item a-col">Col</a-col>
    </a-row>
    响应式布局 # 参照 Bootstrap 的 响应式设计，预设五个响应尺寸：xs sm md lg xl xxl。
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
