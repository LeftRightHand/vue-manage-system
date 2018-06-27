<template>
  <div class="">
      <el-form>
        <el-form-item>
          <el-input placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
            <quill-editor :options="editorOption"></quill-editor>
        </el-form-item>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </el-form>
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
