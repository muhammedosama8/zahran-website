export default () => {
  return [
    /*  {
      name: 'subBrandAr',
      type: 'text',
      label: 'Sub-Brand Name (EN)',
      validation: 'bail|required',
      class: ['form-control']
    }, */
    {
      name: 'subBrandEn',
      type: 'text',
      label: 'Sub-Brand Name (EN)',
      validation: 'bail|required|notNumeric',
      class: ['form-control']
    },
    {
      name: 'subBrandAr',
      type: 'text',
      label: 'Sub-Brand Name (AR)',
      validation: 'notNumeric',
      class: ['form-control']
    },
    {
      name: 'gender',
      type: 'dataDropdown',
      label: 'Targeted Gender',
      validation: 'bail',
      class: ['form-control'],
      options: [
        { value: 'm', label: 'Men' },
        { value: 'f', label: 'Women' },
        { value: 'u', label: 'Unisex' }
      ]
    },
    {
      name: 'status',
      customLabel: 'Status',
      customHelp:
        'Decide to activate or deactivete this Brand, Please note that all Sub-brands & Products related to this brand will disabled also',
      type: 'switchInput',
      value: true
    }
  ]
}
