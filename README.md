# smart-vue-i18n
易用、简单、轻量、实用的vue国际化插件，压缩后不到2kb



## 前言

> 目前有比较成熟的方案（vue-i18n）了解了下，并且实用了一下感觉对于我在使用的项目来说略显臃肿,功能比较多，所以压缩的会比较大，在移动端不太适合所以自己花一天时间撸了一个vue多语言插件，压缩后大小不超过2kb

## 使用方法

> 通过Vue.js公开方法install安装,参数 lang 为初始化默认语言,参数 messages 为初始语言库,也可以在组件中新增多语言,语言库格式参照其他开源的国际化项目

### 安装

github地址:  [smart-vue-i18n](https://github.com/xiejun-net/smart-vue-i18n)
```
yarn add smart-vue-i18n
```

### 初始化

``` 
// 插件方式引用
// messages 为语言库
import { messages } from '@/utils/i18n-message/open-account/apply/index.js'
import i18n from 'smart-vue-i18n'

Vue.use(i18n, {
    lang: 'zhCHT',
    messages
})
```

### 语言库格式

```
// 语言库格式
import { zhCHS } from './zh-chs'
import { zhCHT } from './zh-cht'

export const messages = {
    //简体中文
    zhCHS,
    //繁体中文
    zhCHT
}

// './zh-chs'
export const zhCHS = {
    personalInfo: '个人资料',
}

// './zh-cht'
export const zhCHT = {
    personalInfo: '個人資料',
}
```


### 组件内使用

> 直接在组件内定义i18n多语言源 然后可以在页面使用切换语言可以不用刷新页面 方法 `this.$i18n.setLang('zhCHS')`组件内js使用 `this.$t('personalInfo')`组件内html使用 `$t('personalInfo')`

```
<template lang="pug">
yx-container.apply-home
    .apply-main(slot="main")
        .personalInfo {{$t('personalInfo')}}
        .apply-main-add-credit(@click="testHandler") {{$t('test.a')}}
</template>

<script>
export default {
    i18n: {
        zhCHS: {
            test: {
                a: '简体'
            }
        },
        zhCHT: {
            test: {
                a: '简体'
            }
        }
    },
    methods: {
        testHandler() {
            this.$i18n.setLang(this.$i18n.lang === 'zhCHS' ? 'zhCHT' : 'zhCHS')
            console.log(this, this.$i18n.lang)
        }
    }
}
</script>
```
## 原理解析

核心代码
```
const _vm = new Vue({
    data: options
})
Object.defineProperty(Vue.prototype.$i18n, 'lang', {
    get() {
        return _vm.lang
    }
})
```
将多语言挂载到vue原型上
然后 `Object.defineProperty` 监听`Vue.prototype.$i18n`变化
通过`new Vue()` 创建实例来实现语言切换实时渲染，可以不需要刷新页面

## 其他

时间仓促，一些常用的功能暂时没有，后续加上

欢迎使用并提出意见
