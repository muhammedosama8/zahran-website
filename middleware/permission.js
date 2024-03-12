import { permissionsMapping } from '~/data/permissions'

export default function (context) {
  const routesCanBeAccessedByAllUsers = ['settings-profile']
  context.store.dispatch('permission/initAuth', context.req, { root: true })
  const userPermission = context.store.getters['permission/permissions']
  const routeName = context.route.name
  const routePremission = permissionsMapping[routeName]
  if (routeName != null && !routesCanBeAccessedByAllUsers.includes(routeName)) {
    if (Array.isArray(routePremission)) {
      const permissionIsExists = routePremission.some((permission) =>
        userPermission.includes(permission)
      )
      if (permissionIsExists === false) {
        return context.redirect(301, '/error?e=403')
      }
    } else if (!userPermission.includes(routePremission)) {
      return context.redirect(301, '/error?e=403')
    }
  }
}
