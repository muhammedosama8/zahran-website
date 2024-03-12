export default () => {
  return [
    {
      name: 'selectedFile',
      type: 'image',
      validation: 'bail|mime:image/jpeg,image/png,image/gif'
    },
    {
      component: 'div',
      class: 'row',
      children: [
        {
          component: 'div',
          class: 'col-md-6',
          children: [
            {
              name: 'brand_en',
              type: 'text',
              label: 'Brand Name (EN)',
              // placeholder: 'Brand Name (EN)',
              validation: 'bail|notNumeric',
              class: ['form-control newFormControl2 mb-1'],
              validationName: 'Brand Name'
            }
          ]
        },
        {
          component: 'div',
          class: 'col-md-6',
          children: [
            {
              name: 'brand_ar',
              type: 'text',
              label: 'Brand Name (AR)',
              // placeholder: 'Brand Name (AR)',
              validation: 'bail|notNumeric',
              class: ['form-control newFormControl2 mb-1'],
              validationName: 'Brand Name'
            }
          ]
        }
      ]
    },
    {
      name: 'status',
      class: 'pt-2',
      customLabel: 'Status',
      customHelp:
        'Decide to activate or deactivete this Brand, Please note that all sub-Brands and products related to this Brand will disabled also',
      type: 'switchInput',
      value: true
    }
    /*  {
      component: 'div',
      class: 'd-flex justify-content-between remember-box',
      children: [
        {
          component: 'span',
          children: 'Cancel',
          class: 'btn btnCancel newBtn'
        },
        {
          type: 'submit',
          label: 'Save',
          class: 'btn btn-primary newBtn'
        }
      ]
    } */
  ]
}
