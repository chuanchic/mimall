<template>
  <div>
    <order-header></order-header>
    <!-- 其他页面 会嵌入到 router-view 中 -->
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
export default {
  name: 'order',
  components: {
    OrderHeader,
    NavFooter
  }
}
</script>