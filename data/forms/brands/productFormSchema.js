export default () => {
  return [
    {
      // label: 'product picture',
      name: 'selectedFile',
      type: 'image',
      validation: 'bail|mime:image/jpeg,image/png,image/gif'
    },
    {
      name: 'type_en',
      type: 'text',
      label: 'Name (EN)',
      validation: 'bail|required|notNumeric',
      class: ['form-control mb-2'],
      validationName: 'Product Name'
    },
    {
      name: 'type_ar',
      type: 'text',
      label: 'Name (AR)',
      class: ['form-control']
    },
    {
      name: 'sku',
      type: 'text',
      // placeholder: 'Oracle SKU',
      validation: 'bail|required|number|min:1',
      label: 'Oracle SKU',
      class: ['form-control mb-2']
    },
    {
      name: 'barcode',
      type: 'text',
      label: 'International Barcode',
      validation: 'bail|number|min:1|optional',
      class: ['form-control mb-2']
    },
    /*    {
      name: 'description',
      type: 'text',
      placeholder: 'Description',
      validation: 'bail|required',
      class: ['form-control']
    }, */
    {
      name: 'price',
      type: 'text',
      label: 'Invoice Price',
      // placeholder: 'Invoice Price',
      validation: 'bail|number|min:1|optional',
      class: ['form-control mb-2']
    },
    {
      name: 'shelfPrice',
      type: 'text',
      label: 'Shelf Price',
      validation: 'bail|number|min:1|optional',
      class: ['form-control mb-2']
    },
    /*  {
      name: 'gender',
      type: 'dataDropdown',
      label: 'Targeted Gender',
      validation: 'bail|required',
      class: ['form-control'],
      options: [
        { value: 'm', label: 'Male' },
        { value: 'f', label: 'Female' }
      ]
    }, */
    {
      name: 'status',
      customLabel: 'Status',
      customHelp: 'activate or deactivete this Product',
      type: 'switchInput',
      class: 'my-3',
      value: true
    }
  ]
}
