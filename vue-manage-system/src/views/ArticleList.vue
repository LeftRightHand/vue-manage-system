<template>
  <div>
      <div class="container">
          <div class="table">
              <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                      type="index"
                      width="50"
                      label="序号">
                  </el-table-column>
                  <el-table-column
                      prop='createAt'
                      label="日期"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="category.name"
                      label="分类"
                      width="160">
                  </el-table-column>
                  <el-table-column
                      prop="title"
                      label="名称">
                  </el-table-column>
                  <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                          <el-button size="small" @click="handleEdit(scope.$index)">编辑</el-button>
                          <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
              <div class="pagination">
                  <el-pagination
                      background
                      layout = "prev, pager, next"
                      :total='total'
                      @current-change="handleCurrentChange">
                  </el-pagination>
              </div>

          </div>
          <!-- 删除提示框 -->
          <del-dialog :del-visible="delVisible" @cancel="onCancel" @done="onDone"></del-dialog>
      </div>
  </div>


</template>

<script>
    import bus from '../js/bus'
    import {getArticleList, delArticle} from "../api/article";
    import {formatDate} from "../js/format";
    import DelDialog from "../components/base/DelDialog";
    const PAGESIZE = 10;
    export default {
        components: {
          DelDialog},
        name: "article-list",
        data() {
              return {
                  selectRow: -1,
                  editVisible: false,
                  delVisible: false,
                  tableData: [],
                  total: 0,
                  params: {
                      page : 1,
                      pageSize: PAGESIZE
                  }
              }
        },
        created () {
            setTimeout(()=>{
                this._getArticleList()
            },200)
        },
        methods: {
            handleEdit(index) {
                const item = this.tableData[index];
                bus.$emit('article', item);
                this.$router.push('markdown')
            },
            handleCurrentChange() {

            },
            onDone() {
                const item = this.tableData[this.selectRow];
                this._deleteArticle(item._id);
            },
            onCancel() {
              this.delVisible = false
            },
            handleDelete(index) {
                this.selectRow = index
                this.delVisible = true
            },
            _getArticleList() {
                getArticleList(this.params).then((res)=>{
                    if (res.data.code === 200) {
                        this.tableData = this._normalizeArticle(res.data.result.list)
                        this.total = res.data.result.count
                    }
                })
            },
            _normalizeArticle (list) {
                let result = []
                list.forEach((item)=> {
                    item.createAt = formatDate(item.createAt)
                    item.updateAt = formatDate(item.updateAt)
                    result.push(item)
                })
                return result
            },
            _deleteArticle(id) {
                delArticle(id).then((res)=>{
                    if (res.data.code === 200) {
                        this.delVisible = false;
                        this._getArticleList()
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>
