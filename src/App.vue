<template>
  <div id="app"> 
    <div class = "main-box">
        <Header />
        <Headslider />
        <section class="bg-1-white ptb-0">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-1"></div>
                    <router-view></router-view>
                    <Side />
                    <div class="chat chat-off">
                        <div class="chat-title"><span v-on:click="chatOff" class="chat-span">Close ❌</span></div>
                        <Message-List :msgs="msgDatas" class="msg-list"></Message-List>
                        <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
                    </div>
                    <img v-on:click="chatOn" class="chat-btn chat-on" src="/theme/images/messenger-c.png" alt="">
                </div>
            </div>
        </section>
        <Footer />
    </div>
  </div>
</template>

<script>
// import Index from './components/Index.vue'
// import HelloWord from '.components/HelloWord.vue'
// import http from "./http-common"
import { mapMutations, mapState } from 'vuex';
import Header from "../src/components/Header"
import Headslider from "../src/components/Headslider"
import Side from "../src/components/Side"
import Footer from "../src/components/Footer"
import MessageList from '@/components/MessageList.vue';
import MessageForm from '@/components/MessageForm.vue';
import Constant from '@/Constant';
import http from './http-common';


export default {
  name: 'app',
  props: ['info'],
  data() {
        return {
            // info : [],
            loading : true,
            errored : false,
            datas: [],
            firstName: ["활발한", "우울한", "성격좋은", "잘생긴", "못생긴", "재밌는", "능력있는"],
            secondName: ["악어", "코끼리", "코알라", "캥거루", "낙타", "사자", "고라니"],
            chat_id:"",
            iinfo:[],
            ninfo:[],
            iwinfo:[]
        }
  },
  components: {
    Header,
    Headslider,
    Side,
    Footer,
    'Message-List': MessageList,
    'Message-From': MessageForm,
  },

  computed: {
    ...mapState({
      msgDatas: state => state.socket.msgDatas,
    }),
  },

  methods : {
        // getInfo(){
        //     this.loading = true;
        //     http
        //         .get("/naver")
        //         .then(response => {this.info = response.data;
        //         })
        //         .catch(() => {
        //             this.errored = true;
        //         })
        //         .finally(() => (this.loading = false));
        // },

        chatOn(){
            const chat = document.querySelector(".chat");
            chat.classList.remove("chat-off");
            chat.classList.add("chat-on");

            const chatBtn = document.querySelector(".chat-btn");
            chatBtn.classList.remove("chat-on");
            chatBtn.classList.add("chat-off");
        },

        chatOff(){
            const chatBtn = document.querySelector(".chat-btn");
            chatBtn.classList.remove("chat-off");
            chatBtn.classList.add("chat-on");

            const chat = document.querySelector(".chat");
            chat.classList.remove("chat-on");
            chat.classList.add("chat-off");
        },

        ...mapMutations({
      pushMsgData: Constant.PUSH_MSG_DATA,
    }),
    sendMessage(msg) {
      this.pushMsgData({
        from: {
          name: '나',
        },
        msg,
      });
      this.$sendMessage({
        // name: this.$route.params.username,
        name: this.$store.state.chat_id,
        msg,
      });
    },

    getIinfo(){
      http
                .get("/inews")
                .then(response => {
                  this.$store.commit("crawlingInews", {iinfo: JSON.stringify(response.data)});
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
    },

    getNinfo(){
      http
                .get("/naver")
                .then(response => {
                  this.$store.commit("crawlingNaver", {ninfo: JSON.stringify(response.data)});
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
    },

    getIwinfo(){
      http
                .get("/itworld")
                .then(response => {
                  this.$store.commit("crawlingIw", {iwinfo: JSON.stringify(response.data)});
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
    }
        
    },

    mounted() {
        // this.$EventBus.$emit("logout", moment(this.$store.state.timestamp).diff(moment().format(),'minute'));
        // this.getInfo();

        this.getIinfo();
        this.getNinfo();
        this.getIwinfo();

        const first = Math.random()*this.firstName.length;
        const second = Math.random()*this.secondName.length;

        const name = this.firstName[Math.floor(first)] +" "+ this.secondName[Math.floor(second)];
        this.$store.commit('getChatId');
        if(this.$store.state.chat_id==null || this.$store.state.chat_id==""){
          this.$store.commit('chatId', name);
        }
        // this.$route.params.username = this.$store.state.chat_id;
        const $ths = this;
        this.$socket.on('chat', (data) => {
            this.pushMsgData(data);
            $ths.datas.push(data);
        });
    }
}
</script>

<style>
.chat-btn {
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 50px;
    cursor: pointer;
    z-index:10;
}

.chat {
    position: fixed;
    right: 20px;
    bottom: 0;
    z-index:10;
    width: 25%;
    opacity: 0.9;
}

.chat-title {
    text-align: right;
    font-size: 17px;
    color: black;
}

.chat-span {
    cursor: pointer;
}

.chat-on {
    display: block;
}

.chat-off {
    display: none;
}

.msg-list {
  overflow: scroll;
  /* overflow-x: scroll; */
  height: 350px;
}
</style>
