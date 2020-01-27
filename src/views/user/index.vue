<template>
  <div class="user common-page-bg">
    <el-tabs
      v-model="activeName"
      style="margin-top:15px;"
      type="border-card"
      @tab-click="showCreatedTimes(activeName)"
    >
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <component :is="setTabTemplate(activeName)"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tab from "./components/pageTab";
import tab2 from "./components/pageTab2";

export default {
  metaInfo: {
    title: "user",
    titleTemplate: "%s - Yay!",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  // name: "Tab",
  components: { tab, tab2 },
  data() {
    return {
      tabMapOptions: [
        { label: "用户", key: "tab" },
        { label: "待审批", key: "tab2" }
      ],
      activeName: "tab",
      createdTimes: 0
    };
  },
  methods: {
    showCreatedTimes(val) {},
    setTabTemplate(val) {
      switch (val) {
        case "tab":
          return tab;
        case "tab2":
          return tab2;
        default:
          "";
      }
    }
  }
};
</script>

<style lang="scss">
.user {
  position: absolute;
  width: 100%;

  // .el-button--primary {
  //   background: red;
  // }

  // background: $themeColor
}
</style>
