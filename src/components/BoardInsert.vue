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
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-label>Board Insert</v-label>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="form.title"
              :rules="rules.title"
              color="purple darken-2"
              label="Title"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.content"
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
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          type="submit"
        >Register</v-btn>
      </v-card-actions>
    </v-form>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="purple"
            @click="terms = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="purple"
            @click="conditions = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</div>
</template>

<script>
import http2 from "../http-common2"
  export default {
    name:'boardinsert',
    data () {
      const defaultForm = Object.freeze({
        title:'',
        content:''
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          title: [val => (val || '').length > 0 || 'This field is required'],
        },
        snackbar: false,
        terms: false,
        defaultForm,
        user_id: ""
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
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
        this.$router.push("/boardlist");
      },
      submit () {
        this.snackbar = true
        http2
                .post("/board/insert",{
                  user_id : this.user_id,
                  title : this.form.title,
                  content : this.form.content
                })
                .then(() => {
                    this.$router.push("/boardlist");
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
      },
    },

    mounted() {
      this.user_id = this.$store.state.user_id;
    }
  }
</script>