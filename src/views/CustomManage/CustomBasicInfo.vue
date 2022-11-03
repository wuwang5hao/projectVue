<template>
  <div class="basicInfo-container">
    <ContentContainer class="basicInfo-content-area" pTitle="企业信息" pIsShowTitle>
      <div class="basicInfo-content-company">
        <a-form-model :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-row>
            <a-col span="12">
              <a-form-model-item label="企业名称">
                <span class="edi-value">{{ enterpriseDetail.companyName || '--'}}</span>
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="统一社会信用代码">
                <span class="edi-value">{{ enterpriseDetail.unifiedSocialCreditId || '--' }}</span>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="认证类型">
                <span class="edi-value">{{ enterpriseDetail.abroadFlagName || '--' }}</span>
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="认证时间">
                <span>{{ latestAppraiseRejectTime }}</span>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="行业">
                <span>{{ enterpriseDetail.tradeName || '--' }}</span>
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="所在区域">
                <span>{{ fullAddress }}</span>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="多证合一营业执照">
                <AuthImage v-if="businessLicenseFileId" class="edi-img" :authSrc="businessLicenseFileId" @click="onClickCertificate" />
                <div v-else class="edi-img"></div>
              </a-form-model-item>
            </a-col>
            <a-col class="padding-lr" span="12">
              <a-row>
                <a-col span="24">
                  <a-form-model-item label="企业联系人">
                    <span>{{ enterpriseDetail.companyAdministratorName || '--' }}</span>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="24">
                  <a-form-model-item label="企业电话">
                    <span>{{ enterpriseDetail.telephone || '--' }}</span>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="24">
                  <a-form-model-item label="营业期限">
                    <span>{{ businessTimeLimitFlag }}</span>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="24">
                  <a-form-model-item label="企业邮箱">
                    <span>{{ enterpriseDetail.email || '--' }}</span>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="24">
                  <a-form-model-item label="企业标注">
                    <span style="width: 120px;display: inline-block;padding-left: 12px;">{{companyTypeFlagName}}</span>
                    <a-button type="link" @click="onEditCompanyType">修改</a-button>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model>
        <a-modal class="edi-preview" :visible="previewVisible" :footer="null" @cancel="onClickCancel">
          <AuthImage v-if="businessLicenseFileId" style="width: 100%" :authSrc="businessLicenseFileId" />
          <img v-else style="width: 100%" :src="businessLicenseFileId" />
        </a-modal>
      </div>
      <div class="basicInfo-change-record">
        <span class="change-record-title">变更记录</span>
        <BaseTable
          :pShowPage=false
          :pColumns="columns"
          :pDataSource="dataSource"
          :pTotal="total"
          @change="onReload"
          class="change-record-content"
          ref="table"
        >
          <span slot="modifyType" slot-scope="modifyType">
            <span title="企业名称变更" v-if="modifyType === '1'">企业名称变更</span>
            <span title="企业工商统一社会信用代码变更" v-else-if="modifyType === '2'">企业工商统一社会信用代码变更</span>
            <span title="企业主体变更" v-else-if="modifyType === '3'">企业主体变更</span>
            <span v-else>-</span>
          </span>
          <span slot="status" slot-scope="status">
            <a-tag v-if="status==='0'" color="blue">审核中</a-tag>
            <a-tag v-if="status==='1'" color="green">通过</a-tag>
            <a-tag v-if="status==='2'" color="red">未通过</a-tag>
          </span>
        </BaseTable>
      </div>
    </ContentContainer>
    <ContentContainer class="edi-content-area" pTitle="管理员信息" pIsShowTitle>
      <BaseTable
        :pShowPage=false
        :pColumns="columnsAdmin"
        :pDataSource="dataSourceAdmin"
        :pTotal="totalAdmin"
        @change="onReloadAdmin"
        class="change-record-content"
        ref="table"
      >
        <span slot="activeStatus" slot-scope="activeStatus">
        <a-tag v-if="activeStatus==='启用'" color="blue">启用</a-tag>
        <a-tag v-if="activeStatus==='停用'" color="red">停用</a-tag>
      </span>
      </BaseTable>
    </ContentContainer>
  </div>
</template>

<script>
/**
 * 基本信息
 * @vue-props {}
 * @vue-data {}
 * @vue-event {}
 */
import OptionsMixin from "@/common/OptionsMixin"
import TableMixin from "@/components/table/TableMixin";
import ContentContainer from '@/components/ContentContainer'
import { dtUtil } from 'jscom/utils/sysutil'
import AuthImage from "@/components/AuthImage"
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import moment from 'moment';
import EditCompanyTypeModal from './EditCompanyTypeModal';

export default {
  name: 'CustomBasicInfo',

  mixins: [TableMixin, OptionsMixin],

  components: {
    ContentContainer,
    AuthImage
  },

  data() {
    return {
      moment,
      labelCol: { span: 8},
      wrapperCol: { span: 16},
      enterpriseDetail: {
        email: '',
        businessTimeLimitFlag: false,
        startBusinessDate: null,
        stopBusinessDate: null,
      },
      previewVisible: false,
      columns: [
        { title: '变更类型', key: 'modifyType', sorter: false, align: 'center', scopedSlots: {customRender: 'modifyType'}, ellipsis: true},
        {
          title: '发起时间',
          key: 'actionTime',
          align: 'center',
          customRender: (value, row, index) => {
            return dtUtil.formatDatetime(new Date(value))
          }
        },
        { title: '变更状态', key: 'status', sorter: false, align: 'center', scopedSlots: {customRender: 'status'}},
        { title: '更改人', key: 'modifyUserName', sorter: false, align: 'center'},
      ],
      dataSource: [],
      total: 0,
      columnsAdmin: [
        { title: '状态', key: 'activeStatus', sorter: false, align: 'center', ellipsis: true, scopedSlots: {customRender: 'activeStatus'}},
        { title: '账号', key: 'account', sorter: false, align: 'center', nameField: true},
        { title: '真实姓名', key: 'name', sorter: false, align: 'center', scopedSlots: {customRender: 'status'}},
        { title: '手机', key: 'cellPhoneNumber', sorter: false, align: 'center'},
        {
          title: '变更日期',
          key: 'administratorReplaceTime',
          sorter: false, align: 'center',
          width: '165px',
          customRender: (value, row, index) => {
            return value
          }
        },
      ],
      dataSourceAdmin: [],
      totalAdmin: 0,
      companyFlagOptions: [
        {
          label: '一般企业',
          value: '01'
        },
        {
          label: '工业园区',
          value: '02'
        },
        {
          label: '集团公司',
          value: '03'
        },
      ],
    };
  },

  computed: {
    //企业标注
    companyTypeFlagName() {
      let name = this.enterpriseDetail.companyTypeFlag && this.companyFlagOptions.find(item => item.value === this.enterpriseDetail.companyTypeFlag)?.label;
      console.log('this.enterpriseDetail?.companyTypeFlag', this.enterpriseDetail.companyTypeFlag);
      return name||'-'
    },
    // 所在区域
    fullAddress () {
      if (!this.enterpriseDetail || !this.enterpriseDetail.provinceName) {
        return '--'
      }
      return `${this.enterpriseDetail.provinceName} ${this.enterpriseDetail.cityName} ${this.enterpriseDetail.areaName}`
    },
    // 认证时间
    latestAppraiseRejectTime() {
      if (!this.enterpriseDetail || !this.enterpriseDetail.latestAppraiseRejectTime) {
        return '--'
      }
      return dtUtil.formatDatetime(new Date(this.enterpriseDetail.latestAppraiseRejectTime))
    },
    // 营业执照
    businessLicenseFileId () {
      if (!this.enterpriseDetail || !this.enterpriseDetail.businessLicenseFileId) {
        return ''
      }
      return this.$apiUtil.getImageUrl(this.enterpriseDetail.businessLicenseFileId)
    },
    businessTimeLimitFlag() {
      if (!this.enterpriseDetail || !this.enterpriseDetail.startBusinessDate) {
        return '--'
      }
      return `${dtUtil.formatDate(new Date(this.enterpriseDetail.startBusinessDate))}至${dtUtil.formatDate(new Date(this.enterpriseDetail.stopBusinessDate))}`
    }
  },

  created() {
    this.getCompanyDetail();
  },

  methods: {
    /**
     * 加载数据
     * @param page
     * @param sortObj
     */
    getCompanyDetail() {
      let api = this.$apiUtil.getEnterpriseApi();
      api.get_company_Info({company_id: this.$route.query.id}).then(({data}) => {
        this.enterpriseDetail = {...this.enterpriseDetail, ...data};
      });
    },
    // 营业执照预览显示
    onClickCertificate () {
      this.previewVisible = true
    },
    // 退出营业执照预览
    onClickCancel () {
      this.previewVisible = false
    },
    onReload({page, sortObj}) {
      let api = this.$apiUtil.getEnterpriseApi();
      api.get_company_changeRecord({company_id: this.$route.query.id, ...page, sortObj}).then(({data}) => {
        this.dataSource= data.companyModifyHistoryList
        this.total= data.companyModifyHistoryList.length
      });
    },
    onReloadAdmin({page, sortObj}) {
      let api = this.$apiUtil.getEnterpriseApi();
      api.get_admin_changeHistory({company_id: this.$route.query.id, ...page, sortObj}).then(({data}) => {
        data.forEach((item) => {
          item.administratorReplaceTime = item.administratorReplaceTime?dtUtil.formatDatetime(new Date(item.administratorReplaceTime)):'-'
        })
        this.dataSourceAdmin= data
        this.totalAdmin=data.length
      });
    },
    onEditCompanyType() {
      if (this.enterpriseDetail.companyTypeFlag !== '01') {
        this.$message.error('无法变更！');
      } else {
        this.onUpdateCompanyType();
      }
    },
    onUpdateCompanyType() {
      new ComponentUtil(this.$store).create({
        cls: EditCompanyTypeModal,
        clsprops: {
          pVisible: true,
          pCompanyTypeFlag: this.enterpriseDetail.companyTypeFlag,
          pCompanyId: this.$route.query.id
        },
        on: {
          confirm: () => {
            this.getCompanyDetail();
          }
        }
      });
    }

  },
}
</script>

<style lang="less">
@import 'variables.less';
.basicInfo-container{
  flex-direction: column;
  align-items: center;
  margin: 16px 16px;
  .cc-content{
    display: inline;
  }
  .basicInfo-content-area{
    margin-bottom: @space-size-base;
    width: 100%;
    .edi-value {
      font-size: 14px;
      font-weight: @font-weight-medium;
      font-family: 'SourceHanSansCN-Semibold,SourceHanSansCN';
      line-height: 1.3;
      padding-top: 12px;
      display: inline-block;
    }
    .ant-form-item {
      color: #333333;
    }
  }
  .basicInfo-content-company {
    width: 100%;
    padding: 30px 75px 0px 75px;
    .edi-img {
      width: 144px;
      background-color: #BCC2C3;
      line-height: 1.3;
      margin-top: 14px;
    }
    .ant-form-item{
      margin: 0 0 8px;
    }
  }
  .basicInfo-change-record{
    padding-top: 32px;
    margin-top: 32px;
    border-top: 1px solid #e0e0e0;
    .change-record-title {
      color: #181818;
      font-size: 16px;
      margin-left:24px;
    }
    &-content {
      padding: 0!important;
      margin-top: 32px;
      .table .content {
        padding: 0;
        margin-bottom: 0;
        box-shadow: none;
        .ant-table-body {
          max-height: none!important;
          .ant-tag {
            width: auto;
          }
        }
      }
    }
  }
}
</style>
