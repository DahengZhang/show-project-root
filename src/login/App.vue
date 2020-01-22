<template>
    <div class="page login vertical-middle">
        <el-form>
            <i class="logo el-icon-eleme"></i>
            <el-form-item>
                <el-input v-model="account" placeholder="账户">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="account" placeholder="密码">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            account: ''
        }
    }
}
</script>

<style lang="scss">
.page.login {
    background-color: #2d3a4b;
    text-align: center;
    .logo {
        font-size: 100px;
        font-weight: 900;
        color: #E6A23C;
        text-shadow: 5px 5px 5px #303133;
        margin-bottom: 20px;
    }
    .el-form {
        width: 70%;
        max-width: 450px;
        .el-button {
            width: 100%;
        }
    }
    .el-input {
        .el-input__inner {
            color: #ffffff;
            border: 1px solid hsla(0, 0%, 100%, .1);
            background-color: rgba(0, 0, 0, .1);
        }
    }
}
</style>
