<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive>
        <router-view />
      </keep-alive>-->
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      //return this.$store.state.tagsView.cachedViews
    },
    key() {
      //return this.$route.fullPath
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  // width: 100%;
  position: relative;
  // overflow: hidden;
  // position: fixed;
  // top: 60px;
  // left: 0;
  // bottom: 0;
  // width: 100%;
  // background:red
  //  height: calc(100vh - 75px);

  height: 100%;
}
</style>

