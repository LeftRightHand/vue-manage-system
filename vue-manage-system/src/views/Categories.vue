<template>
    <div class="container">
        <div class="table">
            <div class="handle-box">
                <el-input placeholder="筛选关键词" class="handle-input"></el-input>
                <el-button type="primary" icon="search" @click="">搜索</el-button>
                <el-button type="primary" @click="handleEdit(-1)">添加分类</el-button>
            </div>
            <el-table
                  :data="tableData"
                  style="width: 100%">
              <el-table-column
                  type="index"
                  width="60"
                  label="序号">
              </el-table-column>
              <el-table-column
                  prop="name"
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
        <!-- 编辑弹出框 -->
        <el-dialog title="添加分类" :visible.sync="editVisible" width="50%">
            <el-form>
                  <el-form-item>
                      <el-input v-model="name" placeholder="分类名称"></el-input>
                  </el-form-item>
            </el-form>
            <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

      <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
      </div>
</template>

<script>
    import {addCategories, getCategories, editCategories, deleteCategories} from "../api/categories";

    const PAGESIZE = 10;

    export default {
        name: "categories",
        data() {
            return {
                name: '',
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
            this._getCategories()
          }, 200)
          console.log(this.$router)
        },
        methods: {
            handleCurrentChange(val) {
                this.params.page = val;
                this._getCategories();
            },
            saveEdit() {
                if (this.selectRow >= 0) {
                    const item = this.tableData[this.selectRow];
                    const data = {
                        id : item._id,
                        name: this.name
                    }
                    this._edieCategories(data)
                } else {
                    this._addCategories()
                }
            },
            handleDelete(index) {
                this.selectRow = index;
                this.delVisible = true;
            },
            deleteRow() {
                const item = this.tableData[this.selectRow];
                this._delecteCategories(item._id)
            },
            handleEdit(index) {
                if (index >= 0) {
                  const item = this.tableData[index];
                  this.name = item.name
                }
                this.selectRow = index;
                this.editVisible = true;
            },
            _addCategories() {
                if (this.name.split(" ").join("").length === 0) {
                    this.$message.error('输入不能空');
                    return
                }
                addCategories(this.name).then((res)=>{
                    if (res.data.code === 200) {
                        this.$message.success('提交成功');
                        this.editVisible = false;
                        //重新获取新数据
                        this._getCategories()
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            _getCategories() {
                getCategories(this.params).then((res)=>{
                    this.tableData = res.data.result.list;
                    this.total = Number(res.data.result.count)
                    console.log(this.total)
                });
            },
            _edieCategories(data) {
                editCategories(data).then((res)=>{
                    if (res.data.code === 200) {
                        this.$message.success('修改成功');
                        this.editVisible = false;
                        //重新获取新数据
                        this._getCategories()
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            _delecteCategories(id) {
                deleteCategories(id).then((res)=>{
                    if (res.data.code === 200) {
                        this.$message.success('删除成功');
                        this.delVisible = false;
                        //重新获取新数据
                        this._getCategories()
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
    align-items: center;

  }
  .handle-input {
    width: 300px;
    display: inline-block;
    font-size: 12px;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
</style>
