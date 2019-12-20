import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store2 = new Vuex.Store({
    state:{
        host:'localhost:3000',
        // token:localStorage.getItem('token'),
        // user_id:localStorage.getItem('user_id'),
        // timestamp:localStorage.getItem('timestamp'),
        chat_id:localStorage.getItem('chat_id')
    },
    
    mutations:{
        getChatId(state){
            state.chat_id = localStorage.getItem('chat_id');
        },
        
        chatId: function(state, chat_id){
            localStorage.setItem("chat_id", chat_id);
            state.chat_id = localStorage.getItem("chat_id");
        }
    // getToken(state){
    //   state.token = localStorage.getItem('token');
    // },

    // getId(state){
    //   state.user_id = localStorage.getItem('user_id'); 
    // },

    // getTimestamp(state) {
    //   state.timestamp = localStorage.getItem('timestamp');
    // },

    // ResetTimestamp(state) {
    //   localStorage.removeItem("timestamp");
    //   state.timestamp = localStorage.getItem("timestamp");
    // },

    // loginToken: function(state, user) {
    //   // alert(moment(state.timestamp).diff(moment().format(),'second'));
    //   localStorage.setItem("token", user.token);
    //   localStorage.setItem("user_id", user.user_id);
    //   state.token = localStorage.getItem('token');
    //   state.user_id = localStorage.getItem('user_id'); 
    //   state.timestamp = localStorage.getItem('timestamp');
    //   alert("로그인 되었습니다.");
    // },

    // logout: function(state){
    //   if(state.token!='' || state.token!=null){
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user_id");
    //     localStorage.removeItem("timestamp");
    //     state.user_id='';
    //     state.token='';
    //     state.timestamp='';
    //     alert("로그아웃 되었습니다.");
    //   }
    // },

  }
})
