<template name="base-info">
  <div class="base-info">
    <h3 class="base-info-title">索引信息</h3>
    <GridForm
      class="base-info-form"
      ref="baseInfoForm"
      :pFields="baseInfoFields"
      :pJsonModel="baseInfoJsonModel"
      :pLayout="{
        labelCol: { style: { width: '110px', paddingRight: '8px', float: 'left' } },
        wrapperCol: { style: { width: 'calc(100% - 110px)', float: 'left' } }
      }"
    />
    <h3 class="base-info-title">数据库信息</h3>
    <GridForm
      class="base-info-form"
      ref="databaseForm"
      :pFields="databaseFields"
      :pJsonModel="databaseJsonModel"
      :pLayout="{
        labelCol: { style: { width: '110px', paddingRight: '8px', float: 'left' } },
        wrapperCol: { style: { width: 'calc(100% - 110px)', float: 'left' } }
      }"
    />
    <h3 class="base-info-title">地域信息/适用范围</h3>
    <GridForm
      class="base-info-form"
      ref="areaForm"
      :pFields="areaFields"
      :pJsonModel="areaJsonModel"
      :pLayout="{
        labelCol: { style: { width: '110px', paddingRight: '8px', float: 'left' } },
        wrapperCol: { style: { width: 'calc(100% - 110px)', float: 'left' } }
      }"
    />
    <h3 class="base-info-title">审查信息</h3>
    <GridForm
      class="base-info-form"
      ref="reviewForm"
      :pFields="reviewFields"
      :pJsonModel="reviewJsonModel"
      :pLayout="{
        labelCol: { style: { width: '110px', paddingRight: '8px', float: 'left' } },
        wrapperCol: { style: { width: 'calc(100% - 110px)', float: 'left' } }
      }"
    />
  </div>
</template>
<script>
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';
import GridForm from '@/components/form/GridForm';
import { formatterOption} from 'jscom/utils/vueutil';
import {uniqBy} from 'lodash';

export default {
  name: 'BaseInfoModal',
  mixins: [FormMixin, OptionsMixin],
  props: {
    pStepInfo: {
      type: Object,
      default: () => {}
    },
    isReadyOnly: {
      type: Boolean,
      default: false,
    },
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: type => ['add', 'update', 'view'].indexOf(type) !== -1
    },
  },
  components: {
    GridForm
  },

  data() {
    return {
      databaseTypeOptions: [],
      databaseNameOptions: [],
      databaseEditionOptions: [],
      emissionFactorTypeList: [],
      greenhouseGasTypeOption: [],
      emissionFactorTypeOption: [],
      dataTypeOption: [],
      emissionLinkOption: []
    };
  },
  computed: {
    baseInfoJsonModel () { return this.pStepInfo.baseInfoForm},
    databaseJsonModel () { return this.pStepInfo.databaseForm},
    areaJsonModel () { return this.pStepInfo.areaForm},
    reviewJsonModel () { return this.pStepInfo.reviewForm},
    baseInfoFields() {
      let list = [
        {
          label: '数据ID',
          type: 'str',
          name: 'id',
          width: 'calc(100% - 20px)',
          // disabled: true,
          span: 8,
          readonly: true
        },
        {
          label: '索引',
          type: 'str',
          name: 'emissionFactorTypeId',
          widget: 'TreeSelectWidget',
          treeData: this.emissionFactorTypeList,
          width: 'calc(100% - 20px)',
          required: true,
          span: 8,
          readonly: this.isReadyOnly,
          readTitle: this.pStepInfo.baseInfoForm?.emissionFactorTypeNoSerialNumberIndexName
        },
        {
          label: '排放源',
          type: 'str',
          name: 'emissionSource',
          width: 'calc(100% - 20px)',
          required: true,
          span: 8,
          maxLength: 10,
          readonly: this.isReadyOnly
        },
        {
          label: '排放气体',
          type: 'str',
          name: 'emissionGreenhouseGasTypeId',
          widget: 'TreeSelectWidget',
          treeData: this.greenhouseGasTypeOption,
          width: 'calc(100% - 20px)',
          required: true,
          span: 8,
          readonly: this.isReadyOnly,
          readTitle: this.pStepInfo.baseInfoForm?.emissionGreenhouseGasTypeName,
          onChange: (val, pJsonModel) => {
            pJsonModel.emissionGreenhouseGasType = this.greenhouseGasTypeOption.find(v => v.value === val)?.title
          }
        },
        {
          label: '排放环节',
          type: 'str',
          name: 'emissionLink',
          widget: 'SelectWidget',
          options: this.emissionLinkOption,
          mode: 'tags',
          maxTagsCount: 1,
          required: true,
          span: 8,
          width: 'calc(100% - 20px)',
          readonly: this.isReadyOnly
        }
      ];
      return list;
    },
    databaseFields() {
      return [
        {
          label: '数据库类型',
          type: 'str',
          name: 'databaseType',
          widget: 'SelectWidget',
          options: this.databaseTypeOptions,
          width: 'calc(100% - 20px)',
          required: true,
          onChange: (val, pJsonModel) => {
            pJsonModel.databaseName = null;
            pJsonModel.databaseEdition = null;
            this.databaseEditionOptions = [];
            this.getDatabaseNameOption(val); // 数据库名称
          },
          span: 24,
          readonly: this.isReadyOnly
        },
        {
          label: '数据库',
          type: 'str',
          name: 'databaseName',
          widget: 'SelectWidget',
          options: this.databaseNameOptions,
          width: 'calc(100% - 20px)',
          required: true,
          onChange: (val, pJsonModel) => {
            pJsonModel.databaseEdition = null;
            this.databaseEditionOptions = [];
            pJsonModel.databaseName&&this.getDatabaseEditionOption(pJsonModel.databaseType, val); // 数据库版本
          },
          span: 8,
          readonly: this.isReadyOnly
        },
        {
          label: '数据库版本',
          type: 'str',
          name: 'databaseEdition',
          widget: 'SelectWidget',
          options: this.databaseEditionOptions,
          width: 'calc(100% - 20px)',
          required: true,
          onChange: (val, pJsonModel) => {
            pJsonModel.emissionFactorDatabaseId = val;
          },
          span: 8,
          readonly: this.isReadyOnly
        }
      ];
    },
    areaFields() {
      return [
        {
          label: '国家',
          type: 'str',
          name: 'country',
          width: 'calc(100% - 20px)',
          span: 8,
          maxLength: 30,
          readonly: this.isReadyOnly
        },
        {
          label: '地区',
          type: 'str',
          name: 'region',
          width: 'calc(100% - 20px)',
          span: 8,
          maxLength: 30,
          readonly: this.isReadyOnly
        }
      ];
    },
    reviewFields() {
      return [
        {
          label: '数据类型',
          type: 'str',
          name: 'dataType',
          widget: 'SelectWidget',
          options: this.dataTypeOption,
          width: 'calc(100% - 20px)',
          required: true,
          span: 8,
          readonly: this.isReadyOnly
        },
        {
          label: '排放因子分类',
          type: 'str',
          name: 'emissionFactorType',
          widget: 'SelectWidget',
          options: this.emissionFactorTypeOption,
          width: 'calc(100% - 20px)',
          required: true,
          span: 8,
          readonly: this.isReadyOnly,
          maxLength: 15,
        },
        {
          label: '数据分值',
          type: 'str',
          name: 'dataScore',
          options: [],
          width: 'calc(100% - 20px)',
          span: 8,
          readonly: this.isReadyOnly,
          maxLength: 10,
        },
        {
          label: '不确定性范围',
          type: 'str',
          name: 'uncertaintyRange',
          options: [],
          width: 'calc(100% - 20px)',
          span: 16,
          readonly: this.isReadyOnly,
          maxLength: 10
        },
        {
          label: '数据质量',
          type: 'str',
          name: 'dataQuality',
          options: [],
          width: 'calc(100% - 20px)',
          span: 8,
          maxLength: 30,
          readonly: this.isReadyOnly
        },
        {
          label: '数据供应商',
          type: 'str',
          name: 'dataSupplier',
          options: [],
          width: 'calc(100% - 20px)',
          span: 16,
          maxLength: 100,
          readonly: this.isReadyOnly
        }
      ];
    }
  },
  created() {
    this.getDatabaseTypeOption(); // 数据库类型
    this.getData();
  },
  mounted() {
    if(this.pType === 'update') {
      this.getDatabaseNameOption(this.pStepInfo.databaseForm.databaseType); // 数据库名称
      this.getDatabaseEditionOption(this.pStepInfo.databaseForm.databaseType, this.pStepInfo.databaseForm.databaseName); // 数据库版本
    }
  },
  methods: {
    dealTreeData(treeData) {
      treeData.forEach((item) => {
        item.value = item.key;
        item.title = item.seq?`${item.seq}. ${item.title}`:item.title;
        if(item.children && item.children.length) {
          this.dealTreeData(item.children)
        }
      })
      return treeData
    },
    getData() {
      let api = this.$apiUtil.getEmissionFactorDatabaseApi();
      let greenhouseGasType = api.get_emission_greenhouse_gas_type_option({}); // 取得排放温室气体种类选项列表
      let emissionFactorType = api.get_emission_factor_data_emission_factor_type_option({}); // 取得排放因子分类选项列表
      let emissionFactorTypes = api.get_emission_factor_types({ filterEmptyDataFlag: '0' }); // 取得索引
      let dataType = api.get_emission_factor_data_type_option({}); // 取得排放因子数据类型选项列表
      let emissionLink = api.get_emission_factor_data_emission_link_option({}); // 取得排放因子数据排放环节选项列表

      Promise.all([
        emissionFactorTypes,
        greenhouseGasType,
        emissionFactorType,
        dataType,
        emissionLink
      ]).then(
        ([
          emissionFactorTypesData,
          greenhouseGasTypeData,
          emissionFactorTypeData,
          dataTypeData,
          emissionLinkData
        ]) => {
          this.emissionFactorTypeList = this.dealTreeData(emissionFactorTypesData.data.list)
          this.greenhouseGasTypeOption =this.dealTreeData(greenhouseGasTypeData.data.list)
          this.emissionFactorTypeOption  = formatterOption(emissionFactorTypeData.data, 'name', 'id')
          this.dataTypeOption  = formatterOption(dataTypeData.data, 'name', 'id')
          this.emissionLinkOption  = formatterOption(uniqBy(emissionLinkData.data, 'name',), 'name', 'name')
        }
      );
    },
    getDatabaseTypeOption() {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_database_type_option({})
        .then(({ data }) => {
          this.databaseTypeOptions = data.map(item => {
            item.label = item.name;
            item.value = item.id;
            return item;
          });
        });
    },
    getDatabaseNameOption(databaseType) {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_database_name_option({ databaseType })
        .then(({ data }) => {
          this.databaseNameOptions = data.map(item => {
            let newItem = {
              label: item,
              value: item
            };
            return newItem;
          });
        });
    },
    getDatabaseEditionOption(databaseType, databaseName) {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_database_edition_option({ databaseType, databaseName })
        .then(({ data }) => {
          this.databaseEditionOptions = data.map(item => {
            item.label = item.databaseEdition;
            item.value = String(item.id);
            return item;
          });
          if (
            this.databaseEdition &&
            !this.databaseEditionOptions.filter(item => item.value === this.databaseEdition).length
          ) {
            this.databaseEdition = undefined;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import 'variables.less';
.base-info {
  padding: 0 16px 16px;

  &-title {
    background: #ffe1cc;
    padding: 0 8px;
    border-radius: 4px;
    height: 36px;
    line-height: 36px;
    color: #333;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: bold;
  }
  &-form {
    padding-left: 16px;
  }
}
</style>
