<template>
<div class="col-sm-12 col-sm-12 col-md-9 col-lg-8 mb-30 swiper-area color-white" style="padding-top:2%;">
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Registration successful!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-form ref="form">
      <v-container fluid>
        <v-label>Board View</v-label>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="form.title"
              :rules="rules.title"
              color="purple darken-2"
              label="Title"
              readonly
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.content"
              readonly
              color="teal"
            >
              <template v-slot:label>
                <div>
                  Content
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <template v-if="form.user_id == this.$store.state.user_id">
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          @click="boarddelete"
        >Delete</v-btn>
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          @click="modify"
        >Modify</v-btn>
        </template>
      </v-card-actions>
    </v-form>
  </v-card>
</div>
</template>

<script>
import http2 from "../http-common2"
  export default {
    props:['id'],
    name:'boardview',
    data () {
      const defaultForm = Object.freeze({
        title:'',
        content:'',
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          title: [val => (val || '').length > 0 || 'This field is required'],
        },
        snackbar: false,
        terms: false,
        defaultForm,
        user_id: "",
        check_id: ""
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.title &&
          this.form.content
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm);
        this.$refs.form.reset();
        this.$router.push("/boardlist");
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
      modify(){
         this.$router.push("/boardmodify/"+this.id);
      },
      boarddelete(){
          http2
            .delete("/board/delete/"+this.id)
            .then(() => {
                this.$router.push("/boardlist")
            })
            .catch(() => {
                    this.errored = true;
                })
            .finally(() => (this.loading = false));
      },
      getBoardView(){
          http2
                .get("/board/view/"+this.id)
                .then(response => {
                    this.form.title = response.data.title;
                    this.form.content = response.data.content;
                    this.form.user_id = response.data.user_id;
                    this.form.check_id = this.$store.state.user_id;
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
      }
    },

    mounted(){
        this.getBoardView();
    }
  }
</script>