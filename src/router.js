import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderList from './pages/orderList'
import OrderConfirm from './pages/orderConfirm'
import OrderPay from './pages/orderPay'
import AliPay from './pages/alipay'

//加载路由插件
Vue.use(Router);

//导出路由
export default new Router({
  //配置路由
  routes: [
    //商品的根组件
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',  //当访问 / 的时候，重定向到 /index
      //商品的子组件
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/product/:id',
          name: 'product',
          component: Product
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    //购物车单独作为根组件，即 /cart，如果作为子组件，例如 /order/cart 就会很怪
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    //订单的根组件
    {
      path: '/order',
      name: 'order',
      component: Order,
      //订单的子组件
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: AliPay
        }
      ]
    }
  ]
});