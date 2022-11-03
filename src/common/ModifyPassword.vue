<template>
  <a-modal
    title="修改密码"
    :visible="isVisible"
    @ok="onClickOk"
    :confirmLoading="confirmLoading"
    @cancel="onClickCancel"
    centered
    :maskClosable="false"
    okText="确定"
    cancelText="取消"
  >
    <a-form-model
      ref="form"
      :model="formModel"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      label-align="right">
      <a-form-model-item v-if="!pIsFirst" label="旧密码" prop="password">
        <a-input-password v-model="formModel.password" :maxLength="30" placeholder="请输入"
          @change="formModel.password=formModel.password.replace(/[^0-9a-zA-Z~!@#$%^&*()_+]/g,'')" />
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="newPassword">
        <a-input-password v-model="formModel.newPassword"
          @change="onChangeNewPassword" :maxLength="30" placeholder="请输入" />
      </a-form-model-item>
      <Indicator class="mp-indicator" pTitle="强度" :pPassword="formModel.newPassword"></Indicator>
      <a-form-model-item label="确认密码" prop="confirmPassword">
        <a-input-password v-model="formModel.confirmPassword"
         :maxLength="30" placeholder="请输入"
         @change="formModel.confirmPassword=formModel.confirmPassword.replace(/[^0-9a-zA-Z~!@#$%^&*()_+]/g,'')" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
/**
 * 修改密码
 * @vue-prop {Boolean} pIsShow - 控制对话框的显示
 */
import Indicator from '@/components/indicator'
import { ruleMap } from '@/common/rules'
import consts from '@/common/consts'
import { mapState } from 'vuex'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
  name: 'ModifyPassword',

  components: {
    Indicator
  },

  props: {
    pIsShow: Boolean,
    pIsFirst: Boolean,
    pRememberPassword: Boolean
  },

  watch: {
    pIsShow (val) {
      this.isVisible = val
    }
  },

  data () {
    let Encrypt = new JSEncrypt()
    return {
      Encrypt,
      publicKey: consts.publicKey,
      formModel: {
        password: '',
        newPassword: '',
        confirmPassword: '',
        version: 1
      },
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      },
      isVisible: this.pIsShow,
      confirmLoading: false,
      pwdLevel: 'low',
      rules: {
        password: ruleMap.password,
        newPassword: ruleMap.newPassword,
        confirmPassword: ruleMap.confirmPassword
      },
    }
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created() {
    this.Encrypt.setPublicKey(this.publicKey)
  },

  methods: {
    onClickOk () {
      if (this.formModel.confirmPassword !== this.formModel.newPassword) {
        this.$message.error('密码不一致，请重新输入')
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.pIsFirst) {
            this.firstModifyPassword()
          } else {
            this.modifyPassword()
          }
          return true
        } else {
          return false
        }
      })
    },
    firstModifyPassword () {
      let api = this.$apiUtil.getAuthApi()
      let rememberPassword = this.pRememberPassword ? '1' : '0'
      let jsonModel = {...this.formModel}
      // jsonModel.newPassword = this.Encrypt.encrypt(jsonModel.newPassword)
      // jsonModel.confirmPassword = this.Encrypt.encrypt(jsonModel.confirmPassword)
      api.first_modify_password({...jsonModel, version: this.userInfo.version, rememberPassword}).then(({data}) => {
        this.isVisible = false
        this.$emit('on-hide')
        this.$emit('success', data)
      }).catch((error) => {

      })
    },
    modifyPassword () {
      let api = this.$apiUtil.getAuthApi()
      let jsonModel = {...this.formModel}
      // todo
      // jsonModel.newPassword = this.Encrypt.encrypt(jsonModel.newPassword)
      // jsonModel.password = this.Encrypt.encrypt(jsonModel.password)
      jsonModel.confirmPassword = jsonModel.newPassword
      api.modify_password({...jsonModel}).then(({data}) => {
        this.isVisible = false
        this.$emit('on-hide')
        this.$emit('success', data)
      }).catch((error) => {

      })
    },
    onClickCancel () {
      this.isVisible = false
      this.$emit('on-hide')
    },
    onChangeNewPassword (event) {
      this.formModel.newPassword=this.formModel.newPassword.replace(/[^0-9a-zA-Z~!@#$%^&*()_+]/g, '')
      if (this.formModel.newPassword.length > 18) {
        this.pwdLevel = 'heigh'
      } else if (this.formModel.newPassword.length > 12) {
        this.pwdLevel = 'middle'
      } else {
        this.pwdLevel = 'low'
      }
    },
    onConfirmBlur () {
      if (this.formModel.confirmPassword !== this.formModel.newPassword) {
        this.$message.error('密码不一致，请重新输入')
      }
    },

  }
}
</script>

<style lang="less" scpoed>
    .eye-style{
    max-width: 18px;
    max-height: 13px;
    cursor: pointer;
  }
  .ant-input-suffix {
    background: none;
    right: 12px !important;
}
.ant-modal-footer button + button {
    margin-left: 16px;
}
</style>
