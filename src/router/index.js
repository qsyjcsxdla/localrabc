import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/config/menu.js'

import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

var routes = []

//静态路由
routes.push({name:'', path:'/', component:Home});
routes.push({name:'login', path:'/login', component:Login});
routes.push({name:'home', path:'/home', component:Home});

//动态路由
Menu.forEach(item => {
  item.sub.forEach(sub => {
    routes.push({
      path: sub.path,
      name: sub.name,
      // eslint-disable-next-line no-template-curly-in-string
      component: () => import('@/pages'+sub.path+'/index')
    })
  })
})


export default new Router({
  // mode: 'history',   必须有服务端支撑
  routes
})
