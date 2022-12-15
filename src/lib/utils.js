export const isFalsy = (value) => (value === 0 ? false : !value)

export const cleanOjbect = (object) => {
  const result = { ...object }

  Object.keys(result).forEach((key) => {
    const value = result[key]

    if (isFalsy(value)) {
      delete result[key]
    }
  })

  return result
}

function defaultSetFun(obj, key, value) {
  obj[key] = value
}

export const deepClone = (targetElement, origin, setFun) => {
  let toStr = Object.prototype.toString
  let target = targetElement || {}
  if (!setFun) {
    setFun = defaultSetFun
  }

  for (let prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      switch (toStr.call(target[prop])) {
        case "[object Array]":
          // 如果 target 是 array
          switch (toStr.call(origin[prop])) {
            case "[object Array]":
              target[prop].push([])
              deepClone(target[prop], origin[prop])
              break
            case "[object Object]":
              target[prop].push({})
              deepClone(target[prop], origin[prop])
              break
            default:
              target[prop].push(origin[prop])
              // setFun(target, prop, origin[prop])
              break
          }
          break
        case "[object Object]":
          // 如果 target 是 object
          switch (toStr.call(origin[prop])) {
            case "[object Array]":
              target[prop] = []
              deepClone(target[prop], origin[prop])
              break
            case "[object Object]":
              target[prop] = {}
              deepClone(target[prop], origin[prop])
              break
            default:
              setFun(target, prop, origin[prop])
              break
          }
          break
        default:
          setFun(target, prop, origin[prop])
          break
      }
    }
  }
  return target
}

/**
 * 防抖函數
 * @param {Function} callback 回調函數
 * @param {Number} delay 延遲
 * @returns
 */
export const debounce = (callback, delay) => {
  // let now = null
  let timeoutId

  const scopeData = {}

  return new Proxy(() => {}, {
    // set (obj, key, value) {
    //   if (scopeData.hasOwnProperty(key)) {
    //     scopeData[key] = value
    //     return true
    //   }
    // },
    get(obj, key) {
      if (scopeData.hasOwnProperty(key)) {
        return scopeData[key]
      }
      return obj[key]
    },
    apply(obj, thisArg, params) {
      // now = +new Date()

      if (timeoutId) {
        clearInterval(timeoutId)
      }

      timeoutId = setTimeout(() => {
        callback.call(thisArg, ...params)
      }, delay)
    },
  })
}

/**
 * 節流函數
 * @param {Function} callback 回調函數
 * @param {Number} delay 延遲
 * @param {Object} options 選用設定
 *                 noLeading: 是否不執行第一次回調函數
 *                 noTrailing: 是否不執行setTimeout的回調函數
 * @returns {Object} 包含回調函數的Proxy
 */
 export const throttle = (callback, delay, options = {}) => {
  let now
  let timeoutId
  let lastTime

  const defaultOptions = {
    noLeading: false,
    noTrailing: false,
    ...options
  }
  let { noLeading } = defaultOptions
  const { noTrailing } = defaultOptions
  
  const scopeData = {
    clearLastTime () {
      lastTime = null
    }
  }

  return new Proxy(() => {}, {
    // set (obj, key, value) {
    //   if (scopeData.hasOwnProperty(key)) {
    //     scopeData[key] = value
    //     return true
    //   }
    // },
    get (obj, key) {
      if (scopeData.hasOwnProperty(key)) {
        return scopeData[key]
      }
      return obj[key]
    },
    apply (obj, thisArg, params) {
      now = +new Date()

      // 如果不是第一次執行 && 現在時間 < 上次執行時先 + 延遲時間
      if (lastTime && now < lastTime + delay) {
        if (noTrailing) return

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          lastTime = now
          callback.call(thisArg, ...params)
        }, delay)
      } else {
        if (noLeading) { 
          noLeading = false
        } else {
          lastTime = now
          callback.call(thisArg, ...params)
        }
      }
    }
  })
}
