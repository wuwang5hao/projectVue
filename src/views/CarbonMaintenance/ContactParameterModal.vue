<template>
  <BaseModal
    pTitle="关联参数"
    v-model="visible"
    @confirm="onConfirm"
    @cancel="onCancel"
    :pWidth="1200"
    :pPaddingTop="27"
    :pPaddingLeft="22"
    :pPaddingRight="22"
    :pPaddingBottom="41"
  >
    <Transfer :pColumns="columns" :pMockData="mockData" :pTargetKeys="targetKeys" :pType="pType"
      @changeTargetKeys="changeTargetKeys" pSearchPlaceholder="请输入二级分类" pSelectPlaceholder="请选择一级分类"
    ></Transfer>
  </BaseModal>
</template>
<script>
import Transfer from './Transfer'

export default {
  name: 'ContactParameterModal',
  components: {Transfer},
  props: {
    pVisible: { type: Boolean, default: true },
    pSelectKey: {type: Number, default: null},
    pType: {type: Array, default() { return [] }},
  },
  data() {
    return {
      mockData: [],
      targetKeys: [],
      columns: [
        {dataIndex: 'index', title: '序号', width: '50px', align: 'center', },
        {dataIndex: 'serialNumber', title: '编号', ellipsis: true, align: 'center', },
        {dataIndex: 'type', title: '一级分类', ellipsis: true, align: 'center', },
        {dataIndex: 'level2CategoryName', title: '二级分类', ellipsis: true, align: 'center', },
        {dataIndex: 'level3CategoryName', title: '三级分类', ellipsis: true, align: 'center', },
        {dataIndex: 'level4CategoryName', title: '四级分类', ellipsis: true, align: 'center', },
      ],
      visible: this.pVisible,
    };
  },
  created() {
    this.$apiUtil.getCarbonMaintenanceApi().get_module_relate_parameter({module_id: this.pSelectKey, type: this.tabActiveKey})
      .then(({data}) => {
        data.forEach((item, index) => {
          item.index = index+1
          item.key = item.id.toString()
          item.title = item.id.toString()
        })
        this.mockData = data
        this.targetKeys = this.mockData.filter((item) => item.moduleId !== undefined).map((item) => item.key)
      })
  },
  methods: {
    changeTargetKeys(targetKeys) {
      this.targetKeys = targetKeys
    },
    onConfirm() {
      let list = this.targetKeys.length ? this.targetKeys.map((item) => Number(item)) : []
      this.$apiUtil.getCarbonMaintenanceApi().edit_module_relate_parameter({module_id: this.pSelectKey, list: list})
        .then((data) => {
          this.$emit('on-hide')
          this.$emit('confirm')
        })
    },
    onCancel() {
      this.$emit('on-hide')
    },
  },
};
</script>
<style lang="less">
.contact-standard {
  .ant-transfer-list {
    width: 10%;
  }
  .ant-transfer-list-body-with-search {
    padding-top: 52px;
  }
  .ant-transfer-list-body-search-wrapper {
    width: 60%;
    position: absolute;
    left: auto;
    right: 0;
  }
  .type-select {
    width: 38%;
    position: absolute;
    top: 12px;
  }
  .ant-transfer-operation {
    // margin: 28px;
    .ant-btn {
      width: 60px;
      height: 32px;
      margin-bottom: 12px;
      i {
        display: none;
      }
      span {
        margin: 0;
      }
    }
  }
}
</style>
