<template>
    <header>
        <a class="logo" href="#"><img src="/theme/images/logo-white.png" alt="Logo"></a>
        <div class="center-area">
            <a class="menu-nav-icon" data-menu="#main-menu" href="#"><i class="ion-navicon"></i></a>
        </div>              
        <div class="right-area">
            <form class="src-form">
                <button type="submit"><i class="ion-search"></i></button>
                <input type="text" placeholder="Search here">
            </form><!-- src-form -->
        </div><!-- right-area -->            
        <ul class="main-menu" id="main-menu" style="padding-left:15%;">
            <li><router-link to="/">Home</router-link></li>
            <li class="drop-down"><router-link to="/">News<i class="ion-arrow-down-b"></i></router-link>
                <ul class="drop-down-menu drop-down-inner">
                    <li><router-link to="/navernews">Naver News</router-link></li>
                    <li><router-link to="/inews">I News</router-link></li>
                    <li><router-link to="/iwnews">Itword News</router-link></li>
                </ul>
            </li>
            <!-- <li><a href="#">Travel</a></li>
            <li><a href="#">Beauty</a></li>
            <li><a href="#">Music</a></li>
            <li><a href="#">Art</a></li> -->
            <li><router-link to="/boardlist">Board</router-link></li>
            <template v-if="this.$store.state.token == 'login'">
            <li><a @click="logout">Logout</a></li>
            </template>
            <template v-else>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/signup">SignUp</router-link></li>
            </template>
        </ul>            
        <div class="clearfix"></div>
    </header>        
</template>

<script>
// import http from "../http-common"
export default {
    name:"headnav",
    methods: {
        getinews(){
            this.$router.push("/inews");
        },

        logout(){
            this.$store.commit("logout");
            // this.$router.push("/");
        }
    }
}
</script>

<style>
a {
    cursor: pointer;
}
</style>