import { Database } from '@vuex-orm/core'

import Brand from '../models/Brand'
import Product from '../models/Product'

const database = new Database()
database.register(Brand)
database.register(Product)
export default database
