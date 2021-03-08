module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    //代理
    proxy: {
      //当访问 /api 的时候被拦截，被代理到真实地址
      '/api': {
        //对于 开发环境、测试环境、生产环境 的切换，只能在这里手动修改
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}