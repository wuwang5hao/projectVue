<template>
<div class="carbon-maintenance">
  <TabBar ref="tabBar" :pItems="tabs" :pActive="curTab" pJustify="left" @on-change="onChangeTab"></TabBar>
  <IndustryDirectory @onJumpClicked="onJumpClick" v-if="isShow('行业目录')" />
  <StandardDirectory @onJumpClicked="onJumpClick" :pJumpStandardId="jumpStandardId" v-else-if="isShow('标准目录')" />
  <ModuleDirectory @onJumpClicked="onJumpClick" :pJumpModuleId="jumpModuleId" v-else-if="isShow('模块目录')" />
  <ParameterDirectory :pJumpParameterId="jumpParameterId" v-else-if="isShow('参数类型')" />
</div>
</template>

<script>
import TabBar from '@/components/TabBar'
import IndustryDirectory from './IndustryDirectory'
import StandardDirectory from './StandardDirectory'
import ModuleDirectory from './ModuleDirectory'
import ParameterDirectory from './ParameterDirectory'

export default {
  name: 'CarbonMaintenance',
  components: {
    TabBar,
    IndustryDirectory,
    StandardDirectory,
    ModuleDirectory,
    ParameterDirectory,
  },
  data() {
    return {
      tabs: ['行业目录', '标准目录', '模块目录', '参数类型'],
      curTab: '行业目录',
      jumpStandardId: '',
      jumpModuleId: '',
      jumpParameterId: '',
    }
  },
  methods: {
    isShow (tab) {
      return this.curTab === tab
    },
    onChangeTab (tab, type) {
      if(!type) {
        this.jumpStandardId = ''
        this.jumpModuleId = ''
        this.jumpParameterId = ''
      }
      this.curTab = tab
    },
    onJumpClick(data) {
      if(data.title === '标准目录') {
        this.jumpStandardId = data.id
      }else if(data.title === '模块目录') {
        this.jumpModuleId = data.id
      }else if(data.title === '参数类型') {
        this.jumpParameterId = data.id
      }
      this.$refs.tabBar.onClickTabItem(data.title, 'jump')
    },
  },
}
</script>

<style lang='less'>
.carbon-maintenance {
  height: 100%;
  background: #fff;
  .left {
    width: calc(63% - 16px);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-right: 16px;
    .filter {
      .ant-col:nth-child(2) {
        .label {
          display: none;
        }
        .field {
          width: 100%;
        }
      }
    }
  }
  .right {
    width: 37%;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    .filter {
      .ant-col:first-child {
        width: 47%;
      }
      .ant-col:nth-child(2) {
        width: 28%;
        margin-right: 4px;
        .label {
          display: none;
        }
        .field {
          min-width: 160px;
        }
      }
      .ant-col:last-child {
        width: 25%;
      }
    }
  }
  .container {
    padding: 0!important;
  }
  .table {
    width: 100%;
    .filter {
      padding-left: 16px;
      padding-right: 16px;
      margin-bottom: 0;
      .row {
        margin-bottom: 0;
      }
    }
    .content {
      padding-left: 16px!important;
      padding-right: 16px!important;
      box-shadow: none!important;
    }
    .ant-table-body-outer {
      background: #fff;
    }
  }
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 0 8px;
  }
  .select-row, .select-row td{
    background: #e6f7ff!important;
  }
}
</style>
