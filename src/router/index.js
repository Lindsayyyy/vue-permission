import Vue from 'vue'
import Router from 'vue-router'
import { sessionSetStore } from '@/components/config/Utils'
// 路由懒加载
// 登录
const Login = r => require.ensure([], () => r(require('@/components/login')), 'Login')
// 404
const Page404 = r => require.ensure([], () => r(require('@/components/404')), '404')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/404', name: '404', component: Page404 }
  ]
})

router.beforeEach((to, from, next) => {
  sessionSetStore('from', from.path)
  next()
})

export default router
