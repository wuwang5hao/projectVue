import SelectWidget from './SelectWidget';
import TreeWidget from './TreeWidget';
import RadioGroupWidget from './RadioGroupWidget';
import DateRangeWidget from './DateRangeWidget';
import DateRangeWidgetTwo from './DateRangeWidgetTwo';
import UploadMultiWidget from './UploadMultiWidget';
import InputWidget from './InputWidget';
import InputNumberWidget from './InputNumberWidget';
import AddressWidget from './AddressWidget';
import LimitTextAreaWidget from './LimitTextAreaWidget';
import UploadWidget from './UploadWidget';
import ImageWidget from './ImageWidget';
import CheckboxWidget from './CheckboxWidget';
import DatetimeWidget from './DatetimeWidget';
import IntRangeWidget from './IntRangeWidget';
import ImageMultiWidget from './ImageMultiWidget';
import CascaderWidget from './CascaderWidget';
import TimelineWidget from './TimelineWidget';
import InputSearchWidget from './InputSearchWidget';
import TreeSelectWidget from './TreeSelectWidget';
/**
 * 类型对应默认控件
 */
const typeDefaultWidgetMap = {
  int: InputWidget,
  str: InputWidget,
  float: InputWidget,
  long: InputWidget,
  address: AddressWidget,
  datetime_range: DateRangeWidgetTwo,
  date_range: DateRangeWidgetTwo,
  month_range: DateRangeWidgetTwo,
  year_range: DateRangeWidgetTwo,
  image: ImageWidget,
  bool: CheckboxWidget,
  datetime: DatetimeWidget,
  date: DatetimeWidget,
  month: DatetimeWidget,
  year: DatetimeWidget,
  int_range: IntRangeWidget,
  file: UploadWidget,
  image_list: ImageMultiWidget, // like obj_list
  file_list: UploadMultiWidget, // like obj_list
  email: InputWidget,
  url: InputWidget,
  mobile: InputWidget
};

// 控件字典
const widgetMap = {
  InputWidget: InputWidget,
  InputSearchWidget: InputSearchWidget,
  InputNumberWidget: InputNumberWidget,
  SelectWidget: SelectWidget,
  AddressWidget: AddressWidget,
  LimitTextAreaWidget: LimitTextAreaWidget,
  TreeWidget: TreeWidget,
  RadioGroupWidget: RadioGroupWidget,
  UploadWidget: UploadWidget,
  DateRangeWidget: DateRangeWidget,
  DateRangeWidgetTwo: DateRangeWidgetTwo,
  ImageWidget: ImageWidget,
  CheckboxWidget: CheckboxWidget,
  DatetimeWidget: DatetimeWidget,
  IntRangeWidget: IntRangeWidget,
  CascaderWidget: CascaderWidget,
  UploadMultiWidget: UploadMultiWidget,
  TimelineWidget: TimelineWidget,
  TreeSelectWidget: TreeSelectWidget
};

export { typeDefaultWidgetMap, widgetMap };
