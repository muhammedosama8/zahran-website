export default [
  {
    name: 'displayType_en',
    type: 'text',
    label: 'Display Type Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'displayType_ar',
    type: 'text',
    label: 'Display Type Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
