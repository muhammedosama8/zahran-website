import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import database from './database'

VuexORM.use(VuexORMAxios)
export const plugins = [VuexORM.install(database)]
