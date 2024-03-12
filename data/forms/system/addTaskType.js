export default [
  {
    name: 'taskType_en',
    type: 'text',
    label: 'Task Type Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'taskType_ar',
    type: 'text',
    label: 'Task Type Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
