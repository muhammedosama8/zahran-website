export default () => [
  {
    name: 'selectedFile',
    type: 'image',
    validation: 'bail|mime:image/jpeg,image/png,image/gif'
  },
  {
    component: 'div',
    class: 'row justify-content-between',
    children: [
      {
        component: 'div',
        class: 'col-md-6 pt-2',
        children: [
          {
            name: 'merchandiser_en',
            type: 'text',
            label: 'Merchandiser Name (EN)',
            // placeholder: 'Merchandiser Name (EN)',
            validation: 'bail|required|notNumeric',
            class: ['form-control mb-1']
          }
        ]
      },
      {
        component: 'div',
        class: 'col-md-6 pt-2',
        children: [
          {
            name: 'merchandiser_ar',
            type: 'text',
            label: 'Merchandiser Name (AR)',
            // placeholder: 'Merchandiser Name (AR)',
            validation: 'bail|notNumeric',
            class: ['form-control mb-1']
          }
        ]
      }
    ]
  },
  {
    component: 'div',
    class: 'row justify-content-between',
    children: [
      {
        component: 'div',
        class: 'col-md-6 pt-2',
        children: [
          {
            name: 'email',
            type: 'email',
            label: 'E-mail',
            // placeholder: 'E-mail',
            validation: 'bail|required|email|notNumeric',
            class: ['form-control mb-1']
          }
        ]
      },
      {
        component: 'div',
        class: 'col-md-6 pt-2',
        children: [
          {
            name: 'phone',
            type: 'text',
            label: 'Phone Number',
            // placeholder: 'Phone Number',
            validation: 'bail|number',
            class: ['form-control  mb-1']
          }
        ]
      }
    ]
  }
]
