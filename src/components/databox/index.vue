// 数据框组件
<template>
  <div class="data-box"
  :style="{ height:dheight + 'px'}"
  :class="{ noborder: !boxb }">
      <!-- 左上角边框 -->
      <div class="line-box" v-if="boxb">
          <i class="t-l-line"></i>
          <i class="l-t-line"></i>
      </div>
      <!-- 右上角边框 -->
      <div class="line-box" v-if="boxb">
          <i class="t-r-line"></i>
          <i class="r-t-line"></i>
      </div>
      <!-- 左下角边框 -->
      <div class="line-box" v-if="boxb">
          <i class="l-b-line"></i>
          <i class="b-l-line"></i>
      </div>
      <!-- 右下角边框 -->
      <div class="line-box" v-if="boxb">
          <i class="r-b-line"></i>
          <i class="b-r-line"></i>
      </div>

    <div class="in-title" v-if="title.length > 0">{{ title }}</div>
      <div class="chart">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name:"databox",
    props:{
        title:String,
        dheight:Number,
        icon:String,
        boxb:{
            type:Boolean,
            default:true
        }
    }
};
</script>

<style lang="scss">
.data-box{
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #2C58A6;
    position: relative;
    box-shadow: 0 0 10px #2C58A6;
    &.noborder{
        border: none;
        box-shadow: none;
    }
    .line-box{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
        i{
            background-color: #4788fb;
            box-shadow: 0px 0px 10px #4788fb;
            position: absolute;
            &.l-t-line{
                width: 5px;
                height: 24px;
                left: -3px;
                top: -3px;
            }
            &.t-l-line{
                height: 5px;
                width: 26px;
                left: -3px;
                top: -3px;
            }
            &.t-r-line{
                width: 5px;
                height: 26px;
                right: -3px;
                top: -3px;
            }
            &.r-t-line{
                width: 24px;
                height: 5px;
                right: -3px;
                top: -3px;
            }
            &.l-b-line{
                width: 5px;
                height: 24px;
                left: -3px;
                bottom: -3px;
            }
            &.b-l-line{
                width: 26px;
                height: 5px;
                left: -3px;
                bottom: -3px;
            }
            &.r-b-line{
                width: 5px;
                height: 24px;
                right: -3px;
                bottom: -3px;
            }
            &.b-r-line{
                width: 26px;
                height: 5px;
                right: -3px;
                bottom: -3px;
            }
        }
    }
    .in-title{
        width: 100%;
        height: 40px;
        color: #61d2f7;
        padding: 10px 10px 10px 20px;
        font-weight: bold;
        font-size: 1.7rem;
        margin-top: 10px;
        z-index: 1000;
    }
    .chart{
        position: relative;
        width: 100%;
        height: calc(100% - 50px);
        z-index: 1;
    }
}
</style>