<template>
  <div class="formitem">
    <!-- {{data.tab.title}} -->
    <component :is="setTemplate(data.step.type)" :data="data.step"></component>
    <!-- <adItem></adItem> -->
  </div>
</template>

a
<script>
// import { mapGetters, mapActions, mapState } from "vuex";
import adItem from "./formitem/common/index";
import sink from "./formitem/sink";
import source from "./formitem/source"; //source_dummy

export default {
  watch: {},
  props: {
    data: {
      type: Object,
      default: false
    }
  },
  components: {
    adItem
  },
  data: function() {
    return {};
  },

  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    setTemplate(val) {
      switch (val) {
        case "sink":
          return sink;
        case "source":
          return source;
        default:
          "";
      }
    }
  }
};
</script>

<style lang="scss">
.formitem {
  .advanced-options {
    width: 100%;
    text-align: left;
    color: #3e98fe;
    margin: 0px;
    height: 40px;
    line-height: 40px;
  }
  .adop-title {
    width: 100%;
    text-align: center;
    font-weight: normal;
    font-size: 20px;
    margin: 0px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
