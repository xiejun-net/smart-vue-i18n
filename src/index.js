import {deepAssign, get} from './utils'

const install = (Vue, options) => {
    const proto = Vue.prototype
    proto.$i18n = proto.$i18n || {}
    // 初始化多语言
    deepAssign(proto.$i18n, options)

    const _vm = new Vue({
        data: options
    })
    Object.defineProperty(Vue.prototype.$i18n, 'lang', {
        get() {
            return _vm.lang
        }
    })
    proto.$t = (path, ...args) => {
        let messages = _vm.messages[_vm.lang]
        if (!proto.$i18n.messages) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('[yxI18n] Locale not correctly registered')
            }
            return () => path
        }
        const message = get(messages, path) || get(messages, path)
        return typeof message === 'function'
            ? message(...args)
            : message || path
    }
    proto.$i18n.add = (messages = {}) => {
        deepAssign(proto.$i18n.messages, messages)
    }
    proto.$i18n.setLang = lang => {
        _vm.lang = lang
    }
    Vue.mixin({
        beforeCreate() {
            this.$options.i18n && this.$i18n.add(this.$options.i18n)
        }
    })
}

export default {
    install
}
