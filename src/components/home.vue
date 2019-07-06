<template>
<!-- 此页面没有写记住menuActive的相关程序 -->
  <el-container>
    <el-header>
      <el-menu
        :default-active="h_menuActive"
        background-color="#ffffff"
        text-color="#2b2b2b"
        active-text-color="#409EFF"
        mode="horizontal"
        @select="handleSelectHeader"
        style="diplay:flex;">
        <el-menu-item v-for="item in routerList.children" :key="item.path" :index="item.key">
          {{item.title}}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="s_menuActive"
          unique-opened
          class="el-menu-vertical-demo"
          @select="handleSelectAside"
          background-color="#ffffff"
          text-color="#2b2b2b"
          active-text-color="#409eff">
          <!-- 有分类 -->
          <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.key">
            <template slot="title">
              <span class="menu_text">{{item.title}}</span>
            </template>
            <el-menu-item v-for="item2 in item.children" :key="item2.path" :index="item2.key">
              {{item2.title}}
            </el-menu-item>
          </el-submenu>
          <!-- 没有分类 -->
          <el-menu-item v-for="item in noChildren" :key="item.key" :index="item.key">
              <span class="menu_text">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { sessionGetStore } from '@/components/config/Utils'
export default {
  name: 'home',
  data () {
    return {
      h_menuActive: '1',
      s_menuActive: '1-1-1',
      routerList: ''
    }
  },
  // vuex数据绑定
  computed: {
    asideList () {
      return this.$store.state.asideRouters
    },
    hasChildren () {
      return this.asideList.children.filter(function (item) {
        return item.children
      })
    },
    noChildren () {
      return this.asideList.children.filter(function (item) {
        return (item.children === undefined)
      })
    }
  },
  created: function () {
    this.routerList = JSON.parse(sessionGetStore('routesInfo'))
    console.log(this.routerList)
    // 默认加载设备管理内容
    this.$store.commit('setAsideRouters', this.routerList.children[0])
  },
  mounted: function () {
  },
  methods: {
    // 菜单切换
    handleSelectHeader: function (key, keyPath) {
      console.log(key, keyPath)
      for (let i = 0; i < this.routerList.children.length; i++) {
        if (this.routerList.children[i].key === key) {
          this.$store.commit('setAsideRouters', this.routerList.children[i])
          let router
          if (this.routerList.children[i].children[0].children) {
            router = this.routerList.children[i].children[0].children[0].path
          } else {
            router = this.routerList.children[i].children[0].path
          }
          this.$router.push('/home/' + router)
        }
      }
    },
    handleSelectAside: function (key, keyPath) {
      console.log(key, keyPath)
      for (let i = 0; i < this.asideList.children.length; i++) {
        // type为1表示下面还有children,0表示没有children
        console.log(this.asideList.children[i])
        if (this.asideList.children[i].children) {
          for (let j = 0; j < this.asideList.children[i].children.length; j++) {
            if (this.asideList.children[i].children[j].key === key) {
              this.$router.push('/home/' + this.asideList.children[i].children[j].path)
            }
          }
        } else {
          if (this.asideList.children[i].key === key) {
            this.$router.push('/home/' + this.asideList.children[i].path)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  height: 960px;
  .el-main {
    color: #333;
  }
  .el-header {
    color: #333;
    border-bottom: 1px solid #a9d1f9;
    .el-menu.el-menu--horizontal {
      height: 95%;
      margin: 0 0 0px 200px;
      border-bottom: none;
      .el-menu-item {
        font: {
          size: 18px;
          weight: 600;
        }
        height:100%;
      }
      .el-menu-item.is-active {
        border-bottom: none;
      }
    }
  }
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    border-right: 1px solid #a9d1f9;
    .el-menu {
      border-right: none;
    }
    .menu_text {
      font: {
        size: 16px;
        weight: 600;
      }
    }
  }
}
</style>
