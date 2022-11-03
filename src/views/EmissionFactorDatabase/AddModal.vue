<template name="add-modal">
  <a-config-provider :locale="zh_CN">
    <AModal
      :maskClosable="false"
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="onCancel"
      width="974px"
      class="add-emission-factor"
      :bodyStyle="{ height: '580px', padding: '0px 0px 24px' }"
    >
      <a-steps class="sap-step" :current="currentStep" size="small">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <base-info-modal ref="baseInfoRef" :pStepInfo="stepOneInfo" v-if="isCurrentStep(0)" :isReadyOnly="isReadyOnly" :pType="pType" />
      <factor-data-modal
        ref="factorDataRef"
        :pStepInfo="stepTwoInfo"
        :pGasType="pGasType"
        v-else-if="isCurrentStep(1)"
        :isReadyOnly="isReadyOnly"
      />
      <documentation-modal
        ref="docuRef"
        :pStepInfo="stepThreeInfo"
        v-else-if="isCurrentStep(2)"
        :isReadyOnly="isReadyOnly"
        :pType="pType"
      />
      <div slot="footer" class="footer">
        <a-button v-if="isShowAdd" type="primary" @click="onClickAdd">新增</a-button>
        <a-button @click="onCancel">取消</a-button>
        <a-button v-if="isShowPre" type="primary" @click="onClickPre">上一步</a-button>
        <a-button v-if="isShowNext" type="primary" @click="onClickNext">下一步</a-button>
        <a-button v-if="isReadyOnly" type="primary" class="sap-btn" @click="onEdit">编辑</a-button>
        <a-button v-if="isShowConfirm" type="primary" class="sap-btn" @click="onConfirm">保存</a-button>
      </div>
    </AModal>
  </a-config-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { mapState } from 'vuex';
import TabBar from '@/components/TabBar';
import BaseInfoModal from './BaseInfoModal';
import FactorDataModal from './FactorDataModal';
import DocumentationModal from './DocumentationModal';

export default {
  name: 'AddModal',
  components: {
    TabBar,
    BaseInfoModal,
    FactorDataModal,
    DocumentationModal
  },
  props: {
    pVisible: Boolean,
    pReadonly: Boolean,
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: type => ['add', 'update', 'view'].indexOf(type) !== -1
    },
    pRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      zh_CN,
      visible: this.pVisible,
      confirmLoading: false,
      steps: [{ title: '基本信息' }, { title: '因子数据' }, { title: '资料文献' }],
      currentStep: 0,
      emissionFactorInfo: {
        list: []
      },
      stepOneInfo: {},
      stepTwoInfo: {},
      stepThreeInfo: {},
      isEdit: false
    };
  },
  computed: {
    ...mapState(['userInfo', 'curOrganisation']),
    pGasType() {
      return this.pType==='add'?this.stepOneInfo.baseInfoForm?.emissionGreenhouseGasType:this.pRow.emissionGreenhouseGasTypeName
    },
    isReadyOnly() {
      return this.pType === 'update' && this.isEdit === false;
    },
    title() {
      return this.pType === 'add' ? '新增' : '编辑';
    },
    // 显示确定按钮
    isShowConfirm() {
      // return this.currentStep === 2 && this.isEdit === true;
      return (this.pType==='add'&&this.currentStep === 2)||(this.pType==='update'&&this.isEdit);
    },
    // 显示下一步按钮
    isShowNext() {
      return this.currentStep !== 2;
    },
    isShowPre() {
      return this.currentStep !== 0;
    },
    isShowAdd() {
      return this.currentStep === 1 && !this.isReadyOnly;
    }
  },
  created() {
    if (this.pType === 'update') {
      this.getDataDetail(this.pRow.id);
      this.stepOneInfo.baseInfoForm = {
        id: this.pRow.id,
        emissionFactorTypeId: String(this.pRow.emissionFactorTypeId),
        emissionSource: this.pRow.emissionSource,
        emissionGreenhouseGasTypeId: String(this.pRow.emissionGreenhouseGasTypeId),
        emissionLink: [this.pRow.emissionLink] || [],
        emissionFactorTypeNoSerialNumberIndexName: this.pRow.emissionFactorTypeNoSerialNumberIndexName,
        emissionGreenhouseGasTypeName: this.pRow.emissionGreenhouseGasTypeName,
      };
      this.stepOneInfo.databaseForm = {
        databaseType: this.pRow.emissionFactorDatabaseType,
        databaseName: this.pRow.emissionFactorDatabaseName,
        databaseEdition: this.pRow.emissionFactorDatabaseEdition,
        emissionFactorDatabaseId: this.pRow.emissionFactorDatabaseId
      };
      this.stepOneInfo.areaForm = {
        region: this.pRow.region,
        country: this.pRow.country
      };
      this.stepOneInfo.reviewForm = {
        dataType: this.pRow.dataType,
        emissionFactorType: this.pRow.emissionFactorType,
        dataScore: this.pRow.dataScore,
        uncertaintyRange: this.pRow.uncertaintyRange,
        dataQuality: this.pRow.dataQuality,
        dataSupplier: this.pRow.dataSupplier
      };

      this.stepThreeInfo = {
        reference: this.pRow.reference,
        emissionFactorDescribe: this.pRow.emissionFactorDescribe,
        comment: this.pRow.comment,
        updateUserName: this.pRow.updateUserName,
        updateTime: this.pRow.updateTime
      };
    }
  },
  watch: {},
  methods: {
    getDataDetail(id) {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_data_detail({
          emissionFactorDataId: id
        })
        .then(({ data }) => {
          // this.setData(data);
          this.stepTwoInfo = {
            list: data.list.map((item, index) => {
              // item.index = index + 1
              item.isEdit = false
              return item;
            })
          };
        });
    },
    /**
     * 获取form validator
     */
    getFormValidatePromises(forms) {
      let result = []
      for (let form of forms) {
        result.push(
          new Promise((resolve, reject) => {
            form.validate((valid) => {
              resolve(valid)
            })
          })
        )
      }
      return result
    },
    // 下一步响应函数
    onClickNext() {
      if (this.currentStep === 1 && this.$refs.factorDataRef.data.filter(item => item.isEdit).length) {
        this.$message.destroy();
        this.$message.warning('请编辑完成当前数据后再新增');
        return;
      }
      if (this.currentStep === 0) {
        let forms = []
        if (this.$refs.baseInfoRef.$refs.baseInfoForm) { forms.push(this.$refs.baseInfoRef.$refs.baseInfoForm) }
        if (this.$refs.baseInfoRef.$refs.databaseForm) { forms.push(this.$refs.baseInfoRef.$refs.databaseForm) }
        if (this.$refs.baseInfoRef.$refs.reviewForm) { forms.push(this.$refs.baseInfoRef.$refs.reviewForm) }
        Promise.all(this.getFormValidatePromises(forms)).then((valids) => {
          let valid = true
          for (let validItem of valids) {
            if (!validItem) {
              valid = false
              break
            }
          }
          if (!valid) {
            console.log('valid', valid);
            return
          }
          this.stepOneInfo = {
            baseInfoForm: this.$refs.baseInfoRef.$refs.baseInfoForm.pJsonModel,
            databaseForm: this.$refs.baseInfoRef.$refs.databaseForm.pJsonModel,
            areaForm: this.$refs.baseInfoRef.$refs.areaForm.pJsonModel,
            reviewForm: this.$refs.baseInfoRef.$refs.reviewForm.pJsonModel
          };
          this.currentStep += 1;
        })
      } else if (this.currentStep === 1) {
        this.stepTwoInfo = { list: this.$refs.factorDataRef.data };
        this.currentStep += 1;
      }
    },
    onClickPre() {
      this.currentStep -= 1;
    },
    onClickAdd() {
      this.$refs.factorDataRef.onConfirm();
    },
    isCurrentStep(step) {
      return this.currentStep === step;
    },
    onCancel(e) {
      this.visible = false;
    },
    onEdit() {
      this.isEdit = true;
    },
    /**
     * @brief: 确认事件，添加、更新逻辑
     */
    onConfirm() {
      let jsonModel = {
        ...this.stepOneInfo.baseInfoForm,
        ...this.stepOneInfo.databaseForm,
        ...this.stepOneInfo.areaForm,
        ...this.stepOneInfo.reviewForm,
        ...this.stepTwoInfo,
        ...this.stepThreeInfo
      };
      this.isLoading = true;
      const api = this.$apiUtil.getEmissionFactorDatabaseApi();
      const common =
        this.pType === 'add'
          ? api.add_emission_factor_data({ ...jsonModel, emissionLink: jsonModel.emissionLink[0] })
          : api.edit_emission_factor_data({
            ...jsonModel,
            emissionFactorDataId: this.pRow.id,
            emissionLink: jsonModel.emissionLink[0],
            version: this.pRow.version
          });
      common
        .then(({ data }) => {
          this.visible = false;
          this.isLoading = false;
          this.$message.success(this.pType === 'add'?'新增成功':'编辑成功');
          this.$emit('success')
          this.isEdit === false
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.sap-step {
  width: 533px;
  margin: 16px auto 24px;
}
.sap-step-content {
  width: 950px;
  margin-left: auto;
  margin-right: auto;
  .sap-step-content-area {
    width: 900px;
    .sap-input {
      width: 240px;
      font-size: 14px;
    }
  }
}
</style>
