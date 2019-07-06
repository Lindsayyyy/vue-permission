<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" placeholder="管理员admin,客户client"></el-input>
      </el-form-item>
      <el-form-item label="密 码">
        <el-input v-model="form.password" placeholder="123456"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginBt" plain type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { sessionSetStore } from '@/components/config/Utils'
export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  created: function () {
  },
  mounted: function () {

  },
  methods: {
    loginBt: function () {
      let role
      let backdata
      if (this.form.userName === 'admin' && this.form.password === '123456') {
        // 这里做后台请求处理，获取当前用户角色
        role = 0
        // 存储所需用户数据
        sessionSetStore('userToken', 'yourToken')
        // 用role向后台请求对应的permission信息
        // permission包含的信息根据需要与后台协商确定
        // 我这里没有对接后台，把admin和clien对应的permission信息写在本地json文件里了
        axios.get('/static/adminRouteInfo.json')
          .then(function (res) {
            backdata = res.data
            // 刷新浏览器需要重新挂载路由
            sessionSetStore('routesInfo', backdata)
            // 挂载路由
            this.addRouterMenu(backdata, '')
            // 跳转页面
            this.$router.push({ path: '/home/alarm' })
          }.bind(this))
          .catch(function (err) {
            console.log('数据获取异常', err)
          })
      } else if (this.form.userName === 'client' && this.form.password === '123456') {
        role = 1
        // 存储所需用户数据
        sessionSetStore('userToken', 'yourToken')
        axios.get('/static/clientRouteInfo.json')
          .then(function (res) {
            backdata = res.data
            // 刷新浏览器需要重新挂载路由
            sessionSetStore('routesInfo', backdata)
            // 挂载路由
            this.addRouterMenu(backdata, '')
            // 跳转页面
            this.$router.push({ path: '/home/alarm' })
          }.bind(this))
          .catch(function (err) {
            console.log('数据获取异常', err)
          })
      } else {
        console.log(role)
        this.notificationInfo('提示', '账号密码不正确')
      }
    },
    notificationInfo: function (titlePara, messagePara) {
      const h = this.$createElement
      this.$notify({
        title: titlePara,
        message: h('i', {style: 'color: teal'}, `${messagePara}`)
      })
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 15vh;
  display: flex;
  justify-content: center;
}
.el-form {
  width: 20vw;
  height: 20vh;
  padding: 2%;
  border: 1px solid #a9d1f9;
  border-radius: 5px;
}
</style>
