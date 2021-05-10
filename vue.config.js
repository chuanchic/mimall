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
  },
  // publicPath:'/app', //服务器根目录下的子目录 app
  // outputDir:'dist', //项目打包之后输出的目录
  // indexPath:'index2.html', //打包生成的单页面的名字 
  // lintOnSave:false, //es lint 校验
  productionSourceMap: true, //是否暴露源码文件，本地开发为true，线上打包为false
  chainWebpack: (config) => { //移除 prefetch 预加载，确保按需加载需要的组件
    config.plugins.delete('prefetch');
  }
}