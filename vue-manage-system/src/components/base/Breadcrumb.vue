<template>
  <div class="crumbs breadcrumb">
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in this.$route.matched">
          <el-breadcrumb-item><i :class="item.meta.icon" v-if="index === 0"></i>{{item.name}}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
  </div>
</template>

<script>
    export default {
        name: "breadcrumb",
    }
</script>

<style scoped>
  .breadcrumb {
      position: relative;
      top: 20px;
      left: 20px;
  }
</style>
