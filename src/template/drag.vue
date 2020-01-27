<template>
  <div class="app">
    <h1>Vue Drag Select Example</h1>
    <no-ssr>
      <drag-select-container selector-class="item">
        <template slot-scope="{ selectedItems }">
          <div
            v-for="item in 50"
            :key="item"
            :class="getClasses(item, selectedItems)"
            :data-item="item"
            @click="getCurrentItem(item,getClasses(item, selectedItems))"
          >
            Item {{ item }}
          </div>
        </template>
      </drag-select-container>
    </no-ssr>
  </div>
</template>

<script>
import DragSelect from 'vue-drag-select'
import NoSSR from 'vue-no-ssr'
export default {
  name: 'Home',
  components: {
    'drag-select-container': DragSelect,
    'no-ssr': NoSSR
  },
  methods: {
    getClasses(item, selectedItems) {
      const isActive = !!(selectedItems.find((selectedItem) => {
        return parseInt(selectedItem.dataset.item, 10) === item
      }))

      return {
        item: true,
        active: isActive
      }
    },
    getCurrentItem(val, active) {
      console.log(val)
      console.log(active)
    }
  }
}
</script>

<style>
  /* Basic reset */
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    user-select: none;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  body {
    font: 16px / 1.5 'Helvetica Neue', sans-serif;
    padding: 5%;
  }
  /* Custom styling */
  .item {
    display: inline-flex;
    min-width: 80px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #ddd;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 10px;
  }
  .item.active {
    background-color: rgb(0, 162, 255);
    color: #fff;
  }
</style>
