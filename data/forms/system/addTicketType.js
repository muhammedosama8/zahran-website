export default [
  {
    name: 'ticketType_en',
    type: 'text',
    label: 'Ticket Type Name (EN)',
    validation: 'bail|required|notNumeric',
    class: ['form-control']
  },
  {
    name: 'ticketType_ar',
    type: 'text',
    label: 'Ticket Type Name (AR)',
    validation: 'bail|notNumeric',
    class: ['form-control']
  }
]
