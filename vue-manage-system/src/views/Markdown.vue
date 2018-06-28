<template>
    <div class="container">
        <el-form>
            <el-form-item>
                <el-input v-model="from.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="value" @change="selectCategories" placeholder="请选择分类">
                <el-option
                  v-for="(item, index) in categories"
                  :key="index"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item>
          </el-form-item>
            <el-form-item>
                <mavon-editor v-model="from.content" style="min-height: 600px"></mavon-editor>
            </el-form-item>

            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </el-form>
    </div>
</template>

<script>
    import bus from '../js/bus'
    import { commitArticle } from "../api/article";
    import { getCategories } from "../api/categories";
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "markdown",
        data() {
            return {
                radioIndex: 0,
                value: '',
                categories: [],
                params: {
                    page : 1,
                    pageSize: 20
                },
                from: {
                    title: '',
                    id: '',
                    content: '',
                    editType: 0,
                }
            }
        },
        components: {
            mavonEditor
        },
        created() {
            setTimeout(()=>{
                this._getCategories()
                this._getArticle()
            }, 100)
        },
        methods: {
            selectCategories(val) {
                this.from.id = val
            },
            submit() {
                this._commitArticle()
            },
            _getCategories() {
                getCategories(this.params).then((res)=>{
                    this.categories = res.data.result.list;
                });
            },
            _commitArticle() {
                commitArticle(this.from).then((res)=>{
                    if (res.data.code === 200) {
                        this.$message.success('提交成功');
                        location.reload()
                        this.$router.go(0)
                        this.$router.push('/article_list');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            _getArticle() {
                bus.$on('article', item => {
                    console.log(item)
                    this.from = item
                    this.from.id = item.category.id
                    this.value = item.category.name
                })
            }
        }
    }
</script>

<style scoped>

</style>
