<template>
  <div class='tb-container' id='table-container'>
    <div v-if='showFilterBar' class='tb-filter-bar'>
      <div class='tb-filter-bar-up'>
        <p class='tb-filter-title'>{{ title }}</p>
        <div class='tb-filter-bar-right'>
          <SelectSearch
          v-if="isShowSearch" class="tb-filter-bar-search"
          :pSearchTypeArr="searchTypeArr"
          v-model="searchValue"
          :pShowSearchButton="filters.length === 0"
          @on-change="updateSearchTextMap"
          @on-search="onSearch"
          pPlaceholder="请输入"></SelectSearch>
          <div class='tb-filter-bar-icon' v-if='pShowLoadBar'>
            <Icon :class="[!isLoadPage ? 'tb-filter-bar-icon-default' : 'tb-filter-bar-icon-load']" type='md-refresh'
            @click='onClickResetLoad'></Icon>
          </div>
        </div>
      </div>
      <div class='tb-filter-groups'>
        <RadioGroup
        v-for='choiceFilter in choiceFilters'
        v-model='choiceFilter.activeValue'
        class='tb-filter-radio-group'
        type='button'
        @on-change='onFilterChange(choiceFilter)'
        :key='choiceFilter.field'>
          <p class='tb-filter-title'>{{ choiceFilter.title }}：</p>
          <Radio
          class='tb-filter-radio-item'
          label='全部'
          ></Radio>
          <Radio
          class='tb-filter-radio-item'
          v-for='(value, key) in choiceFilter.valueNameMap'
          :label='value'
          :key='key'></Radio>
        </RadioGroup>
        <div class='tb-filter-select'
        v-for='selectFilter in selectFilters'
        :key='selectFilter.field'>
          <p class='tb-filter-title'>{{ selectFilter.title }}：</p>
          <Select
          v-model="selectFilter.activeValue"
          clearable
          :placeholder="selectFilter.filter.emptyTip && selectFilter.filter.emptyTip || '请选择'"
          :filterable='selectFilter.isFilterable()'
          @on-change='onSelectChange(selectFilter)'
          @on-clear='onSelectClear(selectFilter)'>
            <Option v-for="(value, key) in selectFilter.valueNameMap"
            :value="key"
            :key="key">{{ value }}</Option>
          </Select>
        </div>
        <div class='tb-filter-range'
        v-for='rangeFilter in rangeFilters'
        :key='rangeFilter.field'>
          <p class='tb-filter-title'>{{ rangeFilter.title }}：</p>
          <DatePicker
          v-if='rangeFilter.isDatetimeRange()'
          v-model='rangeFilter.activeValue'
          type='daterange'
          :editable='false'
          placement='bottom-end'
          placeholder='请选择时间'></DatePicker>
          <div v-else-if='rangeFilter.isMonthRange()'>
            <DatePicker
              v-model='rangeFilter.activeValue[0]'
              type='month'
              :editable='false'
              placement='bottom-end'
              placeholder='请选择开始月份'></DatePicker>
            <span> 至 </span>
            <DatePicker
              v-model='rangeFilter.activeValue[1]'
              type='month'
              :editable='false'
              placement='bottom-end'
              placeholder='请选择结束月份'></DatePicker>
          </div>
          <div v-else>
            <Input
            v-model='rangeFilter.activeValue[0]'
            class='tb-filter-range-input'></Input>
            <span> 至 </span>
            <Input
            v-model='rangeFilter.activeValue[1]'
            class='tb-filter-range-input'></Input>
          </div>
        </div>
        <div class='tb-filter-value'
             v-for='valueFilter in valueFilters'
             :key='valueFilter.field'>
          <p class='tb-filter-title'>{{ valueFilter.title }}：</p>
          <DatePicker
            v-if='valueFilter.isWidgetTypeDatetime() || valueFilter.isWidgetTypeDate()'
            v-model='valueFilter.activeValue'
            :type='valueFilter.widgetJson.type'
            :editable='false'
            placement='bottom-end'
            placeholder='请选择时间'></DatePicker>
          <DatePicker
            v-else-if="valueFilter.isWidgetTypeMonth()"
            v-model='valueFilter.activeValue'
            type='month'
            :editable='false'
            placement='bottom-end'
            placeholder='请选择月份'></DatePicker>
          <Input
            v-else
            v-model='valueFilter.activeValue'
            class='tb-filter-value-input' :maxlength="20"></Input>
        </div>
      </div>
      <div v-if='isShowFilterButtons' class='tb-filter-buttons'>
        <Button class='tb-filter-button' type='primary' @click='onClickFilter'>筛选</Button>
        <Button class='tb-filter-button' @click='onClickReset'>重置</Button>
      </div>
    </div>
    <!-- Action bar -->
    <div v-if="isShowActionBar" :class="isShowActionBorder ? 'tb-action-bar tb-action-bar-border' : 'tb-action-bar'">
      <Button v-for="(action, index) of barActions" v-show="!action.hide"
        :key="index"
        :type="action.type"
        :disabled="action.disabled"
        class="tb-action-button"
        @click="onClickAction(action)">{{ action.title }}</Button>
    </div>
    <div>
      <slot name="tableTop"></slot>
      <Table
      ref='selection'
      :columns='columns'
      :data='tableSpec.records'
      :loading='isLoading'
      @on-selection-change='onSelectionChange'
      @on-row-dblclick='ondbClickItem'
      @on-sort-change='onSortChange'
      @on-current-change='onCurrentChange'></Table>
      <BindTable v-if='pShowBindTable'
      ref='bindTable'
      :pColumns='bindTableColumns'
      :pData='bindData'></BindTable>
      <div class='tb-table-footer'>
        <span>共 {{totalCount}} 条记录 第 {{pageIndex+1}}/{{totalPage}} 页</span>
        <Page ref='Page'
        :total='totalCount' show-elevator show-sizer
        @on-change='onPageNumChange'
        @on-page-size-change='onPageSizeChange'></Page>
      </div>
      <slot name="tableBottom"></slot>
    </div>
  </div>
</template>

<script>
import TableControl from './TableControl'
import SelectSearch from 'jspc/widgets/SelectSearch'
import BindTable from "jspc/widgets/BindTable"

export default {
  name: 'BaseTable',
  mixins: [TableControl],
  components: { SelectSearch, BindTable },
  props: {
    pShowFilterBar: {
      type: Boolean,
      default: true
    },
    pShowActionBar: {
      type: Boolean,
      default: true
    },
    pShowActionBorder: {
      type: Boolean,
      default: null
    },
    pUseFilterSubmitButton: {
      type: Boolean,
      default: true
    },
    pShowBindTable: {
      type: Boolean,
      default: false
    },
    pShowLoadBar: {
      tyep: Boolean,
      default: true
    }
  },

  data() {
    return {
      showFilterBar: this.pShowFilterBar,
      showActionBar: this.pShowActionBar,
      showActionBorder: this.pShowActionBorder,
      useFilterSubmitButton: this.pUseFilterSubmitButton,
      bindTableColumns: [],
      bindData: [],
      isLoadPage: false
    }
  },

  created() {
  },
  mounted () {
    this.initBindTable()
  },
  computed: {
    isShowSearch() {
      return this.tableSpec.getSearches().length
    },
    isShowFilterButtons() {
      return this.useFilterSubmitButton && (this.tableSpec.filters && this.tableSpec.filters.length > 0)
    },
    autoFilter() {
      return !this.useFilterSubmitButton
    },
    isShowActionBar () {
      return this.tableSpec.hasNotInlineTitleActions() && this.showActionBar
    },
    isShowActionBorder() {
      if (this.showActionBorder != null) return this.showActionBorder
      return this.tableSpec.hasNotInlineTitleActions() && this.tableSpec.filters.length > 0
    },
  },

  methods: {
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
      this.reloadTableRecords()
    },
    initBindTable () {
      this.$nextTick(() => {
        if (this.$refs.bindTable) {
          this.$refs.bindTable.bindTable(this.$refs.selection)
        }
      })
    },
    onClickResetLoad () {
      this.onClickReset()
      this.isLoadPage = true
    }
  }
}
</script>

<style lang='less'>
  /* 这个地方因为提供给render函数使用，所以不使用scoped修饰 */
  @import 'jspc/styles/common.less';
  @min-title-width: 6rem;
  .tb-container {
  }
  .tb-filter-bar {
    display: flex;
    flex-flow: column wrap;
    margin-bottom: @large-vert-space;
    .tb-filter-bar-up {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .tb-filter-title {
        font-size: @larger-font-size;
        line-height: 32px;
      }
      .tb-filter-bar-right{
        display: flex;
        align-items: center;
        .tb-filter-bar-search {
          margin-left: @horizontal-space;
          .tb-search-input {
          }
        }
        .tb-filter-bar-icon{
          font-size: @larger-font-size + 2;
          margin-left: @small-horz-space;
          cursor: pointer;
          color: @blue;
        }
        .tb-filter-bar-icon-default{
          animation: none;
        }
        .tb-filter-bar-icon-load{
          animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
          from { transform: rotate(0deg);}
          50%  { transform: rotate(180deg);}
          to   { transform: rotate(360deg);}
        }
      }
    }

    .tb-filter-groups {
      flex-grow: 1;
      display: flex;
      flex-flow: column wrap;

      .tb-filter-title {
        font-size: @normal-font-size;
        align-self: center;
        min-width: @min-title-width;
      }

      .tb-filter-radio-group {
        display: flex;
        margin-top: @vertical-space;
        .tb-filter-radio-item {
          margin: 0rem 0.4rem;
          border-radius: 0px;
        }
      }

      .tb-filter-select {
        margin-top: @vertical-space;
        width: 250px;
        display: flex;
      }

      .tb-filter-range {
        display: flex;
        margin-top: @vertical-space;
        .tb-filter-range-input {

        }
      }

      .tb-filter-value {
        display: flex;
        margin-top: @vertical-space;
        .tb-filter-value-input {
          width: 250px;
        }
      }
    }

    .tb-filter-buttons {
      margin-top: @large-vert-space;
      padding-left: @horizontal-space;
      .tb-filter-button {
        margin-right: @horizontal-space;
        width: 100px;
      }
    }
  }

  .tb-action-bar {
    position: relative;
    padding-bottom: @vertical-space;
    .tb-action-button:not(:first-child) {
      margin-left: @small-horz-space;
    }
  }

  .tb-action-bar-border {
    margin-top: @vertical-space;
    padding: @vertical-space 0rem;
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      top: 0;
      border-top: 1px solid @border-color;
    }
  }

  .tb-table-footer {
    display: flex;
    justify-content: space-between;
    color: @gray-text-color;
    align-items: center;
    padding: @large-vert-space 0 @vertical-space 0
  }
</style>
