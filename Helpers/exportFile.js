// export default function exportFile(data) {
//   this.$axios
//     .$get(data.url, {
//       params: data.params,
//       responseType: 'blob'
//     })
//     .then((response) => {
//       const url = window.URL.createObjectURL(new Blob([response]))
//       const link = document.createElement('a')
//       link.href = url
//       link.setAttribute('download', data.downloadedFileName)
//       document.body.appendChild(link)
//       link.click()
//     })
// }
