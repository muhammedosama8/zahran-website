import { permissions } from '~/data/permissions'
export default {
  name: 'EditRole',
  async fetch() {
    const { data: role } = await this.$axios.$get(
      `setting-module-api/role/${this.$route.params.roleId}`
    )
    this.updateRoleValue.name_en = role.name.en
    this.updateRoleValue.name_ar = role.name.ar
    this.updateRoleValue.status = role.status
    this.chosenPermissions = role.permissions
  },
  data() {
    return {
      chosenPermissions: [],
      updateRoleValue: {},
      validation: {},
      permissions
    }
  },
  activated() {
    this.$fetch()
    this.setBreadcrumb()
  },
  mounted() {
    if (process.environment === 'production') {
      window.onbeforeunload = () => 1
    }
  },
  methods: {
    updateRole() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }

      this.$toast.show('Updating the Role...')
      const role = {
        name: {
          en: this.updateRoleValue.name_en,
          ar: this.updateRoleValue.name_ar
        },
        status: Boolean(this.updateRoleValue.status),
        permissions: this.chosenPermissions
      }

      this.$axios
        .$put(`setting-module-api/role/${this.$route.params.roleId}`, role)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/settings/roles')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Edit Role',
        parent: { title: 'Users Roles' }
      })
    }
  }
}
