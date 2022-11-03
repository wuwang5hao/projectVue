<template>
  <div class="vp-container">
    <ContentContainer class="vp-content" pColumn>
      <div class="vp-content-title">
        企业信息
      </div>
      <a-row>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">企业类型：</div>
            <div class="vp-content-value">
              {{ enterpriseInfo.abroadFlagName || '无' }}
            </div>
          </div>
        </a-col>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">统一社会信用代码：</div>
            <div class="vp-content-value">
              {{ enterpriseInfo.unifiedSocialCreditId }}
            </div>
          </div>
        </a-col>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">企业ID：</div>
            <div class="vp-content-value">
              {{ enterpriseInfo.companyId }}
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">企业名称：</div>
            <div class="vp-content-value">
              {{ enterpriseInfo.companyName }}
            </div>
          </div>
        </a-col>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">企业所在地：</div>
            <div class="vp-content-value">
              {{ getFullAddress(enterpriseInfo) || '无' }}
            </div>
          </div>
        </a-col>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">企业行业：</div>
            <div class="vp-content-value">
              {{ enterpriseInfo.tradeName || '无' }}
            </div>
          </div>
        </a-col>
      </a-row>
      <a-divider class="vp-content-divider" />
      <div class="vp-content-title">
        企业资料
      </div>
      <div class="vp-image-container">
        <img
          class="vp-certificate"
          v-if="!businessLicenseFileId"
          :src="businessLicenseFileId"
          @click="onClickCertificate"
        />
        <AuthImage class="vp-certificate" v-else :authSrc="businessLicenseFileId" @click="onClickCertificate" />
        <div class="vp-image-desc">营业执照</div>
      </div>
      <a-divider class="vp-content-divider" />

      <div class="vp-content-title">
        审核类型
      </div>
      <div class="vp-content-item" style="padding-left:75px">
        {{
          (enterpriseInfo.realNameAuthenticateModifyType &&
            consts.realNameAuthenticateModifyTypes.find(v => v.value === enterpriseInfo.realNameAuthenticateModifyType)
              .label) ||
            '无'
        }}
      </div>
      <a-divider class="vp-content-divider" />

      <div style="display: flex;">
        <div style="flex: 1;">
          <div class="vp-content-title">
          创建人（用户）
          </div>
          <div class="vp-content-item">
            <div class="vp-content-label">创建人：</div>
            <div
              class="vp-content-value"
            >
              {{ enterpriseInfo.founder||'--' }}
            </div>
          </div>
        </div>
        <div style="flex: 1;">
          <div class="vp-content-title">
          企业标注
          </div>
          <div class="vp-content-item">
            <div class="vp-content-label">标注：</div>
            <div class="vp-content-value">
              <a-select v-model="enterpriseInfo.companyTypeFlag" :options="companyFlagOptions" style="width: 120px" v-if="enterpriseInfo.realNameAuthenticateModifyType === '4' && enterpriseInfo.appraiseStatus === '0'"></a-select>
              <span v-else>{{enterpriseInfo.companyTypeFlag ? companyFlagOptions.filter(item => item.value === enterpriseInfo.companyTypeFlag)[0].label : '-'}}</span>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
    <ContentContainer class="vp-content v-contentV" pColumn v-if="enterpriseInfo.appraiseStatus !== '0'">
      <div class="vp-content-title">
        审核信息
      </div>
      <a-row>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">审核状态：</div>
            <div class="vp-content-value">
              {{
                (enterpriseInfo.appraiseStatus &&
                  consts.verifyStatusOptions.find(v => v.value === enterpriseInfo.appraiseStatus).label) ||
                  '无'
              }}
            </div>
          </div>
        </a-col>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">审核人：</div>
            <div class="vp-content-value">
              {{ enterpriseInfo.appraiseUserName || '-' }}
            </div>
          </div>
        </a-col>
        <a-col span="8">
          <div class="vp-content-item">
            <div class="vp-content-label">审核时间：</div>
            <div class="vp-content-value">
              {{
                enterpriseInfo.latestAppraiseRejectTime
                  ? moment(enterpriseInfo.latestAppraiseRejectTime).format('YYYY-MM-DD HH:mm:ss')
                  : '-'
              }}
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row v-if="enterpriseInfo.appraiseStatus == '2'">
        <a-col span="21">
          <div class="vp-content-item">
            <div class="vp-content-label">驳回理由：</div>
            <div class="vp-content-value" style="max-width: 100%!important;">
              {{ enterpriseInfo.rejectReason || '-' }}
            </div>
          </div>
        </a-col>
      </a-row>
    </ContentContainer>
    <div class="vp-footer" v-else>
      <a-button ghost type="danger" class="vp-footer-btn" @click="onClickReject">驳回</a-button>
      <a-button type="primary" class="vp-footer-btn" @click="onClickPass">通过</a-button>
    </div>

    <a-modal class="vp-preview" :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img v-if="!businessLicenseFileId" style="width: 100%" :src="previewImage" />
      <AuthImage v-else style="width: 100%" :authSrc="previewImage" />
    </a-modal>
  </div>
</template>

<script>
/**
 * 客户信息审核页面
 * @vue-props {}
 * @vue-data {}
 * @vue-event {}
 */
import ContentContainer from '@/components/ContentContainer';
import AuthImage from '@/components/AuthImage';
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import moment from 'moment';
import consts from '@/common/consts';
import VerifyModal from './VerifyModal';

export default {
  name: 'VerifyPage',

  components: {
    ContentContainer,
    AuthImage
  },

  props: {
    pCompanyId: String
  },

  watch: {
    pCompanyId(id) {
      this.getEnterpriseInfo();
    }
  },

  computed: {
    businessLicenseFileId() {
      if (!this.enterpriseInfo.businessLicenseFileId) {
        return '';
      }
      return this.$apiUtil.getImageUrl(this.enterpriseInfo.businessLicenseFileId);
    },
    previewImage() {
      return this.businessLicenseFileId;
    }
  },

  data() {
    return {
      consts,
      moment,
      enterpriseInfo: {},
      previewVisible: false,
      lastImage: '',
      lastImgStyle: '',
      imageSizeMap: {
        enterpriseLogo: 'width: 167px; height: 66px',
        enterpriseLogoSmall: 'width: 52px; height: 51px',
        businessLicenseFileId: 'width: 161px; height: 101px'
      },
      jsonModel: {},
      lastEnterpriseInfo: {},
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

  created() {
    this.getEnterpriseInfo();
  },

  methods: {
    // 获取企业信息
    getEnterpriseInfo() {
      this.enterpriseInfo = {};
      if (!this.pCompanyId) {
        return;
      }
      let api = this.$apiUtil.getEnterpriseApi();
      let jsonModel = {
        company_id: this.pCompanyId
      };
      let getDetail = api.get_enterprise_detail(jsonModel);
      // let getLastDetail = api.get_enterprise_lastest_history(jsonModel);
      //getLastDetail lastDetail
      Promise.all([getDetail]).then(([detail]) => {
        this.enterpriseInfo = detail.data;
        // this.lastEnterpriseInfo = lastDetail.data || {};
      });
    },
    // 全地址信息格式化
    getFullAddress(info) {
      if (!info.provinceName) {
        return '';
      }
      return `${info.provinceName} ${info.cityName} ${info.areaName}`;
    },

    handleCancel() {
      this.previewVisible = false;
    },
    onClickCertificate() {
      this.previewVisible = true;
    },

    // 驳回操作
    onClickReject() {
      new ComponentUtil(this.$store).create({
        cls: VerifyModal,
        clsprops: {
          pEnterprise: this.enterpriseInfo,
          pType: 'reject',
          pVisible: true
        },
        on: {
          success: data => {
            this.jsonModel = { ...this.jsonModel, ...data };
            this.verifyEnterprise();
          }
        }
      });
    },
    // 审核操作
    onClickPass() {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pContent: '确认通过 %s 审核？',
          pKeyWord: this.enterpriseInfo.companyName,
          pVisible: true
        },
        on: {
          confirm: () => {
            this.jsonModel = {
              appraiseStatus: '1'
            };
            this.verifyEnterprise();
          }
        }
      });
    },
    // 审核通过企业信息
    verifyEnterprise() {
      const jsonModel = { ...this.jsonModel };
      jsonModel.company_id = this.enterpriseInfo.companyId;
      jsonModel.companyId = this.enterpriseInfo.companyId;
      jsonModel.version = this.enterpriseInfo.version;
      jsonModel.companyTypeFlag = this.enterpriseInfo.companyTypeFlag;
      let api = this.$apiUtil.getEnterpriseApi();
      api.verify_enterprise(jsonModel).then(({ data }) => {
        this.$router.back();
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import 'variables.less';
@import 'mixins.less';
.vp-container {
  padding: 16px;
  .vp-content {
    // border: 1px solid #d9d9d9;
    padding: 16px 16px;
    border-radius: 4px;
    &-title {
      color: @primary;
      font-size: 14px;
      font-weight: @font-weight-medium;
      font-family: 'SourceHanSansCN-Medium,SourceHanSansCN';
      margin-bottom: 24px;
      vertical-align: middle;
      padding-left: 8px;
    }
    &-divider {
      color: #d9d9d9;
      min-width: 0;
      width: calc(100% - 16px);
      margin-left: 8px;
      margin-right: 8px;
    }
    &-item {
      display: flex;
      min-height: 16px;
      margin-bottom: 16px;
    }
    &-label {
      width: 130px;
      color: @label-color;
      font-size: @font-size-base;
      text-align: right;
      // margin-right: 22px;
      color: #666;
      line-height: 36px;
    }
    &-value {
      flex: 1;
      color: #333;
      font-size: @font-size-base;
      font-weight: 600;
      // .text-overflow();
      max-width: 375px;
      line-height: 36px;
      font-family: 'SourceHanSansCN-Semibold,SourceHanSansCN';
    }
    .vp-image-container {
      width: fit-content;
      .vp-certificate {
        width: 144px;
        background-color: #d8d8d8;
        margin-left: 32px;
        margin-bottom: 16px;
      }
      .vp-image-desc {
        color: @body-color;
        font-size: @font-size-base;
        text-align: center;
        margin-bottom: 16px;
      }
    }
  }
  .v-contentV {
    margin-top: 16px;
  }
  .vp-footer {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    &-btn {
      margin: 0px;
    }
    &-btn:not(:first-child) {
      margin-left: 32px;
    }
  }
}
// .ant-btn-background-ghost {
//   color: #666;
//   border-color: #666;
// }
.vp-preview .ant-modal-close {
  top: -16px;
  right: -16px;
}
</style>
