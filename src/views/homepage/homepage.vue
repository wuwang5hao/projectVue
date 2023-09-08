<template>
  <div class="h-container">
    <p class="h-title h-title-left">总览</p>
    <a-row type="flex" justify="space-between">
      <Card
        class="h-card"
        v-for="(data, index) in overviewDatas"
        :key="index"
        :pBgImg="data.bgImg"
        :pIcon="data.icon"
        :pUnit="data.unit"
        :pValue="data.value"
        :pDesc="data.desc"
      ></Card>
    </a-row>
    <a-row class="h-chart-row" justify="space-between" type="flex" :gutter="30">
      <a-col class="h-chart-left">
        <a-row class="h-row">
          <p class="h-title h-title-bottom">待办事项</p>
          <a-row type="flex">
            <ContentContainer class="h-todo-container" pColumn>
              <div class="h-todo-total h-todo-item">
                <p class="h-todo-desc">待办总数</p>
                <p class="h-todo-value">{{ todoInfo.todoTotal }}&nbsp;<span class="h-todo-unit">件</span></p>
              </div>
              <VueECharts class="h-todo-chart" :options="todoOptions"></VueECharts>
              <a-row class="h-todo-footer" type="flex" justify="space-between">
                <div class="h-todo-item">
                  <p class="h-todo-value">{{ todoInfo.todoAssign }}&nbsp;<span class="h-todo-unit">件</span></p>
                  <div class="h-todo-desc">
                    <p class="h-todo-dot h-todo-dot-blue"></p>
                    &nbsp;待指派
                  </div>
                </div>
                <div class="h-todo-item-frame"></div>
                <div class="h-todo-item">
                  <p class="h-todo-value">{{ todoInfo.todoExamine }}&nbsp;<span class="h-todo-unit">件</span></p>
                  <div class="h-todo-desc">
                    <p class="h-todo-dot h-todo-dot-yellow"></p>
                    &nbsp;待审核
                  </div>
                </div>
              </a-row>
            </ContentContainer>
            <ContentContainer class="h-todo-list" pColumn>
              <div>
                <TabBar :pItems="tabItems" @on-change="onTabChange" pJustify="left"></TabBar>
                <div class="h-todo-list-area">
                  <div
                    class="h-todo-list-item"
                    v-for="(item, index) in todoList"
                    :key="index"
                    @click="onClickTodoItem(item)"
                  >
                    <p class="h-todo-list-item-text">{{ item.text }}</p>
                    <p>{{ item.datetime }}</p>
                  </div>
                </div>
              </div>
            </ContentContainer>
          </a-row>
        </a-row>
        <a-row type="flex" justify="space-between" class="h-row">
          <div class="h-company">
            <p class="h-title h-title-bottom">企业行业排名</p>
            <a class="h-click-more" @click="businessMoreClick">更多&nbsp;<a-icon type="right"/></a>
            <a-modal v-model="businessVisible" title="入驻企业行业统计" class="moreClick-modal" centered>
              <template slot="footer">
                <a-button key="back" @click="handleCancel">
                  关闭
                </a-button>
              </template>
              <template>
                <a-table :columns="business_columns" :data-source="businessMoreData" :pagination="false"> </a-table>
              </template>
            </a-modal>
            <ContentContainer pIsShowMore :pColumn="true">
              <a-row :style="{ paddingLeft: '30px', paddingRight: '30px' }">
                <a-col :span="8" v-for="(info, index) in firstRowCompanyOptions" :key="index">
                  <VueECharts class="h-company-chart" :options="info.option"></VueECharts>
                  <span class="h-chart-title">
                    {{ info.title }}
                  </span>
                </a-col>
              </a-row>
              <a-row :style="{ paddingLeft: '30px', paddingRight: '30px' }">
                <a-col :span="8" v-for="(info, index) in secondRowCompanyOptions" :key="index">
                  <VueECharts class="h-company-chart" :options="info.option"></VueECharts>
                  <span class="h-chart-title">
                    {{ info.title }}
                  </span>
                </a-col>
              </a-row>
            </ContentContainer>
          </div>
          <div class="h-software-sale">
            <p class="h-title h-title-bottom">软件产品销量排名</p>
            <a class="h-click-more" @click="softwareMoreClick">更多&nbsp;<a-icon type="right"/></a>
            <a-modal v-model="softwareVisible" title="软件产品销量统计" class="moreClick-modal" centered>
              <template slot="footer">
                <a-button key="back" @click="handleCancel">
                  关闭
                </a-button>
              </template>
              <template>
                <a-table :columns="software_columns" :data-source="softwareMoreData" :pagination="false"> </a-table>
              </template>
            </a-modal>
            <ContentContainer>
              <VueECharts class="h-software-sale-chart" :options="softwareSaleOptions"></VueECharts>
              <div class="h-software-left">
                <div class="h-software-title-left" v-if="softwareSaleHomeOptionList[0]">
                  <span>
                    <span class="num">{{ softwareSaleHomeOptionList[0].value }}</span
                    ><span class="unit">项</span></span
                  ><br />
                  <span
                    ><span class="h-software-dot" style="background-color: #23C9D4"></span
                    ><span class="label">
                      <TooltipWrapper :pText="softwareSaleHomeOptionList[0].name" /> </span
                  ></span>
                </div>
                <div class="h-software-title-left" v-if="softwareSaleHomeOptionList[1]">
                  <span>
                    <span class="num">{{ softwareSaleHomeOptionList[1].value }}</span
                    ><span class="unit">项</span></span
                  ><br />
                  <span
                    ><span class="h-software-dot" style="background-color: #526FE5"></span
                    ><span class="label">
                      <TooltipWrapper :pText="softwareSaleHomeOptionList[1].name" /> </span
                  ></span>
                </div>
                <div class="h-software-title-left" v-if="softwareSaleHomeOptionList[2]">
                  <span>
                    <span class="num">{{ softwareSaleHomeOptionList[2].value }}</span
                    ><span class="unit">项</span></span
                  ><br />
                  <span
                    ><span class="h-software-dot" style="background-color: #6B53E5"></span
                    ><span class="label">
                      <TooltipWrapper :pText="softwareSaleHomeOptionList[2].name" /> </span
                  ></span>
                </div>
              </div>
              <div class="h-software-right">
                <div class="h-software-title-right" v-if="softwareSaleHomeOptionList[3]">
                  <span>
                    <span class="num">{{ softwareSaleHomeOptionList[3].value }}</span
                    ><span class="unit">项</span></span
                  ><br />
                  <span
                    ><span class="h-software-dot" style="background-color: #70CC80"></span
                    ><span class="label"><TooltipWrapper :pText="softwareSaleHomeOptionList[3].name"/></span
                  ></span>
                </div>
                <div class="h-software-title-right" v-if="softwareSaleHomeOptionList[4]">
                  <span>
                    <span class="num">{{ softwareSaleHomeOptionList[4].value }}</span
                    ><span class="unit">项</span></span
                  ><br />
                  <span
                    ><span class="h-software-dot" style="background-color: #F3B853"></span
                    ><span class="label"><TooltipWrapper :pText="softwareSaleHomeOptionList[4].name"/></span
                  ></span>
                </div>
                <div class="h-software-title-right" v-if="softwareSaleHomeOptionList[5]">
                  <span>
                    <span class="num">{{ softwareSaleHomeOptionList[5].value }}</span
                    ><span class="unit">项</span></span
                  ><br />
                  <span
                    ><span class="h-software-dot" style="background-color: #C2C9CD"></span
                    ><span class="label"><TooltipWrapper :pText="softwareSaleHomeOptionList[5].name"/></span
                  ></span>
                </div>
              </div>
            </ContentContainer>
          </div>
        </a-row>
      </a-col>
      <a-col class="h-chart-right">
        <div class="h-hardware-sale">
          <p class="h-title h-title-bottom h-title-right">硬件产品接入排名</p>
          <a class="h-click-more" @click="hardwareMoreClick">更多&nbsp;<a-icon type="right"/></a>
          <a-modal v-model="hardwareVisible" title="硬件产品销量统计" class="moreClick-modal" centered>
            <template slot="footer">
              <a-button key="back" @click="handleCancel">
                关闭
              </a-button>
            </template>
            <template>
              <a-table :columns="hardware_columns" :data-source="hardwareMoreData" :pagination="false"> </a-table>
            </template>
          </a-modal>
          <ContentContainer pIsShowMore pColumn>
            <Rank
              v-for="(rank, index) in hardwareRanks"
              :key="index"
              :pIndex="index + 1"
              :pTitle="rank.title"
              :pDesc="rank.desc"
              :pValue="rank.value"
              :pUnit="rank.unit"
              :pMaxValue="hardwareRanks[0].value"
            ></Rank>
            <div v-if="hardwareRanks.length === 0" class="empty-box">
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
          </ContentContainer>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/**
 * 首页
 * @vue-data {Array} overviewDatas - 总览数据列表
 * @vue-data {Object} todoOptions - 待办事项表格配置
 * @vue-data {Object} todoList - 待办事项列表
 * @vue-data {Array} tabItems - 待办事项tab项
 * @vue-data {String} activeTab - 当前选择的待办事项类型
 */
import Card from '@/components/card';
import ContentContainer from '@/components/ContentContainer';
import VueECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/graphic';
import echarts from 'echarts/lib/echarts';
import { dtUtil } from 'jscom/utils/sysutil';
import { strUtil } from 'jscom/utils/strutil';
import TabBar from '@/components/TabBar';
import Rank from '@/components/rank';
import TooltipWrapper from '@/components/TooltipWrapper';
import { getSwSaleOption, getCompanyOption, getTodoOption } from '@/charts/home';
import { mapState } from 'vuex';
import { hardware_columns, business_columns, software_columns } from './const';

export default {
  name: 'homepage',

  components: {
    Card,
    ContentContainer,
    VueECharts,
    TabBar,
    Rank,
    TooltipWrapper
  },

  data() {
    return {
      // 总览数据
      overviewDatas: [
        {
          icon: `${this.STATIC_IMG_URL}/custom-icon.png`,
          bgImg: `${this.STATIC_IMG_URL}/custom-bg.png`,
          unit: '家',
          value: '-',
          desc: '入驻总数'
        },
        {
          icon: `${this.STATIC_IMG_URL}software-icon.png`,
          bgImg: `${this.STATIC_IMG_URL}software-bg.png`,
          unit: '个',
          value: '-',
          desc: '总发布数'
        },
        {
          icon: `${this.STATIC_IMG_URL}hardware-icon.png`,
          bgImg: `${this.STATIC_IMG_URL}hardware-bg.png`,
          unit: '个',
          value: '-',
          desc: '总接入数'
        }
      ],
      todoOptions: {},
      hardwareSaleOptions: {},
      softwareSaleOptions: {},
      softwareSaleHomeOptionList: [],
      companyOptions: [],
      todoInfo: { todoTotal: 0, todoAssign: 0, todoExamine: 0 },
      todoList: [],
      tabItems: ['待指派', '待审核'],
      activeTab: '',
      hardwareRanks: [],
      clientApi: this.$apiUtil.getHomeApi(),
      businessVisible: false,
      softwareVisible: false,
      hardwareVisible: false,
      // 硬件接入排行榜全部数据
      hardwareMoreData: [],
      // 硬件接入更多表格列表头
      hardware_columns,
      // 企业行业排名全部数据
      businessMoreData: [],
      // 企业行业排名表格列表头
      business_columns,
      // 软件产品销售排名全部数据
      softwareMoreData: [],
      // 软件产品销售排名表格列表头
      software_columns
    };
  },

  computed: {
    // ...mapState(['userInfo']),
    firstRowCompanyOptions() {
      let options = this.companyOptions.slice(0, 3);
      return options || [];
    },
    secondRowCompanyOptions() {
      let options = this.companyOptions.slice(3, 6);
      return options || [];
    }
  },

  created() {
    // this.initData()
  },

  methods: {
    // 待办事项tab切换事件
    onTabChange(tab) {
      this.activeTab = tab;
      this.updateTodoList();
    },
    // 获取首页数据
    initData() {
      this.getStatisticsData();
      this.getTodoList();
      this.getIndustryData();
      this.getSoftwareData();
      this.getHardwareData();
    },
    // 根据当前选择类型过滤待办事项列表： 待审核，待指派
    updateTodoList() {
      let businessType = '02';
      if (this.activeTab === '待审核') {
        businessType = '01';
      }
      let todoList = [];
      this.todoInfo.todoList.forEach((item) => {
        if (item.businessType === businessType) {
          todoList.push({
            text: item.contents,
            datetime: dtUtil.formatDatetime(new Date(item.updateTime)),
            targetUrl: item.targetUrl
          });
        }
      });
      this.todoList = todoList;
    },
    // 获取总览数据
    getStatisticsData() {
      this.clientApi
        .totality_statistics({})
        .then(({ data }) => {
          this.overviewDatas[0].value = strUtil.humanInteger(data.enterpriseTotalCount);
          this.overviewDatas[1].value = strUtil.humanInteger(data.softwareTotalCount);
          if (data.hardwareTotalCount >= 10000) {
            this.overviewDatas[2].value = Math.round(data.hardwareTotalCount / 100) / 100;
            this.overviewDatas[2].unit = '万个';
          } else {
            this.overviewDatas[2].value = strUtil.humanInteger(data.hardwareTotalCount);
            this.overviewDatas[2].unit = '个';
          }
        })
        .catch((error) => {});
    },
    // 获取待办事项列表
    getTodoList() {
      this.clientApi
        .todo_list({ id: this.userInfo.id })
        .then(({ data }) => {
          this.todoInfo = data;
          this.todoOptions = getTodoOption(data.todoAssign, data.todoTotal);
          this.updateTodoList();
        })
        .catch((error) => {});
    },
    // 获取企业行业排名
    getIndustryData() {
      this.clientApi
        .industry_proportion({})
        .then(({ data }) => {
          let total = parseInt(data.enterpriseTotalCount, 10);
          let options = [];
          let index = 0;
          let otherItem = {
            title: '其它',
            industryCount: 0
          };
          data.industryCollection.forEach((item) => {
            if (index < 5) {
              options.push({
                title: item.industryName,
                option: getCompanyOption('', parseInt(item.industryCount, 10), total, index)
              });
            } else {
              otherItem.industryCount += parseInt(item.industryCount, 10);
            }
            item.product = item.industryName;
            item.num = parseInt(item.industryCount, 10);
            index += 1;
            item.index = index;
          });
          if (otherItem.industryCount > 0) {
            otherItem.option = getCompanyOption('', otherItem.industryCount, total, 5);
            options.push(otherItem);
          }
          this.companyOptions = options;
          this.businessMoreData = data.industryCollection;
        })
        .catch((error) => {});
    },
    // 获取软件销售排行列表
    getSoftwareData() {
      this.clientApi
        .software_product_sales_proportion({})
        .then(({ data }) => {
          if (!data) {
            return;
          }
          let softwareOptions = [];
          data.orderSoftwareHomePageList.forEach((item) => {
            softwareOptions.push({
              name: item.moduleName,
              value: item.softwareTotalCount
            });
          });
          this.softwareSaleHomeOptionList = [...softwareOptions];
          console.log(this.softwareSaleHomeOptionList, 666);
          this.softwareSaleOptions = getSwSaleOption(softwareOptions, data.orderSoftwareTotalCount);
          let index = 0;
          data.orderSoftwareList.forEach((item) => {
            item.product = item.moduleName;
            item.num = item.softwareTotalCount;
            index += 1;
            item.index = index;
          });
          this.softwareMoreData = data.orderSoftwareList;
        })
        .catch((error) => {});
    },
    // 获取硬件排行数据
    getHardwareData() {
      this.clientApi
        .hardware_product_sales_proportion({})
        .then(({ data }) => {
          let hardwareOptions = [];
          data.orderHardwareList.slice(0, 6).forEach((item) => {
            let unit = '个';
            let value = strUtil.humanInteger(item.hardwareTotalCount);
            if (item.hardwareTotalCount > 10000) {
              value = Math.round(item.hardwareTotalCount / 100) / 100;
              unit = '万个';
            }
            hardwareOptions.push({
              title: item.hardwareProductName,
              desc: item.hardwareSeriesName,
              value: value,
              unit: unit
            });
          });
          this.hardwareRanks = hardwareOptions;
          let index = 0;
          data.orderHardwareList.forEach((item) => {
            item.product = `${item.hardwareProductName}/${item.hardwareSeriesName}`;
            item.num = item.hardwareTotalCount;
            index += 1;
            item.index = index;
          });
          this.hardwareMoreData = data.orderHardwareList;
        })
        .catch((error) => {});
    },
    // 待办事项点击响应函数
    onClickTodoItem(item) {
      if (item.targetUrl) {
        this.$router.push(item.targetUrl);
      }
    },
    // 企业行业更多点击事件
    businessMoreClick() {
      this.businessVisible = true;
    },
    // 软件销售更多点击事件
    softwareMoreClick() {
      this.softwareVisible = true;
    },
    // 硬件销售排行更多点击事件
    hardwareMoreClick() {
      this.hardwareVisible = true;
    },
    handleCancel() {
      this.businessVisible = false;
      this.softwareVisible = false;
      this.hardwareVisible = false;
    }
  }
};
</script>

<style lang="less">
@import 'variables.less';
@import 'mixins.less';
.h-container {
  padding: 26px 62px 38px 62px;
  .h-card {
    padding: 47px 78px;
    height: 190px;
    // width: 495px;
    flex: 1;
    margin-bottom: 28px;
  }
  .h-card:not(:last-child) {
    margin-right: 27px;
  }
  .h-title {
    font-size: @font-size-huge;
    color: #919aaa;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .h-chart-row {
    margin-left: -18px;
    .h-chart-left {
      flex: 1;
      margin-right: 12px;
    }
    .h-chart-right {
      width: 495px;
      margin-right: 15px;
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
  }
  .h-row {
    margin: 0px;
  }
  .h-row:not(:last-child) {
    margin-bottom: 25px;
  }
  .h-title-bottom {
    margin-bottom: 10px;
  }
  .h-title-right {
    margin-left: 10px;
  }
  .h-hardware-sale {
    position: relative;
    .cc-container {
      height: 646px;
      padding: 50px 0 0 0;
      .cc-content {
        height: 565px;
        overflow: auto;
        padding: 0px 37px;
      }
    }
    .h-click-more {
      position: absolute;
      right: 8px;
      top: 58px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(146, 162, 182, 1);
      height: 20px;
      line-height: 20px;
    }
  }
  .h-software-sale {
    position: relative;
    //   flex: 1;
    width: 600px;
    .cc-content {
      position: relative;
    }
    .h-software-sale-chart {
      margin: 0 auto;
      width: 300px;
    }
    .h-software-left {
      position: absolute;
      left: 60px;
      width: 110px;
      height: 100%;
    }
    .h-software-right {
      position: absolute;
      right: 24px;
      width: 110px;
      height: 100%;
    }
    .label {
      font-size: 12px;
      color: #657386;
      height: 17px;
      line-height: 17px;
      .text-overflow();
      width: 88px;
      display: inline-block;
      vertical-align: middle;
    }
    .num {
      font-size: 20px;
      color: #1e222b;
      font-weight: bold;
      line-height: 20px;
      height: 28px;
    }
    .unit {
      font-size: 12px;
      color: #92a2b6;
      line-height: 22px;
      height: 22px;
      padding-left: 6px;
    }
    .h-software-title-left {
      text-align: left;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      height: 80px;
    }
    .h-software-title-right {
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      height: 80px;
    }
    .h-software-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      margin: auto;
      margin-right: 5px;
      vertical-align: middle;
    }
    .cc-container {
      height: 320px;
      padding: 72px 0 0 0;
    }
    &-chart {
      width: 490px;
      height: 248px;
      z-index: 99;
      top: -25px;
    }
    .h-click-more {
      position: absolute;
      right: 8px;
      top: 58px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(146, 162, 182, 1);
      height: 20px;
      line-height: 20px;
    }
  }
  .h-company {
    position: relative;
    flex: 1;
    margin-right: 25px;
    .cc-container {
      height: 320px;
      padding-top: 35px;
    }
    .h-chart-title {
      text-align: center;
      display: block;
      margin: 0 auto;
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: rgba(101, 115, 134, 1);
      line-height: 15px;
      margin-bottom: 10px;
    }
    .h-company-chart {
      position: relative;
      width: 92px;
      height: 92px;
      margin: 0 auto;
    }
    .h-click-more {
      position: absolute;
      right: 8px;
      top: 58px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(146, 162, 182, 1);
      height: 20px;
      line-height: 20px;
    }
  }
  .h-todo-container {
    margin-right: @space-size-small;
    flex: 1;
    height: 252px;
    padding: 24px 0;
    .h-todo-chart {
      width: 220px;
      height: 120px;
      top: 10px;
      left: 23px;
    }
    .h-todo-item {
      text-align: center;
    }
    .h-todo-total {
      border-bottom: 1px @divider-color solid;
      padding-bottom: 20px;
      .h-todo-value {
        font-size: @h4-font-size;
      }
    }
    .h-todo-desc {
      font-size: @font-size-small;
      color: @text-color;
      margin-bottom: 0px;
    }
    .h-todo-value {
      font-size: @font-size-huge;
      color: @title-color;
      font-weight: bold;
      margin-bottom: 5px;
      line-height: 1;
    }
    .h-todo-unit {
      font-size: @font-size-small;
      color: @disabled-color;
      font-weight: normal;
    }
    .h-todo-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      margin: auto;
      &-blue {
        background-color: #ff791a;
      }
      &-yellow {
        background-color: #f3b853;
      }
    }
    .h-todo-footer {
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 8px;
      padding: 0 40px;
    }
  }

  .h-todo-list {
    flex: 5;
    height: 252px;
    padding: 12px 0px 0px 0px;
    .tb-tabs {
      margin: 0px;
      padding: 0px 25px;
      border-bottom: 1px @divider-color solid;
    }
    .tb-tabs-item {
      color: #657386;
    }
    .tb-tabs-item-active {
      color: #1e222b;
      .font-weight-medium();
    }
    &-area {
      height: 185px;
      padding: 0px @space-size-large;
      overflow: auto;
    }
    &-item {
      width: 100%;
      padding: 18px 43px 17px 0px;
      border-bottom: 1px @border-color solid;
      display: flex;
      justify-content: space-between;
      font-size: @font-size-small;
      line-height: 1;
      cursor: pointer;
      > p {
        margin-bottom: 0px;
      }
      &-text {
        max-width: 500px;
        margin-bottom: 0px;
        .text-overflow();
      }
    }
    &-item:last-child {
      border-bottom: 0px;
    }
  }
  .h-todo-item-frame {
    margin: 5px 5px auto;
    width: 1px;
    height: 36px;
    background: rgba(242, 243, 247, 1);
  }
  .empty-box {
    margin: auto auto;
    text-align: center;
  }
}

.moreClick-modal {
  .ant-modal-content {
    .ant-modal-body {
      height: 298px;
    }
  }

  .ant-table-tbody > tr {
    transition: all 0.3s, height 0s;
    height: 46px;
  }
  .ant-table .ant-table-content .ant-table-body .ant-table-thead tr,
  .ant-table .ant-table-content .ant-table-body .ant-table-thead th {
    transition: all 0.3s, height 0s;
    height: 46px;
  }
  .ant-table-tbody > tr > td {
    padding: 0px 16px;
    overflow-wrap: break-word;
  }
  .ant-table-thead > tr > th {
    padding: 0px 16px;
    overflow-wrap: break-word;
  }
}
.cfop-tooltip {
  .ant-tooltip-inner {
    font-size: 9px;
    font-family: 'SourceHanSansCN-Regular,SourceHanSansCN';
    font-weight: 400;
    color: rgba(11, 12, 16, 1);

    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
  }
  .ant-tooltip-arrow::before {
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>
