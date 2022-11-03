<template>
  <div>
    <div v-if="field.readonly">
      <div class="umw-item"  v-for="(item, index) in widgetVal" :key="index">
        <a :href="item.url" target="_blank">{{item.name}}</a>
      </div>
    </div>
    <AUpload
      v-else
      :show-upload-list="true"
      @change="handleChange"
      :headers="field.headers"
      :method="field.method"
      :action="field.action"
      :name="field.filename"
      :customRequest="field.customRequest"
      :fileList="fileList"
      :disabled="field.loading"
      :multiple="true"
      :accept="accept"
      :beforeUpload="onBeforeUpload"
    >
      <AButton class="button-item" v-if="widgetVal.length < field.maxCount">
        <div class="upload-icon"  />
        {{field.uploadText || '上传文件' }}
      </AButton>
    </AUpload>
  </div>
</template>
<script>
import BaseWidget from './BaseWidget'

/**
 * @brief: 多文件控件
 * @format: [{id: '', url: 'xxx', name: 'xxx'}, ...]
 */
export default {
  name: 'UploadMultiWidget',
  extends: BaseWidget,
  supportReadonly: true,
  defaultValue: () => { return [] },
  data() {
    let jsonVal = this.getJsonVal()
    let widgetVal = this.jsonToWidget(jsonVal)
    let fileList = widgetVal
    return {
      jsonVal,
      widgetVal,
      fileList,
      accept: this.pField.accept || 'doc,.docx,.xls,.xlsx,.pdf,.txt',
    }
  },
  watch: {
    widgetVal(val) {
      this.fileList = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['obj_list', 'file_list']
    },
    /**
     * json到widget值类型转换
     */
    jsonToWidget(jsonVal) {
      if (!jsonVal) return []
      else {
        jsonVal = this.genWidgetValFromFileList(jsonVal)
        return jsonVal
      }
    },
    /**
     * widget到json值类型转换
     * @param val
     * @returns {boolean|*[]|*}
     */
    widgetToJson(widgetVal) {
      if (!widgetVal) return []
      else return widgetVal
    },
    /**
     * 通过控件文件列表生成 widgetVal
     */
    genWidgetValFromFileList(fileList) {
      if (!fileList) return []
      for (let [index, item] of fileList.entries()) {
        index = parseFloat(index)
        if (!('uid' in item)) {
          item.uid = index + 1
        }
        if (!item.id) {
          continue
        } else if (!item.url || (!item.url.startsWith('data:') && !item.url.startsWith('http'))) {
          item.url = `${this.$apiUtil.baseUrl()}/base/file/v1/down/${item.id}`
        }
      }
      return fileList
    },
    /**
     * 文件上传触发
     */
    handleChange(info) {
      if (!info.file.status) {
        // 是验证没有通过的文件, 如文件大小未通过
        return
      }
      this.fileList = info.fileList
      if (info.file.status === 'removed') {
        this.widgetVal = info.fileList
        return
      }
      if (info.file.status === 'uploading') {
        this.field.loading = true
        return
      }
      if (info.file.status === 'error' && info.file.error.status === 401) {
        this.$message.error(info.file.response.message || '请重新登录')
        this.$router.push('/login')
        return
      }
      if (info.file.status === 'done') {
        if (!this.widgetVal) { this.widgetVal = [] }
        // response:Object
        //  message:"文件尺寸超出120*60px"
        //  resultCode:1
        if (info.file.response.resultCode !== 0) {
          // 上传错误，清空当前值，并显示错误信息
          if (info.file.response.message) {
            this.$message.error(info.file.response.message)
          } else {
            console.log(info.file)
            this.$message.error('上传错误')
          }
        }
        let uploadingFiles = this.fileList.filter((item) => { return item.status === 'uploading'})
        if (uploadingFiles.length === 0) {
          this.widgetVal = this.fileListToWidgetVal(this.fileList)
          this.field.loading = false
        }

        if (this.field.onUploadDone) {
          this.field.onUploadDone(info)
        }
      }
    },
    /**
     * 文件列表转化为widgetVal
     */
    fileListToWidgetVal(fileList) {
      let result = []
      for (let item of fileList) {
        if (item.id !== undefined) {
          result.push(item)
        } else if (item.response) {
          result.push({
            id: item.response.data.fileId,
            name: `${item.name}`,
          })
        } else if (item.status === 'done') {
          result.push(item)
        }
      }
      result = this.genWidgetValFromFileList(result)
      result = result.slice(-1 * (this.field.maxCount || 2))
      return result
    },
    /**
     * 默认校验规则
     * @returns {{validator: validator, trigger: string, message: (*|string), required: *}}
     */
    defaultRule() {
      return {
        required: this.field.required,
        message: this.ruleMessage(),
        trigger: this.ruleTrigger(),
        validator: (rule, value, callback) => {
          if (rule.required) {
            if (!value || value.length === 0) {
              callback(new Error('请输入'))
              return
            }
          }
          callback()
        }
      }
    },
    /**
     * 控件上传前触发
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
<style lang="less" scoped>
.umw-item {
  height: 24px;
  > a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.button-item {
  display: flex;
  align-items: center;
}
.upload-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  display: inline-block;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAAA8UlEQVQ4EWNgwAOYjz2azHzsYRoeJbilgJqnMB198J/p2MN/+AxhwmYESPN/hv9ZDIwMl4DyD/4zMMzAZQiGATDNjAwMGYwMjA+B9BUgPQ2XISgGsBx94ASyGaT5r5X8LJjr/lrJ5UANmcB17pEUTBwrzXb0kQ5MAujsTSAM47OdeqgNY8NoFBeABH9Zy12BSaLTv8zkr6KLYRiAroAQf+ANYAEG0maQM4Gh7kvIucjyMH0syIKY7P9/MMVQRfAa8NdKIQhVOSaP4kAEu+D///8+oIyDaT5uEaAeBkZGxi0swCQ6BZhpwAGJWzl2GVBeAQD2vVII19R7SQAAAABJRU5ErkJggg==");
}
</style>
