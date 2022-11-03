<template>
  <div class="database-right">
    <div class="database">
        <div class="database-title">
          <h3>数据库</h3>
          <a-icon type="setting" @click="onClickDatabase" />
        </div>
        <div class="database-query">
          <ASelect v-model="database.type" placeholder="请选择数据库类型" allowClear >
            <ASelectOption v-for="(option, index) of databaseTypeOptions" :value="option.value" :key="index">
              {{ option.label }}
            </ASelectOption>
          </ASelect>
          <div style="position: relative">
            <ASelect ref="select"
              v-model="database.name"
              mode="tags"
              @focus="databaseNameOpen = true"
              @blur="databaseNameOpen = false"
              @change="onChangeDatabaseName"
              :disabled="!databaseNameOptions.length"
              placeholder="请选择数据库名称"
              allowClear
            >
              <ASelectOption v-for="(option, index) of databaseNameOptions" :value="option.value" :key="index">
                {{ option.label }}
              </ASelectOption>
            </ASelect>
            <a-icon style="position:absolute;right:11px;top:50%;font-Size:12.25px;color:#bfcbdf;" :type="databaseNameOpen?'up':'down'" />
          </div>
          <ASelect v-model="database.databaseEdition" :disabled="!databaseEditionOptions.length" placeholder="请选择数据库版本" allowClear >
            <ASelectOption v-for="(option, index) of databaseEditionOptions" :value="option.value" :key="index">
              {{ option.label }}
            </ASelectOption>
          </ASelect>
        </div>
      </div>
      <div class="type-species">
        <div class="select-select">
          <ASelect v-model="filterEmptyData" @dropdownVisibleChange="activeKey = '1'">
            <ASelectOption v-for="(option, index) of [{label: '显示全部',value: '0'},{label:'过滤空数据',value: '1'}]" :value="option.value" :key="index">
              {{ option.label }}
            </ASelectOption>
          </ASelect>
          <a-icon type="setting" @click.stop="onClickIndexSet" />
        </div>
        <a-collapse accordion v-model="activeKey" :bordered='false'>
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel key="1">
            <div slot="header" class="type-species-title">
              <h3>索引</h3>
            </div>
            <div style="margin: 5px; color: #999; font-size:12px">当前版本：{{emissionFactorVersion}}</div>
            <a-tree
              :tree-data="treeData"
              :selected-keys="indexObj.selectedKeys"
              :expandedKeys="expandedKeys"
              @select="onSelect"
              @expand="keys => expandedKeys = keys"
            >
              <span slot="switcherIcon" class="switcherIcon"></span>
              <span slot="title" slot-scope="record" :style="{color: record.key==='-1'?'#f00':''}">
                <span>{{ record.seq }}&nbsp;</span>
                <span>{{record.title}}</span>
              </span>
            </a-tree>
          </a-collapse-panel>
          <a-collapse-panel key="2">
            <div slot="header" class="type-species-title">
              <h3>排放温室气体种类</h3>
              <a-icon type="setting" @click.stop="onClickGasesType" />
            </div>
            <div style="margin: 5px; color: #999; font-size:12px">当前版本：{{emissionGasVersion}}</div>
            <a-tree
              checkable
              :selectable='false'
              :tree-data="gasTypeTreeData"
              :defaultExpandedKeys="['-2']"
              :checkedKeys='checkedKeys'
              @check="onCheckable"
            >
              <span slot="switcherIcon" class="switcherIcon"></span>
            </a-tree>
          </a-collapse-panel>
        </a-collapse>
      </div>
  </div>
</template>

<script>
import TableMixin from '@/components/table/TableMixin';
import OptionsMixin from '@/common/OptionsMixin';
import { ComponentUtil } from 'jscom/utils/vueutil';
import DatabaseModal from './DatabaseModal'
import IndexSetModal from './IndexSetModal'
import GasesTypeModal from './GasesTypeModal'

export default {
  name: 'EmissionFactorDatabaseLeft',
  mixins: [TableMixin, OptionsMixin],
  props: ['pDatabase'],
  data() {
    return {
      databaseNameOpen: false,
      database: this.pDatabase,
      databaseTypeOptions: [],
      databaseNameOptions: [],
      databaseEditionOptions: [],
      treeData: [],
      indexObj: {
        selectedKeys: ['-2'], // 右侧索引选中
        indexText: '全部',
      },
      expandedKeys: [],
      newItem: {},
      filterEmptyData: '0',
      activeKey: '1',
      gasTypeTreeData: [],
      checkedKeys: [],
      emissionFactorVersion: '',
      emissionGasVersion: ''
    }
  },
  created () {
    this.getDatabaseTypeOption() // 数据库类型
    // this.getDatabaseNameOption() // 数据库名称
    // this.getDatabaseEditionOption() // 数据库版本
    this.getEmissionFactorTypes('1') // 索引列表
    this.getEmissionGasType() // 温室气体列表
    this.getEmissionFactorVersion() // 排放因子分类标签版本
    this.getEmissionGasVersion() // 排放温室气体标签版本
  },
  watch: {
    filterEmptyData() {
      this.getEmissionFactorTypes()
      // this.indexObj = {
      //   selectedKeys: ['-2'],
      //   indexText: '全部'
      // }
    },
    activeKey(key, oldKey) {
      if (!key) {
        this.activeKey = oldKey === '1' ? '2' : '1'
      }
    },
    'database.type'(value) {
      if(value) {
        this.database.name = undefined
        this.database.databaseEdition = undefined
        this.databaseEditionOptions = []
        this.getDatabaseNameOption()
      }else {
        this.database.name = undefined
        this.database.databaseEdition = undefined
        this.databaseNameOptions = []
        this.databaseEditionOptions = []
      }
    },
    'database.name'(value) {
      if(value) {
        this.database.databaseEdition = undefined
        this.getDatabaseEditionOption()
      }else {
        this.database.databaseEdition = undefined
        this.databaseEditionOptions = []
      }
    },
    'indexObj.indexText'() {
      this.$emit('changeIndexObj', this.indexObj)
    }
  },
  methods: {
    // 数据库类型
    getDatabaseTypeOption() {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_database_type_option({}).then(({data}) => {
        this.databaseTypeOptions = data.map((item) => {
          item.label = item.name
          item.value = item.id
          return item
        })
      })
    },
    // 数据库名称
    getDatabaseNameOption() {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_database_name_option({databaseType: this.database.type}).then(({data}) => {
        this.databaseNameOptions = data.map((item) => {
          let newItem = {
            label: item,
            value: item
          }
          return newItem
        })
        if(this.database.name && !this.databaseNameOptions.filter((item) => item.value === this.database.name).length) {
          this.database.name = undefined
        }
      })
    },
    // 数据库版本
    getDatabaseEditionOption() {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_database_edition_option({databaseType: this.database.type, databaseName: this.database.name}).then(({data}) => {
        this.databaseEditionOptions = data.map((item) => {
          item.label = item.databaseEdition
          item.value = item.databaseEdition
          return item
        })
        if(this.database.databaseEdition && !this.databaseEditionOptions.filter((item) => item.value === this.database.databaseEdition).length) {
          this.database.databaseEdition = undefined
        }
      })
    },
    // 数据库名称修改
    onChangeDatabaseName(value) {
      this.database.name = value[value.length - 1]
      this.databaseNameOpen = false
      this.$refs.select.blur()
    },
    // 数据库设置
    onClickDatabase() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: DatabaseModal,
        clsprops: {
          pVisible: true,
          pTitle: '数据库维护',
        },
        on: {
          cancel: () => {
            this.getDatabaseTypeOption() // 数据库类型
            this.database.type && this.getDatabaseNameOption() // 数据库名称
            this.database.type && this.database.name && this.getDatabaseEditionOption() // 数据库版本
          }
        }
      });
    },
    // 索引列表
    getEmissionFactorTypes(index) {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_types({filterEmptyDataFlag: this.filterEmptyData, addAllFlag: '1'}).then(({data}) => {
        this.treeData = this.dealTreeData(data.list)
        if(index === '1') {
          this.expandedKeys = ['-2']
        }else {
          let newIndexObj = {
            selectedKeys: this.indexObj.selectedKeys,
            indexText: this.indexObj.indexText
          }
          this.indexObj = {
            selectedKeys: ['-2'],
            indexText: '全部'
          }
          this.dealIndexObj(this.treeData, newIndexObj)
        }
      })
    },
    dealTreeData(treeData) {
      treeData.forEach((item) => {
        item.scopedSlots = { title: 'title' }
        item.seq && (item.seq = `${item.seq}.`)
        if(item.children && item.children.length) {
          this.dealTreeData(item.children)
        }
      })
      return treeData
    },
    dealIndexObj(treeData, newIndexObj) {
      try {
        treeData.forEach((item) => {
          if(item.key === newIndexObj.selectedKeys[0]) {
            newIndexObj.indexText = item.title
            this.indexObj = newIndexObj
            throw new Error('jieshu')
          }else if(item.children && item.children.length) {
            this.dealIndexObj(item.children, newIndexObj)
          }
        })
      } catch (error) {
        // console.log();
      }
    },
    // 索引 选中
    onSelect(selectedKeys, info) {
      if(!selectedKeys.length) {
        return
      }
      this.newItem = {}
      this.indexObj.selectedKeys = selectedKeys
      this.dealSelect(this.treeData, selectedKeys[0])
      if(this.newItem.children && this.newItem.children.length && selectedKeys[0] !=='-2') {
        this.indexObj.indexText = `${this.newItem.title}（+所有子类别）`
      }else{
        this.indexObj.indexText = this.newItem.title
      }
    },
    dealSelect(treeData, key) {
      try {
        treeData.forEach((item) => {
          if(item.key === key) {
            this.newItem = item
            throw new Error('jieshu')
          }else if(item.children && item.children.length) {
            this.dealSelect(item.children, key)
          }
        })
      } catch (error) {
        // console.log();
      }
    },
    // 索引设置
    onClickIndexSet() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: IndexSetModal,
        clsprops: {
          pVisible: true,
          pTitle: '索引设置',
        },
        on: {
          success: () => {
            this.getEmissionFactorTypes()
            this.getEmissionFactorVersion()
            // this.indexObj = {
            //   selectedKeys: ['-2'],
            //   indexText: '全部'
            // }
          }
        }
      });
    },
    getEmissionGasType() {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_greenhouse_gas_type_option({addAllFlag: '1'}).then(({data}) => {
        this.gasTypeTreeData = data.list
      })
    },
    getEmissionGasVersion() {
      this.$apiUtil.getEmissionFactorDatabaseApi().getEmissionGasVersion({}).then(({data}) => {
        this.emissionGasVersion = data.typeVersion
      })
    },
    getEmissionFactorVersion() {
      this.$apiUtil.getEmissionFactorDatabaseApi().getEmissionFactorVersion({}).then(({data}) => {
        this.emissionFactorVersion = data.typeVersion
      })
    },
    onCheckable(checkedKeys) {
      this.checkedKeys = checkedKeys
      this.$emit('changeGasType', checkedKeys)
    },
    // 排放温室气体种类设置
    onClickGasesType() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: GasesTypeModal,
        clsprops: {
          pVisible: true,
          pTitle: '温室气体维护',
          pCheckedKeys: this.checkedKeys
        },
        on: {
          cancel: () => {
            this.getEmissionGasType()
            this.onCheckable([])
            this.getEmissionGasVersion()
          }
        }
      });
    },
  }
}
</script>
<style lang="less" scoped>
.database-right {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .database {
    background: #fff;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 10px;
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #d8d8d8;
      a {
        text-decoration: none;
      }
    }
    &-query {
      .ant-select {
        width: 100%;
        margin-top: 16px;
      }
    }
  }
  .type-species {
    height: 100%;
    background: #fff;
    border-radius: 4px;
    overflow-y: hidden;
    position: relative;
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        text-decoration: none;
      }
    }
    .ant-collapse {
      height: 100%;
      /deep/.ant-collapse-item {
        .ant-collapse-header {
          background: #E0E0E0;
        }
        .ant-collapse-content > .ant-collapse-content-box {
          padding-bottom: 0;
        }
      }
      /deep/.ant-collapse-item-active {
        height: calc(100% - 47px);
        .ant-collapse-header {
          background: #ffe1c6;
        }
        .ant-collapse-content-active {
          height: calc(100% - 46px);
          overflow: auto;
        }
      }
    }
    .select-select {
      width: calc(100% - 94px);
      height: 46px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      right: 16px;
      top: 0;
      z-index: 1;
      .ant-select {
        flex: 1;
        margin-right: 10px;
        max-width: calc(100% - 24px);
      }
      a {
        text-decoration: none;
      }
    }
    /deep/.ant-tree {
      overflow: auto;
    }
    /deep/.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
      background: #ffe1bd!important;
    }
    .ant-tree-switcher_open .switcherIcon {
      width: 100%;
      height: 100%;
      background: url('../../static/img/close-off-table.png') no-repeat 100%;
    }
    .ant-tree-switcher_close .switcherIcon {
      width: 100%;
      height: 100%;
      background: url('../../static/img/open-off-table.png') no-repeat 100%;
    }
  }
  .anticon-setting {
    color: #ee8031;
    cursor: pointer;
  }
  h3 {
    color: #181818;
    font-size: 16px;
    margin-bottom: 0;
  }
}
</style>
