export default () => {
  return {
    basicInfo: [
      // {
      //   name: 'selectedFile',
      //   type: 'image',
      //   validation: 'bail|mime:image/jpeg,image/png,image/gif'
      // },
      {
        component: 'div',
        class: 'row justify-content-between',
        children: [
          {
            component: 'div',
            class: 'col-md-6 pt-2',
            children: [
              {
                name: 'branch_en',
                type: 'text',
                label: 'Branch Name (EN)',
                // placeholder: 'Chain Name (AR)',
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
                name: 'branch_ar',
                type: 'text',
                label: 'Branch Name (AR)',
                // placeholder: 'Chain Name (AR)',
                validation: 'bail|notNumeric',
                class: ['form-control mb-1']
              }
            ]
          }
        ]
      }
    ],
    location: [
      {
        component: 'div',
        class: 'row newInputB',
        children: [
          {
            component: 'div',
            class: 'col-md-6',
            children: [
              {
                name: 'address_en',
                type: 'text',
                label: 'Branch address (EN)',
                // placeholder: 'Branch address (EN)',
                validation: 'bail|required|notNumeric',
                class: ['form-control mb-1']
              }
            ]
          },
          {
            component: 'div',
            class: 'col-md-6',
            children: [
              {
                name: 'address_ar',
                type: 'text',
                label: 'Branch address (AR)',
                // placeholder: 'Branch address (AR)',
                validation: 'bail|notNumeric',
                class: ['form-control mb-1']
              }
            ]
          }
        ]
      }
    ]
  }
}
