const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf7mZhi9xmXI/f5SUZ0vkmlBTjJA6SPBxJ0JKRZhBXEkIZP+1mF7Uj13qjIPbGihRdYUiYo9o1KZ5q7t7XH2dd7E+xIaOHKKq4cqUcBN5YxzE6EseA6TFd3aponYNT/F8eVnGxPfoYNVYXh35CMeGAkn7ipEBBVl7gu8j2qdelVQIDAQAB';
const areaTypeMap = {
  0: '中国',
  1: '省',
  2: '市',
  3: '区'
};

const upShelfOptions = [
  { label: '待上架', value: '0' },
  { label: '已上架', value: '1' },
  { label: '已下架', value: '2' }
];

const statusOptions = [
  { label: '待发布', value: '0' },
  { label: '已发布', value: '1' }
];

const productUniqueFlagOptions = [
  { value: '1', label: 'MAC地址' },
  { value: '2', label: 'IMEI码' }
];

const downloadFormatOptions = [
  { value: '1', label: 'XML' },
  { value: '2', label: 'CSV' }
];

const channelTypeOptions = [
  { value: '01', label: 'COM口' },
  { value: '02', label: 'LAN口' }
];

// ## 设备点位相关
// 点位类型
const pointTypeOptions = [
  { value: '0', label: '采集点位' },
  { value: '1', label: '虚拟点位' },
  { value: '2', label: '录入点位' }
];

// 点位值类型
const valueTypeOptions = [
  { value: '01', label: '趋势值' },
  { value: '02', label: '累计值' },
  { value: '03', label: '状态值' }
];
// 值类型
const valueTypeWriteOptions = [
  { value: '01', label: '趋势值' },
  //200826
  { value: '03', label: '状态值' }
];

const pointPropertyOptions = [
  { value: '01', label: '读' },
  // NOTE: 根据需求说明书，目前仅有 读
  { value: '02', label: '写' }
  // {value: '03', label: '读写'},
];

// 产品发布
const publishTypeOptions = [
  { value: '1', label: '新增' },
  { value: '2', label: '修改' },
  { value: '3', label: '删除' },
  { value: '4', label: '上架' },
  { value: '5', label: '下架' }
];

// 发布模块类型
const publishModuleOptions = [
  { value: '01', label: '软件服务' },
  { value: '02', label: '服务模块' },
  { value: '03', label: '模块功能' },
  { value: '04', label: '权限' },
  { value: '05', label: '龙创服务' },
  { value: '06', label: '硬件品牌' },
  { value: '07', label: '硬件系列' },
  { value: '08', label: '硬件产品' },
  { value: '09', label: '硬件型号' },
  { value: '10', label: '硬件固件' },
  { value: '11', label: '规约/驱动' },
  { value: '12', label: '设备模型' }
];

// 终端类型
const terminalTypeOptions = [
  { value: '0', label: 'WEB' },
  { value: '1', label: 'APP' }
];

// 订单类型
const orderTypeOptions = [
  // {value: '0', label: '全部'},
  { value: '1', label: '购买' },
  { value: '2', label: '续费' }
];

// 产品类型
const productTypeOptions = [
  // {value: '0', label: '全部'},
  { value: '1', label: '软件产品' },
  { value: '2', label: '硬件产品' }
];

// 启用状态
const activeStatusOptions = [
  { value: '0', label: '待启用' },
  { value: '1', label: '已启用' }
];

// 订单状态
const orderStatusList = [
  {
    value: 0,
    label: '待支付'
  },
  {
    value: 1,
    label: '已支付'
  },
  {
    value: 2,
    label: '作废'
  },
  {
    value: 3,
    label: '已退款'
  }
];
// 订单生效状态
const orderEffectiveStatus = [
  { value: '0', label: '未生效' },
  { value: '1', label: '已失效' },
  { value: '2', label: '生效中' }
];
// 订单类型
const orderTypes = [
  {
    value: '1',
    label: '新购'
  },
  {
    value: '2',
    label: '续费'
  },
  {
    value: '3',
    label: '升级'
  },
  // {
  //   value: '4',
  //   label: '降级'
  // },
  {
    value: '5',
    label: '退款'
  },
  {
    value: '6',
    label: '试用'
  }
];
// 支付方式
const wayToPays = {
  '01': '线下支付',
  '02': '微信',
  '03': '支付宝'
};
const wayToPaysI = [
  {
    value: '01',
    label: '线下支付'
  },
  {
    value: '02',
    label: '微信'
  },
  {
    value: '03',
    label: '支付宝'
  }
];
// 日志查询 状态
const operationStatusOptions = [
  { value: '0', label: '信息' },
  { value: '1', label: '错误' },
  { value: '3', label: '警告' }
];

// 工单类型
const workOrderTypeOptions = [
  { value: '01', label: '咨询' },
  { value: '02', label: '建议' },
  { value: '03', label: '问题' },
  { value: '99', label: '其他' }
];

// 工单产品类型
const workOrderProductTypeOptions = [
  { value: '01', label: '软件服务' },
  { value: '02', label: '硬件产品' },
  { value: '99', label: '其它' }
];

// 工单状态
const workOrderStatusOptions = [
  { value: '0', label: '未解决' },
  { value: '1', label: '已解决' }
];
const realNameAuthenticateModifyTypes = [
  { value: '1', label: '企业名称变更' },
  { value: '2', label: '企业工商统一信用代码变更' },
  { value: '3', label: '企业主体变更' },
  { value: '4', label: '首次注册' }
];
// 企业审核状态
const verifyStatusOptions = [
  { value: '0', label: '待审核' },
  { value: '1', label: '通过' },
  { value: '2', label: '驳回' }
];

const hardwareStatusOptions = [
  { value: '1', label: '已激活' },
  { value: '2', label: '已启用' },
  { value: '3', label: '已停用' }
];

const maintenanceStatusOptions = [
  { label: '正常', value: '0' },
  { label: '已过期', value: '1' }
];

// 规约驱动参数类型
let parameterTypeOptions = [
  { value: '1', label: '选项' },
  { value: '2', label: '文本' },
  { value: '3', label: 'IPv4' },
  { value: '4', label: '数字(整数)' },
  { value: '5', label: '数字(浮点数)' }
];

// 规约驱动参数种类
let parameterCategoryOptions = [
  { value: '01', label: '通道参数' },
  { value: '02', label: '点位参数' }
];
export default {
  publicKey,

  areaTypeMap,
  upShelfOptions,
  statusOptions,
  channelTypeOptions,
  productUniqueFlagOptions,
  downloadFormatOptions,

  pointTypeOptions,
  valueTypeOptions,
  valueTypeWriteOptions,
  pointPropertyOptions,

  publishTypeOptions,
  terminalTypeOptions,

  orderTypeOptions,
  productTypeOptions,
  activeStatusOptions,
  orderEffectiveStatus,
  orderTypes,
  orderStatusList,
  wayToPays,
  wayToPaysI,
  operationStatusOptions,
  realNameAuthenticateModifyTypes,
  workOrderTypeOptions,
  workOrderStatusOptions,
  workOrderProductTypeOptions,

  verifyStatusOptions,

  publishModuleOptions,
  hardwareStatusOptions,
  maintenanceStatusOptions,
  parameterTypeOptions,
  parameterCategoryOptions
};
