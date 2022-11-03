<template>
  <div ref="page" class="tp-page">
    <span>共 {{ pTotal }} 条</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>每页&nbsp;</span>
    <ASelect class="tp-page-size" :defaultValue="pageSize" @change="onPageSizeChange">
      <a-icon slot="suffixIcon" type="caret-down"></a-icon>
      <ASelectOption v-for="(value, index) in pageSizeArr" :value="value" :key="index">{{ value }}</ASelectOption>
    </ASelect>
    <span>&nbsp;条</span>
    <span class="tp-home" @click="onClickHome">首页</span>
    <APagination
      class="tp-pagination"
      v-model="curPageNum"
      :pageSize="pageSize"
      :total="pTotal"
      size="small"
      @change="onChangePage"
    />
    <span class="tp-tail" @click="onClickTail">尾页</span>
    <span>前往&nbsp;</span>
    <AConfigProvider>
      <template v-slot:renderEmpty>
        <div class="empty-container" style="height: 32px"></div>
      </template>
      <ASelect show-search class="tp-page-size" v-model="curPageNum" @change="onChangePage">
        <a-icon slot="suffixIcon" type="caret-down"></a-icon>
        <ASelectOption v-for="(value, index) in totalPage" :value="value" :key="index">{{ value }}</ASelectOption>
      </ASelect>
    </AConfigProvider>
    <span>&nbsp;页</span>
  </div>
</template>

<script>
/**
 * 分页器
 */
export default {
  name: 'TablePage',

  props: {
    pPageNum: {
      type: Number,
      default: 1
    },
    pPageSize: {
      type: Number,
      default: 10
    },
    pTotal: {
      type: Number,
      default: 0
    }
  },

  watch: {
    pPageNum(val) {
      this.curPageNum = val;
    },
    pPageSize(val) {
      this.pageSize = val;
    }
  },

  data() {
    return {
      curPageNum: 0,
      pageSize: this.pPageSize || 10,
      pageSizeArr: [10, 20, 30, 40, 50]
    };
  },

  mounted() {
    // 需要有一个 curPageNum 的变化
    this.curPageNum = this.pPageNum;
  },

  computed: {
    totalPage() {
      return Math.ceil(this.pTotal / this.pageSize);
    }
  },

  methods: {
    /**
     * 页面数量修改触发
     * @param size
     */
    onPageSizeChange(size) {
      let num = (this.curPageNum - 1) * this.pageSize + 1;
      this.pageSize = size;
      this.curPageNum = Math.ceil(num / this.pageSize);
      this.$emit('on-page-size-change', size, this.curPageNum);
    },
    /**
     * 点击首页触发
     */
    onClickHome() {
      this.curPageNum = 1;
      this.$emit('on-change', this.curPageNum);
    },
    /**
     * 点击尾页触发
     */
    onClickTail() {
      this.curPageNum = this.totalPage;
      this.$emit('on-change', this.curPageNum);
    },
    /**
     * 页面改变触发
     * @param num
     */
    onChangePage(num) {
      this.curPageNum = num;
      this.$emit('on-change', this.curPageNum);
    }
  }
};
</script>

<style lang="less">
@import 'variables.less';
.tp-page {
  display: flex;
  justify-content: right;
  align-items: center;

  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 14px;
  height: 28px;
  .tp-page-size {
    width: 60px;
    height: 28px !important;
  }
  .ant-select-selection {
    background: rgba(245, 246, 250, 1);
  }
  .tp-pagination {
    display: inline-block;
    border-radius: 2px;
  }
  .ant-select-selection--single {
    height: 28px;
  }
  .ant-select-selection--single .ant-select-selection__rendered {
    line-height: 28px;
  }
  .tp-home {
    margin-left: 30px;
    margin-right: 25px;
    cursor: pointer;
  }
  .tp-tail {
    margin-left: 25px;
    margin-right: 30px;
    cursor: pointer;
  }
  .ant-pagination.mini .ant-pagination-item {
    min-width: 24px;
    height: 24px;
    margin: 0 6px 0 6px;
    line-height: 22px;
  }
  .ant-pagination-item-active a {
    background-color: #ff791a;
    color: #fff;
  }
}
</style>
