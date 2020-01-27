<template>
  <div id="app">
    <input v-model="search" type="text">
    <ul v-for="item in searchData " :key="item">
      <li>{{ item.name }},价格:￥{{ item.price }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      search: '',
      products: [{
        name: '苹果',
        price: 25,
        category: '水果'
      }, {
        name: '香蕉',
        price: 15,
        category: '水果'
      }, {
        name: '雪梨',
        price: 65,
        category: '水果'
      }, {
        name: '宝马',
        price: 2500,
        category: '汽车'
      }, {
        name: '奔驰',
        price: 10025,
        category: '汽车'
      }, {
        name: '柑橘',
        price: 15,
        category: '水果'
      }, {
        name: '奥迪',
        price: 25,
        category: '汽车'
      }, {
        name: '火龙果',
        price: 25,
        category: '工具'
      }]
    }
  },
  computed: {
    searchData() {
      var search = this.search
      if (search) {
        return this.products.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.products
    }
  }
}
</script>

<style scoped>

#app{

}

</style>
