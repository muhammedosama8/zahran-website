import { Model } from '@vuex-orm/core'
import Brand from '~/store/models/Brand'

export default class Product extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'products'
  static allEndPoint = 'brand-module-api/product?brand_ids='

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      nameAr: this.string(''),
      nameEn: this.string(''),
      mediaId: this.number(null),
      mediaPath: this.string(''),
      selected: this.boolean(false),
      brand_name: this.string(''),
      brand_id: this.number(null),
      brand: this.belongsTo(Brand, 'brand_id')
    }
  }

  static filterBackendData(response) {
    return response.data.data.map((product) => {
      return {
        id: product.id,
        nameAr: product.name.ar,
        nameEn: product.name.en,
        mediaId: product.media.id,
        mediaPath: product.media.path,
        brand_name: product.brand?.name,
        brand_id: product.brand?.id,
        selected: false
      }
    })
  }

  get name() {
    return this.nameEn
  }

  get image() {
    return this.mediaPath
  }

  static async fetchProducts(brandId) {
    const config = {
      dataTransformer: this.filterBackendData,
      params: {
        pagination: 0,
        status : 1
      }
    }
    await this.api().get(this.allEndPoint + brandId, config)
  }
}
