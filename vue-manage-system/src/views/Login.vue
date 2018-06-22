<template>
    <div class="login-wrapper">
      <div class="title">后台管理系统</div>
      <div class="login">
        <el-form class="demo-ruleForm" :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="password"></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" :loading="logining" @click.native.prevent="submitForm">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          logining: false,
          ruleForm: {
            username: 'admin',
            password: '123456'
          },
          rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submitForm() {
          this.$refs.ruleForm.validate((valid)=>{
            if (valid) {
              sessionStorage.setItem('username', this.ruleForm.username);
              this.$router.push('/');
            } else {

            }
          })
        }
      }
    }
</script>

<style scoped>
  .login-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>
