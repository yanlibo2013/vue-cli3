<template>
  <!-- <div :class="{'has-logo':showLogo}"> -->
  <div class="has-logo">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { getMenu } from "@/api/menu";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // showLogo() {
    //   return this.$store.state.settings.sidebarLogo;
    // },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    // ...mapActions("permission",["getMenuData"]),
    initData() {
      getMenu().then(res => {
        // this.getMenuData(res.data.menu);
        this.$store.dispatch('permission/getMenuData',res.data)
      });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>


<style lang="scss">
.has-logo {
  position: relative;
  .scrollbar-wrapper {
    position: absolute;
    width: 100%;
  }
}
</style>

