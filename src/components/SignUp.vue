<template>
<div class="col-sm-12 col-sm-12 col-md-9 col-lg-8 mb-30 swiper-area color-white" style="padding-top:2%;">
  <form>
    <v-text-field
      v-model="user_id"
      :counter="100"
      label="ID"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="PASSWORD"
      type="password"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      label="NAME"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="tel"
      label="TEL"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    

    <v-btn @click="submit">submit</v-btn>
    <span style="padding:5px;"></span>
    <v-btn @click="clear">clear</v-btn>
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
      name: '',
      user_id: '',
      password: '',
      tel: ''
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
            .post("/user/signup", {
                user_id: this.user_id,
                password: this.password,
                name: this.name,
                tel: this.tel
            })
            .then(() => {
                alert("회원가입 되었습니다.");
                this.$router.push("/");
            })
            .catch(() => {
                alert("회원정보를 확인하세요.");
            })

      },
      clear () {
        this.name = ''
        this.user_id = ''
        this.password = ''
        this.tel = ''
      },
      cancel () {
          this.$router.push("/");
      }
    }
  }
</script>