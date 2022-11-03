<template>
  <div>
    <div v-if="field.readonly === 'orig'">
      <img v-if="imageUrl" :src="imageUrl" :style="{maxWidth: maxWidth, maxHeight: maxHeight}"/>
      <span v-else>无</span>
    </div>
    <div v-else-if="field.readonly" >
      <img v-if="imageUrl" :src="imageUrl" :style="{maxWidth: maxWidth, maxHeight: maxHeight}" />
      <span v-else>无</span>
    </div>
    <AUpload
      ref="upload"
      v-else
      :fileList="fileList"
      :name="field.filename"
      listType="picture-card"
      class="avatar-uploader"
      :headers="field.headers"
      :method="field.method"
      :action="field.action"
      :customRequest="field.customRequest"
      :beforeUpload="onBeforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      :accept="accept"
      :multiple="true"
    >
<!--      <img v-if="imageUrl" :src="imageUrl" alt="avatar" :style="{width: '84px', height: '84px'}" />-->
      <div v-if="fileList.length < 1">
        <a-icon :type="field.loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">{{ field.uploadText || '上传图片' }}</div>
      </div>
    </AUpload>
    <AModal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="imageUrl" />
    </AModal>
  </div>
</template>
<script>
/**
 * 图片上传组件
 * @format: 传入文件ID，传出文件ID
 */
import {imgUtil} from 'jscom/utils/imgutil'
import BaseWidget from './BaseWidget'

export default {
  name: 'ImageWidget',
  extends: BaseWidget,
  supportReadonly: true,
  data() {
    const fileList = [];
    return {
      fileList: fileList,
      imageUrl: '',
      previewVisible: false,
      accept: this.pField.accept || '.svg,.jpg,.jpeg,.png,.ico',
      maxWidth: this.pField.maxWidth || '120px',
      maxHeight: this.pField.maxHeight || '60px'
    }
  },
  watch: {
    widgetVal (val) {
      this.initImageUrl()
    }
  },
  created () {
    this.initImageUrl()
  },
  methods: {
    /**
     * 初始化 image URL
     */
    initImageUrl() {
      if (this.widgetVal) {
        this.imageUrl = `${this.$apiUtil.baseUrl()}/base/file/v1/image/${this.widgetVal}`
        this.fileList = [
          {
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: this.imageUrl,
          }
        ]
      }
    },
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['str', 'int', 'image']  // image
    },
    /**
     * 上传图片触发
     */
    handleChange(info) {
      if (!info.file.status) {
        // 是验证没有通过的文件, 如文件大小未通过
        return
      }
      this.fileList = info.fileList
      if (info.file.status === 'uploading') {
        this.field.loading = true
        return;
      }
      if (info.file.status === 'error' && info.file.error.status === 401) {
        this.$message.error(info.file.response.message || '请重新登录')
        this.$router.push('/login')
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // response:Object
        //  message:"文件尺寸超出120*60px"
        //  resultCode:1
        if (info.file.response.resultCode !== 0) {
          // 上传错误，清空当前值，并显示错误信息
          this.fileList = []
          this.initImageUrl()
          if (info.file.response.message) {
            this.$message.error(info.file.response.message)
          } else {
            this.$message.error('上传错误')
          }
        } else {
          // 上传成功
          this.widgetVal = info.file.response.data.fileId
          this.initImageUrl()
        }
        if (this.field.onUploadDone) {
          this.field.onUploadDone(this.imageUrl, info.file.response)
        }
        this.field.loading = false
      }
      // 如果删除情况，清空值
      if (!this.fileList || this.fileList.length === 0) {
        this.widgetVal = ''
        this.initImageUrl()
      }
    },
    /**
     * 预览关闭触发
     */
    handleCancel() {
      this.previewVisible = false
    },
    /**
     * 预览点击触发
     */
    handlePreview(file) {
      if (this.imageUrl) {
        this.previewVisible = true
      }
    },
    /**
     * 默认校验规则
     * @returns {{validator: validator, trigger: string, message: (*|string), required: *}}
     */
    defaultRule() {
      let this_ = this
      return {
        required: this.field.required,
        message: this.ruleMessage(),
        trigger: null,
        validator: (rule, value, callback) => {
          if (rule.required) {
            if (!value) {
              callback(new Error(rule.message))
              return
            }
          }
          callback()
        }
      }
    },
    /**
     * 上传前触发
     * @param file
     * @returns {boolean|boolean}
     */
    onBeforeUpload(file) {
      let slist = file.name.split('.')
      let suffix = slist[slist.length - 1]
      let validSuffixList = this.accept.split(',').map((item) => { return item.trim() })
      if (!validSuffixList.includes(`.${suffix}`)) {
        this.$message.error('文件类型不正确')
        return false
      }
      if (file.size === 0) {
        this.$message.error('不能上传0KB文件')
        return false
      }
      let valid = true
      if (this.pField.limitSize) {
        valid = valid && file.size < this.pField.limitSize
        if (!valid) {
          this.$message.error('文件超过大小');
          return valid
        }
      }

      if (this.pField.beforeUpload) {
        valid = valid && this.pField.beforeUpload(file)
      }
      return valid
    }
  },
}
</script>
