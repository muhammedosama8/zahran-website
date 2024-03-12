export default [
  {
    name: 'city_en',
    type: 'text',
    label: 'City Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'city_ar',
    type: 'text',
    label: 'City Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
