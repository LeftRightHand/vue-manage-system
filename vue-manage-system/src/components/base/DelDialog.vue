<template>
    <div>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onDone">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "del-dialog",
        props: {
            delVisible : {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onCancel() {
                this.$emit('cancel')
            },
            onDone() {
                this.$emit('done')
            }
        }
    }
</script>

<style scoped>
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
</style>
