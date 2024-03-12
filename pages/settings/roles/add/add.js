import { permissions } from '~/data/permissions'
export default {
  name: 'AddNewRole',
  data() {
    return {
      chosenPermissions: [],
      addNewRoleValue: {},
      validation: {},
      permissions
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    if (process.environment === 'production') {
      window.onbeforeunload = () => 1
    }
  },
  methods: {
    addRole() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }

      this.$toast.show('Creating the Role...')
      const role = {
        name: {
          en: this.addNewRoleValue.name_en,
          ar: this.addNewRoleValue.name_ar
        },
        status: Boolean(this.addNewRoleValue.status),
        permissions: this.chosenPermissions
      }

      this.$axios
        .$post('setting-module-api/role', role)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/settings/roles')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Add New Role',
        parent: { title: 'Users Roles' }
      })
    }
  }
}
