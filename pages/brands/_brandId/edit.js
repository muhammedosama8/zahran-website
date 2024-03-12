export default {
  name: 'EditBrand',
  async fetch() {
    const { data: brand } = await this.$axios.$get(
      'brand-module-api/brand/' + this.$route.params.brandId
    )
    this.brand = brand
    this.brandFormValue.brand_en = brand.name.en
    this.brandFormValue.brand_ar = brand.name.ar
    this.brandFormValue.group_id = brand.group_id
    this.brandFormValue.status = Boolean(brand.status)
    await this.fetchGroups()
    
    this.brandFormValue.group = this.groupOptions.find(({ value }) =>
      brand.group_id === value
    )
    this.brandFormValue.selectedFile = [{ url: brand.media.path }]
  },
  data() {
    return {
      brand: {},
      brandFormValue: {},
      groups: []
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
        title: `Edit Brand`,
        parent: { title: 'Brands list' }
      })
    },
    updateBrand() {
      const brand = {
        media_id:
          this.brandFormValue?.selectedFile?.results?.[0]?.data?.id ||
          this.brand.media.id,
        name: {
          ar: this.brandFormValue.brand_ar,
          en: this.brandFormValue.brand_en
        },
        group_id: this.brandFormValue?.group?.value ,
        status: Boolean(this.brandFormValue.status)
      }
      this.$toast.show('Updating the Brand...')
      this.$axios
        .$put(`brand-module-api/brand/${this.$route.params.brandId}`, brand)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/brands')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
