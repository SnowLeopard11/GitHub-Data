<template>
  <div class="right-content">
      <div class="right-box">
          <databox :title="''" :dheight="440">
              <!-- 新增粉丝栏 -->
              <databox
              :title="$t('data.dright.index.followers')"
              :dheight="210"
              :boxb="false">
              <follower :data="followers"></follower>
                  <nodata
                  :nodata="t('data.dright.index.noFollowers')"
                  v-if="noFollowers">
                  </nodata>
              </databox>
              <!-- 最近跟随栏 -->
              <databox
              :title="$t('data.dright.index.following')"
              :dheight="210"
              :boxb="false">
              <follower :data="following"></follower>
                  <nodata
                  :nodata="t('data.dright.index.noFollowing')"
                  v-if="noFollowing">
                  </nodata>
              </databox>
          </databox>
          <!-- 最新消息框 -->
          <div class="message">
              <databox
              :title="$t('data.dright.index.message')"
              :dheight="260"
              :icon="'accout'">
              <message :data="message"></message>
              <nodata
              :nodata="$t('data.dright.index.message')"
              v-if="noMessage"></nodata>
              </databox>
          </div>
      </div>
  </div>
</template>

<script>
import message from "./message.vue"
import follower from "./follower.vue"
export default {
  components: {
    message,
    follower
   },
   props:{
       username:String
   },
   data(){
       return{
           followers:[],
           noFollowers:false,
           following:[],
           noFollowing:false,
           message:[],
           noMessage:false
       };
   },
   methods:{
       getData(username){
           let comUrl = "/api/users/";
           let url1 = comUrl + username + "/followers";
           let url2 = comUrl + username + "/following";
           let url3 = comUrl + username + "/received_events";
           this.$axios
                .all([
                    this.$axios.get(url1),
                    this.$axios.get(url2),
                    this.$axios.get(url3)
                ])
                .then(
                    // 收集followers情况
                    this.$axios.spread((res1,res2,res3) => {
                        let data1 = JSON.parse(JSON.stringify(res1));
                        if(data1.data.length < 1){
                            this.noFollowers = true;
                        }else{
                            this.followers = data1.data.reverse();
                        }
                        // 收集following情况
                        let data2 = JSON.parse(JSON.stringify(res2));
                        if(data2.data.length < 1){
                            this.noFollowing = true;
                        }else{
                            this.following = data2.data.reverse();
                        }
                        // 收集message情况
                        let data3 = JSON.parse(JSON.stringify(res3))
                        if(data3.data.length < 1){
                            this.noMessage = true;
                        }else{
                            this.message = data3.data;
                        }
                        return;
                    })
                )
                .catch(err =>{
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
.right-content{
    width: 100%;
    height: 100%;
    .right-box{
        padding-bottom: 40px;
    }
}
</style>