<template>
<div class="col-sm-12 col-sm-12 col-md-9 col-lg-8 mb-30 swiper-area color-white" style="padding-top:2%;">
  <v-card>
    <v-card-title>
      Board
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="info"
      :search="search"
      @click:row="boardview"
    >
      <template slot="items" slot-scope="props">
        <tr @click="boardview(props.item.id)">
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.user_id }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-spacer style="padding:5px;"></v-spacer>
    <v-btn v-if="token == 'login'"
          style="margin-left:10px;" 
          color="black"
          @click="boardinsert"
        >Write Board</v-btn>
    <v-spacer style="padding:10px;"></v-spacer>
  </v-card>
</div>
</template>

<script>
// import http from "../http-common"
import Vue from 'vue';
// import moment from "moment"
import http2 from "../http-common2"
Vue.prototype.$EventBus = new Vue();
export default {
    name : "boardlist",
    data() {
        return {
            info : [],
            loading : true,
            errored : false,
            headers : [
                {
                    text: "번호",
                    align: "left",
                    sortable: true,
                    value: "rnum"
                },
                {
                    text: "제목",
                    align: "left",
                    sortable: false,
                    value: "title"
                },
                {
                    text: "작성자",
                    align: "left",
                    sortable: false,
                    value: "user_id"
                }
            ],
            search:"",
            token:""

        }
    },

    methods : {
        searchBoard(){
            this.loading = true;
            http2
                .get("/board/list")
                .then(response => {
                    this.info = response.data;
                    this.info.forEach(function(a){
                       a.value = false;
                    });
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        },

        boardview(target){
            this.$router.push("/boardview/"+target.id);
        },

        boardinsert(){
            this.$router.push("/boardinsert");
        },
        
    },

    mounted() {
        // this.$EventBus.$emit("logout", moment(this.$store.state.timestamp).diff(moment().format(),'minute'));
        this.searchBoard();
        // alert(this.$route.params.username);
        this.$store.commit('getChatId');
        this.$route.params.username = this.$store.state.chat_id;
        this.token = this.$store.state.token;
    },
    
}
</script>
<style>
tr {
    cursor: pointer;
}
</style>