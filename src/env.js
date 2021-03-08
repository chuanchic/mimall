//接口地址
let baseURL;
//根据不同的环境，设置不同的接口地址（跨域方式不是接口代理的方式，需要这样设置）
//这里的 NODE_ENV 是指 package.json 里的 --mode=...
//如果 development 和 production 不够使用，还想自定义比如 test，就需要在根目录下新建文件 .env.test
switch (process.env.NODE_ENV) {
  case 'development': // 开发环境
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test': // 测试环境
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'production': // 生产环境
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}

export default {
  baseURL
}