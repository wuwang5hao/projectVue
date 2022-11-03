<template>
  <div>
    <div ref='topSearch'
    v-if='isShowFilterBar'>
      <p>{{ title }}</p>
      <Row type="flex" align="middle" :gutter="8">
        <Col>
          <SelectSearch
            v-if="isShowSearch"
            :pSearchTypeArr="searchTypeArr"
            v-model="searchValue"
            :pShowSearchButton="filters.length === 0"
            @on-change="updateSearchTextMap"
            @on-search="onSearch"
            :pInputWidth="260"
            pPlaceholder="请输入"></SelectSearch>
        </Col>
        <Expand v-for="(filter, index) of barShowFilters" :key="index" :pRender="renderFilter" :pData="filter"></Expand>
        <Col v-if="isShowFilterButtons">
          <Button type='primary' @click='onClickFilter'>筛选</Button>
          <Button @click='isOpenOptions=!isOpenOptions'>高级</Button>
        </Col>
      </Row>
    </div>
    <!-- Action bar -->
    <div v-if="isShowActionBar">
      <Button v-for="(action, index) of barActions" :key="index" :type="action.type"
              :disabled="action.disabled"
              @click="onClickAction(action)">{{ action.title }}</Button>
    </div>
    <div>
      <Table
        ref='selection'
        :columns='columns'
        :data='tableSpec.records'
        :loading='isLoading'
        :width="width"
        :height="height"
        @on-selection-change='onSelectionChange'
        @on-select-cancel='onSelectCancel'
        @on-select-all-cancel='onSelectAllCancel'
        @on-row-dblclick='ondbClickItem'
        @on-sort-change='onSortChange'
        @on-current-change='onCurrentChange'></Table>
      <div class='tb-table-footer' ref='page'>
        <span>共 {{totalCount}} 条记录 第 {{pageIndex}}/{{totalPage}} 页</span>
        <Page ref='Page' :total='totalCount' show-elevator show-sizer
              @on-change='onPageNumChange'
              @on-page-size-change='onPageSizeChange'></Page>
      </div>
      <Drawer
        title="高级" placement="right" :closable="true" :inner="true" :transfer="false"
        v-model="isOpenOptions" :width="50" :draggable="true">
        <Expand v-for="(filter, index) of barHideFilters" :key="index" :pRender="renderFilter" :pData="filter"></Expand>
        <Button type='primary' @click='onClickFilter'>筛选</Button>
        <Button @click='onClickReset'>重置</Button>
      </Drawer>
    </div>
  </div>
</template>
<script>
import TableControl from './TableControl'
import Expand from 'jscom/widgets/Expand'
import SelectSearch from 'jspc/widgets/SelectSearch'

import {
  FILTER_CHOICE,
  FILTER_COMBO,
  FILTER_COMPLEMENT,
  FILTER_RANGE,
  FILTER_VALUE,
} from 'rpc/Table/Table'

export default {
  name: 'BaseCompactTable',
  mixins: [TableControl],
  components: { Expand, SelectSearch },
  props: {
    pBarShowFilterCount: { type: Number, default: 5 },
    pHideFilters: Array,
    pRunTableAction: Function,
    pShowFilterBar: {
      type: Boolean,
      default: true
    },
    pShowActionBar: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isShowFilterBar() {
      if (!this.pShowFilterBar) {
        return false
      }
      let filters = this.filters
      return filters && filters.length > 0
    },
    barShowFilters() {
      return this.filters.slice(0, this.pBarShowFilterCount)
    },
    barHideFilters() {
      return this.filters.slice(this.pBarShowFilterCount)
    },
    isShowSearch() {
      return this.tableSpec.getSearches().length > 0
    },
    isShowFilterButtons() {
      return this.tableSpec.filters.length > 0
    },
    isShowActionBar () {
      return this.pShowActionBar && this.tableSpec.hasNotInlineTitleActions()
    },
  },
  data() {
    return {
      filterWidth: '100px',
      isOpenOptions: false,
    }
  },
  methods: {
    renderFilter(h, ctx, filter) {
      if (this.isHideFilter(filter)) {
        return () => {}
      }
      let prev = [h('span', filter.title+'：')]
      if ([FILTER_CHOICE, FILTER_COMBO, FILTER_COMPLEMENT].indexOf(filter.type) >= 0) {
        return h('Col', {}, [...prev, this.renderSelectComponent(h, ctx, filter)])
      } else if ([FILTER_RANGE].indexOf(filter.type) >= 0) {
        return h('Col', {}, [...prev, this.renderRangeComponent(h, ctx, filter)])
      } else if ([FILTER_VALUE].indexOf(filter.type) >= 0) {
        return h('Col', {}, [...prev, this.renderValueComponent(h, ctx, filter)])
      } else {}
    },
    renderValueComponent(h, ctx, filter) {
      if (filter.isWidgetTypeMonth()) {
        return h('DatePicker',
          {
            props: {
              value: filter.activeValue,
              type: 'month',
              editable: false,
              placement: 'bottom-end',
              placeholder: '请选择开始月份',
            },
            style: {width: this.filterWidth},
            on: {
              'on-change': (value) => {
                filter.activeValue = value
              }
            }
          }
        )
      } else if (filter.isWidgetTypeDatetime()) {
        return h('DatePicker',
          {
            props: {
              value: filter.activeValue,
              type: 'datetime',
              editable: false,
              placement: 'bottom-start',
              placeholder: '请选择时间',
            },
            style: {width: this.filterWidth},
            on: {
              'on-change': (value) => {
                filter.activeValue = value
              }
            }
          })
      } else {
        return h('Input',
          {
            props: {
              value: filter.activeValue,
            },
            style: { width: this.filterWidth },
            on: {
              change(value) {
                filter.activeValue = value
              }
            }
          })
      }
    },
    renderRangeComponent(h, ctx, filter) {
      if (filter.isDatetimeRange()) {
        return h('DatePicker',
          {
            props: {
              value: filter.activeValue,
              type: 'daterange',
              editable: false,
              placement: 'bottom-start',
              placeholder: '请选择时间',
            },
            style: {width: this.filterWidth},
            on: {
              'on-change': (value) => {
                filter.activeValue = value
              }
            }
          })
      } else if (filter.isMonthRange()) {
        return h('div', [
          h('DatePicker',
            {
              props: {
                value: filter.activeValue[0],
                type: 'month',
                editable: false,
                placement: 'bottom-end',
                placeholder: '请选择开始月份',
              },
              on: {
                'on-change': (value) => {
                  filter.activeValue[0] = value
                }
              }
            }
          ),
          h('DatePicker',
            {
              props: {
                value: filter.activeValue[1],
                type: 'month',
                editable: false,
                placement: 'bottom-end',
                placeholder: '请选择结束月份',
              },
              on: {
                'on-change': (value) => {
                  filter.activeValue[1] = value
                }
              }
            }
          )
        ])
      } else {
        return [
          h('Input',
            {
              props: {
                value: filter.activeValue[0]
              },
              style: { width: this.filterWidth },
              on: {
                change(value) {
                  filter.activeValue[0] = value
                }
              }
            }
          ),
          h('span', '至'),
          h('Input',
            {
              props: {
                value: filter.activeValue[1]
              },
              style: { width: this.filterWidth },
              on: {
                change(value) {
                  filter.activeValue[1] = value
                }
              }
            }
          ),
        ]
      }
    },
    renderSelectComponent(h, ctx, filter) {
      let options = []
      for (let [value, name] of Object.entries(filter.valueNameMap)) {
        options.push(
          h('Option',
            {
              props: {value, name}
            },
            name
          )
        )
      }
      return h('Select',
        {
          props: {
            closable: true,
            clearable: true,
            placeholder: filter.filter.emptyTip && filter.filter.emptyTip || '请选择',
            value: filter.activeValue,
            filterable: filter.isFilterable(),
          },
          style: { width: this.filterWidth },
          on: {
            change() {
              this.onSelectChange(filter)
            },
            clear() {
              this.onSelectClear(filter)
            },
            input(value) {
              filter.activeValue = value
            }
          }
        },
        options
      )
    },
    onFilterChange (filter) {
      if (this.autoFilter) {
        this.onClickFilter(filter)
      }
    },
    onSelectChange (filter) {
      if (this.autoFilter) {
        this.onClickFilter(filter)
      }
    },
    onSelectClear (filter) {
      if (this.autoFilter) {
        this.onClickFilter(filter)
      }
    },
    onSearch() {
      this.loadTableRecords()
    },
    getHideFilters() {
      return this.pHideFilters || []
    },
    OnRunTableAction(api, action, actionSpec) {
      if (this.pRunTableAction) {
        return this.pRunTableAction(this, api, action, actionSpec)
      }
      return false
    }
  }

}
</script>
