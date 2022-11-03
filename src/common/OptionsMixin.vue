<script>
/**
 * 软件服务模块插件，多个共用接口的调用
 */
export default {
  name: 'OptionsMixin',

  methods: {
    getServiceOptionList () {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getSoftwareServiceApi()
        api.get_software_service_option_list({}).then(({data}) => {
          let serviceList = data.list
          serviceList.forEach((item) => {
            item.value = item.id
            item.label = item.serviceName
          })
          resolve(serviceList)
        }).catch((error) => {

        })
      })
    },
    getModuleOptionList (serviceId) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getSoftwareServiceApi()
        api.get_software_service_module_option_list({
          id: serviceId, serviceId: serviceId}).then(({data}) => {
          let moduleList = data.list
          moduleList.forEach((item) => {
            item.value = item.id
            item.label = item.moduleName
          })
          resolve(moduleList)
        }).catch((error) => {

        })
      })
    },
    // 树状
    getModuleFeatureOptionList (moduleId) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getAuthorityApi()
        api.get_software_service_module_function_option_list({
          service_module_id: moduleId, serviceModuleId: moduleId
        }).then(({data}) => {
          let featureList = data.functionList
          featureList.forEach((item) => {
            item.key = item.id
            item.title = item.functionName
            item.value = item.id
            item.label = item.functionName
          })
          resolve(featureList)
        }).catch((error) => {

        })
      })
    },
    getServiceModuleOptionList (disableNoModule=false) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getSoftwareServiceApi()
        api.get_software_service_and_module_option_list({}).then(({data}) => {
          let serviceList = data
          serviceList.forEach((item) => {
            item.value = item.serviceId
            item.label = item.serviceName
            if (item.moduleList) {
              item.moduleList.forEach((moduleItem) => {
                moduleItem.value = moduleItem.moduleId
                moduleItem.label = moduleItem.moduleName
              })
              item.children = item.moduleList
            } else {
              if (disableNoModule) {
                item.disabled = true
              }
            }
          })
          resolve(serviceList)
        }).catch((error) => {

        })
      })
    },
    // hardware options
    // 硬件品牌选择列表取得
    getHardwareBrandOptionList() {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_brand_option_list({}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.brandName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件系列选择列表取得
    getHardwareSeriesOptionList(brandId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_series_option_list({brandId}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.seriesName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件产品选择列表取得
    getHardwareProductOptionList(seriesId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_product_option_list({seriesId}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.productName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件型号选择列表取得
    getHardwareModelOptionList(productId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_model_option_list({productId}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.modelName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件产品选择列表取得（根据系列编号取得）
    getHardwareProductOptionListByNo(seriesNo) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_product_option_list_by_no({seriesNo}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.productName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件产品选择列表取得（全部）
    getHardwareProductAllOptionList () {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_product_all_option_list({}).then(({data}) => {
          let brandList = data
          brandList.forEach((brand) => {
            brand.value = brand.brandId
            brand.label = brand.brandName
            if (brand.seriesList) {
              brand.seriesList.forEach((series) => {
                series.value = series.seriesId
                series.label = series.seriesName
                if (series.productList) {
                  series.productList.forEach((product) => {
                    product.value = product.productId
                    product.label = product.productName
                  })
                  series.children = series.productList
                } else {
                  series.disabled = true
                }
              })
              brand.children = brand.seriesList
            } else {
              brand.disabled = true
            }
          })
          resolve(brandList)
        })
      })
    },
    // 硬件型号选择列表取得（根据产品编号取得）
    getHardwareModelOptionListByNo(productNo) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_model_option_list_by_no({productNo}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.modelName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件序列号库中品牌选择列表取得
    getHardwareSerialBrandOptionList() {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_serial_brand_option_list({}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.brandName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件序列号库中系列选择列表取得
    getHardwareSerialSeriesOptionList(brandId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_serial_series_option_list({brandId}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.seriesName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件序列号库中产品选择列表取得
    getHardwareSerialProductOptionList(seriesId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_serial_product_option_list({seriesId}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.productName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件序列号库中型号选择列表取得
    getHardwareSerialModelOptionList(productId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_serial_model_option_list({productId}).then(({data}) => {
          data.list.forEach((item) => {
            item.label = item.modelName
            item.value = item.id
          })
          resolve(data.list)
        })
      })
    },
    // 硬件系列选择列表取得（全部）
    getHardwareSeriesAllOptionList() {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_series_all_option_list({}).then(({data}) => {
          data.forEach((item) => {
            item.label = item.brandName
            item.value = item.brandId
            if (item.seriesList) {
              item.seriesList.forEach((item1) => {
                item1.label = item1.seriesName
                item1.value = item1.seriesId
              })
              item.children = item.seriesList
            } else {
              item.children = []
            }
          })
          resolve(data)
        })
      })
    },
    // 硬件型号规约驱动选择列表取得
    getProtocls() {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_protocls({}).then(({data}) => {
          data.forEach((item) => {
            item.label = item.protoclName
            item.value = item.id
          })
          resolve(data)
        })
      })
    },
    // 硬件产品选择列表取得（已发布列表）
    getHardwareProductPublishAllOptionList () {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_product_publish_all_option_list({}).then(({data}) => {
          let brandList = data
          brandList.forEach((brand) => {
            brand.value = brand.brandId
            brand.label = brand.brandName
            if (brand.seriesList) {
              brand.seriesList.forEach((series) => {
                series.value = series.seriesId
                series.label = series.seriesName
                if (series.productList) {
                  series.productList.forEach((product) => {
                    product.value = product.productId
                    product.label = product.productName
                  })
                  series.children = series.productList
                }
              })
              brand.children = brand.seriesList
            }
          })
          resolve(brandList)
        })
      })
    },
    // 硬件序列号库中型号选择列表取得
    getHardwareModelPublishOptionList(productId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getHwApi().get_hardware_model_publish_option_list(
          {productId: productId, p_productId: productId}
        ).then(({data}) => {
          if (!data.modelList) {
            resolve({modelList: [], product_unique_flag: data.productUniqueFlag})
          } else {
            data.modelList.forEach((item) => {
              item.label = item.modelName
              item.value = item.id
            })
            resolve({modelList: data.modelList, product_unique_flag: data.productUniqueFlag})
          }
        })
      })
    },
    // 取得设备品牌下拉列表
    get_device_brand_option_list() {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getDeviceApi().get_device_brand_option_list({}).then(({data}) => {
          data.deviceBrandList.forEach((item) => {
            item.label = item.brandName
            item.value = item.deviceBrandId
          })
          resolve(data.deviceBrandList)
        })
      })
    },
    // 根据设备品牌取得设备类型下拉列表
    // 从[设备型号表]中取得该关系。
    get_device_type_option_list_by_brand(deviceBrandId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getDeviceApi().get_device_type_option_list_by_brand({deviceBrandId}).then(({data}) => {
          data.deviceTypeList.forEach((item) => {
            item.label = item.typeName
            item.value = item.deviceTypeId
          })
          resolve(data.deviceTypeList)
        })
      })
    },
    // 根据设备品牌和类型取得设备型号下拉列表
    // 从[设备型号表]中取得该关系。
    get_device_model_option_list_by_brand_or_type(deviceTypeId, deviceBrandId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getDeviceApi().get_device_model_option_list_by_brand_or_type({
          deviceTypeId, deviceBrandId
        }).then(({data}) => {
          data.deviceModelList.forEach((item) => {
            item.label = item.modelName
            item.value = item.deviceModelId
          })
          resolve(data.deviceModelList)
        })
      })
    },
    getAllTypeCodeList () {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getDictApi()
        api.get_all_type_code_list({}).then(({data}) => {
          let codeList = data.list
          codeList.forEach((item) => {
            item.label = item.typeName
            item.value = item.typeCode
          })
          resolve(codeList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 获取一览查询条件中的类型下拉列表
    // 接口名：base/dictionary/v1/get_data_dictionary_type_options
    get_data_dictionary_type_options() {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getDictApi()
        api.get_data_dictionary_type_options({}).then(({data}) => {
          let codeList = data.list
          codeList.forEach((item) => {
            item.label = item.typeName
            item.value = item.typeCode
          })
          resolve(codeList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 获取全省列表
    get_all_province_list() {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getAreaApi()
        api.get_all_province_list({}).then(({data}) => {
          let provinceList = data.provinceList
          provinceList.forEach((item) => {
            item.label = item.areaName
            item.value = item.areaCode
            item.isLeaf = false
          })
          resolve(provinceList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 获取省下全市
    get_city_list_by_province(typeCode) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getAreaApi()
        api.get_city_list_by_province({parent_area_code: typeCode, parentAreaCode: typeCode}).then(({data}) => {
          let cityList = data.cityList
          cityList.forEach((item) => {
            item.label = item.areaName
            item.value = item.areaCode
            item.isLeaf = false
          })
          resolve(cityList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 获取市下全区
    get_area_list_by_city(typeCode) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getAreaApi()
        api.get_area_list_by_city({parent_area_code: typeCode, parentAreaCode: typeCode}).then(({data}) => {
          let areaList = data.areaList
          areaList.forEach((item) => {
            item.label = item.areaName
            item.value = item.areaCode
            item.isLeaf = true
          })
          resolve(areaList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // ENINDSTY 企业行业
    get_code_list_by_code(typeCode) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getDictApi()
        api.get_code_list_by_code({type_code: typeCode, typeCode: typeCode}).then(({data}) => {
          let codeList = data.list
          codeList.forEach((item) => {
            item.label = item.keyValue
            item.value = item.code
          })
          resolve(codeList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getAllRoles() {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getRoleApi()
        api.get_all_roles({}).then(({data}) => {
          data.list.forEach((item) => {
            item.value = item.id
            item.label = item.name
          })
          resolve(data.list)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 已购买软件服务下拉列表
    getBuyServiceOptionList (enterpriseId) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getEnterpriseApi()
        api.get_software_service_option_list({enterpriseId: enterpriseId}).then(({data}) => {
          let serviceList = data
          serviceList.forEach((item) => {
            item.value = item.serviceNo
            item.label = item.serviceName
          })
          resolve(serviceList)
        }).catch((error) => {

        })
      })
    },
    // 已购买软件服务模块下拉列表
    getBuyModuleOptionList (enterpriseId, serviceNo) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getEnterpriseApi()
        api.get_software_module_option_list(
          {enterpriseId: enterpriseId, serviceNo: serviceNo}
        ).then(({data}) => {
          let moduleList = data
          moduleList.forEach((item) => {
            item.value = item.moduleNo
            item.label = item.moduleName
          })
          resolve(moduleList)
        }).catch((error) => {

        })
      })
    },
    // 硬件品牌选择列表取得
    getBuyHardwareBrandOptionList(enterpriseId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getEnterpriseApi().get_hardware_brand_option_list(
          {enterpriseId: enterpriseId}
        ).then(({data}) => {
          data.forEach((item) => {
            item.label = item.brandName
            item.value = item.brandId
          })
          resolve(data)
        })
      })
    },
    // 硬件系列选择列表取得
    getBuyHardwareSeriesOptionList(enterpriseId, brandId) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getEnterpriseApi().get_hardware_series_option_list(
          {enterpriseId, brandId}
        ).then(({data}) => {
          data.forEach((item) => {
            item.label = item.seriesName
            item.value = item.seriesNo
          })
          resolve(data)
        })
      })
    },
    // 硬件产品选择列表取得
    getBuyHardwareProductOptionList(enterpriseId, seriesNo) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getEnterpriseApi().get_hardware_product_option_list(
          {enterpriseId, seriesNo}
        ).then(({data}) => {
          data.forEach((item) => {
            item.label = item.productName
            item.value = item.productNo
          })
          resolve(data)
        })
      })
    },
    // 硬件型号选择列表取得
    getBuyHardwareModelOptionList(enterpriseId, productNo) {
      return new Promise((resolve, reject) => {
        this.$apiUtil.getEnterpriseApi().get_hardware_model_option_list(
          {enterpriseId, productNo}
        ).then(({data}) => {
          data.forEach((item) => {
            item.label = item.modelName
            item.value = item.modelNo
          })
          resolve(data)
        })
      })
    },
    protocol_setting_publish_lists() {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getDeviceApi()
        api.protocol_setting_publish_lists({}).then(({data}) => {
          data.forEach((item) => {
            item.value = item.protocolSettingId
            item.label = item.protocolName
          })
          resolve(data)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    protocol_setting_lists(id) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getProtocolApi()
        api.protocol_setting_lists({id: id, p_id: id}).then(({data}) => {
          data.protocolList.forEach((item) => {
            item.value = item.id
            item.label = item.protocolName
          })
          resolve(data.protocolList)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getCollectionFunctionIdOptions() {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getDeviceApi()
        api.energy_consumption_type_list({}).then(({data}) => {
          data.forEach((item) => {
            item.value = item.energyConsumptionTypeNo
            item.label = item.energyConsumptionTypeName
          })
          resolve(data)
        })
      })
    },
    getCollectFunctionOptions(energyConsumptionTypeNo) {
      return new Promise((resolve, reject) => {
        let api = this.$apiUtil.getDeviceApi()
        api.collect_function_list({energyConsumptionTypeNo}).then(({data}) => {
          data.forEach((item) => {
            item.value = item.collectFunctionNo
            item.label = item.collectFunctionName
          })
          resolve(data)
        })
      })
    }
  },
}
</script>
