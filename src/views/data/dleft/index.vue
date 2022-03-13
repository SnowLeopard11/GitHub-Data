<template>
  <div class="left-content">
      <div class="left-box">
          <databox :title="''" :dheight="720">
          <personal :personalData="personalData" :username="username"></personal>
          <databox
          :dheight="280"
          :title="$t('data.dleft.accountStars')"
          :icon="'account'"
          :boxb="false">
          <!-- 添加star数据饼状图 -->
          <ve-pie 
          :data="starData" 
          :extend="extend"
          :height="'250px'">
          </ve-pie>
          <!--添加无数据显示  -->
          <nodata
            :nodata="$t('data.dleft.noStarData')"
            v-if="noStarData"
          ></nodata>
          </databox>

          <databox
          :dheight="280"
          :title="$t('data.dleft.accountLeng')"
          :icon="'account'"
          :boxb="false">
          <!-- 添加仓库语言分类数据饼状图 -->
          <ve-ring
          :data="languageData"
          :extend="extend"
          :height="'230px'"
          ></ve-ring>
          <nodata
            :nodata="$t('data.dleft.nolanguageData')"
            v-if="nolanguageData"
          ></nodata>
          </databox>
          </databox>
      </div>
  </div>
</template>

<script>
import personal from './personal'
export default {
    components:{
        personal
    },
    props:{
        personalData:Object,
        username:String
    },
    data(){
        // extend设置只有一条指标线
        this.extend = {
            legend:{
                textStyle:{ color:"#fff" }
            },
            grid:{
                textStyle:{
                    color: "#fff"
                }
            },
            series:{
                radius:["0","40%"],
                center:["50%","60%"]
            }
        };
        return{
            personalD:{},
            starData:{
                columns:["reposName","getStars"],
                rows:[]
            },
            noStarData:false,
            languageData:{
                columns:["lang","number"],
                rows:[]
            },
            nolanguageData:false
        };
    },
    methods:{
        getData(username){
            this.$axios
                .get("/api/users/" + username + "/repos")
                .then(response => {
                    let data = JSON.parse(JSON.stringify(response.data));
                    if(data.length < 1){
                        this.noStarData = true;
                    }else{
                        let rowdata = [];
                        let languages = {};
                        for(let i = 0;i < data.length;i++){
                            // 获取仓库和仓库star数据
                            let reposName = data[i].name;
                            let getStars = data[i].stargazers_count;
                            let obj = {
                                reposName:reposName,
                                getStars:getStars
                            };
                            rowdata.push(obj);

                            // 梳理语言，计算语言类型和各个语言数量
                            let langData = data[i].language;
                            if(langData){
                                if(langData in languages){
                                    languages[langData]++;
                                }else{
                                    languages[langData] = 1;
                                }
                            }
                        }
                        // 附值到starData.rows
                        this.starData.rows = rowdata;
                        // 将语言重新封装为对象
                        let objL = JSON.parse(JSON.stringify(languages));
                        let dataL = [];
                        for(let key in objL){
                            dataL.push({ lang:key,number:objL[key]});
                        }
                        this.languageData.rows = dataL;
                    }
                    return;
                })
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
.left-content{
    width: 100%;
    height: 100%;
    .left-box{
        width: 100%;
        height: 720px;
        padding-bottom: 40px;
    }
}
</style>