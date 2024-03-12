export default [
  {
    name: 'region_en',
    type: 'text',
    label: 'Region Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'region_ar',
    type: 'text',
    label: 'Region Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
