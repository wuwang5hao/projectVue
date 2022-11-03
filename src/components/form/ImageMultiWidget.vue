<template>
  <div>
    <div v-if="field.readonly" >
      <img
        v-for="(image, index) in widgetVal" :key="index" :src="image.url" :title="image.alt"
        :style="{width: '72px', height: '72px', marginRight: '28px', cursor: 'pointer'}"
        @click="onRoClicked(image)"
      />
    </div>
    <div v-else class="image-list">
      <div v-for="(image, index) in widgetVal" :key="index" class="img-wrap">
        <div class="img-box">
          <img
            :src="image.url" :style="{width: '104px', height: '104px'}"
            class="cover-img"
          />
          <div class="image-remove" @click="removeImage(image, index)"></div>
        </div>
        <AInput
          v-model="image.alt"
          placeholder="请输入标签"
          class="alt"
          :maxLength="field.label_maxLength"
        />
      </div>
      <AUpload
        listType="picture-card"
        :show-upload-list="false"
        @preview="handlePreview"
        @change="handleChange"
        :headers="field.headers"
        :method="field.method"
        :action="field.action"
        :name="field.filename"
        :customRequest="field.customRequest"
        :beforeUpload="onBeforeUpload"
        :accept="accept"
        :disabled="field.uploading"
        :style="{display: 'flex'}"
      >
        <div v-if="widgetVal.length < field.maxCount">
          <a-icon :type="field.loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">{{ field.uploadText || '上传图片' }}</div>
        </div>
      </AUpload>
    </div>
    <AModal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="previewImage" />
    </AModal>
  </div>
</template>
<script>
import {imgUtil} from 'jscom/utils/imgutil'
import BaseWidget from './BaseWidget'

/**
 * @brief: 多图片控件
 * @format: [{id: '', url: 'xxx', name: 'xxx', alt: 'xxx'}, ...]
 */
export default {
  name: 'ImageMultiWidget',
  extends: BaseWidget,
  supportReadonly: true,
  defaultValue: () => { return [] },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      accept: this.pField.accept || '.svg,.jpg,.jpeg,.png,.ico'
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['obj_list', 'image_list']
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
     * 从控件文件列表生成widgetVal
     */
    genWidgetValFromFileList(fileList) {
      if (!fileList) return []
      for (let [index, item] of fileList.entries()) {
        index = parseFloat(index)
        if (!('uid' in item)) {
          item.uid = index + 1
        }
        if (item.alt === undefined) {
          item.alt = ''
        }
        if (!item.id) {
          continue
        } else if (!item.url || (!item.url.startsWith('data:') && !item.url.startsWith('http'))) {
          item.url = `${this.$apiUtil.baseUrl()}/base/file/v1/image/${item.id}`
        }
      }
      return fileList
    },
    /**
     * 上传文件触发
     */
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.field.loading = true
        return;
      }
      if (info.file.status === 'done') {
        imgUtil.getBase64(info.file.originFileObj, (imageUrl) => {
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
          } else {
            // 上传成功
            this.widgetVal.push({
              id: info.file.response.data.fileId,
              name: `${info.file.response.name}`,
              uid: this.widgetVal.length + 1,
              url: imageUrl,
              alt: '',
            })
          }

          this.field.loading = false
        })

        if (this.field.onUploadDone) {
          this.field.onUploadDone(this.widgetVal, info)
        }
        this.field.loading = false
      }
    },
    /**
     * 预览取消
     */
    handleCancel() {
      this.previewVisible = false;
    },
    /**
     * 预览触发
     */
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await imgUtil.getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    /**
     * 只读点击触发
     */
    onRoClicked(image) {
      this.previewImage = image.url
      this.previewVisible = true
    },
    /**
     * 删除图片触发
     */
    removeImage(image, index) {
      this.widgetVal.splice(index, 1)
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
<style lang="less" scoped>
.image-list {
  display: flex;

  .img-wrap {
    .img-box:last-child {
      margin-right: 0px;
    }
    .img-box {
      display: inline-block;
      position: relative;
      margin-right: 30px;

      .cover-img{
      }

      .image-remove {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABMklEQVQ4T2NkYGBoYKAcfGdgYDjLwMCwn5FKBsKcdITaBn6ntoEM9DGQj4+POSoqSnbGjBkPsMVXQkKC7M6dO18+f/78F7o8VhdmZGQoTJkyJbq9vX1DbW3tVWRN+fn5yj09PeEtLS3rGxsbrxNlIEhRc3OzdmVlZQCyoTDD5s6duysjI+MMNtfjDUNkQ9+8efMD5DJ8hoEsIBgpMENBiufMmbMTl8tgriVoIMibvb29EYyMjIxtbW3r0cOU6DAEKUQOs9evX39HD1OSwhBbBGCLKKJcCEpns2fPjsUWATBDKysrV3V3d98mykBJSUm2tLQ0ZWzpDGRAaWmp6oYNG57evn37G1EGUlKaEYxlUg0HGVjOwMDASapGXOpBBrowMDDYUNNAZgYGBkcGBgZjargUAHoellOQxovtAAAAAElFTkSuQmCC);
        cursor: pointer;
        width: 20px;
        height: 20px;
        top: 0px;
        right: 0px;
        display: block;
        position: absolute;
      }
    }

    .alt {
      width: 104px;
      margin-top: 9px;
    }
  }
}
</style>
