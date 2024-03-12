export default {
  name: 'AddNewBrand',
  data() {
    return {
      brandFormValue: {},
      groups: [],
      validation: {}
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
    this.fetchGroups()
  },
  computed: {
    groupOptions() {
      if (!this.groups.length) return []
      return this.groups.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    }
  },
  methods: {
    async fetchGroups() {
      try {
        const { data: groups } = await this.$axios.$get(
          'common-module-api/dropdown/group'
        )
        this.groups = groups
      } catch (e) {
        this.$toast.error('Error fetching groups')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Add Brand`,
        parent: { title: 'Brands list' }
      })
    },
    addNewBrand() {
      const brand = {
        media_id: this.brandFormValue?.selectedFile?.results?.[0]?.data?.id,
        name: {
          ar: this.brandFormValue.brand_ar,
          en: this.brandFormValue.brand_en
        },
        group_id: this.brandFormValue?.group?.map(({ value }) => value) || [],
        status: Boolean(this.brandFormValue.status)
      }
      this.$toast.show('Creating the Brand...')
      this.$axios
        .$post('brand-module-api/brand', brand)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/brands')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
