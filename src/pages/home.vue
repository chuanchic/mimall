<template>
  <div>
    <nav-header></nav-header>
    <!-- 其他页面 会嵌入到 router-view 中 -->
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
export default {
  name: 'nav-home',
  components: {
    NavHeader,
    NavFooter
  }
}
</script>