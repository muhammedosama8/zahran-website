export default [
  {
    name: 'group_en',
    type: 'text',
    label: 'Category Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'group_ar',
    type: 'text',
    label: 'Category Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
