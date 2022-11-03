<template>
  <div class="agent_basicInfo">
    <a-card :bordered="false">
      <h3 class="record">
        代理商信息
        <a-divider class="record-divider" />
        <div class="edit_btns">
          <AButton type="primary" v-if="isEditVisible" @click="onEditClick">编辑 </AButton>
          <AButton type="primary" v-else @click="onSaveClick">保存 </AButton>
        </div>
      </h3>
      <div class="basicInfo-content-agent">
        <a-form-model :labelCol="labelCol" :wrapperCol="wrapperCol" :model="basicInfoMessage" ref="form">
          <a-row>
            <a-col span="12">
              <a-form-model-item label="代理商企业名称" prop="companyName">
                <span v-if="isEditVisible" class="edi-value">{{ basicInfoMessage.companyName || '--' }}</span>
                <a-input v-else class="basicInfo-content-agent-value" v-model="basicInfoMessage.companyName" maxLength="50" />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="统一社会信用代码" prop="unifiedSocialCreditId">
                <span v-if="isEditVisible" class="edi-value">{{ basicInfoMessage.unifiedSocialCreditId || '--' }}</span>
                <a-input
                  v-else
                  class="basicInfo-content-agent-value"
                  v-model="basicInfoMessage.unifiedSocialCreditId"
                  maxLength="18"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="联系人" prop="contactName">
                <span v-if="isEditVisible" class="edi-value">{{ basicInfoMessage.contactName || '--' }}</span>
                <a-input v-else class="basicInfo-content-agent-value" v-model="basicInfoMessage.contactName" maxLength="10" />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="银行账号" prop="bankAccountNumber">
                <span v-if="isEditVisible">{{ basicInfoMessage.bankAccountNumber || '--' }}</span>
                <a-input v-else class="basicInfo-content-agent-value" v-model="basicInfoMessage.bankAccountNumber" maxLength="20" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="联系方式" prop="contactTelephone">
                <span v-if="isEditVisible">{{ basicInfoMessage.contactTelephone || '--' }}</span>
                <a-input v-else class="basicInfo-content-agent-value" v-model="basicInfoMessage.contactTelephone" maxLength="20" />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="开户行" prop="openAccountBank">
                <span v-if="isEditVisible">{{ basicInfoMessage.openAccountBank || '--' }}</span>
                <a-input v-else class="basicInfo-content-agent-value" v-model="basicInfoMessage.openAccountBank" maxLength="30" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="本司联络人" prop="companyContactName">
                <span v-if="isEditVisible">{{ basicInfoMessage.companyContactName || '--' }}</span>
                <a-input v-else class="basicInfo-content-agent-value" v-model="basicInfoMessage.companyContactName" maxLength="10" />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="签约日期" prop="contractTime">
                <span v-if="isEditVisible">{{ contractTime }}</span>
                <ADatePicker
                  :default-value="moment(contractTime, 'YYYY-MM-DD')"
                  @change="onTimeChange"
                  class="basicInfo-content-agent-value"
                  v-else
                ></ADatePicker>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <a-form-model-item label="多证合一营业执照">
                <ImageUpload
                  pModuleKey="agentbusinessLicense"
                  :pID="Number(saleAgentId)"
                  v-model="businessLicenseFileId"
                  pTextLine0="支持扩展名：jpg、jpeg、png"
                  pTextLine1="尺寸不超过850*1150px，大小不超过5M"
                  pAccept=".png,.jpg,.jpeg"
                  @remove="remove"
                ></ImageUpload>
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item label="合同">
                <a-upload
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  accept=".pdf"
                  :remove="removePDF"
                  @preview="onOpenPdfUrl"
                >
                  <a-button>
                    <a-icon :type="isLoading ? 'loading' : 'upload'" />
                    {{ isLoading ? '上传中' : '上传PDF文件' }} </a-button
                  >&nbsp;&nbsp;
                  <!-- <span class="span_style">至多一个PDF文件!</span> -->
                </a-upload>
                <div class="uploadPdf" v-if="fileName">
                  <a-icon type="paper-clip" class="uploadPdf-paper" />
                  <span class="uploadPdf-font" @click.prevent="onOpenPdfUrl">{{ fileName }}</span>
                  <a-icon class="uploadPdf-delete" type="delete" @click="removePDF2" />
                </div>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <h3 class="record">
        代理商客户
        <a-divider class="record-divider" />
        <AButton type="primary" @click="queryAllCustom">查看全部客户 </AButton>
      </h3>
      <h3 class="record">
        代理产品
        <a-divider class="record-divider" />
        <AButton
          type="primary"
          @click="
            () => {
              onAddAgentProduct('add');
            }
          "
          >新增
        </AButton>
      </h3>
      <BaseTable
        ref="table"
        class="agent-product"
        :pTotal="total"
        :pColumns="columns"
        :pScrollX="900"
        :pDataSource="dataSource"
        :pRowClassName="setRowClass"
        :pInlineActions="[
          {
            name: 'edit',
            title: '编辑',
            toolbar: true,
            click: record => {
              onAddAgentProduct('edit', record);
            },
            visible: row => {
              return row.cancelContractFlag !== '1';
            }
          },
          {
            name: 'terminate',
            title: '解约',
            click: onCancelClicked,
            visible: row => {
              return row.cancelContractFlag !== '1';
            }
          },
          {
            name: '',
            title: '-',
            click: () => {},
            visible: row => {
              return row.cancelContractFlag === '1';
            }
          }
        ]"
        @change="onReload"
        @reset="onReset"
      >
        <span slot="statusType" slot-scope="statusType">
          <template v-for="(item, index) in statusTypes">
            <span :key="index" v-if="item.value === statusType">{{ item.label }}</span>
          </template>
        </span>
        <span slot="urlType" slot-scope="urlType, record">
          <span v-if="record.cancelContractFlag === '1'">{{ record.softwareModuleName }}</span>
          <a-tooltip
            v-else
            @visibleChange="
              visible => {
                visibleChange(visible, record);
              }
            "
          >
            <template slot="title">
              {{ agentProductUrl }}
            </template>
            <span class="color">{{ record.softwareModuleName }}</span>
          </a-tooltip>
        </span>
      </BaseTable>
    </a-card>
  </div>
</template>

<script>
import OptionsMixin from '@/common/OptionsMixin';
import TableMixin from '@/components/table/TableMixin';
import { ComponentUtil } from 'jscom/utils/vueutil';
import HeadFilter from '@/components/table/HeadFilter';
import { dtUtil } from 'jscom/utils/sysutil';
import moment from 'moment';
import ImageUpload from '@/components/ImageUpload';
import ajax from '@/common/ajax';
import ConfirmModal from '@/components/ConfirmModal';
import AddAgentModal from './AddAgentModal';
import AddAgentProduct from './AddAgentProduct';

export default {
  name: 'AgentBasicInfo',
  mixins: [TableMixin, OptionsMixin],
  components: {
    HeadFilter,
    ImageUpload
  },

  computed: {
    // 认证时间
    contractTime() {
      if (!this.basicInfoMessage || !this.basicInfoMessage.contractTime) {
        return '--';
      }
      return dtUtil.formatDate(new Date(this.basicInfoMessage.contractTime));
    }
  },

  created() {
    const saleAgentId = this.$route.query.saleAgentId;
    if (!saleAgentId) {
      this.$router.back();
    }
    this.saleAgentId = saleAgentId;
  },

  data() {
    const statusTypes = [
      {
        value: 'all',
        label: '全部'
      },
      {
        value: '0',
        label: '履约中'
        // color: '#ff791a'
      },
      {
        value: '1',
        label: '已解约'
      }
    ];
    return {
      moment,
      saleAgentId: null,
      isLoading: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      basicInfoMessage: {},
      statusTypes,
      columns: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left' },
        {
          title: '代理产品',
          key: 'softwareModuleName',
          ellipsis: true,
          align: 'center',
          sorter: false,
          width: 150
        },
        {
          title: '代理价',
          key: 'price',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '代理年限',
          key: 'agentPeriodYear',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '合约状态',
          key: 'cancelContractFlag',
          ellipsis: true,
          sorter: false,
          align: 'center',
          scopedSlots: { customRender: 'statusType' },
          width: 150
        },
        {
          title: '合同号',
          key: 'contractNumber',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '代理日期',
          key: 'agentProductDate',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: value => `${value && value !== '-' ? moment(value).format('YYYY-MM-DD') : ''}`
        },
        {
          title: '终止日期',
          key: 'endDate',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: value => `${value && value !== '-' ? moment(value).format('YYYY-MM-DD') : ''}`
        },
        {
          title: '专属链接',
          key: 'url',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          scopedSlots: { customRender: 'urlType' }
        }
      ],
      dataSource: [],
      total: 10,
      curPageNum: 1,
      businessLicenseFileId: '', // 营业执照Id
      contratctId: '', // 合同ID
      isEditVisible: true, // 是否显示编辑按钮
      form: this.$form.createForm(this),
      agentProductUrl: '', // 代理产品链接
      fileList: [],
      fileName: ''
    };
  },
  methods: {
    onReload() {
      let api = this.$apiUtil.getAgentApi();
      api.get_agent_basicInfo({ saleAgentId: this.saleAgentId }).then(({ data }) => {
        this.basicInfoMessage = data;
        this.businessLicenseFileId = data.businessLicenseFileId;
        this.contratctId = data.contractFileId;
        this.fileName = data.contractFileName;
      });
      this.getProductList();
    },
    onOpenPdfUrl() {
      let api = this.$apiUtil.getAgentApi();
      api.getAgentPDF({ id: this.contratctId }).then(({ data }) => {});
    },
    getProductList() {
      let api = this.$apiUtil.getAgentApi();
      api.get_agent_productList({ saleAgentId: this.saleAgentId }).then(({ data }) => {
        this.setData(data);
      });
    },
    // 编辑基本信息
    onEditClick() {
      this.isEditVisible = false;
    },
    visibleChange(visible, record) {
      let api = this.$apiUtil.getAgentApi();
      api.getAgentProductUrl({ agentProductId: record.id }).then(({ data }) => {
        this.agentProductUrl = data.exclusiveUrl;
      });
    },
    // 保存基本信息
    onSaveClick() {
      this.$refs.form.validate(valid => {
        let time = null;
        if (typeof this.basicInfoMessage.contractTime === 'string') {
          time = this.basicInfoMessage.contractTime;
        } else {
          time = this.contractTime;
        }
        let api = this.$apiUtil.getAgentApi();
        api.edit_agentMessage({ ...this.basicInfoMessage, date: time, saleAgentId: this.saleAgentId });
      });
      this.isEditVisible = true;
    },
    // 点击新增代理商
    onAddClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddAgentModal,
        clsprops: {
          pVisible: true
          // pTable: this.$refs.table,
        },
        on: {
          success: () => {
            // this.getParameterTypes()
          }
        }
      });
    },
    // 点击新增代理产品
    onAddAgentProduct(type, record) {
      if (type === 'add') {
        new ComponentUtil(this.$store, this.$router).create({
          cls: AddAgentProduct,
          clsprops: {
            pVisible: true,
            saleAgentId: this.saleAgentId,
            pType: 'add'
          },
          on: {
            success: () => {
              this.getProductList();
            }
          }
        });
      }
      if (type === 'edit') {
        new ComponentUtil(this.$store, this.$router).create({
          cls: AddAgentProduct,
          clsprops: {
            pVisible: true,
            saleAgentId: this.saleAgentId,
            pType: 'edit',
            pRecord: record
          },
          on: {
            success: () => {
              this.getProductList();
            }
          }
        });
      }
    },
    remove() {
      let api = this.$apiUtil.getAgentApi();
      api.delete_agentLicense({ saleAgentId: this.saleAgentId }).then(({ data }) => {
        this.setData(data);
      });
    },
    // 点击代理产品解约
    onCancelClicked(record) {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认信息',
          pContent: '确定要解约吗？'
        },
        on: {
          confirm: () => {
            let api = this.$apiUtil.getAgentApi();
            api.terminate_agent_product({ agentProductId: record.id }).then(({ data }) => {
              this.$refs.table.reload();
            });
          }
        }
      });
    },
    // 日期切换
    onTimeChange(date, dateString) {
      this.basicInfoMessage.contractTime = dateString;
    },
    onReset() {
      console.log('onDetailClicked');
    },
    setRowClass(record) {
      if (record.cancelContractFlag === '1') {
        return 'terminateClass';
      } else {
        return '';
      }
    },
    queryAllCustom() {
      this.$router.push({
        // path: `/manager/customManage/customList`,
        name: `customList`,
        params: { saleAgentName: this.basicInfoMessage.companyName }
      });
    },
    removePDF(file) {
      let api = this.$apiUtil.getAgentApi();
      api.delete_agentPDF({ saleAgentId: this.saleAgentId }).then(({ data }) => {
        this.fileList = [];
        this.fileName = '';
      });
    },
    removePDF2() {
      this.fileName = '';
      this.removePDF();
    },
    beforeUpload(file) {
      console.log('dddd', file);
      if (file.type !== 'application/pdf') {
        this.$message.error('请上传PDF文件');
        return false;
      }
      if (this.fileList.length) {
        this.$message.error('请删除当前文件后再上传');
        return false;
      }
      const fileSize = file.size / 1024;
      if (fileSize > 10000) {
        this.$message.error('导入的文件不能大于10M！');
        return false;
      }
      this.fileList = [file];
      this.isLoading = true;

      ajax({
        headers: this.$apiUtil.getHeaders(),
        withCredentials: false,
        file: file,
        data: { productId: this.id },
        filename: 'contractFile',
        action: `${this.$apiUtil.baseUrl()}/software_maintenance/agent/ver1/upload_agent_contract/${this.saleAgentId}`,
        onProgress: e => {
          // this.handleProgress(e, selFile)
        },
        onSuccess: res => {
          // this.handleError(null, res, selFile);
          if (res.resultCode === 0 || res.resultCode === 200 || res.code === 0 || res.code === 200) {
            this.$message.success('上传成功');
          } else {
            this.handleError(null, res, file);
          }
          this.fileName = '';
          this.isLoading = false;
        },
        onError: (err, response) => {
          this.handleError(err, response, file);
          this.isLoading = false;
        }
      });
      return false;
    },
    handleError(err, response, file) {
      if (err && err.status === 401) {
        // 判断是否是超时或者账号别处登录
        // this.$router.push("/login")
        window.dispatchEvent(new Event('return-login'));
      }
      if (response) {
        this.$message.error(response.message || '上传失败');
      } else {
        // 处理 选中文件在本地修改后无法上传的 chrome Bug
        this.isLoading = false;
        this.$message.error('当前选中文件已被修改，请重新选择');
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.ant-table-tbody > .terminateClass > td {
  color: #999;
}

.span_style {
  // display: block;
  // padding-bottom: 12px;
  color: #ff6a00;
}

.site-table-actions {
  margin-left: -16px;
  display: inline-block;
  position: relative;
}
.agent_basicInfo {
  margin: 0px 16px;
}
.record {
  display: flex;
  align-items: center;
  .record-divider {
    margin-left: 16px;
    flex: 1;
    min-width: 0;
    height: 2px;
  }
}
.basicInfo-content-agent {
  &-value {
    border: 1px solid #d9d9d9;
  }
}
.color {
  color: #ff6a00;
}
.a {
  background: red;
  color: #ff6a00;
}
.uploadPdf {
  position: relative;
  height: 22px;
  margin-top: 8px;
  font-size: 14px;
  line-height: 25px;
  padding: 0 12px 0 4px;
  &-paper {
    position: absolute;
    top: 5px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  &-font {
    display: inline-block;
    width: 100%;
    padding-left: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-delete {
    position: absolute;
    right: 0;
    padding-right: 6px;
    padding-top: 5px;
    color: rgba(0, 0, 0, 0.45);
    // opacity: 0;
  }
}
.agent-product {
    /deep/.ant-table-content .ant-table-scroll .ant-table-body {
      max-height: 250px!important;
    }
    /deep/.ant-table-content .ant-table-fixed-left .ant-table-body-inner{
      max-height: 250px!important;
    }
    /deep/.ant-table-content .ant-table-fixed-right .ant-table-body-inner{
      max-height: 250px!important;
    }
  }
</style>
