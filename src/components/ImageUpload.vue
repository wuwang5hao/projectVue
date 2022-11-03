<template>
  <div class="iu-container">
    <a-upload
      listType="picture-card"
      :fileList="fileList"
      :action="uploadAction"
      :headers="headers"
      :format="format"
      :accept="accept"
      :name="filename"
      :showUploadList="true"
      :beforeUpload="onBeforeUpload"
      :remove="removeFile"
      @preview="handlePreview"
      @change="onChange"
    >
      <div v-if="fileList.length < 1">
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">{{ '上传图片' }}</div>
      </div>
    </a-upload>
    <div class="iu-footer">
      <p class="iu-desc">{{pTitle}}</p>
      <p class="iu-desc">{{pTextLine0}}</p>
      <p class="iu-desc">{{pTextLine1}}</p>
    </div>
    <AModal class="iu-preview" :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <!-- <img style="width: 100%" :src="imageUrl" /> -->
      <AuthImage authStyle="width: 100%" :authSrc="imageUrl" />
    </AModal>
  </div>
</template>

<script>
/**
 * 图片上传控件
 */
import { mapState } from 'vuex'
import AuthImage from './AuthImage'

export default {
  name: 'ImageUpload',
  components: {
    AuthImage
  },

  props: {
    value: [String, Number],
    pDisabled: Boolean,
    pID: {
      type: Number,
      default: null
    },
    pWidth: {
      type: Number,
      default: 144
    },
    pHeight: {
      type: Number,
      default: 144
    },
    pModuleKey: String,
    pAccept: String,
    pTextLine0: {
      type: String,
      default() { return '支持扩展名：jpg、jpeg、png' }
    },
    pTextLine1: {
      type: String,
      default() { return '尺寸不超过850*1150px' }
    },
    pTitle: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...mapState([
      'curProject'
    ]),
    style () {
      return `width: ${this.pWidth}px; height: ${this.pHeight}px`
    },
    imageUrl() {
      if (!this.value) {
        return ''
      }
      return this.$apiUtil.getImageUrl(this.value)
    }
  },

  data () {
    return {
      fileList: [],
      uploadAction: '',
      headers: '',
      format: ['png', 'jpg', 'jpeg', 'svg', 'ico'],
      accept: this.pAccept || '.png,.jpg,.jpeg,.svg,.ico',
      filename: '',
      limitSize: 0,
      previewVisible: false,
      loading: false,
    }
  },

  watch: {
    value(val) {
      this.setFileId(val)
    }
  },

  created () {
    let uploadAction = this.$apiUtil.getUploadAction(this.pModuleKey, this.pID)
    this.uploadAction = uploadAction.action
    this.headers = uploadAction.headers
    this.filename = uploadAction.filename
    this.limitSize = uploadAction.limitSize
    this.setFileId(this.value)
  },

  methods: {
    removeFile(file) {
      this.$emit('remove')
    },
    setFileId(fileId) {
      if (fileId) {
        this.loadImage(fileId, (url) => {
          this.fileList = [
            {
              uid: '1',
              name: 'image.png',
              status: 'done',
              url: url //this.$apiUtil.getImageUrl(fileId)
            }
          ]
        })
      } else {
        this.fileList = []
      }
      this.$emit('input', fileId)
    },
    loadImage(fileId, callback) {
      let request = new XMLHttpRequest();
      request.responseType = 'blob';
      if(this.pID) {
        request.open('get', this.$apiUtil.getAgentImageUrl(fileId), true);
      }else {
        request.open('get', this.$apiUtil.getImageUrl(fileId), true);
      }
      request.setRequestHeader('token', this.headers.Token);
      request.onreadystatechange = (e) => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          let reader = new FileReader();
          reader.onload = function aa (event) {
            callback(event.target.result);
          }
          reader.readAsDataURL(request.response);
        }
      };
      request.send(null);
    },
    onChange (info) {
      if (!info.file.status) {
        // 是验证没有通过的文件, 如文件大小未通过
        return
      }
      this.fileList = info.fileList
      if (info.file.status === 'uploading') {
        this.loading = true
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
        console.log('ddd', info.file.response.resultCode);
        if (info.file.response.resultCode !== 0) {
          // 上传错误，清空当前值，并显示错误信息
          this.setFileId('')
          if (info.file.response.message) {
            this.$message.error(info.file.response.message)
          } else {
            this.$message.error('上传错误')
          }
        } else {
          // 上传成功
          this.setFileId(info.file.response.data.fileId)
        }
        this.loading = false
      }
      // 如果删除情况，清空值
      if (!this.fileList || this.fileList.length === 0) {
        this.setFileId('')
      }
    },
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
      if (this.limitSize) {
        valid = valid && file.size < this.limitSize
        if (!valid) {
          this.$message.error('文件超过大小');
          return valid
        }
      }

      return valid
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      if (this.imageUrl) {
        this.previewVisible = true
      }
    },
  }
}
</script>

<style lang="less">
@import 'variables.less';
@import 'mixins.less';
.iu-container {
  .iu-upload-container {
    width: 144px;
    height: 144px;
    background-color: #FCFCFD;
    border: 1px #E7E7E7 solid;
    text-align: center;
    line-height: 144px;
    position: relative;
    .iu-upload {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      color: #677391;
      font-size: @small-font-size;
      padding: 34px 0px;
      .iu-add-img {
        margin-bottom: 20px;
      }
      > p {
        line-height: 1;
      }
    }
    .iu-img {
      width: auto;
      height: 100%;
    }
  }
  .iu-footer {
    margin-top: 5px;
    .iu-desc {
      margin-bottom: 0px;
      line-height: 1.5;
      font-size: @font-size-small;
      color: #9B9B9B;
      // .text-overflow();
    }
  }
}
.iu-container .iu-footer .iu-desc {
    margin-bottom: 0px;
    line-height: 1.5;
    font-size: 12px;
    color: #99A2B7;
}
.iu-preview .ant-modal-close {
  top: -14px;
  right: -14px;
}
</style>
