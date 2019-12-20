<template>
    <!-- sidebar start -->                
        <div class="col-sm-12 col-md-2 col-lg-2 bg-2-white ptb-50 pl-30 pl-md-15" style="padding-right:30px;float:right;">
            <div class="row">
                <div class="col-md-12">
                    <div class="mx-w-md-400x mlr-md-auto">                                
                        <div class="mb-50">
                            <h5 class="mb-30"><b>Top 10 recruit</b></h5>                                        
                            <div class="mb-20" style="background-color:white;border-radius: 15px;" v-for="item in jinfo" :key="item.index">
                                <div style="width:100%;padding:10%;">
                                    <img :src="item.company_img" alt="">
                                    <h5 class="pt-5 color-ash"><b>{{item.company_name}}</b></h5>
                                    <hr style="background: rgba(255, 255, 255, .5);" />
                                    <h5 class="pt-5"><a :href="item.company_link" target="_blank"><b>{{item.desc}}</b></a></h5>
                                </div>
                            </div><!-- sided-80x -->                                        
                        </div><!-- mb-50 -->                                    
                    </div><!-- mx-w-400 -->
                </div><!-- col-sm-9 -->
            </div><!-- row -->
        </div><!-- col-sm-3 -->
        <!-- sidebar end -->
</template>

<script>
import http from "../http-common"
export default {
    name : "job",
    data() {
        return {
            jinfo : [],
            loading : true,
            errored : false
        }
    },

    methods : {
        getInfo(){
            this.loading = true;
            http
                .get("/job")
                .then(response => {this.jinfo = response.data;
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        }
    },

    mounted() {
        this.getInfo();
    }
}
</script>