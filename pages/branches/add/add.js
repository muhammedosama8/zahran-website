export default {
  name: 'AddNewBranch',
  data() {
    return {
      selectAllProducts: false,
      showMap: false,
      branchFormValue: {},
      productsValue: [],
      regions: [],
      cities: [],
      areas: [],
      brands: [],
      products: [],
      chains: [],
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
  // updated() {
  //   if (this.selectAllProducts)
  //     this.branchFormValue.product = this.products
  // },
  mounted() {
    this.fetchRegions()
    // this.fetchCities()
    // this.fetchBrands()
    this.fetchChains()
    if (this.$route.query.chainId && this.$route.query.chainName) {
      this.branchFormValue.chain = {
        value: parseInt(this.$route.query.chainId),
        label: this.$route.query.chainName
      }
    }
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
      return this.brands.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    productOptions() {
      return [
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
        this.productsValue = this.productOptions
        this.branchFormValue.product = this.productOptions.filter(
          ({ value }) => value.id !== ''
        )
      }
      // else
      //   this.branchFormValue.product = []
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
    async fetchBrands(chainId) {
      try {
        const params = {}
        params.create_branch = 'create_branch'
        params.chain_ids = chainId.value
        const config = { params }
        const { data: brands } = await this.$axios.$get(
          'common-module-api/dropdown/brand',
          config
        )
        this.brands = brands
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    fetchAreas(cityId) {
      if (!cityId && !cityId.value) throw new Error('No city selected')
      const params = cityId.value
      this.$axios
        .$get(`common-module-api/dropdown/area?city_ids=${params}`)
        .then(({ data }) => {
          this.areas = data
        })
        .catch(() => {
          this.$toast.error('Error while fetching territory')
        })
    },
    fetchProducts(brandId) {
      if (!brandId && !brandId.length) throw new Error('No Brand selected')
      const params = brandId.map((brand) => brand.value).join(',')
      this.$axios
        .$get(`common-module-api/dropdown/product?brand_ids=${params}`)
        .then(({ data }) => {
          this.products = data
        })
        .catch(() => {
          this.$toast.error('Error while fetching territory')
        })
    },
    async fetchChains() {
      try {
        const params = {}
        params.create_branch = 'create_branch'
        const config = { params }
        const { data: chains } = await this.$axios.$get(
          'common-module-api/dropdown/chain',
          config
        )
        this.chains = chains
      } catch (e) {
        this.$toast.error('Error fetching chains')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Add Branch`,
        parent: { title: 'Branch list' }
      })
    },
    addNewBranch() {
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
          this.branchFormValue?.product?.map((value) => ({
            brand_id: value.value.brandId,
            product_id: value.value.id,
            price: value.value.price
          })) || [],
        chain_id: this.branchFormValue?.chain?.value,
        status: Boolean(this.branchFormValue.status)
      }
      if (this.showMap) {
        branch.lat = this.$refs.mapSelect.getLatLng().lat
        branch.lang = this.$refs.mapSelect.getLatLng().lng
      } else {
        branch.lat = this.branchFormValue.lat_txt
        branch.lang = this.branchFormValue.lang_txt
      }

      // if (this.branchFormValue.branch_ar !== '')
      //   branch.name.ar = this.branchFormValue.branch_ar
      // if (this.branchFormValue.address_ar !== '')
      //   branch.address.ar = this.branchFormValue.address_ar
      this.$toast.show('Creating the Branch...')
      this.$axios
        .$post('chain-module-api/branch', branch)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/branches')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
