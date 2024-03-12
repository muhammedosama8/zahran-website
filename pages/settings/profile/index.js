
export default {
  name: 'Profile',
  async fetch() {
    const { data } = await this.$axios.$get('user-module-api/user')
      this.user = data
  },
  data() {
    return {
      user: {},
      currentPassword: '',
      newPassword: '',
      confirmedPassword: '',
      showPasswordOld: false,
      showPassword: false,
      showCPassword: false,
      updateUserProfileFormValue: {}
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  methods: {
    updateProfile() {
      const profileData = {
        media_id:
          this.updateUserProfileFormValue?.selectedFile?.results?.[0]?.data
            ?.id || this.user.media.id
      }
      this.$axios
        .$put('user-module-api/user/change-Photo', profileData)
        .then((res) => {
          this.$auth.user.data.media_path = res.data.media.path
          this.$toast.success('successfully updated')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    changePassword() {
      const data = {
        current_password: this.currentPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.confirmedPassword
      }
      this.$axios
        .$post('user-module-api/user/change-password', data)
        .then(() => {
          this.$toast.success('the password changed successfully')
          this.$router.push('/')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Edit Profile`
      })
    }
  }
}
