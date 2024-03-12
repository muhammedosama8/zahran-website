export default () => {
  return [
    {
      name: 'selectedFile',
      type: 'image',
      validation: 'bail|mime:image/jpeg,image/png,image/gif'
    },
    {
      component: 'div',
      class: 'row mb-3',
      children: [
        {
          component: 'div',
          class: 'col-md-6 pt-2',
          children: [
            {
              name: 'chain_en',
              type: 'text',
              label: 'Chain Name (EN)  *',
              // placeholder: 'Chain Name (EN)',
              validation: 'bail|required|notNumeric',
              validationName: 'Chain Name',
              class: ['form-control mb-1']
            }
          ]
        },
        {
          component: 'div',
          class: 'col-md-6 pt-2',
          children: [
            {
              name: 'chain_ar',
              type: 'text',
              label: 'Chain Name (AR)',
              // placeholder: 'Chain Name (AR)',
              validation: 'bail|notNumeric',
              validationName: 'Chain Name',
              class: ['form-control  mb-1']
            }
          ]
        }
      ]
    },
    {
      name: 'status',
      customLabel: 'Status',
      customHelp:
        'Decide to activate or deactivete this Chain, Please note that all Branches related to this Chain will disabled also',
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
