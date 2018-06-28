<template>
  <div class="wrapper">
      <nav-head></nav-head>
      <nav-menu></nav-menu>
      <div class="content-box" :class="{'content-collapse':collapse}">
          <tags></tags>
          <breadcrumb></breadcrumb>
          <div class="content">
              <transition name="move" mode="out-in">
                  <keep-alive :include="tagsList">
                    <router-view></router-view>
                  </keep-alive>
              </transition>
          </div>
      </div>
  </div>
</template>

<script>
    import NavHead from "./NavHead";
    import NavMenu from "./NavMenu";
    import tags from './Tags'
    import bus from '../js/bus';
    import Breadcrumb from "./base/Breadcrumb";
    export default {
      components: {
        Breadcrumb,
        NavMenu,
        NavHead,
        tags
      },
      data() {
        return {
          tagsList: [],
          collapse: false
        }
      },
      created() {
        bus.$on('collapse', msg => {
          this.collapse = msg;
        });
        bus.$on('tags', msg => {
          let arr = [];
          for(let i = 0, len = msg.length; i < len; i ++){
            msg[i].name && arr.push(msg[i].name);
          }
          this.tagsList = arr;
        })
      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
