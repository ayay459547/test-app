<template>
  <n-modal 
    v-model:show="tempShowModal"
    class="custom-card" 
    transform-origin="center"
    preset="card"
    :style="showStyle" 
    :title="title" 
    size="huge"
    :mask-closable="maskClosable"
    :bordered="false" 
    :segmented="segmented"
  >
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <div class="nodal-footer">
          <n-button @click="cancel">取消</n-button>
          <n-button type="success" @click="submit">確認</n-button>
        </div>
      </slot>
    </template>
  </n-modal>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { NModal } from 'naive-ui'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 600
  },
  modalStyle: {
    type: Object,
    default() {
      return {}
    }
  },
  maskClosable: {
    type: Boolean,
    default: false
  },
  segmented: {
    type: Object,
    default() {
      return {
        content: "soft",
        footer: "soft"
      }
    }
  }
})
const showStyle = computed(() => {
  return {
    width: `${props.width}px`,
    ...props.modalStyle
  }
})

const emit = defineEmits(['update:showModal', 'submit', 'cancel'])

const tempShowModal = computed({
  get: () => props.showModal,
  set: value => emit('update:showModal', value)
})

const cancel = () => {
  tempShowModal.value = false
  emit('cancel')
}

const submit = () => {
  tempShowModal.value = false
  emit('submit')
}

</script>

<style lang="scss" scoped>
.nodal {
  &-footer {
    display: flex;
    justify-content: end;
    gap: 8px;
  }
}
</style>
