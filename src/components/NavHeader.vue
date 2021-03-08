<template>
  <!-- 根容器 -->
  <div class="header">
    <!-- 顶部条 -->
    <div class="nav-topbar">
      <!-- 容器，用来固定宽度、水平居中 -->
      <div class="container">
        <!-- 左侧菜单 -->
        <div class="topbar-menu">
          <!-- 这里的链接跳转 不作实现 -->
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <!-- 右侧用户-->
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <!-- 购物车样式特别，需要单独给个样式，同时通过span定义图标 -->
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="nav-header">
      <!-- 容器，用来固定宽度、水平居中 -->
      <div class="container">
        <!-- 左侧logo，带左右滑动动画，通过transition实现 -->
        <div class="header-logo">
          <!-- 点击跳转首页，这里a标签是个左右滑动的图片，不是文字链接 -->
          <a href="/#/index"></a>
        </div>
        <!-- 中间菜单 -->
        <div class="header-menu">
          <!-- 菜单是有下拉区域的，用a标签不太合适，用div -->
          <div class="item-menu">
            <!-- 菜单的文字 -->
            <span>小米手机</span>
            <!-- 菜单的下拉区域 -->
            <div class="children">
              <!-- 菜单项是一个循环列表 -->
              <ul>
                <!-- 每个 li 标签是一个商品 -->
                <li class="product" v-for="(item, index) in phoneList" :key="index">
                  <!-- 每个 a 标签点击，打开新窗口，跳转到商品详情 -->
                  <!-- v-bind 可以省略 -->
                  <a v-bind:href=" '/#/product/' + item.id " target="_blank">
                    <!-- 商品图片 -->
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle"/>
                    </div>
                    <!-- 商品名称 -->
                    <div class="pro-name">{{ item.name }}</div>
                    <!-- 商品价格，使用过滤器 currency 过滤金额 -->
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <!-- 菜单的文字 -->
            <span>RedMi红米</span>
            <!-- 菜单的下拉区域 -->
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <!-- 菜单的文字 -->
            <span>电视</span>
            <!-- 菜单的下拉区域 -->
            <div class="children"></div>
          </div>
        </div>
        <!-- 右侧搜索：图标 + 输入框 -->
        <div class="header-search">
          <div class="wrapper">
            <!-- 输入框 -->
            <input type="text" name="keyword"/>
            <!-- 搜索图标，带手的，要用a标签 -->
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data() {
    return {
      username: 'jack', //用户名
      phoneList: [] //手机列表
    }
  },
  mounted() {
    //获取商品列表
    this.getProductList()
  },
  //过滤器
  filters: {
    //过滤金额
    currency(val) {
      if (val) return '￥' + val.toFixed(2) + '元'
      return '0.00'
    }
  },
  methods: {
    //获取商品列表
    getProductList() {
      this.axios
        .get('/products', {
          params: {
            categoryId: '100012',
            pageSize: 6
          }
        })
        .then(res => {
          this.phoneList = res.list
        })
    },
    //进入购物车界面
    goToCart() {
      this.$router.push('/cart')
    },
    //进入登录界面
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss'; //导入公共样式
@import '../assets/scss/mixin.scss'; //导入抽取的样式
@import '../assets/scss/config.scss'; //导入配置的样式变量

.header {
  //顶部条
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      //宽度固定、水平居中，定义在了base.scss里
      //...
      //弹性布局，左右两边放置，通过 mixin 中提供的函数 flex 来设置
      @include flex();
      //a标签默认有样式，需要覆盖
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      //购物车样式，宽度要大一些，同时带有图标
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        //购物车图标，span标签用background
        .icon-cart {
          @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  //导航栏
  .nav-header {
    .container {
      //宽度固定、水平居中，定义在了base.scss里
      //...
      //弹性布局控制为 左、中 、右 三块，并垂直居中
      //通过 mixin 中提供的函数 flex 来设置
      @include flex();
      height: 112px;
      //左侧logo，可视化区域宽高为55*55，实际图片宽度为55*2，就可以实现左右滑动
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        //定义a标签样式，存放两张图片，宽度为55*2
        a {
          display: inline-block;
          width: 110px;
          height: 55px; //可以不写，会继承父类
          //通过伪类，展示两张图片
          &::before {
            content: ' '; //设置空字符串占位
            @include bgImg(55px, 55px, '/imgs/mi-logo.png');
            transition: margin 0.2s; //0.2s过渡动画
          }
          &::after {
            content: ' '; //设置空字符串占位
            @include bgImg(55px, 55px, '/imgs/mi-home.png');
          }
          //鼠标悬停的时候，控制before的间距，以此来显示home图标
          &:hover::before {
            margin-left: -55px;
            transition: margin 0.2s; //0.2s过渡动画
          }
        }
      }
      //中间菜单
      .header-menu {
        display: inline-block;
        width: 643px; //需要多次调出一个合适的宽度
        padding-left: 209px;
        //各个菜单水平显示
        .item-menu {
          display: inline-block;
          line-height: 112px;
          margin-right: 20px;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          //菜单的文字
          span {
            cursor: pointer; //手 的图标
          }
          //下拉菜单用绝对定位
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            background-color: #ffffff;
            //默认 高度为0、透明度为0，鼠标 悬停再显示
            height: 0;
            opacity: 0;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            overflow: hidden; //溢出隐藏
            transition: all 0.5s; //过渡动画
            //每个 li 标签就是一个商品，可以采用浮动布局，左右排列
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              //设置字体大小、行高、居中
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              //a 标签默认 行内，撑不开，行内块 可以被内容撑开
              a {
                display: inline-block;
              }
              //商品图片，宽、高固定一边即可，另一边自适应
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              //商品图片的容器
              .pro-img {
                height: 137px; // 111px + 26px
              }
              //商品名称
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              //商品价格
              .pro-price {
                color: $colorA;
              }
              //通过伪类添加竖线
              &::before {
                content: ' ';
                position: absolute;
                top: 28px;
                right: 0;
                width: 1px;
                height: 100px;
                border-left: 1px solid $colorF;
              }
              //最后一个 竖线 隐藏
              &:last-child:before {
                display: none;
              }
            }
          }
          //鼠标悬停，显示下拉菜单
          &:hover {
            color: $colorA;
            //显示下拉菜单，也就是设置高度、透明度
            .children {
              height: 220px;
              opacity: 1;
            }
          }
        }
      }
      //右边搜索
      .header-search {
        width: 319px;
        //搜索区域
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          //输入框
          input {
            border: none; //清除边框默认值
            border-right: 1px solid #e0e0e0; //右边竖线
            width: 264px;
            height: 50px;
            padding-left: 14px;
            box-sizing: border-box; //因为有padding-left，所以要自动内减
          }
          //搜索图标，通过a标签的背景图片实现
          a {
            @include bgImg(18px, 18px, '/imgs/icon-search.png');
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>