import Vue from 'vue'
import Router from 'vue-router'
import chatAppContainer from '@/components/chatAppContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chatAppContainer',
      component: chatAppContainer
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
