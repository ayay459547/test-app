import { getCurrentInstance, createVNode, render } from 'vue'
import Loading from '@/components/Loading.vue'
import objectFunc from './objectFunc.js'

// v-loading
const vnode = createVNode(Loading)

function formatterClass(el, binding) {
  const classStr = el.getAttribute('class')
  const targetClass = classStr.indexOf('loading-parent')
  if(binding.value) {
    if(targetClass === -1) {
      el.setAttribute('class', classStr + ' loading-parent')
    }
  } else if(targetClass > -1) {
    const classArray = classStr?.split('')
    classArray.splice(targetClass - 1, targetClass + 15)
    el.setAttribute('class', classArray?.join(''))
  }
}

// directive
export const vLoading = {
  mounted(el, binding) {
    render(vnode, el)
  },
  updated(el, binding) {
    if (binding.value) {
      vnode?.component?.exposed.show()
    } else {
      vnode?.component?.exposed.hide()
    }

    formatterClass(el, binding)
  },
  unmounted() {
    vnode?.component?.exposed.hide()
  },
}

/**
 * 可用全局props
 * $axios
 * $qs
 */
 export const getGlobalProperties = (props) => {
  const instance = getCurrentInstance()
  const globalProperties = instance.appContext.config.globalProperties
  
  if (globalProperties.hasOwnProperty(props)) {
    return globalProperties[props]
  } else {
    return 'empty'
  }
}

/**
 * 可讓Object全局使用類似Array方法
 */
for (let key in objectFunc) {
  if (objectFunc[key].inject && !Object.prototype[key]) {
    Object.defineProperty(Object.prototype, key, {
      get() {
        return objectFunc[key].func
      },
    })
  }
}
