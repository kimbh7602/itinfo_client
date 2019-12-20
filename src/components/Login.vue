<template>
<div class="col-sm-12 col-sm-12 col-md-9 col-lg-8 mb-30 swiper-area color-white" style="padding-top:2%;">
  <form>
    <v-text-field
      v-model="user_id"
      :counter="100"
      label="ID"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      label="PASSWORD"
      required
    ></v-text-field>
    
    
    <v-btn @click="submit">submit</v-btn>
    <span style="padding:5px;"></span>
    <v-btn @click="cancel">Cancel</v-btn>
  </form>
</div>
</template>

<script>
import http2 from "../http-common2";
//   import { validationMixin } from 'vuelidate'
//   import { required, maxLength, email     } from 'vuelidate/lib/validators'

  export default {
    // mixins: [validationMixin],

    // validations: {
    //   name: { required, maxLength: maxLength(10) },
    //   email: { required, email },
    //   select: { required },
    //   checkbox: { required }
    // },

    data: () => ({
      user_id: '',
      password: ''
    }),

    // computed: {
    //   checkboxErrors () {
    //     const errors = []
    //     if (!this.$v.checkbox.$dirty) return errors
    //     !this.$v.checkbox.required && errors.push('You must agree to continue!')
    //     return errors
    //   },
    //   selectErrors () {
    //     const errors = []
    //     if (!this.$v.select.$dirty) return errors
    //     !this.$v.select.required && errors.push('Item is required')
    //     return errors
    //   },
    //   nameErrors () {
    //     const errors = []
    //     if (!this.$v.name.$dirty) return errors
    //     !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
    //     !this.$v.name.required && errors.push('Name is required.')
    //     return errors
    //   },
    //   emailErrors () {
    //     const errors = []
    //     if (!this.$v.email.$dirty) return errors
    //     !this.$v.email.email && errors.push('Must be valid e-mail')
    //     !this.$v.email.required && errors.push('E-mail is required')
    //     return errors
    //   }
    // },

    methods: {
      submit () {
          http2
            .get("/user/login/"+this.user_id+"/"+this.password)
            .then(response => {
                if(response.data.status === "OK"){
                    this.$store.commit("loginToken", {
                        token: response.data.token,
                        user_id: response.data.user_id
                    });
                this.$router.push("/");
                }else{
                    alert("Check your ID and PASSWORD")
                }
            })

      },
      clear () {
        this.user_id = ''
        this.password = ''
      },
      cancel () {
          this.$router.push("/");
      }
    }
  }
</script>