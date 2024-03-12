export default [
  {
    component: 'h4',
    children: 'Welcome Back !',
    class: 'font-weight-bold txtDark welcome'
  },
  {
    component: 'p',
    children: 'Please Login to access your account.',
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
    label: 'Password',
    name: 'password',
    type: 'password',
    // value: '123456',
    value: '',
    placeholder: 'Your password',
    validation: 'bail|required',
    class: ['form-control formControl']
  },
  {
    type: 'submit',
    label: 'Login',
    class: 'btn btn-block btnControl py-3'
  },
  {
    component: 'div',
    class: 'd-flex justify-content-between remember-box',
    children: [
      {
        name: 'remember',
        type: 'checkbox',
        label: 'Remember me'
      },
      {
        component: 'a',
        children: 'Forgot password?',
        href: 'forget-password',
        class: 'colorRed'
      }
    ]
  }
]
