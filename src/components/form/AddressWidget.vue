<template>
  <div>
    <ACascader
      placeholder="请选择"
      :options="options"
      @change="onAreaChange"
      :loadData="loadAreaData"
      :showSearch="{filter}"
      v-model="widgetVal.region"
      :style="{width: field.width || '320px'}"
      :getPopupContainer="getPopupContainer()"
    ></ACascader>
    <ATextarea
      :style="{marginTop: '6px', minHeight: '68px', resize: 'none', width: field.width || '320px'}"
      v-model="widgetVal.address"
      placeholder="详细地址"
      :maxLength="field.maxLength"
    ></ATextarea>
  </div>
</template>
<script>
import OptionsMixin from '@/common/OptionsMixin'
import BaseWidget from './BaseWidget'

/**
 * @brief:
 * @format: {area: [province, city, district], address: ''}
 */
export default {
  name: 'AddressWidget',
  extends: BaseWidget,
  mixins: [OptionsMixin],
  inject: ['popupContainer'],
  data() {
    return {
      options: [],
    }
  },
  created () {
    this.get_all_province_list().then((data) => {
      this.options = data
    })
  },
  methods: {
    /**
     * json值修改触发
     * @param jsonVal
     * @param jsonModel
     * @param oldJsonVal
     * @param source
     */
    onJsonChange(jsonVal, jsonModel, oldJsonVal, source) {
      if (source === 'json' && jsonVal.region && jsonVal.region.length === 3) {
        this.initProvinceOptions(jsonVal.region)
      }
    },
    // 省市区搜索条件函数
    filter(inputValue, path) {
      return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    // 地址信息改变响应函数
    onAreaChange (value, selectedOptions) {
      this.formModel.region = selectedOptions.map((option) => {
        return option.value
      })
      if (selectedOptions.length > 2) {
        this.formModel.districtNo = selectedOptions[1].districtNo
        this.$refs.form.validateField('districtNo')
      }
    },
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['address']
    },
    /**
     * json到widget值类型转换
     */
    jsonToWidget (jsonVal) {
      if (!jsonVal) {
        return {}
      }
      return JSON.parse(JSON.stringify(jsonVal))
    },
    /**
     * 加载区域数据
     * @param selectedOptions
     */
    loadAreaData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      // console.log(selectedOptions, selectedOptions.length)
      if (selectedOptions.length === 1) {
      // if (selectedOptions[0].value.length === 2 && !selectedOptions[1]) {
        this.get_city_list_by_province(targetOption.areaCode).then((data) => {
          targetOption.loading = false
          targetOption.children = data
          this.options = [...this.options]
        })
      // } else if (selectedOptions[1] && selectedOptions[1].value.length === 4) {
      } else if (selectedOptions.length === 2) {
        this.get_area_list_by_city(targetOption.areaCode).then((data) => {
          targetOption.loading = false
          targetOption.children = data
          this.options = [...this.options]
        })
      }
    },
    /**
     * 初始化省options
     * @param region
     */
    initProvinceOptions (region) {
      this.get_all_province_list().then((data) => {
        this.options = data
        for (let option of data) {
          if (option.areaCode === region[0]) {
            this.initCityOtpions(option, region)
            break
          }
        }
      })
    },
    /**
     * 初始化市options
     * @param option
     * @param region
     */
    initCityOtpions (option, region) {
      this.get_city_list_by_province(option.areaCode).then((data) => {
        option.loading = false
        option.children = data
        for (let cityOption of data) {
          if (cityOption.areaCode === region[1]) {
            this.initAreaOptions(cityOption, region)
            break
          }
        }
      })
    },
    /**
     * 初始化区options
     * @param option
     * @param region
     */
    initAreaOptions (option, region) {
      this.get_area_list_by_city(option.areaCode).then((data) => {
        option.loading = false
        option.children = data
        this.widgetVal.region = [...region]
        this.options = [...this.options]
      })
    },
    /**
     * 校验规则定义
     * @returns {{validator: validator, trigger: string, required: *}[]}
     */
    rules () {
      let ruleItem = {
        required: this.field.required,
        trigger: this.ruleTrigger(),
        validator: (rule, value, callback) => {
          if (!rule.required) {
            callback()
          }
          if (!value.region || value.region.length !== 3) {
            callback(new Error('请选择省市区'))
          } else if (!value.address) {
            callback(new Error('请输入详细地址'))
          } else {
            callback()
          }
        },
      }
      return [ruleItem]
    },
    /**
     * 获取弹出框container
     * @returns {(function(): default.methods.$refs.footer.parentElement.previousElementSibling|default.methods.$el)|(function(): HTMLElement)}
     */
    getPopupContainer () {
      if (this.popupContainer) {
        return () => {
          return this.popupContainer()
        }
      } else {
        return () => document.body
      }
    }
  },
}
</script>
