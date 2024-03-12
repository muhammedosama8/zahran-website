export default () => [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Name',
    validation: 'bail|required|notNumeric',
    class: ['form-control newFormControl2 mb-1']
  },
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    placeholder: 'E-mail',
    validation: 'bail|required|email|notNumeric',
    class: ['form-control newFormControl2 mb-1']
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    validation: 'bail|required|number',
    class: ['form-control newFormControl2 mb-1']
  }
]
