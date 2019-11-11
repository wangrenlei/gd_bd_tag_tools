<template>
  <div id="app">
    <!-- 头部导航 -->
    <!-- <header class="header" :class="{ 'header-fixed' : headerFixed }"></header> -->
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/tagSearch" style="margin-left:100px;width: 150px;text-align: center">标签查询工具</el-menu-item>
      </el-menu>
    </div>

    <main>
      <div class="main-right">
        <transition name="fade">
          <router-view class="view"></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        active: true,
        headerFixed: true,
        activeIndex: '/tagSearch'
      }
    },
    created: function () {
      // this.$router.push('/stat')
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
    // watch: {
    //   '$route': function (to, from) {
    //     if (to.path === '/activePublic') {
    //       this.active = true
    //     } else if (to.path === '/activeManage') {
    //       this.active = false
    //     }
    //   }
    // }
  }
</script>

<style>

  body {
    margin: 0;
  }

  #app {
    min-width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
  }

  /* 头部导航 */
  header {
    z-index: 1000;
    min-width: 1200px;
    transition: all 0.5s ease;
    border-top: solid 4px #3091F2;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  header.header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  header .el-menu-demo {
    padding-left: 300px !important;
  }

  /* 主内容区 */
  main {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-height: 800px;
    border: solid 30px #E9ECF1;
    background-color: #FCFCFC;
  }

  main .main-left {
    text-align: center;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 200px;
    flex: 0 0 200px;
  }

  main .main-right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background-color: #fff;
    padding: 50px 35px;
  }

  main .el-menu {
    background-color: transparent !important;
  }

  /*  */
  .router-link {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #475669;
    text-decoration: none;
  }

  .is-active .router-link {
    color: #20a0ff;
  }

  /* 单选框 */
  .el-form-item .el-radio + .el-radio {
    margin-left: 30px !important;
  }

  /* 导航栏菜单选中效果 */
  .isActive {
    color: #20a0ff !important;
  }

  #app main .aside .is-active {
    color: #475669;
  }

  /* 卡片 */
  .el-card {
    overflow: visible !important;
  }
</style>
