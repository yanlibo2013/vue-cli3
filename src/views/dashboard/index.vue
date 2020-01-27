<template>
  <div class="dashborad common-page-bg">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <vTable></vTable>
  </div>
</template>


<script>
import PanelGroup from "./PanelGroup";
import vTable from "./table";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
export default {
  metaInfo: {
    title: "dashborad",
    titleTemplate: "%s - Yay!",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  components: {
    PanelGroup,
    vTable
  },
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
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style lang="scss">
.dashborad {
  position: absolute;
  width: 100%;
}
</style>
