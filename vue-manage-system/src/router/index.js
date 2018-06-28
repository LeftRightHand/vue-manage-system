import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = ((resolve)=>{
  import('../components/Home').then((module)=>{
    resolve(module)
  })
});

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/dashboard',
          component: Home,
          name: '',
          icon: 'el-icon-setting',
          mete: { icon: 'el-icon-setting'},
          single: true,
          children:[
              {
                path: '/dashboard',
                component: resolve => require(['../views/Dashboard'], resolve),
                name: '系统首页'
              }
          ]
      },
      {
          path: '/',
          component: Home,
          name: '文章',
          icon: 'el-icon-tickets',
          mete: { icon: 'el-icon-tickets'},
          children:[
              {
                path: '/markdown',
                component: resolve => require(['../views/Markdown'], resolve),
                name: '文章发布'
              },
              {
                path: '/editor',
                component: resolve => require(['../views/VueEditor'], resolve),
                name: '富文本'
              },
              {
                path: '/categories',
                component: resolve => require(['../views/Categories'], resolve),
                name: '文章分类'
              },
              {
                path: '/article_list',
                component: resolve => require(['../views/ArticleList'], resolve),
                name: '文章列表'
              }
          ]
      },
      {
          path: '/',
          component: Home,
          name: '',
          icon: 'el-icon-message',
          mete: { icon: 'el-icon-message'},
          single: true,
          children:[
            {
              path: '/tabs',
              component: resolve => require(['../views/Tabs'], resolve),
              name: '消息'
            }
          ]
      },
      {
          path: '/login',
          hidden: true,
          component: resolve => require(['../views/Login'], resolve),
      },
      {
          path: '*',
          component: resolve => require(['../views/404'], resolve),
          hidden: true,
      }
  ]
})
