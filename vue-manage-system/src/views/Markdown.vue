<template>
    <div>
      <div class="container">
        <div class="plugins-tips">
          <el-input></el-input>
        </div>
        <div class="switch">
        </div>
        <mavon-editor style="min-height: 600px"></mavon-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </div>
    </div>
</template>

<script>
   import { mavonEditor } from 'mavon-editor'
   import 'mavon-editor/dist/css/index.css'
    export default {
        name: "markdown",
        data() {
          return {
            value: true,
          }
        },
        components: {
          mavonEditor
        },
        methods: {
          submit() {

          }
        }
    }
</script>

<style scoped>
  .switch {
    right: 10px;
    margin: 6px 0;
  }
</style>
