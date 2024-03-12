export default function (context) {
  context.$axios
    .$get(`roles/${context.$auth.user.data.role_id}/edit`)
    .then((res) => {
      if (
        !res.data.status ||
        res.data.user.role_changed == 1 ||
        !res.data.user.status
      ) {
        logout()
      }
    })
    .catch(() => {
      logout()
    })
}

function logout() {
  document.cookie.split(';').forEach(function (c) {
    if (c.includes('auth.')) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    }
  })
  location.reload()
}
