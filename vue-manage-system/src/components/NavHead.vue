<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user">
        <!-- 全屏显示 -->
        <!--<div class="btn-fullscreen" @click="handleFullScreen">-->
          <!--<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">-->
            <!--<i class="el-icon-rank"></i>-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <el-dropdown class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            admin<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
    import bus from '../js/bus'
    export default {
        methods: {
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            handleCommand(command) {
                if (command === 'loginout') {
                    sessionStorage.removeItem('username')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
  }
  .collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 60px;
  }
  .header .logo{
    float: left;
    width:250px;
    line-height: 60px;
  }
  .header-right{
    float: right;
    padding-right: 50px;
  }
  .header-user{
    display: flex;
    height: 60px;
    align-items: center;
  }
  .btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 20px;
    font-size: 24px;
  }

  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
</style>
