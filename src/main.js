// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/elementui.scss'
import '@/assets/style/index.scss'
import '@/utils/importSVG'

import Vue from 'vue'
import authPlugin from '@what-a-faka/vue-authplugin'
import Txcel from '@what-a-faka/txcel'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import EffectForm from '@/components/EffectForm'
import Dialog from '@/components/dialog'
import { USER_INFO } from './config'
import App from './App.vue'
import routers from './routers'
import stores from './stores'
import plugins from './plugins'

Vue.directive('enterNumber', {
  inserted: function(el) {
    el.addEventListener('keypress', function(e) {
      const ees = e || window.event
      let charcode =
        typeof ees.charCode === 'number' ? ees.charCode : ees.keyCode
      let re = /\d/
      if (
        !re.test(String.fromCharCode(charcode)) &&
        charcode > 9 &&
        !ees.ctrlKey
      ) {
        if (ees.preventDefault) {
          ees.preventDefault()
        } else {
          ees.returnValue = false
        }
      }
    })
  },
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Txcel)
Vue.use(plugins)
Vue.use(EffectForm)
sync(stores, routers)

function getAuthCode() {
  let info = localStorage.getItem(USER_INFO)
  if (!info) {
    return []
  }
  info = JSON.parse(info)
  return info.perms || []
}
Vue.use(authPlugin, {
  authCode: getAuthCode(),
})
Vue.use(Dialog)

new Vue({
  router: routers,
  store: stores,
  render: (h) => h(App),
}).$mount('#app')
