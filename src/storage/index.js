/**
 * Storage 封装
 */

//整个存储的key
const STORAGE_KEY = 'mall'

export default {
  //保存整个存储
  setStorage(val) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  //获取整个存储
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },
  //保存某个值
  setItem(key, value, module_name) {
    if (module_name) {
      //如果 module_name 不为空，那么就保存对应模块下的值，例如 user 下的 userName
      let val = this.getItem(module_name) || {}
      val[key] = value
      this.setItem(module_name, val)
    } else {
      let val = this.getStorage()
      val[key] = value
      this.setStorage(val)
    }
  },
  //获取某个值
  getItem(key, module_name) {
    if (module_name) {
      //如果 module_name 不为空，那么就获取对应模块下的值，例如 user 下的 userName
      let module_val = this.getItem(module_name)
      return module_val ? module_val[key] : undefined
    } else {
      return this.getStorage()[key]
    }
  },
  //清空某个值
  clear(key, module_name) {
    let val = this.getStorage()
    if (module_name) {
      if (val[module_name]) delete val[module_name][key]
    } else {
      delete val[key]
    }
    this.setStorage(val)
  }
}