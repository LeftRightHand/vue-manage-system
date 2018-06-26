// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

var routeList = []
router.beforeEach((to, from, next)=>{
  const role = sessionStorage.getItem('username');
  if(!role && to.path !== '/login'){
    next('/login');
  }else if(to.meta.permission){
    next();
  }else{
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
      console.log('不兼容')
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    }else{
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
