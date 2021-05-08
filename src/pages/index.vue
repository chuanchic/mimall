<template>
  <div class="index">

    <div class="container">
      <!-- 轮播区域 -->
      <div class="swiper-box">
        <!-- 左侧菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <!-- 菜单的展开项 -->
              <div class="children">
                <!-- 两层循环实现 -->
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <!-- 轮播图 -->
        <swiper class="swiper-container" v-bind:options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
            <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <!-- 公告区域 -->
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>

      <!-- 广告区域 -->
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>

      <!-- 产品区域 -->
      <div class="product-box">
        <div class="container">
          <h2>手机</h2>
          <div class="wrapper">

            <div class="banner-left">
              <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
            </div>
            <!-- 商品列表 -->
            <div class="list-box">
              <div class="list" v-for="(arr,i) in phoneList" v-bind:key="i">
                <div class="item" v-for="(item,j) in arr" v-bind:key="j">
                  <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务条 -->
    <service-bar></service-bar>

    <!-- 模态框 -->
    <modal 
      title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle" 
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal=false"
      >
      <!-- 插槽 -->
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>

  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar'
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Modal from './../components/Modal'

export default {
  name: 'index',
  components: {
    ServiceBar,
    swiper,
    swiperSlide,
    Modal
  },
  data () {
    return {
      swiperOption:{
        autoplay:true,
        loop:true,
        effect:'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      slideList:[//轮播列表
        {id: '42', img: '/imgs/slider/slide-1.jpg'},
        {id: '43', img: '/imgs/slider/slide-2.jpg'},
        {id: '44', img: '/imgs/slider/slide-3.jpg'},
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },{
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },{
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },{
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
        ],
        [1, 2, 3, 4],[1, 2, 3, 4],[1, 2, 3, 4],[1, 2, 3, 4],[1, 2, 3, 4]
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },{
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },{
          id:45,
          img:'/imgs/ads/ads-3.png'
        },{
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList:[],
      showModal:false
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.axios.get('/products',{
        params:{
          categoryId:100012,
          pageSize:14
        }
      }).then((res)=>{
        res.list = res.list.slice(6,14);
        this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
      })
    },
    addCart(id){
      this.axios.post('/carts',{
        productId:id,
        selected: true
      }).then((res)=>{
        this.showModal = true;
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
      }).catch(()=>{
        this.showModal = true;
      });
    },
    goToCart(){
      this.$router.push('/cart');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  // 根容器
  .index{
    // 轮播区域
    .swiper-box{
      // 左侧菜单
      .nav-menu{
        position: absolute;
        width: 264px;
        height: 451px;
        z-index: 9;
        padding: 26px 0;
        background-color: #55585A;
        box-sizing: border-box;
        // 菜单条目
        .menu-wrap{
          .menu-item{
            height: 50px;
            line-height: 50px;
            a{
              font-size: 16px;
              color: #ffffff;
              position:relative;
              display:block;
              padding-left:30px;
              // 伪类的方式添加右边箭头
              &::after{
                content: ' ';
                @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
                position: absolute;
                right: 30px;
                top: 17.5px;
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              }
            }
            // 菜单展开项
            .children{
              display:none;
              width:962px;
              height:451px;
              background-color:$colorG;
              position:absolute;
              top:0;
              left:264px;
              border:1px solid $colorH;
              ul{
                display:flex;
                justify-content:space-between;
                height:75px;
                li{
                  height:75px;
                  line-height:75px;
                  flex:1;
                  padding-left:23px;
                }
                a{
                  color:$colorB;
                  font-size:14px;
                }
                img{
                  width:42px;
                  height:35px;
                  vertical-align:middle;
                  margin-right:15px;
                }
              }
            }
          }
        }
      }
      // 轮播图
      .swiper-container{
        height: 451px;
        // 左边箭头设置左间距
        .swiper-button-prev{
          left:274px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    // 公告区域
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        width:296px;
        height:167px;
      }
    }
    // 广告区域
    .banner{
      margin-bottom:50px;
    }
    // 产品区域
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display:flex;
        .banner-left{
          margin-right:16px;
          img{
            width:224px;
            height:619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width:986px;
            margin-bottom:14px;
            &:last-child{
              margin-bottom:0;
            }
            .item{
              width:236px;
              height:302px;
              background-color:$colorG;
              text-align:center;
              span{
                display:inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color:$colorG;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width:100%;
                  height:195px;
                }
              }
              .item-info{
                h3{
                  font-size:$fontJ;
                  color:$colorB;
                  line-height:$fontJ;
                  font-weight:bold;
                }
                p{
                  color:$colorD;
                  line-height:13px;
                  margin:6px auto 13px;
                }
                .price{
                  color:#F20A0A;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  &:after{
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }

  }
</style>