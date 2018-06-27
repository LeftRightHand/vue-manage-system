import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/dashboard'
      },
      {
          path: '/',
          component: resolve => require(['../components/Home'], resolve),
          meta: {title: '自述文件'},
          children:[
              {
                path: '/dashboard',
                component: resolve => require(['../views/Dashboard'], resolve),
                meta: { title: '系统首页' }
              },

              {
                path: '/tabs',
                component: resolve => require(['../views/Tabs'], resolve),
                meta: { title: '消息' }
              },
              {
                path: '/markdown',
                component: resolve => require(['../views/Markdown'], resolve),
                meta: { title: '文章发布' }
              },
              {
                path: '/editor',
                component: resolve => require(['../views/VueEditor'], resolve),
                meta: { title: '富文本' }
              },
              {
                path: '/categories',
                component: resolve => require(['../views/Categories'], resolve),
                meta: { title: '文章分类' }
              },
              {
                path: '/article_list',
                component: resolve => require(['../views/ArticleList'], resolve),
                meta: { title: '文章列表' }
              }
          ]
      },
      {
          path: '/login',
          component: resolve => require(['../views/Login'], resolve),
      },
      {
          path: '/404',
          component: resolve => require(['../views/404'], resolve),
      }
  ]
})
