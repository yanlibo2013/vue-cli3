<template>
  <div class="editor">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive>
        <router-view />
      </keep-alive>-->
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  watch: {
    // flowData(val) {
    // }
  },
  props: {
    // data: {
    //   type: Object,
    //   default: false
    // }
  },
  components: {},
  data: function() {
    return {};
  },
  computed: {
    //...mapState([""])
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
    //...mapActions([""]),
  }
};
</script>

<style lang="scss">
.editor {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
