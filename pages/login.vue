<template>
  <div class="d-md-flex d-block justify-content-around align-items-center" dir="rtl">
    <div class="w-100" dir="ltr">
      <div class="overflow-hidden px-lg-5" style="background-color: #f8f8fb">
        <div class="pt-0">
          <b-alert :show="error" variant="danger"
            >Error logging in with this credentials!
          </b-alert>

          <FormulateForm
            v-model="values"
            :schema="schema"
            class="newLogin"
            @submit="loginUser"
          />
        </div>
      </div>
    </div>
    <div class="w-100">
      <img src="~/assets/images/imgLogin.png" alt class="img-fluid imgLogin" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import LoginForm from '~/data/forms/login'
import Cookie from 'js-cookie'

export default {
  layout: 'auth',
  data() {
    return {
      values: {},
      schema: LoginForm,
      error: false
    }
  },
  methods: {
    loginUser() {
      this.$auth
        .loginWith('laravelJWT', {
          data: {
            email: this.values.email,
            password: this.values.password,
            remember :  this.values.remember
          }
        })
        .then((res) => {
          this.$auth.setUser(res.data)
          this.$store.commit('permission/setPermissions', this.$auth.user.data.permissions)
          localStorage.setItem('userPermissions', this.$auth.user.data.permissions)
          Cookie.set('userPermissions', this.$auth.user.data.permissions)
        })
        .catch(() => {
          this.error = true
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.imgLogin {
  width: 100%;
  height: 100vh;
  object-position: 100% 0;
  object-fit: cover;
  margin-left: -50px;
}

@media screen and (max-width: 1200px) and (min-width: 768px) {
  .imgLogin {
    width: 100%;
    height: 148vh;
    margin-left: -50px;
    object-fit: cover;
  }
}

@media screen and (max-width: 760px) {
  .imgLogin {
    width: 100%;
    height: auto;
    margin-left: 0;
    object-fit: cover;
  }
}

.overflow-hidden .form-control {
  height: 56px;
  border-radius: 15px;
}
</style>
