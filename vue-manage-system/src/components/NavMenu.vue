<template>
  <div class="nav-bar">
    <el-menu class="nav-menu"
             :collapse="collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             :default-active="onRoutes"
             unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index">
              {{subItem.title}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../js/bus'
    export default {
      data() {
        return {
          collapse: false,
          items: [
            {
              icon: 'el-icon-setting',
              index: 'dashboard',
              title: '系统首页'
            },
            {
              icon: 'el-icon-message',
              index: 'tabs',
              title: '消息'
            },
            {
              icon: 'el-icon-tickets',
              index: '3',
              title: '文章',
              subs: [
                {
                  index: 'article_list',
                  title: '文章列表'
                },
                {
                  index: 'categories',
                  title: '文章分类'
                },
                {
                  index: 'editor',
                  title: '富文本编辑器'
                },
                {
                  index: 'markdown',
                  title: 'markdown编辑器'
                }
              ]
            },
            {
              icon: 'el-icon-error',
              index: '404',
              title: '404页面'
            }
          ]
        }
      },
      computed:{
        onRoutes(){
          return this.$route.path.replace('/','');
        }
      },
      created(){
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
          this.collapse = msg;
        })
      }
    }
</script>

<style scoped>
  .nav-bar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }
  .nav-bar::-webkit-scrollbar{
    width: 0;
  }
  .nav-menu:not(.el-menu--collapse){
    width: 250px;
  }
  .nav-bar > ul {
    height:100%;
  }
</style>
