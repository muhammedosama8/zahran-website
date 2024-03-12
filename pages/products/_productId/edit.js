export default {
  name: 'EditProduct',
  async fetch() {
    const { data: product } = await this.$axios.$get(
      'brand-module-api/product/' + this.$route.params.productId
    )
    this.product = product
    this.productFormValue.product_en = product.name.en
    this.productFormValue.product_ar = product.name.ar
    this.productFormValue.status = Boolean(product.status)
    this.productFormValue.price = product.price
    this.productFormValue.module_num = product.module_num
    this.productFormValue.serial_num = product.serial_num
    this.productFormValue.barcode = product.barcode
    await this.fetchBrands()
    this.productFormValue.brand = this.brandOptions.find(
      ({ value }) => product.brand_id === value
    )
    this.productFormValue.selectedFile = [{ url: product.media.path }]
  },
  data() {
    return {
      product: {},
      productFormValue: {},
      brands: []
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
    this.fetchBrands()
  },
  computed: {
    brandOptions() {
      if (!this.brands.length) return []
      return this.brands.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    }
  },
  methods: {
    async fetchBrands() {
      try {
        const { data: brands } = await this.$axios.$get(
          'common-module-api/dropdown/brand'
        )
        this.brands = brands
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Edit Product`,
        parent: { title: 'Product list' }
      })
    },
    updateProduct() {
      const product = {
        media_id:
          this.productFormValue?.selectedFile?.results?.[0]?.data?.id ||
          this.product.media.id,
        name: {
          en: this.productFormValue.product_en
        },
        brand_id: this.productFormValue?.brand?.value,
        price: this.productFormValue.price,
        module_num: this.productFormValue.module_num,
        serial_num: this.productFormValue.serial_num,
        barcode: this.productFormValue.barcode,
        status: Boolean(this.productFormValue.status)
      }
      if (this.productFormValue.product_ar !== '')
        product.name.ar = this.productFormValue.product_ar
      this.$toast.show('Updating the Product...')
      this.$axios
        .$put(
          `brand-module-api/product/${this.$route.params.productId}`,
          product
        )
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/products')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
