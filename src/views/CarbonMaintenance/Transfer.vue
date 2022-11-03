<template>
<a-transfer
      class="contact-standard"
      ref="transfer"
      :data-source="mockData"
      :target-keys="targetKeys"
      :selected-keys="selectedKeysTransfer"
      :disabled="disabled"
      :operations="['右移', '左移']"
      :show-search="true"
      :filter-option="(inputValue, item) => item.name.indexOf(inputValue) !== -1"
      :show-select-all="false"
      :locale="{
        searchPlaceholder: pSearchPlaceholder
      }"
      @change="onChange"
      @selectChange="(sourceSelectedKeys, targetSelectedKeys) => this.selectedKeysTransfer = [...sourceSelectedKeys, ...targetSelectedKeys]"
    >
      <template
        slot="children"
        slot-scope="{
          props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
          on: { itemSelectAll, itemSelect },
        }"
      >
        <a-select allowClear v-if="direction === 'left'" class="type-select" v-model="selectedType" :placeholder="pSelectPlaceholder">
          <a-select-option v-for="item in pType" :key="item.label" :value="item.label">{{item.value}}</a-select-option>
        </a-select>
        <a-select allowClear v-else v-model="selectedTypeRight" class="type-select" :placeholder="pSelectPlaceholder">
          <a-select-option v-for="item in pType" :key="item.label" :value="item.label">{{item.value}}</a-select-option>
        </a-select>
        <a-table
          :row-selection="
            getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
          "
          :columns="columns"
          :dataSource="filteredItems"
          size="small"
          @change="selectedKeysTransfer = []"
          :style="{ pointerEvents: listDisabled ? 'none' : null }"
          :custom-row="
            ({ key, disabled: itemDisabled }) => ({
              on: {
                click: () => {
                  if (itemDisabled || listDisabled) return;
                  itemSelect(key, !selectedKeys.includes(key));
                },
              },
            })
          "
        />
      </template>
    </a-transfer>
</template>

<script>
import difference from 'lodash/difference';

export default {
  name: 'Transfer',
  props: {
    pType: {type: Array, default() { return [] }},
    pColumns: {type: Array, default() { return [] }},
    pMockData: {type: Array, default() { return [] }},
    pTargetKeys: {type: Array, default() { return [] }},
    pSearchPlaceholder: {type: String, default: '请输入搜索名称'},
    pSelectPlaceholder: {type: String, default: '请选择'},
  },
  data() {
    return {
      mockData: [],
      allData: [],
      targetKeys: [],
      selectedKeysTransfer: [],
      targetItems: [],
      disabled: false,
      columns: this.pColumns,
      selectedType: undefined,
      selectedTypeRight: undefined,
    };
  },
  watch: {
    pMockData() {
      this.mockData = this.initMockData(this.pMockData)
      this.allData = this.initMockData(this.pMockData)
    },
    pTargetKeys() {
      this.targetKeys = this.pTargetKeys
    },
    mockData() {
      if (this.targetKeys.length !== this.targetItems.length) {
        this.targetItems = this.getItemsByKeys(this.targetKeys)
      }
    },
    targetKeys() {
      this.$emit('changeTargetKeys', this.targetKeys)
    },
    selectedType() {
      if(this.selectedType) {
        this.mockData = this.allData.filter((item) => (item.type === this.selectedType&&(this.selectedTypeRight?item.type===this.selectedTypeRight:true)))
      }else {
        this.mockData = this.allData.filter((item) => (this.selectedTypeRight?item.type===this.selectedTypeRight:true))
      }
    },
    selectedTypeRight() {
      if(this.selectedTypeRight) {
        this.mockData = this.allData.filter((item) => (item.type === this.selectedTypeRight&&(this.selectedType?item.type===this.selectedType:true)))
      }else {
        this.mockData = this.allData.filter((item) => (this.selectedType?item.type===this.selectedType:true))
      }
    },
  },
  created() {},
  methods: {
    // 初始化表格数据
    initMockData(mockData) {
      let keys = []
      for (let column of this.columns) {
        keys.push(column.dataIndex)
      }
      if (keys.length > 0) {
        for (let item of mockData) {
          for (let key of keys) {
            if (!item[key]) {
              item[key] = '-'
            }
          }
        }
      }
      return mockData
    },
    getItemsByKeys(keys) {
      let item = null
      let result = []
      for (let key of keys) {
        item = this.getFromAllData(key)
        if (!item) {
          item = this.getFromTargetItems(key)
        }
        if (item) {
          result.push(item)
        }
      }
      return result
    },
    getFromAllData(key) {
      for (let item of this.mockData) {
        if (key === item.key) {
          return item
        }
      }
      return null
    },
    getFromTargetItems(key) {
      for (let item of this.targetItems) {
        if (key === item.key) {
          return item
        }
      }
      return null
    },

    onChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys
      this.targetItems = this.getItemsByKeys(nextTargetKeys)
    },

    getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
      return {
        getCheckboxProps: (item) => ({ props: { disabled: disabled || item.disabled } }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys,
      };
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
