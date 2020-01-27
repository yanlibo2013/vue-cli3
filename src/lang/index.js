import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
// import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'

//cdn 方式
// Vue.locale('en', ELEMENT.lang.en)
// Vue.locale('zh-cn', ELEMENT.lang.zhCN)

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...ELEMENT.lang.en
  },
  zh: {
    ...zhLocale,
    ...ELEMENT.lang.zhCN
  },
  es: {
    ...esLocale,
    ...ELEMENT.lang.es
  }
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages,
  silentTranslationWarn: true
})

export default i18n
