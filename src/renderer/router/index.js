import Vue from 'vue'
import Router from 'vue-router'
import SearchTag from '@/components/SearchTag'

Vue.use(Router)

export default new Router({
  mode: 'history', // 不配置mode，路径格式化为#!开头
  base: '/view/',
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/tagSearch' // 访问域名默认跳首页
    },
    {
      path: '/tagSearch',
      name: 'SearchTag',
      component: SearchTag
    }
  ]
})
