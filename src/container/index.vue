<template>
  <el-container class="container">
    <el-header>
      <vheader></vheader>
    </el-header>
    <el-container>
      <el-aside width="220px" class="aside">
        <vsidebar></vsidebar>
      </el-aside>
      <el-main style="padding:30px">
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import vsidebar from "@/components/layout/Sidebar/index.vue";
import vheader from "@/components/Header/index";
import AppMain from "./AppMain";
export default {
  components: { vheader, AppMain, vsidebar },
  data: function() {
    return {};
  },
  computed: {},
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {}
};
</script>

<style lang="scss">
.container {
  height: 100%;

  .el-main {
    background-color: #e9eef3;
    // color: #333;
    // text-align: center;
    // line-height: 160px;
  }

  .aside {
    background-color: rgb(48, 65, 86);
  }
}
</style>
