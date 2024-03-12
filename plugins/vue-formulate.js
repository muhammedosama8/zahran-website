import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import DataDropdown from '~/components/data-dropdown'
import SwitchInput from '~/components/switch-input'
import RecurringDaysSelect from '~/components/RecurringDaysSelect'

Vue.component('FormulateDataDropDown', DataDropdown)
Vue.component('FormulateSwitchInput', SwitchInput)
Vue.component('FormulateRecurringDaysSelect', RecurringDaysSelect)

export default ({ $axios }) => {
  Vue.use(VueFormulate, {
    classes: {
      wrapper: ['form-group'],
      errors: ['invalid-feedback']
    },
    rules: {
      notNumeric: ({ value }) => !/^\d+$/.test(value)
    },
    locales: {
      en: {
        notNumeric({ name }) {
          return `The ${name} can't be all numbers!.`
        }
      }
    },
    library: {
      dataDropdown: {
        classification: 'text',
        component: 'FormulateDataDropDown'
      },
      switchInput: {
        classification: 'text',
        component: 'FormulateSwitchInput'
      },
      dayInput: {
        classification: 'text',
        component: 'FormulateRecurringDaysSelect'
      }
    },
    uploader: $axios,
    uploadUrl: 'common-module-api/upload'
  })
}
