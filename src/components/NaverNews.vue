<template>
    <div class="col-sm-12 col-sm-12 col-md-9 col-lg-8 mb-30 swiper-area color-white" style="padding-top:2%;">                            
        <!-- SETTING IMAGE WITH bg-6 -->
        <h4 class="mb-30 mt-20 clearfix color-black"><b>IT News</b></h4> 
        <div class="bg-17 bg-layer-4 p-40 pos-relative z-1 oflow-hidden pr-0">
            <div >
                <h5 class="color-grey"><b>IT</b></h5>
                <h2 class="mtb-10"><a href="#">
                    <b>Naver News</b></a></h2>
            </div><!-- mx-w-200x -->                                    
            <div class="all-scroll pos-relative mt-50 mx-w-600x">
                <h5 class="mb-50"><b>List</b></h5>                                            
                <div class="swiper-scrollbar"></div>
                <div class="swiper-container oflow-visible" data-slide-effect="slide" data-autoheight="false" 
                    data-swiper-speed="3000" data-swiper-margin="25" data-swiper-slides-per-view="1"
                    data-swiper-breakpoints="true" data-scrollbar="true" data-swiper-loop="true"
                    data-swpr-responsive="[1, 2, 2, 2]">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" style="box-shadow: 5px 5px 5px 5px gray;margin-top:20px; border-radius:10px;" v-for="item in info" :key="item.index">
                            <div>
                                <img class="news_image" v-bind:style="{ 'backgroundImage' : 'url(' + item.img_url + ')' }">
                            </div>
                            <div class="plr-25 ptb-15" style="background-color:white;">
                                <h5 class="color-ash"><b v-text="item.company"></b></h5>
                                <h4 class="mtb-10 color-black">
                                    <a :href="item.url" target="_blank"><b class="color-black light-color" v-text="item.body_title"></b></a></h4>
                                <ul class="list-li-mr-10 color-lt-black">
                                    <li><i class="mr-5 font-12 ion-android-favorite-outline"></i>15</li>
                                    <li><i class="mr-5 font-12 ion-ios-chatbubble-outline"></i>105</li>
                                </ul>
                            </div><!-- plr-25 -->
                        </div>                                               
                    </div><!-- swiper-wrapper -->
                </div><!-- swiper-container -->                                            
            </div><!-- swiper-area -->                                    
        </div><!-- bg-4 -->
    </div><!-- col-lg-4 col-md-6 -->
</template>

<script>
import http from "../http-common"
export default {
    name : "navernews",
    data() {
        return {
            info : [],
            loading : true,
            errored : false
        }
    },

    methods : {
        getInfo(){
            this.loading = true;
            http
                .get("/naver")
                .then(response => {this.info = response.data;
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
        this.info = JSON.parse(this.$store.state.ninfo);
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', "./theme/plugin-frameworks/swiper.js")
        document.head.appendChild(recaptchaScript)
        let recaptchaScripta = document.createElement('script')
        recaptchaScripta.setAttribute('src', "./theme/common/scripts.js")
        document.head.appendChild(recaptchaScripta)
        // alert(this.info[3]);
    }
}
</script>
