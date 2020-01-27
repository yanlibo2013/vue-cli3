<template>
  <header class="v-header">
    <h1>jsplumb chart</h1>
    <div class="right-menu">
      <search id="header-search" class="right-menu-item" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import Search from "@/components/HeaderSearch";
/* eslint-disable */
export default {
  data: function() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      menuData: [
        {
          name: "数据分析",
          path: "analyst ",
          children: [
            {
              name: "流程管理",
              path: "flow"
            }
          ]
        },
        {
          name: "数据集成",
          path: "integration",
          children: [
            {
              name: "资源目录",
              path: "source"
            },
            {
              name: "文件管理",
              path: "file"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  components: {
    Search
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      this.$router.push("/layout/" + key);
    },
    logout() {
      this.$router.push(`/login`);
    }
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {}
};
</script>

<style lang="scss">
.v-header {
  height: 60px;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* flex布局 */
  display: flex;

  justify-content: space-between;

  /* 使子项目水平居中 */
  // justify-content: center;

  /* 使子项目垂直居中 */
  align-items: center;
  h1 {
    color: #333;
    margin-left: 20px;
  }

  .right-menu {
    margin-right: 10px;
    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>