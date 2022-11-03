<template>
  <div ref="container" class="ot-container">
    <div ref="actionBar" v-if="isShowBatch" class="ot-actionbar">
      <a-checkbox
        v-model="isCheckAll"
        @change="onAllCheckChange">全选</a-checkbox>
      <a-button class="ot-batch-active-btn"
        type="primary"
        @click="onBactchActive">批量启用</a-button>
    </div>
    <div ref="table" class="ot-table">
      <div ref="header" class="ot-header">
        <p class="ot-header-item ot-col-first"></p>
        <p class="ot-header-item ot-col-content">订单内容</p>
        <p class="ot-header-item ot-col-price">单价（元）</p>
        <p class="ot-header-item ot-col-count">数量（个）</p>
        <p class="ot-header-item ot-col-interval">时长（月）</p>
        <p class="ot-header-item ot-col-status">启用状态</p>
        <p class="ot-header-item ot-col-product">产品操作</p>
        <p class="ot-header-item ot-col-action">操作</p>
      </div>
      <div ref="body" class="ot-body">
        <div class="ot-body-item" v-for="order in orderList"
          :key="order.orderId">
          <div class="ot-body-item-header ot-body-td">
            <div class="ot-body-item-header-title">
              <a-checkbox
                v-if="isShowBatch"
                class="ot-body-item-header-title-check"
                :checked="order.checked"
                @change="onCheckChange($event, order)"></a-checkbox>
              <span>订单号：{{ order.orderId }}</span>
              <div>{{ order.enterpriseName }}</div>
            </div>
            <div>
              <span>交易状态：&nbsp;&nbsp;</span>
              <div class="ot-body-item-header-status"
                :style="`color: ${statusStyle(order)}`">
                <div class="ot-dot" :style="`background-color: ${statusStyle(order)}`"></div>
                &nbsp;<span>{{ getOrderStatus(order) }}</span>
              </div>
            </div>
          </div>
          <div class="ot-body-item-content">
            <div style="width: 85%">
              <div class="ot-body-item-content-row"
                v-for="software in order.softwareList"
                :key="software.id">
                <div class="ot-body-td ot-td-first">
                  <span>{{ getSoftwareType(software) }}</span>
                </div>
                <div class="ot-body-td ot-td-content">
                  <p class="ot-td-content-title">
                    <TooltipWrapper :pText="getSoftwareName(software)" />
                  </p>
                  <p class="ot-td-content-desc">软件产品</p>
                </div>
                <div class="ot-body-td ot-td-price">
                  <span>{{ formatPrice(software.price) }}</span>
                </div>
                <div class="ot-body-td ot-td-count">
                  <span>{{ software.accountNum }}</span></div>
                <div class="ot-body-td ot-td-interval">
                  <span>{{ software.useMonth }}</span>
                </div>
                <div class="ot-body-td ot-td-status">
                  <a-tag v-if="getSoftwareStatus(software)"
                    :color="getSoftwareColor(software)">
                    {{ getSoftwareStatus(software) }}
                  </a-tag>
                  <span v-else>-</span>
                </div>
                <div class="ot-body-td ot-td-product">
                  <a-button v-if="isActive(order, software)" type="link" @click="onClickActive(software)">启用</a-button>
                  <span v-else>-</span>
                </div>
              </div>
              <div class="ot-body-item-content-row"
                v-for="hardware in order.hardwareList"
                :key="hardware.id">
                <div class="ot-body-td ot-td-first">
                  <span>{{ getHardwareType(hardware) }}</span>
                </div>
                <div class="ot-body-td ot-td-content">
                  <p class="ot-td-content-title">
                    <TooltipWrapper :pText="getHardwareName(hardware)"></TooltipWrapper>
                  </p>
                  <p class="ot-td-content-desc">硬件产品</p>
                </div>
                <div class="ot-body-td ot-td-price">
                  <span>{{ formatPrice(hardware.price) }}</span>
                </div>
                <div class="ot-body-td ot-td-count">
                  <span>{{ hardware.hardCount }}</span></div>
                <div class="ot-body-td ot-td-interval">
                  <span>-</span>
                </div>
                <div class="ot-body-td ot-td-status">
                  <span>-</span>
                </div>
                <div class="ot-body-td ot-td-product">
                  <span>-</span></div>
              </div>
            </div>
            <div class="ot-body-td ot-col-action ot-body-item-content-detail">
              <span class="ot-action" @click="onClickDetail(order)">详情</span>
              <span v-if="isShowCancel(order)" class="ot-action" @click="onClickCancel(order)">取消</span>
            </div>
          </div>
          <div class="ot-body-item-footer ot-body-td">
            <p v-if="false" class="ot-body-item-footer-value">
              <span class="ot-body-item-footer-label">总金额:</span>
              <span class="ot-body-item-footer-price">
                {{ orderTotalPrice(order) }}
              </span>
            </p>
            <p class="ot-body-item-footer-value">
              <span class="ot-body-item-footer-label">实付金额:</span>
              <span class="ot-body-item-footer-price">
                {{ orderPayPrice(order) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-container">
      <div v-if="orderList.length === 0"  >
        <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#D9D9D9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path></g></g></svg>
        <!--                  <div class="empty-icon"></div>-->
        <p class="empty-text">暂无数据</p>
      </div>
      <!-- <div v-else class="empty-box">
        <img src="../../static/img/loading.gif" width="24" height="24" />
      </div> -->
    </div>

    <TablePage
      v-show="isShowPage"
      ref="page"
      class="ot-page"
      :pTotal="pTotal"
      :pPageSize="pageSize"
      :pPageNum="curPageNum"
      @on-change="onChangePage"
      @on-page-size-change="onChangePageSize"></TablePage>
  </div>
</template>

<script>
/**
 * 订单表格
 * @vue-props {Array} pOrderList - 订单列表
 * @vue-props {Number} pTotal - 订单总数
 * @vue-props {Boolean} pIsEdit - 是否可操作
 * @vue-props {Boolean} pIsShowCancel - 是否显示取消按钮
 */
import { strUtil } from 'jscom/utils/strutil'
import TablePage from '@/components/table/TablePage'
import { mapGetters } from 'vuex'
import TooltipWrapper from '@/components/TooltipWrapper'

export default {
  name: 'OrderTable',

  components: {
    TablePage,
    TooltipWrapper
  },

  props: {
    pOrderList: Array,
    pTotal: Number,
    pIsEdit: Boolean,
    pIsShowCancel: Boolean,
    pPageSize: {
      type: Number,
      default: 10
    },
  },

  data () {
    return {
      // 0:待处理 1:已完成 2:已关闭
      orderStatusMap: {
        0: {color: '#FFAD02', title: '待处理'},
        1: {color: '#52C41A', title: '已完成'},
        2: {color: '#95969e', title: '已关闭' }
      },
      softwareStatusMap: {
        // 0: 待启用 1: 已启用
        0: {color: 'yellow', title: '待启用'},
        1: {color: 'green', title: '已启用'},
      },
      isCheckAll: false,
      orderList: [],
      checkList: [],
      pageSize: this.pPageSize,
      curPageNum: 1,
    }
  },

  mounted () {
    this.initOrderList(this.pOrderList)
    // this.updateTableHeight()
  },

  watch: {
    pOrderList (orderList) {
      this.initOrderList(orderList)
    },
    pTotal (num) {
      let pageNum = this.curPageNum - 1
      if (pageNum < 0) {
        pageNum = 0
      }
      if (num < (pageNum * this.pageSize)) {
        this.curPageNum = Math.max(Math.ceil(num / this.pageSize), 1)
        this.onChangePage(this.curPageNum)
      }
    },
    pPageNum (num) {
      // console.log(num)
      this.curPageNum = num
      this.onChangePage(num)
    },
  },

  computed: {
    ...mapGetters([
      'hasPermission'
    ]),
    isShowBatch () {
      return this.pIsEdit && this.hasPermission('order_software')
    },
    isShowPage () {
      return this.orderList && this.orderList.length > 0
    }
  },

  methods: {
    isShowCancel (order) {
      return this.hasPermission('order_cancel') && order.softwareActivatedFlag === '0' && order.orderStatus !== '2'
    },
    initOrderList (orderList) {
      if (this.pIsEdit) {
        orderList.forEach((order) => {
          order.checked = false
          this.checkList.push(false)
        })
        this.isCheckAll = false
      }
      this.orderList = orderList
      // this.updateTableHeight()
    },
    statusStyle (order) {
      let status = this.orderStatusMap[order.orderStatus]
      return status ? status.color : ''
    },
    getOrderStatus (order) {
      let status = this.orderStatusMap[order.orderStatus]
      return status ? status.title : ''
    },
    getSoftwareType (software) {
      // 1:购买 2:续费
      if (software.orderSoftwareType === '1') {
        return '购买'
      } else if (software.orderSoftwareType === '2') {
        return '续费'
      } else {
        return '-'
      }
    },
    formatPrice (price) {
      return strUtil.humanPrice(price)
    },
    getSoftwareColor (software) {
      let status = this.softwareStatusMap[software.softwareStatus]
      return status ? status.color : ''
    },
    getSoftwareStatus (software) {
      let status = this.softwareStatusMap[software.softwareStatus]
      return status ? status.title : ''
    },
    getSoftwareName (software) {
      return `${software.serviceName}/${software.moduleName}`
    },
    getHardwareName (hardware) {
      return `${hardware.brandName}/${hardware.seriesName}/${hardware.productName}/${hardware.modelName}（${hardware.orderNumber}）`
    },
    isActive (order, software) {
      return software.firstActivated === '0' && software.orderSoftwareType === '1' && this.hasPermission('order_software') && order.orderStatus !== '2'
    },
    onClickActive (software) {
      this.$emit('on-active', software)
    },
    onBactchActive () {
      let orders = []
      this.orderList.forEach((order) => {
        if (order.checked) {
          orders.push(order)
        }
      })
      if (orders.length === 0) {
        return
      }
      this.$emit('on-batch-active', orders)
    },
    getHardwareType (hardware) {
      return '购买'
    },
    getHardwareStatus (hardware) {
      // 1:已激活 2:已启用 3:已停用
      if (hardware.hardwareStatus === '1') {
        return '已激活'
      } else if (hardware.hardwareStatus === '2') {
        return '已启用'
      } else if (hardware.hardwareStatus === '3') {
        return '已停用'
      } else {
        return ''
      }
    },
    onClickDetail (order) {
      this.$emit('on-detail', order)
    },
    onClickCancel (order) {
      this.$emit('on-cancel', order)
    },
    orderTotalPrice (order) {
      return `￥${strUtil.humanPrice(order.totalAmount)}`
    },
    orderPayPrice (order) {
      return `￥${strUtil.humanPrice(order.paymentAmount)}`
    },
    onChangePage (num) {
      this.curPageNum = num
      this.$emit('on-change', num)
    },
    onChangePageSize (size, num) {
      this.pageSize = size
      this.curPageNum = num
      this.$emit('on-change-size', size, num)
    },
    updateTableHeight () {
      this.$nextTick(() => {
        if (!this.$refs.container) {
          return
        }
        const containerHeight = this.$refs.container.offsetHeight
        const tableHeight = this.$refs.table.offsetHeight
        const headerHeight = this.$refs.header.offsetHeight + 24
        const pageHeight = this.$refs.page.$el.offsetHeight + 70
        const actionBarHeight = this.$refs.actionBar ? this.$refs.actionBar.offsetHeight : 0
        const tableContentHeight = containerHeight - headerHeight - pageHeight - actionBarHeight
        this.$refs.body.style=`height: ${tableContentHeight}px`
      })
    },
    onCheckChange ({target}, order) {
      let isCheckAll = true
      order.checked = target.checked
      this.orderList.forEach((orderItem) => {
        isCheckAll = isCheckAll && orderItem.checked
      })
      this.isCheckAll = isCheckAll
    },
    onAllCheckChange ({target}) {
      this.orderList.forEach((order) => {
        order.checked = this.isCheckAll
      })
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
@import 'mixins.less';
.ot-container {
  width: 100%;
  color: @text-color;
  height: 100%;
  padding-bottom: 11px;
  .ot-actionbar {
    padding: 6px @space-size-base @space-size-base 34px;
    display: flex;
    justify-content: left;
    align-items: center;
    .ot-batch-active-btn {
      margin-left: 10px;
    }
  }
  .ot-body-td {
    border-right: 1px @divider-color solid;
    border-bottom: 1px @divider-color solid;
    text-align: center;
    height: 58px;
    padding: 10px 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ot-dot {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    display: inline-block;
  }
  .ot-col-first {
    width: 8%;
  }
  .ot-col-content {
    width: 28%;
  }
  .ot-col-price {
    width: 10%;
  }
  .ot-col-count {
    width: 10%;
  }
  .ot-col-interval {
    width: 9%;
  }
  .ot-col-status {
    width: 10%;
  }
  .ot-col-product {
    width: 10%;
  }
  .ot-td-first {
    width: 9%;
  }
  .ot-td-content {
    width: 33%;
    display: flex ;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    &-title {
      line-height: 1.1;
      text-align: left;
      .text-overflow();
      width: 100%;
    }
    &-desc {
      color: #9B9B9B;
      font-size: @font-size-small;
      line-height: 1;
      margin-top: 5px;
      text-align: left;
    }
  }
  .ot-td-price {
    width: 12%;
    justify-content: center;
  }
  .ot-td-count {
    width: 12%;
  }
  .ot-td-interval {
    width: 10%;
  }
  .ot-td-status {
    width: 12%;
  }
  .ot-td-product {
    width: 12%;
  }
  .ot-col-action {
    width: 15%;
  }
  .ot-table {
    width: 100%;
    p {
      margin-bottom: 0px;
    }
    .ot-action {
      color: @primary;
      .font-weight-medium();
      cursor: pointer;
    }
    .ot-header {
      height: 64px;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      border-radius: 8px;
      &-item {
        color: @title-color;
        font-size: @font-size-base;
        .font-weight-medium();
        text-align: center;
        padding: 0px 34px;
      }
      .ot-col-price {
        text-align: center;
      }
    }
    .ot-body {
      background-color: transparent;
      // overflow-y: auto;
      &-item {
        background-color: @white;
        border-radius: 6px;
        padding-top: 2px;
        margin-top: 22px;
        &-header {
          display: flex;
          justify-content: space-between;
          height: 48px;
          border-left: 2px @primary solid;
          align-items: center;
          background-color: #EBFAFD;
          .font-weight-medium();
          &-check {
            margin-right: 10px;
          }
          &-title {

            > div {
              display: inline-block;
              padding-left: 70px;
              margin: 0px;
            }
          }
          &-status {
            display: inline-block;
          }
        }
        &-content {
          display: flex;
          &-row {
            display: flex;
          }
          &-detail {
            height: auto;
            align-self: stretch;
            display: flex;
            justify-content: center;
            align-items: center;
            .ot-action:last-child {
              margin-left: 10px;
            }
          }
        }
        &-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 62px;
          &-value {
            display: flex;
            align-items: center;
          }
          &-label {
            color: #3A3A3A;
            margin-left: 20px;
            margin-right: 10px;
          }
          &-price {
            color: @primary;
            font-size: @h5-font-size;
            .number-weight-medium();
          }
        }
      }
    }
  }
  .ot-page {
    margin-top: 35px;
  }
}
</style>
<style lang="less" scoped>
/deep/.empty-container{
  position: absolute;
  left: 50%;
  top: 55%;
}
/deep/.empty-text{
  color: rgb(197, 199, 215);
  margin-left: 4px;
}
</style>
