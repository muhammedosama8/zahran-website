export default [
  {
    component: 'h4',
    children: 'Reset password',
    class: 'font-weight-bold txtDark welcome'
  },
  {
    component: 'p',
    children: 'Please enter your code to recover your account.',
    class: 'txtDark pb-3'
  },
  {
    label: 'Code',
    name: 'code',
    value: '',
    placeholder: 'Code',
    validation: 'bail|required',
    class: ['form-control formControl']
  },
  {
    label: 'New Password',
    name: 'password',
    type: 'password',
    value: '',
    placeholder: 'New Password',
    validation: 'bail|required',
    class: ['form-control formControl']
  },
  {
    label: 'Password Confirmation',
    name: 'password_confirmation',
    type: 'password',
    value: '',
    placeholder: 'Password Confirmation',
    validation: 'bail|required',
    class: ['form-control formControl']
  },
  {
    type: 'submit',
    label: 'Submit',
    class: 'btn btn-block btnControl py-3'
  }
]
