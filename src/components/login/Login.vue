<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="isAdmin">店铺管理登录</span>
        <span v-else>用户管理登录</span>
      </div>
      <EffectForm
        ref="effectForm"
        size="medium"
        label-position="left"
        label-width="auto"
        submitText="搜索"
        cancelText="刷新"
        @submit="handleLogin"
        @cancel="handleFilterResetFn"
      >
        <EffectFormField
          v-for="field in LoginFields"
          v-bind="field"
          :key="field.name"
        />
        <!-- <el-form-item
          label="验证码"
          prop="verifyCode"
          class="verify_code_item"
          :error="errorMsg"
        >
          <div class="verify_code" v-on:keyup.enter="handleLoginFn">
            <el-input v-model="verifyCode"></el-input>
            <img
              :src="verifyCodeUrl"
              alt=""
              class="verify_code_img"
              @click="fetchVerifyCodeFn"
            />
          </div>
        </el-form-item> -->
      </EffectForm>
    </el-card>
    <el-link type="primary" class="login_link">
      <router-link :to="{ name: isAdmin ? 'userLogin' : 'adminLogin' }">
        跳转到{{ isAdmin ? '用户' : '店铺' }}管理登录
      </router-link>
    </el-link>
  </div>
</template>

<script>
import store from 'store2'
import { AUTH_TOKEN, USER_INFO } from '@/config'
import { LoginFields } from './formConfig'
import { postUserLogin, postAdminLogin } from '@/apis/login'

export default {
  data() {
    return {
      // key: value,
      url: 'https://sso.yunaq.com/captcha/',
      verifyCode: '',
      verifyCodeUrl: '',
      verifyCodeTime: '',
      verifyCodeHash: '',
      errorMsg: '',
    }
  },

  computed: {
    LoginFields() {
      return LoginFields(this)
    },

    isAdmin() {
      const { meta } = this.$route
      return meta.type === 'admin'
    },
  },

  methods: {
    handleLoginFn() {
      const form = this.$refs.effectForm.form
      this.handleLogin(form)
    },
    handleFilterResetFn() {
      this.verifyCode = ''
      this.handleFilterReset()
    },

    adminLogin(form) {
      postAdminLogin({
        ...form,
      })
        .then((data) => {
          const { session, adminId, name } = data.result
          store.set(AUTH_TOKEN, session)
          store.set(USER_INFO, {
            name,
            adminId,
          })

          this.$router.push('/admin/shop-list')
        })
        .catch(() => {
          this.errorMsg = ''
        })
      this.errorMsg = ''
    },

    userLogin(form) {
      postUserLogin({
        ...form,
      })
        .then((data) => {
          const { session, name, shopId, shopUserId } = data.result
          store.set(USER_INFO, {
            name,
            shopId,
            shopUserId,
          })
          store.set(AUTH_TOKEN, session)

          this.$router.push('/user/order-list')
        })
        .catch(() => {
          this.errorMsg = ''
        })
      this.errorMsg = ''
    },
    handleLogin(form) {
      const { meta } = this.$route
      if (meta.type === 'admin') {
        this.adminLogin(form)
      } else {
        this.userLogin(form)
      }
    },
  },
}
</script>

<style lang="scss">
.login {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  .effect_btn_group {
    display: flex;
    justify-content: center;
  }
  .verify_code_item {
    position: relative;
    &::before {
      content: '*';
      color: #f04038;
      margin-right: 4px;
      position: absolute;
      top: 10px;
      left: 13px;
    }
  }
  .verify_code {
    display: flex;
    .verify_code_img {
      max-width: 160px;
      height: 36px;
      cursor: pointer;
      margin-left: 20px;
      margin-right: 38px;
    }
  }
  .login_link {
    margin-left: 187px;
    margin-top: 60px;
  }
}
</style>
