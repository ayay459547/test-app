import {
  // create naive ui
  create,
  // component
  NButton,
  NDrawer,
  NDrawerContent,
  NConfigProvider,
  NIcon,
  NCalendar,
  NInput,
  NDataTable,
  NPopover,
  NForm,
  NFormItem,
  NSelect,
  NDatePicker,
  NCheckbox,
  NSwitch,
  NAutoComplete,
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NDrawer,
    NDrawerContent,
    NConfigProvider,
    NIcon,
    NCalendar,
    NInput,
    NDataTable,
    NPopover,
    NForm,
    NFormItem,
    NSelect,
    NDatePicker,
    NCheckbox,
    NSwitch,
    NAutoComplete,
  ]
})

import TModal from './TModal.vue'
import TButton from './TButton.vue'
import TTable from './TTable.vue'
import TFilter from './TFilter.vue'
import FormTable from './FormTable.js'

import VGoogleMap from './VGoogleMap.vue'
import VChart from './VChart.vue'

import Draggable from 'vue3-draggable'

const pluginComponents = {
  install(app) {
    app.use(naive)
    app.component('Draggable', Draggable)

    app.component('FormTable', FormTable)

    app.component('TModal', TModal)
    app.component('TButton', TButton)
    app.component('TTable', TTable)
    app.component('TFilter', TFilter)
    app.component('VGoogleMap', VGoogleMap)
    app.component('VChart', VChart)
  },
}

export default pluginComponents
