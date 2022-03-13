// 帮助条款
<template>
  <div class="mode-content" v-if="isShow">
      <div class="content-box">
          <button class="close">
              <span @click="closebtn">
                  &times;
              </span>
          </button>
        <!-- 帮助条款内容 -->
          <div class="title">{{ $t("app.pmodal.title") }}</div>
          <div class="content">
              <p>{{ $t("app.pmodal.thanksP") }}</p>
              <p>{{ $t("app.pmodal.aPone") }}
                  <a href="https://developer.github.com/v3/">
                      {{ $t("app.pmodal.aPtwo") }}
                  </a>
              </p>
              <p>{{ $t("app.pmodal.bP") }}</p>
              <p>{{ $t("app.pmodal.cPone") }}
                  <a href="https://github.com/SnowLeopard11">SnowLeopard11</a>
                  {{ $t("app.pmodal.cPtwo") }}
              </p>
              <p>{{ $t("app.pmodal.dP") }}</p>
              <p>{{ $t("app.pmodal.ePone") }}
                  <a href="https://docs.github.com/en/github/site-policy/github-terms-of-service">
                  {{ $t("app.pmodal.ePtwo") }}
                  </a>
              </p>
          </div>

          <!-- 底部 -->
          <div class="footer">
              <button class="btn btn-default"
              @click="closebtn">
                  {{ $t("app.pmodal.closebtn") }}
              </button>
          </div>
      </div>
      <div class="bg"></div>
  </div>
</template>

<script>
export default {
    name:"pmodal",
    data(){
        return{
            isShow:false
        };
    },
    methods:{
        closebtn(){
            this.isShow = false;
        }
    }
};
</script>

<style lang="scss">
.mode-content{
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 104000;
    .bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom:0;
        left: 0;
        opacity: 0.5;
        z-index: 100;
        filter: blur(2px);
        background-color: #000;
    }
    .content-box{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 1;
        z-index: 9999999999;
        width: 800px;
        overflow: hidden;
        margin: 30px auto;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        outline: 0;
        box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        background-color: #fff;
        .close{
            padding: 10px;
        }
        .title{
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #e5e5e5;
        }
        .content{
            padding: 15px;
            font-size: 2rem;
        }
        .footer{
            padding: 15px;
            text-align: right;
            border-top: 1px solid #e5e5e5;
        }
    }
}
</style>