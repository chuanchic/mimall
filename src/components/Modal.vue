<template>
  <!-- 动画 -->
  <transition name="slide">
    <!-- 对话框 容器 -->
    <div class="modal" v-show="showModal">
       <!-- 遮罩 -->
      <div class="mask"></div>
      <!-- 对话框 -->
      <div class="modal-dialog">
        <!-- 头部 -->
        <div class="modal-header">
          <span>{{title}}</span>
          <!-- 关闭按钮 -->
          <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
        </div>
        <!-- 内容 -->
        <div class="modal-body">
          <!-- 插槽 -->
          <slot name="body"></slot>
        </div>
        <!-- 底部 -->
        <div class="modal-footer">
          <!-- 确定 -->
          <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
          <!-- 取消 -->
          <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
          <!-- 多个按钮 -->
          <div class="btn-group" v-if="btnType==3">
            <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default{
    name:'modal',
    props:{
      // 弹框类型：小small、中middle、大large、表单form
      modalType:{
        type:String,
        default:'form'
      },
      // 弹框标题
      title:String,
      // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
      btnType:String,
      sureText:{
        type:String,
        default:'确定'
      },
      cancelText:{
        type:String,
        default:'取消'
      },
      showModal:Boolean
    }
  }
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>