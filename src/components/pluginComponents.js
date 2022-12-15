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
  NSelect
} from "naive-ui"

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
    NSelect
  ],
})

import TModal from "./TModal.vue"
import TButton from "./TButton.vue"
import TTable from "./TTable.vue"
import TFilter from "./TFilter.vue"

const pluginComponents = {
  install(app) {
    app.use(naive)
    app.component("TModal", TModal)
    app.component("TButton", TButton)
    app.component("TTable", TTable)
    app.component("TFilter", TFilter)
  },
}

export default pluginComponents
