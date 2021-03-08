<template>
  <div class="footer">
    <!-- logo -->
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <!-- 链接 -->
    <div class="footer-link">
      <!-- 添加竖线，可以通过 伪类，或者 span -->
      <a href="https://www.baidu.com" target="_blank">河畔一角主页</a><span>|</span>
      <a href="https://www.baidu.com" target="_blank">Vue全栈课程</a><span>|</span>
      <a href="https://www.baidu.com" target="_blank">React全家桶课程</a><span>|</span>
      <a href="https://www.baidu.com" target="_blank">微信支付专项课程</a>
    </div>
    <!-- 版权 -->
    <div class="copyright">Copyright<span class="domain">mi.futurefe.com</span> ...</div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss" scoped>
.footer {
  height: 234px;
  border-top: 4px solid #ff6600;
  background-color: #333333;
  color: #999999;
  font-size: 16px;
  text-align: center;
  //logo
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
    p {
      color: #ffffff;
    }
  }
  //链接
  .footer-link {
    margin-bottom: 13px;
    text-align: center;
    //a 标签
    a {
      display: inline-block;
      color: #999999;
    }
    //竖线
    span {
      margin: 0 10px;
    }
  }
  //版权
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>