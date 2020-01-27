<template>
  <div class="config">
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
// import addForm from "./components/addFrom";
import tab from "./components/pageTab";
import tab2 from "./components/pageTab2";

export default {
  name: "Tab",
  components: { tab, tab2 },
  data() {
    return {
      tabMapOptions: [
        { label: "项目属性", key: "tab" },
        { label: "向导文件", key: "tab2" }
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

<style scoped>
.config {
  position: absolute;
  width: 100%;
}
</style>
