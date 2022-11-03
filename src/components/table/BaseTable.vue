<template>
  <div class="container" :style="heightStyle">
    <div ref="action" v-if="isShowOutActions" class="action-bar-outer-wrap">
      <ActionBar :pActions="pActions"></ActionBar>
    </div>
    <div :class="['tree-container', { 'tree-container-outer': isShowOutActions }]">
      <ContentContainer v-if="pIsShowTree" :class="['bt-tree', { 'bt-tree-outer': isShowOutActions }]" pColumn>
        <!-- maxLength #4969 -->
        <AInput
          v-model="searchTextInput"
          placeholder="请输入关键字"
          @change="onSearch"
          class="search-input"
          :maxLength="pSearchMaxLength"
        ></AInput>
        <div class="tree-item">
          <ATree
            :loadData="pLoadTreeData"
            :treeData="treeData"
            :expandedKeys="expandedKeys"
            :selectedKeys="selectKeys"
            :autoExpandParent="autoExpandParent"
            @expand="onExpandTree"
            @select="onSelectTree"
          >
            <template slot="title" slot-scope="{ title }">
              <span v-if="title.indexOf(searchText) > -1">
                {{ title.substr(0, title.indexOf(searchText)) }}
                <span style="color: #f50">{{ searchText }}</span
                >{{ title.substr(title.indexOf(searchText) + searchText.length) }}
              </span>
              <span v-else>{{ title }}</span>
            </template>
          </ATree>
        </div>
      </ContentContainer>
      <div ref="content" class="table">
        <FilterBar
          ref="filter"
          v-if="pFilterFields.length > 0"
          :pFields="pFilterFields"
          :pJsonModel="pFilterJsonModel"
          :pRowCount="pRowCount"
          :pLabelWidth="pLabelWidth"
          @query="onQuery"
          @reset="onReset"
        ></FilterBar>
        <div ref="tableContent" :class="['content', { 'content-outer': isShowOutActions }]">
          <div ref="inneraction" class="title-action">
            <div class="bt-title" v-if="pTitle">
              <span slot="title">{{ pTitle }}</span>
            </div>
            <div v-if="pActions.length > 0 && pActionBarPosition === 'inner'" class="action-bar-wrap">
              <ActionBar :pActions="pActions"></ActionBar>
            </div>
          </div>
          <AConfigProvider>
            <template v-slot:renderEmpty>
              <div class="empty-container">
                <div v-if="!loading" class="empty-box">
                  <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                      <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                      <g fillRule="nonzero" stroke="#D9D9D9">
                        <path
                          d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                        ></path>
                        <path
                          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                          fill="#FAFAFA"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <p class="empty-text">暂无数据</p>
                </div>
                <div v-else class="empty-box">
                  <img src="../../static/img/loading.gif" width="24" height="24" />
                </div>
              </div>
            </template>
            <Expand :pRender="aTableRender"></Expand>
          </AConfigProvider>
        </div>
        <TablePage
          v-show="isShowPage"
          ref="page"
          class="bt-page"
          :pTotal="pTotal"
          :pPageSize="pageSize"
          :pPageNum="curPageNum"
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
        ></TablePage>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 表格的基础组件
 * 定义了表格的基本布局，包括属性选择，过滤器，操作栏和表格内容
 * @vue-props {Array} pColumns - 表格列结构
 * @vue-props {Array} pDataSource - 表格内容
 * @vue-props {Array} pInlineActions - 右侧操作结构
 * @vue-props {Array} pActions - 表格全局操作
 * @vue-props {Array} pFilterFields - 表格过滤项
 * @vue-props {Object} pFilterJsonModel - 表格过滤数据结构
 * @vue-props {Array} pTreeData - 左侧树形选择数据
 * @vue-props {Function} pLoadTreeData - 树形动态加载函数
 * @vue-props {Array} pTreeOpenKeys - 树形组件展开项
 * @vue-props {Array} pTreeSelectedKeys - 属性组件选中项
 * @vue-props {Number} pTotal - 总数
 * @vue-props {Number} pPageSize - 每页数据项数
 * @vue-props {Number} pPageNum - 当前页数
 * @vue-props {Boolean} pInitChange - 是否在创建时获取数据
 * @vue-props {Array} pSelections - 选中行
 * @vue-props {Stirng} pActionBarPosition - 操作栏的位置，outer， inner
 * @vue-props {Boolean} pTreeShowIcon - 属性控件是否显示icon
 * @vue-props {Array} pTreeTopSelectOptions - 左侧下拉选择数据
 * @vue-props {String} pTitle - 表格名
 * @vue-props {Boolean} pEnableTreeSearch - 是否使用属性搜索
 * @vue-props {Boolean} pSortNotConvert - 是否转换排序字段名
 * @vue-props {Boolean} pSearchMaxLength - 属性搜索文字最大长度
 * @vue-props {Boolean} pEnableTreeFilterFeature - 是否支持属性过滤显示特性
 * @vue-props {Boolean} pIsShowTree - 是否显示树形组件
 */
import Expand from 'jscom/widgets/Expand';
import ContentContainer from '@/components/ContentContainer';
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import { dtUtil } from 'jscom/utils/sysutil';
import { objUtil } from 'jscom/utils/objutil';
import FilterBar from './FilterBar';
import TablePage from './TablePage';
import ActionBar from './ActionBar';

const actionConfirmMap = {
  delete: { content: '确定要删除%s吗？', title: '确认信息', type: 'warn' },
  disable: { content: '确定要下架%s吗？', title: '确认信息', type: 'warn' },
  enable: { content: '确定要上架%s吗？', title: '确认信息', type: 'info' },
  lock: { content: '确定停用%s吗？', title: '确认信息', type: 'warn' },
  lock_enterprise: { content: '确定冻结%s吗？', title: '确认信息', type: 'warn' },
  active: { content: '确定启用%s吗？', title: '确认信息', type: 'info' },
  resetPassword: { content: '确定重置%s的密码吗？', title: '确认信息', type: 'except' }
};

export default {
  name: 'BaseTable',
  components: { Expand, FilterBar, ContentContainer, TablePage, ActionBar },
  props: {
    pColumns: {
      type: Array,
      default() {
        return [{ title: 'Name', key: 'name' }];
      }
    },
    pDataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    pInlineActions: {
      type: Array,
      default() {
        return [];
      },
      validator: inlineActions => {
        for (let action of inlineActions) {
          for (let fieldName of ['title', 'name', 'click']) {
            if (!(fieldName in action)) {
              console.warn(`action must have ${fieldName}`);
              return false;
            }
          }
        }
        return true;
      }
    },
    pActions: {
      type: Array,
      default() {
        return [];
      },
      validator: actions => {
        for (let action of actions) {
          for (let fieldName of ['title', 'name']) {
            if (!(fieldName in action)) {
              console.warn(`action must have ${fieldName}`);
              return false;
            }
          }
        }
        return true;
      }
    },
    pFilterFields: {
      type: Array,
      default() {
        return [];
      }
    },
    pFilterJsonModel: {
      type: Object,
      default() {
        return {};
      }
    },
    pTreeData: {
      type: Array,
      default() {
        return [];
      }
    },
    pLoadTreeData: {
      type: Function,
      default: undefined
      // default () {
      //   return new Promise((resolve, reject) => { resolve() })
      // }
    },
    pIsShowTree: {
      type: Boolean,
      default: false
    },
    pTreeOpenKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    pTreeSelectedKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    pTotal: {
      type: Number,
      default: 0
    },
    pPageSize: {
      type: Number,
      default: 10
    },
    pPageNum: {
      type: Number,
      default: 1
    },
    pInitChange: {
      type: Boolean,
      default: true
    },
    pSelections: {
      type: Array,
      default: null
    },
    pActionBarPosition: {
      type: String,
      default: 'inner'
    },
    pShowPage: {
      type: Boolean,
      default: true
    },
    pTitle: {
      type: String,
      default: ''
    },
    pEnableTreeSearch: {
      type: Boolean,
      default: true
    },
    pSortNotConvert: {
      type: Boolean,
      default: false
    },
    pGetCheckboxProps: {
      type: Function,
      default: null
    },
    pSearchMaxLength: {
      type: Number,
      default: 20
    },
    pEnableTreeFilterFeature: {
      type: Boolean,
      default: true
    },
    pScrollX: {
      type: Number || Boolean
    },
    pScrollY: {
      type: Number || Boolean
    },
    pCustomRow: {
      type: Function,
      default: null
    },
    pRowClassName: {
      type: Function,
      default: null
    },
    pRowCount: {
      type: Number
    },
    pLabelWidth: {
      type: String
    }
  },
  computed: {
    computedColumns() {
      return this.initColumns();
    },
    zeroOrOneToolbarAction() {
      for (let row of this.dataSource) {
        let actionCount = 0;
        let dropdownAdded = false;
        for (let action of this.pInlineActions) {
          if (action.visible) {
            if (action.visible(row)) {
              if (action.toolbar) {
                actionCount += 1;
              } else {
                // not toolbar
                if (!dropdownAdded) {
                  actionCount += 1;
                  dropdownAdded = true;
                }
              }
            }
          } else {
            if (action.toolbar) {
              actionCount += 1;
            } else {
              // not toolbar
              if (!dropdownAdded) {
                actionCount += 1;
                dropdownAdded = true;
              }
            }
          }
        }
        if (actionCount > 1) {
          return false;
        }
      }
      return true;
    },
    heightStyle() {
      let height = this.filterHeight + this.actionHeight;
      if (this.pIsShowTree) {
        return 'height: 100%';
      } else {
        return `height: calc(100% - ${height}px)`;
      }
    },
    isShowOutActions() {
      return this.pActions.length > 0 && this.pActionBarPosition === 'outer';
    },
    isShowPage() {
      return this.pShowPage && this.dataSource && this.dataSource.length > 0;
    }
  },
  watch: {
    pDataSource(dataSource) {
      this.columns = this.initColumns();
      this.dataSource = this.initDataSource(this.pDataSource);
      if (this.dataSource.length === 0 && this.curPageNum > 1) {
        this.curPageNum -= 1;
        this.reload();
      }
    },
    pTotal(num) {
      let pageNum = this.curPageNum - 1;
      if (pageNum < 0) {
        pageNum = 0;
      }
      if (num < pageNum * this.pageSize) {
        this.curPageNum = Math.max(Math.ceil(num / this.pageSize), 1);
        this.onPageChange(this.curPageNum);
      }
    },
    pPageNum(num) {
      // console.log(num)
      this.curPageNum = num;
      this.onPageChange(num);
    },

    pTreeOpenKeys(keys) {
      this.expandedKeys = keys;
    },
    pColumns(val) {
      this.columns = this.initColumns();
      this.dataSource = this.initDataSource(this.pDataSource);
    },
    pTreeSelectedKeys(keys) {
      this.selectKeys = keys;
    },
    pTreeData(val) {
      // this.treeData = JSON.parse(JSON.stringify(val))
      this.doSearch();
    },
    pSelections(val) {
      this.selectedRowKeys = this.pSelections.map(item => {
        return item.key;
      });
    }
  },
  created() {
    this.columns = this.initColumns();
    this.dataSource = this.initDataSource(this.pDataSource);

    let column = this.columns.filter(item => item.defaultSortOrder);
    this.sortField = column.length ? column[0].key : '';
    this.sortOrderBy = column.length ? column[0].defaultSortOrder : '';

    if (this.pInitChange) {
      this.$nextTick(() => {
        this.curPageNum = 1;
        this.reload();
      });
    }
    if (this.pSelections) {
      this.selectedRowKeys = this.pSelections.map(item => {
        return item.key;
      });
    }
  },
  data() {
    let allTreeData = JSON.parse(JSON.stringify(this.pTreeData));
    this.onTreeDataUpdate(allTreeData);
    return {
      filterHeight: 0,
      actionHeight: 0,

      columns: [],
      dataSource: [],
      searchTextInput: '',
      searchText: '',
      curPageNum: 1,
      pageSize: this.pPageSize,
      sortField: '',
      sortOrderBy: '',
      selectKeys: this.pTreeSelectedKeys,
      expandedKeys: this.pTreeOpenKeys,
      autoExpandParent: true,
      treeData: allTreeData,
      sortFieldMap: {},
      selectedRowKeys: [],
      tableHeight: 500,
      loading: false
    };
  },

  mounted() {
    // 动态调整table的高度
    this.filterHeight = this.$refs.filter ? this.$refs.filter.$el.offsetHeight : 0;
    this.actionHeight = this.$refs.action ? this.$refs.action.offsetHeight : 0;
    this.updateTableHeight();
    window.onresize = () => {
      this.onresize();
    };
  },

  methods: {
    /**
     * 设置加载状态
     */
    setLoading(flag) {
      this.loading = flag;
    },
    /**
     * 渲染时间逻辑
     */
    renderTime(h) {
      return props => {
        return h(
          'span',
          {
            props: {}
          },
          [dtUtil.formatDatetime(new Date(props))]
        );
      };
    },
    /**
     * 渲染日期逻辑
     */
    renderDate(h) {
      return props => {
        return h(
          'span',
          {
            props: {}
          },
          [dtUtil.formatDate(new Date(props))]
        );
      };
    },
    // 初始化表格列
    initColumns() {
      let columnsIn = this.pColumns;
      let columns = [...columnsIn];

      for (let column of columns) {
        if (column['key'] === this.sortField) {
          if (this.sortOrderBy === 'DESC') {
            column['sortOrder'] = 'descend';
          } else {
            column['sortOrder'] = 'ascend';
          }
        } else {
          column['sortOrder'] = '';
        }

        if ('dataIndex' in column) {
          continue;
        }
        column['dataIndex'] = column['key'];
        if (!('sorter' in column) && column['key'] !== 'index') {
          column['sorter'] = 'true';
        }
        if (column['key'] === 'index') {
          if (!('width' in column)) {
            column['width'] = 100;
          }
          if (!('align' in column)) {
            column['align'] = 'center';
          }
        }
        if (column['sortField']) {
          this.sortFieldMap[column['key']] = column['sortField'];
        }

        if (
          [
            'updateTime',
            'generateTime',
            'actionTime',
            'administratorReplaceTime',
            'businessUpdateTime',
            'createTime',
            'publishTime',
            'buyDate',
            'startUsingDate',
            'registDate',
            'transactionDate'
          ].includes(column.key) &&
          !column['scopedSlots']
        ) {
          // custom updateTime
          column['scopedSlots'] = { customRender: column.dateRender ? 'dateRender' : 'timeRender' };
          if (!column['width']) {
            column['width'] = 180;
          }
        }
      }
      if (this.pInlineActions.length > 0) {
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 180,
          // customCell: (record, rowIndex) => {
          //   return {style: {'minWidth': '170px'}}
          // },
          // customHeaderCell: (column) => {
          //   return {style: {'minWidth': '170px'}}
          // },
          scopedSlots: { customRender: 'action' }
        });
      }
      return columns;
    },
    /**
     * 获取名称字段
     */
    getNameField() {
      for (let column of this.columns) {
        if (column.nameField) {
          return column.key;
        }
      }
      return '';
    },
    // 初始化表格数据
    initDataSource(dataSource) {
      let keys = [];
      let primaryColumn = null;
      for (let column of this.pColumns) {
        keys.push(column.key);
        if (column.primary) {
          primaryColumn = column;
        }
      }
      if (keys.length > 0) {
        let index = 1;
        for (let item of dataSource) {
          for (let key of keys) {
            if (!(key in item)) {
              let msg = `key "${key}" not in data item ${JSON.stringify(item)}, expect are ${keys}`;
              // console.warn(msg)
            }
            if (!item[key]) {
              item[key] = '-';
            }
          }
          // item.index = (this.curPageNum - 1) * this.pageSize + index
          item.index = index;
          index += 1;
        }
      }
      if (primaryColumn !== null) {
        for (let item of dataSource) {
          if (item.key === undefined) {
            item['key'] = item[primaryColumn.key];
          }
        }
      }
      return dataSource;
    },
    // 渲染表格
    aTableRender(h, context) {
      // const slots = Object.keys(this.$slots)
      //   .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      //   .map((vnode) => {
      //     // vnode.context = this.$parent._self
      //     vnode.context = this._self
      //     return vnode
      //   })
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self;
          // 原本可以直接返回 vnode, 但具名 slot 不能工作，因此使用 template 包裹
          return h('template', { slot: vnode.data.slot }, [vnode]);
        });

      // let testSlots = [
      //   h('span', {
      //     slot: 'customTitle',
      //   }, 'abc')
      // ]
      let scopedSlots = { ...this.$scopedSlots };
      if (!scopedSlots.timeRender) {
        scopedSlots.timeRender = this.renderTime(h);
      }
      if (!scopedSlots.dateRender) {
        scopedSlots.dateRender = this.renderDate(h);
      }
      if (this.pInlineActions.length > 0) {
        let actionChildren = [];
        let toolBarActions = [];
        let otherActions = [];

        for (let action of this.pInlineActions) {
          if (action.toolbar) {
            toolBarActions.push(action);
          } else {
            otherActions.push(action);
          }
        }

        scopedSlots['action'] = row => {
          actionChildren = [];
          actionChildren = actionChildren.concat(this._getToolbarActionChildren(h, row, toolBarActions));
          let otherActionChildren = this._getOtherActionChildren(h, row, otherActions);
          if (actionChildren.length > 0 && otherActionChildren.length > 0) {
            actionChildren.push(this._renderActionSpliter(h));
          }
          if (otherActionChildren.length > 0) {
            actionChildren = actionChildren.concat(otherActionChildren);
          }
          return h(
            'span',
            {
              class: {
                'inline-action': true,
                'zero-or-one-toolbar-action': this.zeroOrOneToolbarAction,
                'multi-toolbar-action': !this.zeroOrOneToolbarAction
              }
            },
            actionChildren
          );
          // <a-dropdown :trigger="['click']">
          //    <a class="ant-dropdown-link" @click="e => e.preventDefault()"> Click me <a-icon type="down" /> </a>
          //     <a-menu slot="overlay">
          //     <a-menu-item key="0">
          //     <a href="http://www.alipay.com/">1st menu item</a>
          //   </a-menu-item>
          //   <a-menu-item key="1">
          //     <a href="http://www.taobao.com/">2nd menu item</a>
          //   </a-menu-item>
          //   <a-menu-divider />
          //   <a-menu-item key="3">3rd menu item</a-menu-item>
          //   </a-menu>
          //   </a-dropdown>
        };
        //   <span slot="action" slot-scope="text, record">
        //   <a>Invite | {{record.name}}</a>
        // <a-divider type="vertical" />
        //   <a>Delete</a>
        //   <a-divider type="vertical" />
        //   <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
        //   </span>
      }
      let props = {
        columns: this.computedColumns,
        dataSource: this.dataSource,
        pagination: false
        // scroll: {y: 720},
      };
      // if (this.pIsShowTree) {
      //   props.scroll = {y: this.tableHeight}
      // }
      props.scroll = { y: this.tableHeight };
      if (this.pScrollY) {
        if (props.scroll) {
          props.scroll.y = this.pScrollY;
        } else {
          props.scroll = { y: this.pScrollY };
        }
      }
      if (this.pScrollX) {
        if (props.scroll) {
          props.scroll.x = this.pScrollX;
        } else {
          props.scroll = { x: this.pScrollX };
        }
      }
      this.pCustomRow && (props['customRow'] = this.pCustomRow);
      this.pRowClassName && (props['rowClassName'] = this.pRowClassName);
      if (this.pSelections) {
        props['rowSelection'] = {
          onChange: this.onChange,
          onSelect: this.onSelect,
          onSelectAll: this.onSelectAll,
          selectedRowKeys: this.selectedRowKeys
        };
        if (this.pGetCheckboxProps) {
          props['rowSelection']['getCheckboxProps'] = this.pGetCheckboxProps;
        }
      }
      return h(
        'ATable',
        {
          props,
          on: {
            change: this.onTableChange
          },
          scopedSlots: scopedSlots
        },
        slots
      );
    },
    /**
     * 渲染action分隔符
     */
    _renderActionSpliter(h) {
      return h('span', { attrs: { class: 'inline-action-spliter' } }, '|');
    },
    // 操作处理函数
    _clickAction(action, row) {
      if (action.name in actionConfirmMap) {
        let config = actionConfirmMap[action.name];
        let nameField = this.getNameField();
        let keyword = '';
        if (nameField) {
          keyword = row[nameField];
        }
        let dialogObj = new ComponentUtil(this.$store).create({
          cls: ConfirmModal,
          clsprops: {
            pVisible: true,
            pType: config.type,
            pTitle: config.title,
            pContent: config.content,
            pKeyWord: keyword
          },
          on: {
            confirm: () => {
              if (action.click) {
                action.click(row, action);
              }
            },
            cancel: () => {}
          }
        });
      } else if (action.click) {
        action.click(row, action);
      }
    },
    // 获取直接显示的内联操作项
    _getToolbarActionChildren(h, row, toolBarActions) {
      let result = [];
      for (let [index, action] of toolBarActions.entries()) {
        if (action.visible && !action.visible(row)) continue;
        if (result.length > 0) {
          result.push(this._renderActionSpliter(h));
        }
        result.push(
          h(
            'a',
            {
              attrs: { class: 'inline-action-toolbar-a' },
              on: {
                click: e => {
                  this._clickAction(action, row);
                }
              }
            },
            action.title
          )
        );
      }
      return result;
    },
    // 获取下拉显示的内联操作项
    _getOtherActionChildren(h, row, otherActions) {
      if (otherActions.length <= 0) {
        return [];
      }
      let visibleOtherActions = [];
      for (let [index, action] of otherActions.entries()) {
        if (action.visible && !action.visible(row)) continue;
        visibleOtherActions.push(action);
      }
      if (visibleOtherActions.length === 0) {
        return [];
      }
      if (visibleOtherActions.length === 1) {
        // 直接渲染成 toolbar 形式
        let action = visibleOtherActions[0];
        return [
          h(
            'a',
            {
              attrs: { class: 'inline-action-toolbar-a' },
              on: {
                click: e => {
                  this._clickAction(action, row);
                }
              }
            },
            action.title
          )
        ];
      }
      let result = [];
      let menuItems = [];
      for (let [index, action] of visibleOtherActions.entries()) {
        menuItems.push(
          h(
            'AMenuItem',
            {
              props: {
                key: `${index}`
              }
            },
            [
              h(
                'a',
                {
                  attrs: { class: 'inline-action-other-a' },
                  on: {
                    click: e => {
                      this._clickAction(action, row);
                    }
                  }
                },
                [action.title]
              )
            ]
          )
        );
      }
      let dropdownChildren = [];
      dropdownChildren.push(
        h(
          'a',
          {
            attrs: {
              class: 'ant-dropdown-link'
            },
            on: {
              click(e) {
                e.preventDefault();
              }
            }
          },
          [
            h('span', { attrs: { class: 'inline-action-more' } }, ['更多']),
            h('AIcon', {
              props: { type: 'down' },
              style: { position: 'absolute', 'margin-left': '5px', 'line-height': '24px' }
            })
          ]
        )
      );
      dropdownChildren.push(h('AMenu', { slot: 'overlay' }, menuItems));
      result.push(
        h(
          'ADropdown',
          {
            attrs: { class: 'inline-action-dropdown' },
            props: {
              placement: 'bottomCenter',
              // textAlign: "center",
              trigger: ['click'],
              getPopupContainer: this.getPopupContainer()
            }
          },
          dropdownChildren
        )
      );
      return result;
    },
    /**
     * 搜索触发
     */
    onSearch() {
      this.searchText = this.searchTextInput;
      this.doSearch();
    },
    // 搜索树形数据
    doSearch() {
      if (!this.pEnableTreeSearch) {
        return;
      }
      if (!this.searchText) {
        this.treeData = JSON.parse(JSON.stringify(this.pTreeData));
        this.onTreeDataUpdate(this.treeData);
        return;
      }
      if (this.pEnableTreeFilterFeature) {
        // 过滤特性
        let treeData = [];
        for (let item of this.pTreeData) {
          let searchItem = this.searchItem(item, this.searchText);
          if (searchItem) {
            treeData.push(searchItem);
          }
        }
        this.treeData = treeData;
        this.onTreeDataUpdate(this.treeData);
      }
      // 高亮展开特性
      let expandedKeys = [];
      for (let item of this.pTreeData) {
        let parentNodes = [];
        this.searchItem(item, this.searchText, parentNodes);
        for (let node of parentNodes) {
          expandedKeys.push(node.key);
        }
      }
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = true;
    },
    // 搜索树形节点
    searchItem(item, val, parentNodes, parentNode) {
      if (item.title.indexOf(val) !== -1) {
        if (parentNodes && parentNode) {
          parentNodes.push(parentNode);
        }
        return objUtil.clone(item);
      }
      let children = [];
      if (item.children) {
        for (let subItem of item.children) {
          let searchItem = this.searchItem(subItem, val, parentNodes, item);
          if (searchItem) {
            children.push(searchItem);
          }
        }
      }
      if (children.length > 0) {
        let resultItem = { ...item };
        resultItem.children = children;
        return resultItem;
      }
      return null;
    },
    // 树形选择函数
    onSelectTree(selectKeys, event) {
      if (!selectKeys || selectKeys.length === 0) {
        return;
      }
      this.selectKeys = selectKeys;
      this.$emit('on-select', selectKeys, event);
      this.curPageNum = 1; // 选择 tree node，页码切换为1
      this.clearSort();
      this.reload();
    },
    /**
     * 清除筛选
     */
    clearSort() {
      this.sortField = '';
      this.orderBy = '';
    },
    // 调整列表高度
    updateTableHeight() {
      this.$nextTick(() => {
        if (!this.$refs.content) {
          return;
        }
        const padding = 24 + 11;
        const headerHeight = 48;
        const contentHeight = this.$refs.tableContent.offsetHeight - padding - headerHeight;
        this.filterHeight = this.$refs.filter ? this.$refs.filter.$el.offsetHeight : 0;
        this.actionHeight = this.$refs.action ? this.$refs.action.offsetHeight : 0;
        const innerActionHeight = this.$refs.inneraction ? this.$refs.inneraction.offsetHeight : 0;
        const pageHeight = this.$refs.page.$el.offsetHeight;
        // this.maxHeight = contentHeight - filterHeight - actionHeight - pageHeight - 25 - 50
        // calc设置的高度不能够直接获取到， 这个地方需要手动减去
        const tableContentHeight = contentHeight - innerActionHeight;
        this.tableHeight = tableContentHeight;
      });
    },
    /**
     * 页码改变触发
     */
    onPageChange(num) {
      this.curPageNum = num;
      this.$emit('on-page-num-change', num);
      this.reload();
    },
    /**
     * 当页数量改变触发
     */
    onPageSizeChange(size, num) {
      this.pageSize = size;
      this.curPageNum = num;
      this.$emit('on-page-size-change', size, num);
      this.reload();
    },
    /**
     * 查询触发
     */
    onQuery() {
      this.curPageNum = 1;
      this.$emit('query');
      this.reload();
    },
    /**
     * 重置触发
     */
    onReset() {
      this.$refs.filter.reset();
      this.$nextTick(() => {
        this.$emit('reset');
        // 重置：搜索区域各字段恢复默认值
        this.reload();
      });
    },
    /**
     * 获取page结构体
     */
    getPage() {
      return {
        pageNum: this.curPageNum,
        pageSize: this.pageSize
      };
    },
    /**
     * 获取排序结构体
     */
    getSort() {
      return {
        field: this._reviseSortField(this.sortField),
        orderBy: this.sortOrderBy
      };
    },
    // 转化排序字段名
    _reviseSortField(sortField) {
      if (this.pSortNotConvert) {
        return sortField;
      }
      let fieldMap = {
        updateName: 'updater',
        // seriesName: 'seriesId',
        // productName: 'productId',
        // modelName: 'modelId',
        // templetName: 'deviceBrandId,deviceTypeId,deviceModelId',
        // protocolName: 'protocolSettingId',
        // pointTypeName: 'pointType',
        // valueTypeName: 'valueType',
        // pointPropertyName: 'pointProperty',
        industryKeyValue: 'industry',
        salesInfo: 'salesId',
        salesManagerInfo: 'salesManagerId'
      };
      if (sortField in fieldMap) {
        return fieldMap[sortField];
      } else if (this.sortFieldMap && sortField in this.sortFieldMap) {
        return this.sortFieldMap[sortField];
      } else {
        return sortField;
      }
    },
    /**
     * ant table改变回调
     */
    onTableChange(pagination, filters, sorter) {
      if (sorter.columnKey) {
        if (sorter.order === 'descend') {
          this.sortOrderBy = 'DESC';
          this.sortField = sorter.columnKey;
        } else if (sorter.order === 'ascend') {
          this.sortOrderBy = 'ASC';
          this.sortField = sorter.columnKey;
        } else {
          this.sortOrderBy = '';
          this.sortField = '';
        }
        this.reload('sort');
      }
    },
    // 重载列表数据
    reload(source = '') {
      this.loading = true;
      this.$emit('change', {
        selectKeys: this.selectKeys,
        page: this.getPage(),
        sortObj: this.getSort(),
        source: source
      });
      setTimeout(() => {
        this.loading = false;
      }, 2300);
    },
    /**
     * 控件值改变触发
     */
    onChange(selectedRowKeys, selectedRows) {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.pSelections.length = 0;
      this.pSelections.push(...selectedRows);
    },
    /**
     * 选择触发
     * @param record
     * @param selected
     * @param selectedRows
     */
    onSelect(record, selected, selectedRows) {
      // console.log(record, selected, selectedRows);
    },
    /**
     * 选择全部触发
     * @param selected
     * @param selectedRows
     * @param changeRows
     */
    onSelectAll(selected, selectedRows, changeRows) {
      // console.log(selected, selectedRows, changeRows);
      this.$emit('onSelectAll', selected, selectedRows, changeRows);
    },
    /**
     * 展开树节点触发
     * @param expandedKeys
     */
    onExpandTree(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    /**
     * 树数据更新触发
     * @param treeData
     */
    onTreeDataUpdate(treeData) {
      function travelNode(node) {
        node.scopedSlots = Object.assign(node.scopedSlots || {}, { title: 'title' });
        if (node.children) {
          for (let childNode of node.children) {
            travelNode(childNode);
          }
        }
      }
      for (let item of treeData) {
        travelNode(item);
      }
    },
    /**
     * 页面大小变化触发
     */
    onresize() {
      this.$nextTick(() => {
        this.updateTableHeight();
      });
    },
    // 获取下拉框的容器
    getPopupContainer() {
      if (this.pDataSource && this.pDataSource.length > 5) {
        return () => document.getElementsByClassName('ant-table-tbody')[0];
      } else {
        return () => document.body;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import 'variables.less';
.container {
  width: 100%;
  // height: 100%;
  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  .action-bar-outer-wrap {
    margin-bottom: 24px;
  }
}
.tree-container {
  width: 100%;
  height: 100%;
  display: flex;
  &-outer {
    height: calc(100% - 108px);
  }
  .bt-tree {
    min-width: 300px;
    max-width: 881px;
    width: 300px;
    height: 823px;
    margin-right: 24px;
    padding: 20px;
    // margin-bottom: 105px;
    // overflow: auto;
    .search-input {
      width: 260px;
      height: 41px;
      line-height: 41px;
      margin-bottom: 20px;
    }
    .tree-item {
      overflow: auto;
      height: 100%;
      .ant-tree {
        position: relative;
      }
    }
  }
  .bt-tree-outer {
    height: 796px;
  }
}
.table {
  flex-grow: 1;
  height: 100%;
  width: 100%;
  .content {
    width: 100%;
    height: calc(100% - 81px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 9px 22px 0px rgba(51, 54, 71, 0.06);
    border-radius: 4px;

    padding-top: 16px;
    padding-left: 30px;
    padding-right: 32px;
    padding-bottom: 11px;

    .action-bar-wrap {
      flex: 1;
      margin-bottom: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .content-outer {
    height: 796px;
  }
  .bt-page {
    margin-top: 34px;
    padding-right: 16px;
  }
}

.inline-action {
  width: 164px;
  display: inline-block;
  .inline-action-spliter {
    margin-left: 8px;
    margin-right: 8px;
    color: #d2d2d3;
    font-size: 14px;
  }
  .inline-action-dropdown {
    position: relative;
  }
  .inline-action-more {
    /*margin-right: 6px;*/
  }
}

.zero-or-one-toolbar-action {
  text-align: center;
}
.multi-toolbar-action {
  // 居中显示
  text-align: center;
}

.inline-action-other-a {
  margin: 0px 7px;
}
.title-action {
  display: flex;
  justify-content: space-between;
}

.bt-title {
  font-size: @font-size-large;
  height: 36px;
  line-height: 36px;
  // padding: 0px 25px 15px 25px;
  // border-bottom: 1px @divider-color solid;
  font-weight: @font-weight-medium;
  font-family: 'SourceHanSansCN-Medium,SourceHanSansCN';
  color: #595959;
  display: flex;
  justify-content: space-between;
  // margin-bottom: 34px;
}
a:active,
a:hover {
  text-decoration: none;
  outline: 0;
}

.ant-dropdown-menu-item > a:hover,
.ant-dropdown-menu-submenu-title > a:hover {
  color: #ff791a;
}
/deep/.ant-dropdown-menu {
  // position: absolute;
  // right: -20px;
  text-align: center;
  // transform: translateX(32px);
  .ant-dropdown-menu-item {
    transition: none;
  }
}
.empty-container {
  display: flex;
  justify-content: center;
  height: 100%;
}
.empty-box {
  display: flex;
  flex-direction: column;
  margin: auto;
  /*.empty-icon {*/
  /*  margin: 0 auto;*/
  /*  width: 72px;*/
  /*  height: 71px;*/
  /*  background: url("data:image/png;base64,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");*/
  /*}*/
  .empty-text {
    margin: 13px auto;
  }
}
</style>
