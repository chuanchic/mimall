import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { from } from 'core-js/core/array'
// import env from './env'

//mock开关
const mock = false;
if (mock) {
  //将定义好的 api.js 文件动态加载进来，不能用import（import是静态加载，编译的时候加载）
  require('./mock/api');
}

//根据前端的跨域方式做调整，如果是接口代理的方式，可以指定为 '/api' 即可
axios.defaults.baseURL = '/api';
//如果不是接口代理的方式，那么就要写上完整的接口地址
// axios.defaults.baseURL = env.baseURL;
//设置超时时间
axios.defaults.timeout = 8000;
//添加响应拦截器
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) {
    //请求成功
    return res.data;
  } else if (res.status == 10) {
    //请求失败的状态码，建议根据不同的业务划分不同的状态码，例如 10 是未登录
    //未登录的情况下，跳转登录界面
    //由于当前this不是Vue实例，只能通过window.location进行跳转
    if(path != '#/index'){
      // 不是首页，跳转登录页
      window.location.href = '/#/login';
      return Promise.reject(res)
    }
  } else {
    //其他错误
    Message.warning(res.msg)
    return Promise.reject(res)
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});
//加载axios插件，借助 VueAxios 将axios对象挂载到Vue实例上
Vue.use(VueAxios, axios);

// 加载图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars/svg' //svg格式的图片是矢量图，优点：不随分辨率高低而失真
})

// 加载cookie
Vue.use(VueCookie)

//生产环境下的提示信息
Vue.config.productionTip = false

// 全局挂载
Vue.prototype.$message = Message
Vue.use(Message)

new Vue({
  store,
  router, // 使用路由 router: router
  render: h => h(App),
}).$mount('#app')
