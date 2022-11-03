<template>
  <span v-if="field.readonly">{{ jsonVal }}</span>
  <AUpload
    v-else
    :name="field.filename"
    :method="field.method"
    :action="field.action"
    :customRequest="field.customRequest"
    :beforeUpload="field.beforeUpload"
    :defaultFileList="fileList"
    @change="handleChange"
  >
    <AButton>
      <AIcon :type="field.loading ? 'loading' : 'upload'" />
      {{field.uploadText || '上传文件' }}
    </AButton>
  </AUpload>
</template>
<script>
import BaseWidget from './BaseWidget'

/**
 * @brief: 上传控件
 * @format: {id: 1, uid: '1', name: 'xxx.png', status: 'done', url: 'http://www.baidu.com/xxx.png'}
 * @note: id 是业务逻辑的资源id，uid、name、status是控件需要，url是业务逻辑服务器给与的显示图片地址
 */

export default {
  name: 'UploadWidget',
  extends: BaseWidget,
  supportReadonly: true,
  data() {
    return {
      fileList: [
        // {
        //   uid: '1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   response: 'Server Error 500', // custom error message to show
        //   url: 'http://www.baidu.com/xxx.png',
        // },
        // {
        //   uid: '2',
        //   name: 'zzz.png',
        //   status: 'error',
        //   response: 'Server Error 500', // custom error message to show
        //   url: 'http://www.baidu.com/zzz.png',
        // },
      ],
    }
  },
  methods: {
    /**
     * 上传触发回调
     * @param info
     */
    handleChange(info) {
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
        this.fileList = info.fileList
        if (this.field.onUploadDone) {
          this.field.onUploadDone(info)
        }
        this.field.loading = false
      }
    },
  },
}
</script>
