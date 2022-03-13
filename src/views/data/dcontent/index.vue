<template>
  <div class="content-cont">
      <div class="top-box">
          <div class="left">
              <!-- 公开仓库数 -->
              <dnumber
              :dheight="110"
              :title="$t('data.myevent.pubRepos')"
              :size="'4rem'"
              :dnumber="numberData.pubRepos"
              :icon="'kucunguanli'"
              :color="'#ffff43'"
              ></dnumber>
          </div>
          <div class="right">
              <div class="content-center">
                  <!-- 粉丝数 -->
                  <dnumber
                    :dheight="110"
                    :title="$t('data.myevent.followers')"
                    :size="'2rem'"
                    :dnumber="numberData.followers"
                    :icon="'jindu1'"
                    :color="'#25f3e6'"
                  ></dnumber>
                  </div>
                  <!-- 关注数 -->
                  <div class="content-right">
                  <dnumber
                    :dheight="110"
                    :title="$t('data.myevent.following')"
                    :size="'2rem'"
                    :dnumber="numberData.following"
                    :icon="'success'"
                    :color="'#f84a4a'"
                  ></dnumber>
              </div>
          </div>
      </div>
      <div class="content-box">
          <!-- 仓库数据信息 -->
          <databox
          :title="$t('data.myevent.accountData')"
          :dheight="350"
          :icon="'account'"
          :boxb="false">
              <div class="content-wrapper">
                  <ve-bar :data="repoData" :extend="extend" :height="'350px'"></ve-bar>
                  <nodata
                  :nodata="$t('data.myevent.noRepoSize')"
                  v-if="noRepoSize"></nodata>
              </div>
          </databox>
          <!-- 最近操作信息 -->
          <databox 
          :title="$t('data.myevent.myevent')"
          :dheight="220"
          :icon="'account'">
              <myevent :data="myevent"></myevent>
              <nodata
              :nodata="$t('data.myevent.noMyevent')"
              v-if="noMyevent"></nodata>
          </databox>
      </div>
  </div>
</template>

<script>
import dnumber from "./dnumber"
import myevent from "./myevent"
import { LINE_DATA }from "../test/data"

export default {
    components:{
        dnumber,
        myevent
    },
    props:{
        numberData:Object,
        username:String
    },
    data(){
        this.extend = {
            series:{
                label:{
                    normal:{
                        show:true
                    }
                }
            },
            legend:{
                textStyle:{ color:"#fff" },
                right:"6%"
            },
            yAxis:{
                axisLabel:{
                    textStyle:{
                        color:"#fff"
                    }
                }
            },
            xAxis:{
                axisLabel:{
                    textStyle:{
                        color:"#fff"
                    }
                }
            }
        };
        return {
            chartData:LINE_DATA,
            myevent:[],
            noMyevent:false,
            repoData:{
                columns:["reposName","size","forks"],
                rows:[]
            },
            noRepoSize:false
        };
    },
    methods:{
        getData(username){
            let comUrl = "/api/users/";
            let url1 = comUrl + username + "/events";
            let url2 = comUrl + username + "/repos";
            this.$axios
                .all([this.$axios.get(url1),this.$axios.get(url2)])
                .then(
                    this.$axios.spread((res1,res2) => {
                        // 获取最近操作信息
                        let data1 = JSON.parse(JSON.stringify(res1.data));
                        if(data1.length < 1){
                            this.noMyevent = true;
                        }else {
                            this.myevent = data1;
                        }
                        // 获取仓库数据
                        let data2 = JSON.parse(JSON.stringify(res2.data));
                        if(data2.length < 1){
                            this.noRepoSize = true;
                        }else{
                            let dataR = [];
                            for(let i = 0;i<data2.length;i++){
                                let reposName = data2[i].name;
                                let size = data2[i].size;
                                let forks = data2[i].forks;
                                let objR = {
                                    reposName:reposName,
                                    size:size,
                                    forks:forks
                                };
                                dataR.push(objR);
                            }
                            this.repoData.rows = dataR;
                        }
                        return;
                    })
                )
                .catch(err => {
                    console.log(err.message);
                });
        }
    },
    watch:{
        username(username){
            if(username){
                this.getData(username);
            }
        }
    }
};
</script>

<style lang="scss">
.content-cont{
    width: 100%;
    height: 100%;
    .top-box{
        display: flex;
        width: 100%;
        height: 110px;
        // overflow: hidden;
        .left{
            width: 30%;
            background: rgba(35,72,135,0.4);
        }
        .right{
            flex: 1;
            padding-left: 15px;
            display: flex;
            .content-center{
                width: 50%;
                height: 100%;
                background: rgba(35,72,135,0.4);
                .number-box{
                    width: 55%;
                    float: left;
                }
            }
            .content-right{
                width: 50%;
                height: 100%;
                background: rgba(35,72,135,0.4);
                .number-box{
                    width: 50%;
                    float: left;
                }
            }
        }
    }
    .content-box{
        padding-top: 30px;
    }
}
</style>