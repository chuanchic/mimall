<template>
  <div>
    <order-header></order-header>
    <!-- 其他页面 会嵌入到 router-view 中 -->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
import ServiceBar from './../components/ServiceBar'
export default {
  name: 'order',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  }
}
</script>