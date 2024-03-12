import { Model } from '@vuex-orm/core'
import Product from '~/store/models/Product'

export default class Brand extends Model {
  static entity = 'brands'
  static allEndPoint = 'brand-module-api/brand?'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      nameAr: this.string(''),
      nameEn: this.string(''),
      mediaId: this.number(null),
      ProductsCount: this.number(0),
      mediaPath: this.string(''),
      selected: this.boolean(false),
      status: this.boolean(false),
      chainId: this.number(null).nullable(),
      products: this.hasMany(Product, 'brand_id')
    }
  }

  static filterBackendData(response) {
    return response.data.data.map((brand) => {
      return {
        id: brand.id,
        nameAr: brand.name.ar,
        nameEn: brand.name.en,
        mediaId: brand.media.id,
        mediaPath: brand.media.path,
        ProductsCount: brand.products_count,
        status: Boolean(brand.status),
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

  static async fetch(Objfilter) {
    const config = {
      dataTransformer: this.filterBackendData,
      params: {
        pagination: 0
      }
    }
    Objfilter = Objfilter || ''
    const url = Objfilter
      ? this.allEndPoint +
        '&' +
        Object.keys(Objfilter)[0] +
        '=' +
        Objfilter[Object.keys(Objfilter)[0]]
      : this.allEndPoint
    await this.api().get(url, config)
  }
}
