<template>
  <div>
    <div style="display:flex;margin-top:10vw;align-items: center;">
      <embed src="/static/404.svg" style="display:block;width:27.5vw;margin-left:10vw;"/>
      <div style="flex:1;text-align: left;margin-left:3vw;">
          <span style="font-size:20px;font-weight:bold;display:block;margin-bottom:2vw;">抱歉, 您访问的页面不存在......</span>
          <el-button @click="goHome" plain type="primary">返回首页</el-button>
          <el-button @click="goBack" plain type="primary">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sessionClearStore, sessionGetStore } from '@/components/config/Utils'
export default {
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {

  },
  methods: {
    goHome: function () {
      sessionClearStore()
      this.$router.push({ path: '/login' })
      window.location.reload()
    },
    goBack: function () {
      this.$router.push({ path: sessionGetStore('from') })
    }
  }
}
</script>

<style scoped>
</style>
