<template>
  <div class="login-container">
    <div class="login_header">
      <img src="../static/img/qylogo.png" />
      <span>wuwang</span>
      <div class="line"></div>
      <span>学习后台</span>
    </div>
    <div class="login-content">
      <div class="login_content">
        <div class="login-content-right">
          <p class="login-content-right-title">登录</p>
          <a-form-model ref="form" layout="vertical" :model="formModel" :rules="rules">
            <a-form-model-item prop="cellPhoneNumber">
              <a-input v-model="formModel.cellPhoneNumber" placeholder="请输入手机号" size="large"
                :maxLength="11" @pressEnter="onClickLogin"
                 @change="formModel.cellPhoneNumber=formModel.cellPhoneNumber.replace(/[^\d]/g,'')">
                <a-icon type="user" slot="prefix" class="icon_style" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input v-model="formModel.password" placeholder="请输入密码" size="large"
                :type="type" allow-clear @pressEnter="onClickLogin"
                @change="formModel.password=formModel.password.replace(/[^0-9a-zA-Z~!@#$%^&*()_+]/g,'')">
                <a-icon type="lock" slot="prefix" class="icon_style" />
                <a-icon type="eye-invisible" v-if="eyeStatus" slot="suffix" class="icon_style" style="marginRight:14px" @click="eyeClose" />
                <a-icon type="eye" v-else slot="suffix" class="icon_style" style="marginRight:14px" @click="eyeOpen" />
              </a-input>
            </a-form-model-item>
            <div class="login-content-right-hint">
              <a-checkbox class="login-content-right-checkbox"
              v-model="isSavePassword"
              @change="onChange">记住密码</a-checkbox>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>请联系管理员</span>
                </template>
                <span class="foreget_password">忘记密码？</span>
              </a-tooltip>
            </div>
            <a-button class="login-content-right-btn"
              type="primary"
              block
              size="large"
              @click="onClickLogin"
              :loading="isLoading">登录</a-button>
          </a-form-model>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <p>个人项目</p>
    </div>
  </div>
</template>

<script>
/**
 * 登录页面
 */
import {mapState, mapMutations} from 'vuex'
import MutationTypes from '@/store/MutationTypes'
import { ComponentUtil } from 'jscom/utils/vueutil'
import ModifyPassword from '@/common/ModifyPassword'
import consts from '@/common/consts'
import { sysUtil } from 'jscom/utils/sysutil'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
  name: 'login',

  props: {
    pToken: String
  },

  data () {
    let Encrypt = new JSEncrypt()
    return {
      Encrypt,
      publicKey: consts.publicKey,
      formModel: {
        cellPhoneNumber: '',
        password: '',
        rememberPassword: '0'
      },
      type: 'password',
      isSavePassword: false,
      rules: {
        cellPhoneNumber: [
          { required: true, message: '请输入手机', trigger: 'change' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 8, pattern: /[0-9a-zA-Z~!@#$%^&*()_+]/g, message: '密码为8-30的字符或者数字', trigger: 'blur' },
        ]
      },
      mailResult: null,
      isLoading: false,
      eyeStatus: true,
    }
  },

  computed: {
    ...mapState([
      'userInfo',
      'modalArr'
    ])
  },

  created () {
    // 销毁所有弹出窗口
    this.destroyAllModal()
    let loginInfo = sysUtil.getLocalStore('loginInfo')
    if (loginInfo) {
      loginInfo = JSON.parse(loginInfo)
      this.formModel.cellPhoneNumber = loginInfo.cellPhoneNumber
      this.formModel.password = loginInfo.password
      this.isSavePassword = loginInfo.isSavePassword !== undefined ? loginInfo.isSavePassword : false
      this.formModel.rememberPassword = this.isSavePassword ? '1' : '0'
    }
    this.checkMailToken()
    // this.getPublicKey()
    // console.log(this.publicKey)
    this.Encrypt.setPublicKey(this.publicKey)
  },

  methods: {
    ...mapMutations({
      setUserInfo: MutationTypes.SET_USERINFO,
      clearUserOauth: MutationTypes.CLEAR_USEROAUTH
    }),
    // 判断是否由邮件点击进入
    checkMailToken () {
      // if (!this.pToken) {
      //   return
      // }
      // let api = this.$apiUtil.getAuthApi()
      // api.check_mail_token({mailToken: this.pToken}).then(({data}) => {
      //   this.mailResult = data
      // })
    },
    // 销毁所有弹出窗口
    destroyAllModal () {
      for (let modal of this.modalArr) {
        try {
          modal.$destroy()
        } catch(error) {
          console.log(error)
        }
      }
      this.modalArr.splice(0, this.modalArr.length)
    },
    // 是否记住密码
    onChange (e) {
      this.isSavePassword = e.target.checked
      this.formModel.rememberPassword = this.isSavePassword ? '1' : '0'
    },
    // 密码框关闭密码显示
    eyeClose () {
      this.type=""
      this.eyeStatus = false
    },
    // 密码框打开密码显示
    eyeOpen () {
      this.type='password'
      this.eyeStatus = true
    },
    // 登录
    login () {
      // this.clearUserOauth()
      // let api = this.$apiUtil.getAuthApi()
      // let jsonModel = {...this.formModel}
      // jsonModel['context'] = {
      //   message: ''
      // }
      this.redirectUrl()
      // jsonModel.password =  this.Encrypt.encrypt(this.formModel.password)
      // this.isLoading = true
      // api.login(jsonModel).then(({data, message, response}) => {
      //   this.setUserInfo(data)
      //   // 首次登录需要修改密码
      //   if (data.status === '1') {
      //     this.firstModifyPassword()
      //   } else if (data.isLogin === '1') {
      //     // 用户已经登录，替换登录
      //     this.$confirm({
      //       content: message,
      //       okText: '确定',
      //       cancelText: '取消',
      //       centered: true,
      //       class: 'confirm-modal',
      //       onOk: () => {
      //         this.replaceLogin()
      //       }
      //     })
      //   } else {
      //     this.$message.success('登录成功')
      //     // this.updateLoginInfo(data)
      //     this.redirectUrl()
      //   }
      //   this.isLoading = false
      // }).catch((error) => {
      //   this.isLoading = false
      // })
    },
    // 登录成功之后跳转页面判断逻辑
    redirectUrl () {
      let redirectUrl = '/manager/home'
      // if (this.mailResult && this.mailResult.url) {
      //   let result = [this.mailResult.url]
      //   if (this.mailResult.params) {
      //     result = result.concat(this.mailResult.params)
      //   }
      //   redirectUrl = result.join('/')
      // }
      // redirectUrl = result.join('/')
      this.$router.push(redirectUrl)
    },
    // 存储登录信息
    updateLoginInfo (data) {
      if (this.formModel.rememberPassword === '1') {
        sysUtil.setLocalStore('loginInfo', {cellPhoneNumber: data.cellPhoneNumber, password: this.formModel.password, isSavePassword: true})
      } else {
        sysUtil.setLocalStore('loginInfo', {isSavePassword: false})
      }
    },
    // 替换登录
    replaceLogin () {
      // let api = this.$apiUtil.getAuthApi()
      let jsonModel = {...this.formModel}
      // jsonModel.password =  this.Encrypt.encrypt(this.formModel.password)
      // api.confirm_replace_login(jsonModel).then(({data}, request, response) => {
      //   this.setUserInfo(data)
      //   this.redirectUrl()
      // }).catch((error) => {

      // })
    },
    // 第一次登录修改密码
    firstModifyPassword () {
      let _this = this
      new ComponentUtil(this.$store).createCustom({
        render: (h) => {
          return h(ModifyPassword, {
            props: {
              pIsShow: true,
              pIsFirst: true,
              pRememberPassword: this.isSavePassword
            },
            on: {
              success: (data) => {
                _this.setUserInfo(data)
                _this.updateLoginInfo(data)
                _this.$router.push('/manager/home')
              }
            }
          })
        }
      })
    },
    onClickLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login()
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.confirm-modal {
  padding: 24px;
  .ant-modal-body {
    padding: 24px;
  }

  .ant-modal-confirm-btns button + button {
    margin-left: 16px;
  }
}
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  // font-family: MicrosoftYaHei!important;
  position: relative;
  .login_header {
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    font-size: 22px;
    padding-left: 20px;
    img {
      width: 42px;
      margin-right: 10px;
    }
    span:nth-child(2) {
      font-size: 30px;
      color: #333;
    }
    .line {
      width: 1px;
      height: 30px;
      background: #000;
      margin: 0 16px;
    }
  }
  .login-content {
    flex: 1;
    background: #008dff;
    // background: url('../static/img/bg_ht1.jpg') no-repeat;
    // background-size: cover;
    display: flex;
    justify-content: center;
    .login_content {
      display: flex;
      justify-content: center;
      align-items: center;
      // background: #008dff;
    }
    &-right {
      // margin-top: 80px;
      margin-left: 80px;
      width: 430px;
      height: 480px;
      background-color: @white;
      padding: 47px 37px;
      display: flex;
      flex-direction: column;
      justify-content: right;
      border-radius: 8px;
      .ant-row {
        margin-left: 0px;
        margin-right: 0px;
      }
      &-title {
        font-size: @h2-font-size;
        color: @black;
        margin-bottom: 44px;
        text-align: center;
      }
      &-form {

      }
      .icon_style {
        color: #ccc;
        font-size: 22px;
      }
      .ant-input-clear-icon {
        color: #ccc;
        font-size: 14px;
        margin-right: 6px;
      }
      &-hint {
        display: flex;
        justify-content: space-between;
        margin-bottom: 34px;
        .foreget_password {
          color: #3370FF;
          cursor: pointer;
        }
      }
      &-checkbox {
        display: block;
        text-align: right;
        // margin-bottom: 34px;
        .ant-checkbox + span {
          padding-right: 0px;
        }
      }
      .ant-input-affix-wrapper .ant-input-suffix {
        // padding-right: 12px;
      }
      .ant-input {
        border-radius: 0;
        padding-left: 44px !important;
        padding-right: 40px !important;
      }
      .ant-form-vertical .ant-form-item:last-of-type {
        margin-bottom: 7px;
      }
      &-btn {
        border-radius: 22px;
      }
    }
  }
  .login-content-right-btn {
      font-size: 15px;
      height: 45px;
      font-weight: bold;
  }
}

.login-footer {
  width: 100%;
  height: 125px;
  > p {
    margin-bottom: 0px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  color: #666;
  line-height: 18px;
  a {
    text-decoration: none;
    color: #09acc2e8;
  }
}
</style>
