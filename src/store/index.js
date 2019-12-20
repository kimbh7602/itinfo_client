import Vue from 'vue';
import Vuex from 'vuex';
import socket from './modules/socket';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    socket,
  },
  strict: debug,

  state:{
    host:'192.168.100.41:3000',
    // host:'localhost:3000',
    token:sessionStorage.getItem('token'),
    user_id:sessionStorage.getItem('user_id'),
    chat_id:sessionStorage.getItem('chat_id'),
    iinfo:sessionStorage.getItem("iinfo"),
    ninfo:sessionStorage.getItem("ninfo"),
    iwinfo:sessionStorage.getItem("iwinfo")
},

mutations:{
    getChatId(state){
        state.chat_id = sessionStorage.getItem('chat_id');
    },
    
    chatId: function(state, chat_id){
        sessionStorage.setItem("chat_id", chat_id);
        state.chat_id = sessionStorage.getItem("chat_id");
    },

    getToken(state){
      state.token = sessionStorage.getItem('token');
    },

    getId(state){
      state.user_id = sessionStorage.getItem('user_id'); 
    },

    getIinfo(state){
      state.iinfo = sessionStorage.getItem("iinfo");
    },

    getNinfo(state){
      state.ninfo = sessionStorage.getItem("ninfo");
    },

    getIwinfo(state){
      state.iwinfo = sessionStorage.getItem("iwinfo");
    },

    loginToken: function(state, user) {
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("user_id", user.user_id);
      state.token = sessionStorage.getItem('token');
      state.user_id = sessionStorage.getItem('user_id'); 
      alert("로그인 되었습니다.");
    },

    logout: function(state){
      if(state.token!='' || state.token!=null){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user_id");
        state.user_id='';
        state.token='';
        alert("로그아웃 되었습니다.");
      }
    },

    crawlingNaver: function(state, info){
      sessionStorage.setItem("ninfo", info.ninfo);
      state.ninfo = sessionStorage.getItem("ninfo");
    },

    crawlingInews: function(state, info){
      sessionStorage.setItem("iinfo", info.iinfo);
      state.iinfo = sessionStorage.getItem("iinfo");
    },

    crawlingIw: function(state, info){
      sessionStorage.setItem("iwinfo", info.iwinfo);
      state.iwnfo = sessionStorage.getItem("iwinfo");
    }
}
  // plugins: debug ? [createLogger()] : []
});
