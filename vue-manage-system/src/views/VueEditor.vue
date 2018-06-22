<template>
  <div class="container">
    <div class="plugins-tips">
      <el-input></el-input>
    </div>
    <quill-editor :options="editorOption"></quill-editor>
    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
    export default {
        name: "vue-editor",
        data(){
          return {
            content: '',
            editorOption: {
              placeholder: '开始编辑...'
            }
          }
        },
        methods: {
          submit(){

          }
        },
        components: {
          quillEditor
        }
    }
</script>

<style scoped>

</style>
