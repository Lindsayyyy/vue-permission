import axios from 'axios'
import { sessionGetStore, sessionSetStore } from '@/components/config/Utils'

// axios请求拦截器，为请求头统一配置鉴权信息authorization
axios.interceptors.request.use(
  config => {
    let token = sessionGetStore('userToken')
    // 对应几条不需要authorization的请求
    let arr = ['/login/log', '/login/token']
    var index = 0
    for (var i in arr) {
      if (config.url.indexOf(arr[i]) > -1) {
        // 不需要加authorization
        index = 1
      }
    }
    if (index !== 1) {
      if (!config.headers.authorization) {
        config.headers = {
          'authorization': token
        }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios拦截器，token失效时，及时续签
axios.interceptors.response.use(
  response => {
    // 根据自己后台定义的错误码判断
    if (response.data.code  === '4') {
      var param = { userId: sessionGetStore('userId') }
      back.refreshToken(param).then(function (response) {
        if (response.code === 0) {
          console.log('续签成功', response.data.token)
          sessionSetStore('userToken', response.data.token)
        }
      })
      return
    }
    if (response.config.url.indexOf('login/token') > -1) {
      // 刷新token的接口
      if (response.data.code === 3) {
        // 刷新token出错，返回首页
        this.$router.push({ path: '/login' })
        return
      }
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 后台请求封装
export const back = {
  // 续签token
  refreshToken (param) {
    return axios({
      url: `baseurl/login/token`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        userId: param.userId
      }
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
