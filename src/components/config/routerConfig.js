import { sessionSetStore } from '@/components/config/Utils'
// 路由懒加载
// 主菜单
const Home = r => require.ensure([], () => r(require('@/components/home')), 'Home')
// 设备管理
const Devlist = r => require.ensure([], () => r(require('@/components/devManage/devlist')), 'Devlist')
const Alarm = r => require.ensure([], () => r(require('@/components/devManage/monitor/alarm')), 'Alarm')
const Historydata = r => require.ensure([], () => r(require('@/components/devManage/monitor/historydata')), 'Historydata')
const Onlinerecord = r => require.ensure([], () => r(require('@/components/devManage/onlinerecord')), 'Onlinerecord')
// 客户管理
const Clientlist = r => require.ensure([], () => r(require('@/components/clientManage/clientlist')), 'Clientlist')
const Analysis = r => require.ensure([], () => r(require('@/components/clientManage/analysis')), 'Analysis')
// 数据统计
const Devdata = r => require.ensure([], () => r(require('@/components/statistics/devdata')), 'Devdata')
const Clientdata = r => require.ensure([], () => r(require('@/components/statistics/clientdata')), 'Clientdata')
// 资金结算
const Account = r => require.ensure([], () => r(require('@/components/account')), 'Account')
// 本地路由映射表
let localRoutes = [{
  name: 'home',
  component: Home,
  flag: 0 // 接下来用作标识该路径是否被当前用户使用
}, {
  name: 'devlist',
  component: Devlist,
  flag: 0
}, {
  name: 'alarm',
  component: Alarm,
  flag: 0
}, {
  name: 'historydata',
  component: Historydata,
  flag: 0
}, {
  name: 'onlinerecord',
  component: Onlinerecord,
  flag: 0
}, {
  name: 'clientlist',
  component: Clientlist,
  flag: 0
}, {
  name: 'analysis',
  component: Analysis,
  flag: 0
}, {
  name: 'devdata',
  component: Devdata,
  flag: 0
}, {
  name: 'clientdata',
  component: Clientdata,
  flag: 0
}, {
  name: 'account',
  component: Account,
  flag: 0
}]
// 需要挂载的路由
let addRouteData = [
  { path: '/home',
    component: Home,
    children: []
  }
]
const addRouterMenu = function (data, refreshdata) {
  // 挂载页面
  if (data !== '') {
    var arrs = JSON.parse(JSON.stringify(data))
    processing(arrs.children)
    var routerUsed = []
    for (let i = 0; i < localRoutes.length; i++) {
      if (localRoutes[i].flag === 1) {
        routerUsed.push(localRoutes[i].name)
      }
    }
    sessionSetStore('routerUsed', routerUsed)
    // 最后做404页面的模糊匹配
    addRouteData.push({
      path: '*',
      redirect: '404'
    })
    this.$router.addRoutes(addRouteData)
  }
  if (refreshdata !== '') {
    // sessionStorage是以字符串形式存储数据的，需要转换
    refreshdata = JSON.parse(refreshdata)
    processing(refreshdata.children)
    addRouteData.push({
      path: '*',
      redirect: '404'
    })
    console.log(addRouteData)
    this.$router.addRoutes(addRouteData)
  }
}
const processing = function (data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].component !== undefined) {
      for (let j = 0; j < localRoutes.length; j++) {
        if (localRoutes[j].name === data[i].path) {
          let obj = {
            path: '',
            name: '',
            component: ''
          }
          obj.path = localRoutes[j].name
          obj.name = localRoutes[j].name
          obj.component = localRoutes[j].component
          addRouteData[0].children.push(obj)
          localRoutes[j].flag = 1
        }
      }
    } else {
      processing(data[i].children)
    }
  }
}
export {addRouterMenu}
