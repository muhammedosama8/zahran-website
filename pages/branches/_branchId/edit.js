export default {
  name: 'EditBranch',
  async fetch() {
    const { data: branch } = await this.$axios.$get(
      'chain-module-api/branch/' + this.$route.params.branchId
    )
    this.branch = branch
    this.branchFormValue.branch_en = branch.name.en
    this.branchFormValue.branch_ar = branch.name.ar
    this.branchFormValue.address_en = branch.address.en
    this.branchFormValue.address_ar = branch.address.ar
    this.branchFormValue.lat = branch.lat
    this.branchFormValue.lng = branch.lang
    this.branchFormValue.lat_txt = branch.lat
    this.branchFormValue.lang_txt = branch.lang
    this.branchFormValue.status = Boolean(branch.status)
    await this.fetchRegions()
    this.branchFormValue.region = {
      value: branch.region.id,
      label: branch.region?.name?.en
    }
    await this.fetchCities()
    await this.fetchBrands()

    this.branchFormValue.city = {
      value: branch.area.city.id,
      label: branch.area?.city?.name?.en
    }

    await this.fetchAreas({ value: branch.area.city.id })
    this.branchFormValue.area = {
      value: branch.area.id,
      label: branch.area?.name?.en
    }

    this.branchFormValue.brand = this.brandOptions.filter(({ value }) =>
      branch.brand_ids.includes(value)
    )
    await this.fetchProducts(this.branchFormValue.brand)
    this.branchFormValue.product = this.productOptions.filter(({ value }) =>
      branch.product_ids.includes(value.id)
    )

    await this.fetchChains()
    this.branchFormValue.chain = this.chainOptions.find(
      ({ value }) => this.branch.chain_id === value
    )
  },
  data() {
    return {
      selectAllProducts: false,
      showMap: false,
      brand: {},
      branchFormValue: {},
      cities: [],
      areas: [],
      brands: [],
      products: [],
      chains: []
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
    this.fetchRegions()
  },
  computed: {
    regionOptions() {
      return this.regions.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    cityOptions() {
      if (!this.cities.length) return []
      return this.cities.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    areaOptions() {
      return this.areas.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    brandOptions() {
      return [
        // { value: '', label: 'Any Brand' },
        ...this.brands.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    productOptions() {
      return [
        // { value: '', label: 'Any Product' },
        ...this.products.map((product) => ({
          value: {
            id: product.id,
            brandId: product.brand_id,
            price: product.price
          },
          label: product.name.en
        }))
      ]
    },
    chainOptions() {
      if (!this.chains.length) return []
      return [
        // { value: '', label: 'Any Chain' },
        ...this.chains.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    selectAllProducts: {
      handler: 'selectAllProductsfun'
    }
  },
  methods: {
    selectAllProductsfun() {
      if (this.selectAllProducts) {
        this.branchFormValue.product = this.productOptions.filter(
          ({ value }) => value != ''
        )
      }
      // else this.branchFormValue.product = []
    },
    toggleSelectAllProducts() {
      this.selectAllProducts = !this.selectAllProducts
    },
    async fetchRegions() {
      try {
        const { data: regions } = await this.$axios.$get(
          'common-module-api/dropdown/region'
        )
        this.regions = regions
      } catch (e) {
        this.$toast.error('Error fetching regions')
      }
    },
    async fetchCities() {
      try {
        if (!this.branchFormValue.region && !this.branchFormValue.region.value)
          throw new Error('No Region selected')

        const regionsIds = this.branchFormValue.region.value
        const { data: cities } = await this.$axios.$get(
          'common-module-api/dropdown/city',
          {
            params: {
              region_ids: regionsIds
            }
          }
        )
        this.cities = cities
      } catch (e) {
        this.$toast.error('Error fetching cities')
      }
    },
    async fetchBrands() {
      try {
        const { data: cities } = await this.$axios.$get(
          'common-module-api/dropdown/brand'
        )
        this.brands = cities
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    fetchAreas(cityId) {
      if (!cityId && !cityId.value) throw new Error('No city selected')
      const params = cityId.value
      this.$axios
        .$get(`common-module-api/dropdown/area?city_id=${params}`)
        .then(({ data }) => {
          this.areas = data
        })
        .catch(() => {
          this.$toast.error('Error while fetching territory')
        })
    },
    async fetchProducts(brandId) {
      if (!brandId && !brandId.length) throw new Error('No Brand selected')
      const params = brandId.map((brand) => brand.value).join(',')
      try {
        const { data: products } = await this.$axios.$get(
          `common-module-api/dropdown/product?brand_ids=${params}`
        )
        this.products = products
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    async fetchChains() {
      try {
        const { data: chains } = await this.$axios.$get(
          'common-module-api/dropdown/chain'
        )
        this.chains = chains
      } catch (e) {
        this.$toast.error('Error fetching chains')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Edit Branch`,
        parent: { title: 'Branches list' }
      })
    },
    updateBranch() {
      const location = this.$refs.mapSelect.getLatLng()
      const branch = {
        name: {
          en: this.branchFormValue.branch_en,
          ar: this.branchFormValue.branch_ar
        },
        address: {
          en: this.branchFormValue.address_en,
          ar: this.branchFormValue.address_ar
        },
        area_id: this.branchFormValue?.area?.value,
        brands:
          this.branchFormValue?.product?.map(({ value }) => ({
            brand_id: value.brandId,
            product_id: value.id,
            price: value.price
          })) || [],
        status: Boolean(this.branchFormValue.status),
        lat: location.lat,
        lang: location.lng,
        chain_id: this.branchFormValue?.chain?.value
      }
      // if (this.branchFormValue.branch_ar !== '')
      //   branch.name.ar = this.branchFormValue.branch_ar
      // if (this.branchFormValue.address_ar !== '')
      //   branch.address.ar = this.branchFormValue.branch_ar
      this.$toast.show('Updating the Brand...')
      this.$axios
        .$put(`chain-module-api/branch/${this.$route.params.branchId}`, branch)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/branches')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
