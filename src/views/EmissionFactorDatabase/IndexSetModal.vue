<template>
  <AConfigProvider :locale="locale">
    <AModal
      :title="pTitle"
      centered
      width="auto"
      :maskClosable="false"
      :visible="visible"
      destroyOnClose
      :bodyStyle="{
        maxWidth: '680px',
        overflow: 'auto',
        height: '600px',
        padding: '12px 24px',
        paddingRight: 0,
        marginRight: '24px'
      }"
      @cancel="onCancel"
      class="index-set-model"
    >
      <template slot="footer">
        <a-button key="back" @click="onCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="onConfirm">
          保存
        </a-button>
        <a-button key="version" type="primary" :loading="isVersionLoading" @click="onVersion">
          发布
        </a-button>
      </template>
      <div class="message">发布后，将同步至客户端，不可取消!</div>
      <a-tree
        :tree-data="treeData"
        :selected-keys="selectedKeys"
        :expanded-keys="expandedKeys"
        @select="onSelect"
        @expand="onExpand"
      >
        <span slot="switcherIcon" class="switcherIcon"></span>
        <span slot="title" slot-scope="record" :style="{ color: record.key === '-1' ? '#f00' : '' }">
          <span>{{ record.seq }}&nbsp;</span>
          <span v-if="!record.updateFlag">{{ record.title }}</span>
          <a-input
            v-else
            type="text"
            ref="inputText"
            v-model="record.title"
            :maxLength="20"
            @blur.stop="onBlur(record)"
          />
          <span v-if="record.selected" style="color:#424a5c;marginLeft:24px">
            <!-- record.key  '-2'--全部  '-1'--'未归类' -->
            <!-- 编辑 -->
            <a-icon
              title="编辑"
              v-if="record.key !== '-2' && record.key !== '-1'"
              type="edit"
              @click.stop="onEdit(record)"
            />
            <!-- 新增 同级 -->
            <a-icon
              v-if="record.key !== '-2' && record.key !== '-1'"
              title="创建同级"
              type="plus"
              @click.stop="onAdd(treeData, record)"
            />
            <!-- 新增 子级 -->
            <img
              src="../../static/img/add-child.png"
              title="创建子级"
              style="verticalAlign:baseline;"
              v-if="record.key !== '-1'"
              @click.stop="onAddChild(record)"
            />
            <!-- 上移 -->
            <a-icon
              title="上移"
              v-if="record.key !== '-2' && record.key !== '-1'"
              type="arrow-up"
              @click.stop="onArrowUp(record)"
            />
            <!-- 下移 -->
            <a-icon
              title="下移"
              v-if="record.key !== '-2' && record.key !== '-1'"
              type="arrow-down"
              @click.stop="onArrowDown(record)"
            />
            <!-- 删除 -->
            <a-icon
              title="删除"
              v-if="record.key !== '-2' && record.key !== '-1'"
              type="delete"
              @click.stop="onDelete(treeData, record)"
            />
          </span>
        </span>
      </a-tree>
    </AModal>
  </AConfigProvider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { mapMutations } from 'vuex';
import MutationTypes from '@/store/MutationTypes';
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import FilterBar from '@/components/table//FilterBar';

export default {
  name: 'IndexSetModal',
  components: {
    FilterBar
  },
  props: ['pVisible', 'pTitle'],
  data() {
    return {
      locale: zh_CN,
      visible: this.pVisible,
      isLoading: false,
      isVersionLoading: false,
      selectedKeys: [],
      expandedKeys: [],
      treeData: [],
      defaultItem: {
        type: undefined,
        name: '',
        databaseEdition: '',
        isEdit: true
      }
    };
  },
  watch: {},
  created() {
    this.$apiUtil
      .getEmissionFactorDatabaseApi()
      .get_emission_factor_types({ addAllFlag: '1' })
      .then(({ data }) => {
        this.treeData = this.dealTreeData(data.list);
        this.expandedKeys = ['-2'];
      });
  },
  mounted() {},
  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    dealTreeData(treeData) {
      treeData.forEach(item => {
        item.selected = false;
        item.updateFlag = false;
        item.disabled = false;
        item.scopedSlots = { title: 'title' };
        item.seq && (item.seq = `${item.seq}.`);
        if (item.children && item.children.length) {
          this.dealTreeData(item.children);
        }
      });
      return treeData;
    },
    // 新增 同级
    onAdd(treeData, record, curItem) {
      if (!record.title.trim()) {
        this.$message.error('索引不能为空');
        return;
      }
      let a = treeData[treeData.length - 1].seq.split('.');
      a[a.length - 2] = String(Number(a[a.length - 2]) + 1);
      let newSeq = a.join('.');
      let newItem = {
        title: '',
        key: `a${Math.random()}`,
        seq: newSeq,
        updateFlag: true,
        selected: true,
        scopedSlots: { title: 'title' }
      };
      treeData.forEach(item => {
        if (item.key === record.key) {
          record.selected = false;
          if (curItem.key === '-2') {
            newItem.seq = `${String(Number(newItem.seq.split('.')[0]) - 1)}.`;
            treeData[treeData.length - 1].seq = `${String(
              Number(treeData[treeData.length - 1].seq.split('.')[0]) + 1
            )}.`;
            treeData.splice(treeData.length - 1, 0, newItem);
          } else {
            treeData.push(newItem);
          }
          this.$nextTick(() => {
            this.selectedKeys = [newItem.key];
            this.$refs.inputText?.focus();
            this.dealEdit(this.treeData);
          });
        } else if (item.children && item.children.length) {
          this.onAdd(item.children, record, item);
        }
      });
    },
    // 新增 子级
    onAddChild(record) {
      if (!record.title.trim()) {
        this.$message.error('索引不能为空');
        return;
      }
      let newSeq;
      if (!record.children || !record.children.length) {
        record.children = [];
        newSeq = `${record.seq}1.`;
      } else {
        let a = record.children[record.children.length - 1].seq.split('.');
        a[a.length - 2] = String(Number(a[a.length - 2]) + 1);
        newSeq = a.join('.');
      }
      let newItem = {
        title: '',
        key: `a${Math.random()}`,
        seq: newSeq,
        updateFlag: true,
        selected: true,
        scopedSlots: { title: 'title' }
      };
      if (record.key === '-2') {
        newItem.seq = `${String(Number(newItem.seq.split('.')[0]) - 1)}.`;
        record.children[record.children.length - 1].seq = `${String(
          Number(record.children[record.children.length - 1].seq.split('.')[0]) + 1
        )}.`;
        record.children.splice(record.children.length - 1, 0, newItem);
      } else {
        record.children.push(newItem);
      }
      // record.children.push(newItem)
      // this.selectedKeys = [newItem.key]
      this.expandedKeys = [...this.expandedKeys, record.key];
      this.$nextTick(() => {
        this.$refs.inputText?.focus();
        this.dealEdit(this.treeData);
      });
    },
    // 上移
    onArrowUp(record) {
      this.dealArrow(this.treeData, record, 'up');
    },
    // 下移
    onArrowDown(record) {
      this.dealArrow(this.treeData, record, 'down');
    },
    dealArrow(treeData, record, arrow, curItem) {
      try {
        treeData.forEach((item, index) => {
          if (item.key === record.key) {
            if (arrow === 'up' && index - 1 >= 0) {
              treeData[index - 1] = treeData.splice(index, 1, treeData[index - 1])[0];
            } else if (arrow === 'down' && curItem.key === '-2' && index + 1 < treeData.length - 1) {
              treeData[index] = treeData.splice(index + 1, 1, treeData[index])[0];
            } else if (arrow === 'down' && curItem.key !== '-2' && index + 1 < treeData.length) {
              treeData[index] = treeData.splice(index + 1, 1, treeData[index])[0];
            }
            throw new Error('jieshu');
          } else if (item.children && item.children.length) {
            this.dealArrow(item.children, record, arrow, item);
          }
        });
      } catch (error) {
        // console.log();
      }
    },
    // 编辑
    onEdit(record) {
      record.updateFlag = true;
      this.$nextTick(() => {
        this.$refs.inputText?.focus();
        this.dealEdit(this.treeData);
      });
    },
    dealEdit(treeData) {
      treeData.forEach(item => {
        this.$nextTick(() => {
          item.disabled = true;
        });
        if (item.children && item.children.length) {
          this.dealEdit(item.children);
        }
      });
    },
    // 删除
    onDelete(treeData, record) {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认信息',
          pContent: '确定要删除索引%s吗？',
          pKeyWord: String(record.title),
          pMaskStyle: { zIndex: 1000 },
          pClass: 'on-delete'
        },
        on: {
          confirm: () => {
            this.dealDelete(treeData, record);
            this.dealOnBlur(this.treeData);
          }
        }
      });
    },
    dealDelete(treeData, record) {
      treeData.forEach((item, index) => {
        if (item.key === record.key) {
          treeData.splice(index, 1);
        } else if (item.children && item.children.length) {
          this.dealDelete(item.children, record);
        }
      });
    },
    onBlur(record) {
      if (!record.title.trim()) {
        // this.$message.error('索引不能为空1')
        // this.$refs.inputText?.focus()
        this.dealEmptyBlur(this.treeData, record);
        return;
      }
      record.updateFlag = false;
      record.selected = false;
      this.dealOnBlur(this.treeData);
    },
    // 输入为空时 失去焦点的处理
    dealEmptyBlur(treeData, record, curItem) {
      treeData.forEach((item, index) => {
        if (item.key === record.key) {
          treeData.splice(index, 1);
          curItem.key === '-2' &&
            (treeData[treeData.length - 1].seq = `${String(Number(treeData[treeData.length - 1].seq) - 1)}.`);
        } else if (item.children && item.children.length) {
          this.dealEmptyBlur(item.children, record, item);
        }
      });
      this.dealOnBlur(this.treeData);
    },
    dealOnBlur(treeData) {
      treeData.forEach(item => {
        this.$nextTick(() => {
          item.disabled = false;
          // this.selectedKeys = []
        });
        if (item.children && item.children.length) {
          this.dealOnBlur(item.children);
        }
      });
    },
    // 选中
    onSelect(selectedKeys, info) {
      if (!selectedKeys.length) {
        return;
      }
      this.selectedKeys = selectedKeys;
      selectedKeys.length && this.dealSelected(this.treeData, selectedKeys);
    },
    dealSelected(treeData, selectedKeys) {
      treeData.forEach(item => {
        item.selected = false;
        if (item.key === selectedKeys[0]) {
          item.selected = true;
        }
        if (item.children && item.children.length) {
          this.dealSelected(item.children, selectedKeys);
        }
      });
    },
    // 展开
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    // 发布
    onVersion() {
      this.SET_LOADING({ isVersionLoading: true });
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .push_version_emission_factor_types({})
        .then(() => {
          this.$emit('on-hide');
          this.$emit('success');
        })
        .catch(() => {
          this.SET_LOADING({ isVersionLoading: false });
        });
    },
    // 保存
    onConfirm() {
      this.SET_LOADING({ loading: true });
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .edit_emission_factor_types({ list: this.treeData })
        .then(({ data }) => {
          this.$emit('on-hide');
          this.$emit('success');
        })
        .catch(() => {
          this.SET_LOADING({ loading: false });
        });
    },
    onCancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="less">
.index-set-model {
  padding: 0;
  .message {
    height: 43px;
    line-height: 43px;
    color: #EE722E;
    font-size: 12px;
    background: #FCECDF;
    border-radius: 4px;
    padding-left: 22px;
    margin-bottom: 14px;
  }

  .ant-input {
    height: 30px;
  }

  .ant-modal-body {
    overflow: auto;
  }

  .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background: #fff4e6 !important;
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

.on-delete {
  text-align: center;

  .ant-modal-content {
    min-width: 520px;

    .cm-body {
      width: 100%;
    }
  }
}
</style>
