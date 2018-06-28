<template>
  <div class="nav-bar">
      <el-menu class="nav-menu"
               :collapse="collapse"
               background-color="#324157"
               text-color="#bfcbd9"
               active-text-color="#20a0ff"
               :default-active="$route.path"
               unique-opened router>
      <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
          <template v-if="!item.single">
              <el-submenu :index="item.path" :key="item.path">
                  <template slot="title">
                    <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                  </template>
                  <el-menu-item v-for="(child, i) in item.children" :key="i" :index="child.path">
                    {{child.name}}
                  </el-menu-item>
            </el-submenu>
          </template>
              <template v-else>
                  <el-menu-item :index="item.children[0].path" :key="item.children[0].path">
                  <i :class="item.icon"></i><span slot="title">{{ item.children[0].name }}</span>
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
              }
          },
          computed:{
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
    width: 200px;
  }
  .nav-bar > ul {
    height:100%;
  }
</style>
