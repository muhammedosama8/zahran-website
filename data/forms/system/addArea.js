export default [
  {
    name: 'area_en',
    type: 'text',
    label: 'Area Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'area_ar',
    type: 'text',
    label: 'Area Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
