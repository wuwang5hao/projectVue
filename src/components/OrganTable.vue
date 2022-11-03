<template>
  <a-table :columns="columns" :dataSource="data" :pagination="false">
    <span class="ot-title" slot="customTitle">默认</span>
    <div slot="isDefault" slot-scope="isDefault">
      <a-button v-if="isDefault === '0'"
        type="primary"
        @onClick="onClickSetDefault">设为默认</a-button>
    </div>
  </a-table>
</template>

<script>
/**
 * 所属机构列表
 * @vue-prop {Array} pOrganList - 所属机构列表
 * @vue-prop {Array} pPowerList - 职权列表
 */
import { arrUtil } from 'jscom/utils/arrutil'

export default {
  name: 'OrganTable',

  props: {
    pOrganList: Array,
    pPowerList: Array
  },

  data () {
    return {
      columns: [
        {
          title: '机构组织名称',
          dataIndex: 'organ',
          key: 'organ',
        },
        {
          title: '职权名称1,职权名称2',
          dataIndex: 'power',
          key: 'power',
        },
        {
          title: '默认',
          key: 'isDefault',
          dataIndex: 'isDefault',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'isDefault' },
        }
      ],
      data: []
    }
  },

  created () {
    this.initData()
  },

  methods: {
    initData () {
      let data = []
      let zipArr = arrUtil.zip(this.pOrganList, this.pPowerList)
      zipArr.forEach((item) => {
        data.push({
          organ: item[0].organisationName,
          organId: item[0].organisationId,
          isDefault: item[0].defaultOrganisationFlag,
          powerId: item[1].powerId,
          power: item[1].powerName
        })
      })
      this.data = data
    },

    onClickSetDefault () {

    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.ot-title {
  color: @link-color;
}
</style>
