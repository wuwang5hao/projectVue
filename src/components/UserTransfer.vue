<template>
  <ALocaleProvider :locale="locale">
  <BaseModal
    pTitle="人员选择"
    v-model="visible"
    @confirm="onConfirm"
    @cancel="onCancel"
    :pWidth="1025"
    :pPaddingTop="27"
    :pPaddingLeft="22"
    :pPaddingRight="22"
    :pPaddingBottom="41"
  >
    <div
      class="ut-container"
    >
      <ATabs class="tabs" defaultActiveKey="role" @change="(key) => { tabActiveKey = key }">
        <ATabPane tab="角色" key="role">
          <div class="tree-item">
            <ATree
              class="tree"
              :treeData="treeData"
              :selectedKeys="selectKeys"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              @select="onSelectTree"
              @expand="onExpandTree"
            ></ATree>
          </div>
        </ATabPane>
        <ATabPane tab="人员" key="user" class="field-box">
          <div class="field">
            <div class="label">姓名</div>
            <AInput v-model="userName" class="input" @change="onNameChange" :maxLength="50"></AInput>
          </div>
          <div class="field">
            <div class="label">手机号</div>
            <AInput v-model="userMobile" class="input" @change="onMobileChange" :maxLength="11"></AInput>
          </div>

          <div class="btnbar">
            <a-button @click="onClickQuery">查询</a-button>
            <a-button @click="onClickReset">重置</a-button>
          </div>
        </ATabPane>
      </ATabs>
      <ATransfer
        ref="transfer"
        class="transfer"
        :dataSource="allData"
        :targetKeys="targetKeys"
        :disabled="disabled"
        :showSearch="showSearch"
        @change="onChange"
        :filterOption="filterOptionCallback"
        :leftColumns="leftColumns"
        :rightColumns="rightColumns"
        :showSelectAll="false"
      >
        <template
          slot="children"
          slot-scope="{
          props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
          on: { itemSelectAll, itemSelect },
        }"
        >
          <ATable
            class="transfer-table"
            :scroll="{y: 300}"
            :pagination="false"
            :rowSelection="
            getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
          "
            :columns="direction === 'left' ? leftColumns : rightColumns"
            :dataSource="direction === 'left' ? filteredItems : targetItems"
            size="small"
            :style="{ pointerEvents: listDisabled ? 'none' : null }"
            :customRow="
            ({ key, disabled: itemDisabled }) => ({
              on: {
                click: () => {
                  if (itemDisabled || listDisabled) return;
                  itemSelect(key, !selectedKeys.includes(key));
                },
              },
            })
          "
          >
            <template slot="name" slot-scope="name, record">
              {{`${record.name}（${record.mobile}）`}}
            </template>
          </ATable>
        </template>
      </ATransfer>
    </div>
  </BaseModal>
  </ALocaleProvider>
</template>
<script>
/*
 * 用户选择窗口，企业管理中指派窗口使用
 */
import { mapState } from 'vuex'
import difference from 'lodash/difference'
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

const mockData = [];
for (let i = 0; i < 20; i += 1) {
  mockData.push({
    key: i.toString(),
    name: `用户${i + 1}`,
    mobile: `手机号${i + 1}`,
    role: `role${i+1}`,
    // disabled: i % 4 === 0,
  });
}

const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key)

const leftColumns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: '可选人员',
    scopedSlots: { customRender: 'name' }
  },
];

const rightColumns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: '已选人员',
    scopedSlots: { customRender: 'name' }
  },
];

export default {
  name: 'UserTransfer',
  props: {
    pVisible: { type: Boolean, default: true },
    pMultiple: { type: Boolean, default: true },
    // [{id: 9, name: "测试添加", mobile: "13809876543"}, ...]
    pTargetItems: { type: Array, default() { return [] } },
  },
  data() {
    const treeData = []
    let notLeafNodes = this.getNotLeafNodes(treeData)
    let expandedKeys = Array.from(notLeafNodes, (item) => {
      return item.key
    })

    let targetItems = this.pTargetItems.map((item) => {
      let targetItem = {...item}
      targetItem.key = item.id
      return targetItem
    })
    let targetKeys = targetItems.map((item) => { return item.key })

    return {
      locale: zh_CN,
      userName: '',
      userMobile: '',
      treeData,
      visible: this.pVisible,
      allData: [],
      targetKeys: targetKeys,
      targetItems: targetItems,
      disabled: false,
      showSearch: false,
      leftColumns: leftColumns,
      rightColumns: rightColumns,
      tabActiveKey: 'role',
      // organSelectOptions: [{ title: '所属3', value: '所属3' }],

      autoExpandParent: true,
      selectKeys: [],
      expandedKeys,
    };
  },
  watch: {
    tabActiveKey() {
      this.initTabActiveKey()
    },
    allData() {
      if (this.targetKeys.length !== this.targetItems.length) {
        this.targetItems = this.getItemsByKeys(this.targetKeys)
      }
    }
  },
  mounted() {
    this.modalArr.push(this)
    this.initTabActiveKey()
  },
  computed: {
    ...mapState([
      'modalArr'
    ])
  },
  beforeDestroy () {
    let index = 0
    for (let modal of this.modalArr) {
      if (modal === this) {
        this.modalArr.splice(index, 1)
        break
      }
      index += 1
    }
  },
  methods: {
    getAllRoles () {
      let api = this.$apiUtil.getRoleApi()
      api.get_all_roles({}).then(({data}) => {
        data.list.forEach((item) => {
          item.key = item.id
          item.title = item.name
        })
        let rootItem = {
          key: '0',
          id: '0',
          title: '上实龙创',
          name: '上实龙创',
          children: []
        }
        rootItem.children = data.list
        this.treeData = [rootItem]
        if (data.list.length > 0) {
          this.selectKeys = [data.list[0].key]
          this.expandedKeys = ['0']
          this.onSelectTree(this.selectKeys)
        }
      })
    },
    getUserByRole (roleId) {
      let api = this.$apiUtil.getUserApi()
      api.get_user_by_role({role_id: roleId, roleId: roleId}).then(({data}) => {
        data.adminUserList.forEach((item) => {
          item.key = item.id
        })
        this.allData = data.adminUserList
      })
    },
    onClickQuery () {
      let api = this.$apiUtil.getUserApi()
      api.get_user_by_name_or_mobile(
        {name: this.userName, mobile: this.userMobile}
      ).then(({data}) => {
        data.adminUserList.forEach((item) => {
          item.key = item.id
        })
        this.allData = data.adminUserList
      })
    },
    onClickReset () {
      this.userName = ''
      this.userMobile = ''
    },
    getNotLeafNodes(treeData) {
      let result = []
      function recursive(node) {
        if (!('children' in node)) {
          node.isLeaf = true
        } else {
          result.push(node)
          for (let subNode of node.children) {
            recursive(subNode)
          }
        }
      }
      for (let node of treeData) {
        recursive(node)
      }
      return result
    },
    initTabActiveKey() {
      if (this.tabActiveKey === 'role') {
        // 角色
        this.getAllRoles()
      } else if (this.tabActiveKey === 'user') {
        // 人员
        this.onClickQuery()
      }
    },
    filterOptionCallback(inputValue, item) {
      if (this.tabActiveKey === 'role') {
        return item.role === inputValue
      } else if (this.tabActiveKey === 'user') {
        if (this.userName) {
          return item.name.indexOf(inputValue) !== -1
        } else {  // userMobile
          return item.mobile.indexOf(inputValue) !== -1
        }
      }
      return true
    },
    onChange(nextTargetKeys) {
      console.log(nextTargetKeys)
      if (!this.pMultiple && nextTargetKeys && nextTargetKeys.length > 1) {
        let newNextTargetKeys = []
        for (let key of nextTargetKeys.reverse()) {
          if (!this.targetKeys.includes(key)) {
            newNextTargetKeys.push(key)
            break
          }
        }
        if (newNextTargetKeys.length === 0) {
          let length = nextTargetKeys.length
          newNextTargetKeys = nextTargetKeys.slice(length-1, length)
        }
        nextTargetKeys = newNextTargetKeys
      }
      this.targetKeys = nextTargetKeys
      this.targetItems = this.getItemsByKeys(nextTargetKeys)
      console.log(this.targetItems)
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
      for (let item of this.allData) {
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

    triggerDisable(disabled) {
      this.disabled = disabled;
    },

    triggerShowSearch(showSearch) {
      this.showSearch = showSearch;
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
    onNameChange(event) {
      this.userName = event.target.value
      // if (this.userName) {
      //   this.userMobile = ''
      // }
      // this.$refs.transfer.$children[0].$children[0].filterValue = this.userName
      // this.$refs.transfer.$children[0].$children[2].filterValue = this.userName
    },
    onMobileChange(event) {
      this.userMobile = event.target.value
      // if (this.userMobile) {
      //   this.userName = ''
      // }
      // this.$refs.transfer.$children[0].$children[0].filterValue = this.userMobile
      // this.$refs.transfer.$children[0].$children[2].filterValue = this.userMobile
    },
    /**
     * 确认回调
     */
    onConfirm() {
      this.$emit('on-hide')
      this.$emit('confirm', this.targetKeys, this.targetItems)
    },
    /**
     * 取消触发，关闭窗口
     */
    onCancel() {
      this.$emit('on-hide')
    },
    onSelectTree (selectKeys) {
      if (!selectKeys || selectKeys.length === 0) {
        this.selectKeys = []
        // this.$refs.transfer.$children[0].$children[0].filterValue = ''
        return
      }
      this.selectKeys = selectKeys
      // this.$refs.transfer.$children[0].$children[0].filterValue = `${selectKeys[0]}`
      // this.$refs.transfer.$children[0].$children[2].filterValue = `${selectKeys[0]}`
      this.userName = ''
      this.userMobile = ''
      this.getUserByRole(selectKeys[0])
    },
    onExpandTree (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
  },
};
</script>
<style lang="less">
.ut-container {
  display: flex;
  justify-content: flex-start;
  height: 346px;
  .tabs {
    width: 265px;
    border:1px solid rgba(238,240,242,1);
    .ant-tabs-nav-wrap {
      height: 48px;
      background-color: #F7F8F9;
      display: flex;
      justify-content: center;
    }
    .tree-item {
      overflow-y: auto;
      height: 280px;
      position: absolute;
      width: 100%;
      .tree {
        margin: 0px 20px;
      }
    }
    .field-box {
      padding: 9px 30px;
      .field {
        margin-bottom: 29px;
        display: flex;
        justify-content: flex-start;
        .label {
          line-height: 40px;
          width: 43px;
          text-align: right;
        }
        .input {
          margin-left: 10px;
          width: 136px;
        }
      }
    }
  }
  .transfer {
    padding: 0;
    margin-left: 30px;
    height: 346px;
    .transfer-table {
      width: 265px;
    }
    .ant-transfer-list-header {
      display: none;
    }
    .ant-transfer-list {
      padding: 0;
    }
    .ant-transfer-list-body-customize-wrapper {
      padding: 0;
    }
    .ant-table tr {
      height: 46px;
    }
    .ant-table-header {
      background:rgba(247,248,249,1);
      /*padding-bottom: 17px!important;*/
      overflow: auto!important;
      height: 46px;
    }
    .ant-table-body {
      overflow-y: auto!important;
    }
    .ant-transfer-operation {
      margin: 28px;
      .ant-btn {
        width: 44px;
        height: 44px;
        padding-right: 0;
        padding-left: 0;
        text-align: center;
        border-radius: 50%;
        margin-bottom: 26px;
      }
    }
  }
  .ant-table-tbody>tr:nth-of-type(even) {
    background-color: unset;
  }
  .ant-table-tbody > tr.ant-table-row-selected td {
    background-color: #e6fffe;
  }
}
</style>
