import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
// import jpLocale from 'element-ui/lib/locale/lang/jp'
const lang = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
  // jp: {
  //  ...jpLocale,
  // },
}

const model = [
  'Alerts',
  'Base',
  'components',
  'Clients',
  'Topics',
  'General',
  'Overview',
  'Plugins',
  'RuleEngine',
  'Tools',
  'Schemas',
  'Settings',
  'Backup',
  'Subs',
  'Analysis',
  'Modules',
]
model.forEach((key) => {
  // eslint-disable-next-line
  const value = require(`./${key}`).default

  Object.keys(value).forEach((k) => {
    const { en, zh } = value[k]
    lang.en[key] = lang.en[key] || {}
    lang.zh[key] = lang.zh[key] || {}
    lang.jp[key] = lang.jp[key] || {}

    lang.en[key][k] = en
    lang.zh[key][k] = zh
    lang.jp[key][k] = zh
  })
})

export default lang
