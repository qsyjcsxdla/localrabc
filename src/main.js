import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import NormalizeCss from 'normalize.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);


new Vue({
	el: '#app',
  router,
  store,
	render: h => h(App)
})

