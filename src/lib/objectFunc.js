/**
 * 讓 object 有類似 array 的方法
 * https://vanillajstoolkit.com/polyfills/objectforeach/
 */

const objectFunc = {
  $forEach: {
    inject: true,
    func (callback, thisArg) {
      thisArg = thisArg || window

      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          callback.call(thisArg, this[key], key, this)
        }
      }

      return this
    } 
  },
  $map: {
    inject: true,
    func (callback, thisArg) {
      thisArg = thisArg || window

      let resObj = new this.constructor()
      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          resObj[key] = callback.call(thisArg, this[key], key, this)
        }
      }
      return resObj
    } 
  },
  $filter: {
    inject: true,
    func (callback, thisArg) {
      thisArg = thisArg || window

      let resObj = new this.constructor()
      for (let key in this) {
        if (this.hasOwnProperty(key) && callback.call(thisArg, this[key], key, this)) {
          resObj[key] = this[key]
        }
      }
      return resObj
    } 
  },
  $some: {
    inject: true,
    func (callback, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key) && callback.call(thisArg, this[key], key, this)) {
          return true
        }
      }
      return false
    } 
  },
  $every: {
    inject: true,
    func (callback, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key) && !callback.call(thisArg, this[key], key, this)) {
          return false
        }
      }
      return true
    } 
  },
  $reduce: {
    inject: true,
    func (callback, temp, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          temp = callback.call(thisArg, temp, this[key], key)
        }
      }
      return temp
    } 
  },
  $findIndex: {
    inject: true,
    func (callback, thisArg) {
      thisArg = thisArg || window
      for (let key in this) {
        if (this.hasOwnProperty(key) && callback.call(thisArg, this[key], key)) {
          if (!Number.isNaN(parseInt(key))) {
            return parseInt(key)
          } else {
            return key
          }
        }
      }
      return -1
    }
  },
  $toArray: {
    injext: true,
    func () {
      thisArg = thisArg || window
      const temp = []
      for (let key in this) {
        if (this.hasOwnProperty(key)) {
          if (!Number.isNaN(parseInt(key))) {
            temp[key] = this[key]
          } else {
            temp.push(this[key])
          }
        }
      }
      return temp
    }
  }
}

export default objectFunc
