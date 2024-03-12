export default [
  {
    component: 'h4',
    children: 'Forgot password',
    class: 'font-weight-bold txtDark welcome'
  },
  {
    component: 'p',
    children: 'Please enter your email to recover your account.',
    class: 'txtDark pb-3'
  },
  {
    label: 'Email',
    name: 'email',
    // value: 'admin@shallhoob.com',
    value: '',
    placeholder: 'Email Address',
    validation: 'bail|required|email',
    class: ['form-control formControl']
  },
  {
    type: 'submit',
    label: 'Submit',
    class: 'btn btn-block btnControl py-3'
  }
]
