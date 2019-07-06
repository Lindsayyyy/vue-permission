<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { sessionGetStore, sessionSetStore } from '@/components/config/Utils'
export default {
  name: 'App',
  data () {
    return {
      param: {
        'token': ''
      }
    }
  },
  created: function () {
    this.param.token = sessionGetStore('userToken')
    // 全局设置console.log为空函数，等价于注释掉所有的打印输出
    console.log = function () {}
  },
  mounted: function () {
    window.onbeforeunload = function (event) {
      // 不要直接在onbeforeunload事件里面做请求
      sessionSetStore('refresh', 'y')
      console.log('刷新浏览器')
    }
    // 浏览器刷新时，重新渲染路由
    if (sessionGetStore('refresh') === 'y' && sessionGetStore('userToken')) {
      if (sessionGetStore('routesInfo')) {
        this.addRouterMenu('', sessionGetStore('routesInfo'))
      }
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body, html {
  margin: 0px;
  padding: 0px;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
</style>
