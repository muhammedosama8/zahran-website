export default {
  name: 'AddNewProduct',
  data() {
    return {
      productFormValue: {},
      brands: [],
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
        title: `Add Product`,
        parent: { title: 'Products list' }
      })
    },
    addNewProduct() {
      const product = {
        media_id: this.productFormValue?.selectedFile?.results?.[0]?.data?.id,
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
      this.$toast.show('Creating the Product...')
      this.$axios
        .$post('brand-module-api/product', product)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/products')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
