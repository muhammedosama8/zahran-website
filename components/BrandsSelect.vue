<template>
  <div class="d-flex">
    <b-card
      class="col-md-6"
      :title="`Selected brands (${
        currentBrands.filter(({ selected }) => selected).length
      })`"
    >
      <b-card-body class="p-0">
        <!-- Search -->
        <div class="col-12">
          <div class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><i class="fa fa-search fa-lg"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                v-model="brandsFilter"
                type="search"
                placeholder="Search for brands name"
                class="inputSearch"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <!-- End search -->

        <simplebar
          v-if="currentBrands.length"
          class="boxChain"
          style="max-height: 500px"
        >
          <b-list-group v-for="brand in currentFilteredBrands" :key="brand.id">
            <b-list-group-item
              :class="{ 'active-brand': brand.selected }"
              class="d-flex align-items-center"
            >
              <b-form-checkbox
                v-model="brand.selected"
                @change="showBrandProduct(brand)"
              />
              <b-button
                variant="none"
                class="w-100 d-flex align-items-center"
                @click="showBrandProduct(brand)"
              >
                <b-avatar
                  variant="info"
                  :src="brand.image"
                  class="mr-3 selectBrand imgBrand"
                ></b-avatar>
                <span class="mr-auto pt-3 cursor-pointer text-left">
                  <p class="mb-0 font-weight-bold">{{ brand.name }}</p>
                  <p class="text-muted">Products ({{ brand.ProductsCount }})</p>
                </span>
                <b-badge variant="none" class="cursor-pointer imgProducts"
                  ><img
                    src="~/assets/images/right.png"
                    class="img-fluid"
                    alt=""
                /></b-badge>
              </b-button>
            </b-list-group-item>
          </b-list-group>
        </simplebar>
        <div v-else class="h-50">
          <div
            class="d-flex justify-content-center align-items-center flex-column"
          >
            No Brands found
          </div>
        </div>
        <div v-if="brandsLoading" class="h-50">
          <div
            class="d-flex justify-content-center align-items-center flex-column"
          >
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
        </div>
      </b-card-body>
    </b-card>

    <b-card
      class="col-md-6 border-left"
      :title="`Selected Products (${
        currentProducts.filter(({ selected }) => selected).length
      })`"
    >
      <b-card-body class="h-50 p-0">
        <!-- Search -->
        <div class="col-12">
          <div class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><i class="fa fa-search fa-lg"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                v-model="productFilter"
                type="search"
                placeholder="Search for products name"
                class="inputSearch"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <b-form-checkbox
          v-model="selectAllProducts"
          class="ml-3 py-2 newCheck"
          @change="toggleSelectAllProducts()"
          >Select All products
        </b-form-checkbox>
        <!-- End search -->
        <div
          v-if="brandsLoading && !currentProducts.length"
          class="text-center"
        >
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
        <simplebar
          v-else-if="!brandsLoading && currentFilteredProducts.length"
          style="max-height: 500px"
        >
          <div class="product">
            <b-list-group>
              <b-list-group-item
                v-for="product in currentFilteredProducts"
                :key="product.id"
                class="d-flex align-items-center"
                :class="{ 'active-brand': product.selected }"
              >
                <b-button
                  variant="none"
                  class="w-100 d-flex align-items-center"
                  @click="toggleSelectProduct(product)"
                >
                  <b-avatar
                    variant="info"
                    :src="product.image"
                    class="mr-3 imgSubBrand"
                  ></b-avatar>
                  <span class="mr-auto">{{ product.name }}</span>
                  <b-form-checkbox
                    v-model="product.selected"
                    @change="toggleSelectProduct(product)"
                  />
                </b-button>
              </b-list-group-item>
            </b-list-group>
          </div>
        </simplebar>
        <div v-else class="h-50">
          <div
            class="d-flex justify-content-center align-items-center flex-column"
          >
            <InboxIcon size="25" />
            <h4>Select Brand to view products</h4>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable */
import {InboxIcon} from 'vue-feather-icons'
import Brand from '~/store/models/Brand'
//import SubBrand from '~/store/models/SubBrand'
import Product from '~/store/models/Product'

export default {
  name: 'BrandsSelect',
  components: {
    InboxIcon,
    simplebar: () => import('simplebar-vue')
  },
  props: {
    forceSelect: {
      type: Object,
      default: null
    },
    promotionFilter: {
      type: Boolean,
      default: false
    },
    chainId: {
      type: [Number, String],
      default: null
    },
    branchId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      selectAllProducts: false,
      subBrands: [],
      fetchedSubBrands: [],
      fetchedProducts: [],
      brandsLoading: false,
      brandsFilter: '',
      productFilter: '',
      allSelected: false
    }
  },
  computed: {
    currentFilteredBrands() {
      return this.brandsFilter ? this.currentBrands.filter(({name}) => name.toLowerCase().includes(this.brandsFilter)) : this.currentBrands
    },
    currentFilteredProducts() {
      return this.productFilter ? this.currentProducts.filter(({name, products}) => (name.toLowerCase().includes(this.productFilter))) : this.currentProducts
    },
    currentBrands() {
      let Q = Brand.query().orderBy('id', 'desc')
      if (this.forceSelect && this.chainId) {
        Q = Q.where('chainId', this.chainId)
      }
      return Q.get()
    },
    currentProducts() {
      return Product.query()
          .where(({brand_id}) => this.selectedBrandsIDs.includes(brand_id))
          .get()
    },
    selectedBrands() {
      return Brand.query().with('products').where('selected', true).get()
    },
    selectedBrandsIDs() {
      return this.selectedBrands.map((brand) => brand.id)
    }
  },
  watch: {
    forceSelect: {
      handler: 'forceUpdate',
      deep: true
    }
  },
  async mounted() {
    this.brandsLoading = true
    if (this.chainId) {
      await Brand.deleteAll()
      await Brand.fetch({'chain_id': this.chainId})
      await Brand.update({
        where: () => true,
        data: {chainId: this.chainId}
      })
    } else if (this.branchId) {
      await Brand.deleteAll()
      await Brand.fetch({'branch_ids': this.branchId})
      await Brand.update({
        where: () => true,
        data: {branchId: this.branchId,status:1}
      })
    } else {
      await Brand.fetch({'status': 1})
    }
    this.$emit('fetched')
    this.brandsLoading = false

    if (this.forceSelect) {
      await this.forceUpdate()
    }
  },
  updated() {
    if (this.currentFilteredProducts.length)
      this.selectAllProducts = this.currentFilteredProducts.every(product => product.selected === true)
  },
  methods: {
    async showBrandProduct(brand) {
      await Brand.update({id: brand.id, selected: !brand.selected})
      await this.populateBrand(brand.id)
      // if (this.promotionFilter)
      //   this.$emit('fetchPromotions')
    },
    async populateBrand(brandId) {
      const brand = Brand.query().find(brandId)
      if (brand && brand.selected) {
        await Product.fetchProducts(brand.id)
        //   this.fetchedProducts.push(brand.id)
        //   if (this.promotionFilter)
        //     this.$emit('fetchPromotions')
      }
    },
    toggleSelectProduct(product) {
      Product.update({id: product.id, selected: !product.selected})
    },
    async toggleSelectAllProducts() {
      this.selectAllProducts = !this.selectAllProducts
      await Product.update({
        where: () => true,
        data: {selected: this.selectAllProducts}
      })
    },
    getSelectedBrandsIDs() {
      const brands = Brand.query().where('selected', true).get()
      return brands.map(({id}) => id)
    },
    getSelectedProductsIDs() {
      const products = Product.query().where('selected', true).get()
      return products.map(({id}) => id)
    },
    async forceUpdate() {
      if (this.forceSelect.brand_ids && this.forceSelect.brand_ids.length) {
        const brandsIDs = [...this.forceSelect.brand_ids].map((e) => Number(e))
        await Brand.update({
          where: ({id}) => brandsIDs.includes(Number(id)),
          data: {selected: true}
        })
        for (const id of brandsIDs) {
          await this.populateBrand(id)
        }
        if (this.forceSelect.product_ids && this.forceSelect.product_ids.length) {
          const productsIDs = [...this.forceSelect.product_ids].map((e) =>
              Number(e)
          )
          await Product.update({
            where: ({id}) => productsIDs.includes(Number(id)),
            data: {selected: true}
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.active-brand {
  background: #e2e8fd !important;
}

.newCheck {
  font-size: 14px;
}
</style>
