<template>
  <div class="data-page">
    <dheader></dheader>
    <div class="data-content">
      <div class="data-main">
        <div class="main-left">
          <dleft :personalData="personalData" :username="username"></dleft>
        </div>
        <div class="main-center">
          <dcontent :numberData="numberData" :username="username"></dcontent>
        </div>
        <div class="main-right">
          <dright :username="username"></dright>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dheader from "./dheader"
import dleft from "./dleft"
import dright from "./dright"
import dcontent from "./dcontent"

export default {
components:{
  dheader,dleft,dright,dcontent
},
data(){
  return {
    isShow:false,
    pageShow:true,
    personalData:{},
    numberData:{},
    username:""
  };
},
  created(){
    let username = this.$route.params.user;
    this.getData(username);
  },
  methods:{
    getData(username){
      this.$axios
        .get("https://api.github.com/users/" + username)
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if(res.status === 200){
            this.username = username;
            let data = res.data;
            // 获取加入github时间、个人图片
            let sinceDate = data.created_at;
            let joinDate = sinceDate.substring(0,10);
            let img = data.avatar_url;
            let objP = {
              username:username,
              joinDate:joinDate,
              img:img
            };
            this.personalData = objP;
            // 获取仓库数量、粉丝数量与跟随数量
            let pubRepos = data.public_repos;
            let followers = data.followers;
            let following = data.following;
            let objN = {
              pubRepos:pubRepos,
              followers:followers,
              following:following
            };
            this.numberData = objN;
            this.pageShow = false;
          }
          return;
        })
        .catch(err => {
          this.pageShow = false;
          this.isShow = true;
          console.log(err.message);
        });
    }
  }
};
</script>

<style lang="scss">
.data-page{
  background:url(../../assets/data/true.png) repeat-x;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  min-width: 1220px;
  .data-content{
    padding-bottom: 20px;
    .data-main{
      width: calc(100% - 40px);
      margin-bottom: 40px;
      margin-left: 20px;
      height: 720px;
      .main-left{
        width: 24%;
        float: left;
      }
      .main-center{
        float: left;
        width: 52%;
        padding: 0 20px 0 20px;
      }
      .main-right{
        float: left;
        width: 24%;
        height: 615px;
      }
    }
  }
}
</style>