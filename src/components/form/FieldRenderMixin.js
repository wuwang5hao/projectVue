/**
 * 表单项的创建类，创建表单项组件，设置表单验证规则，绑定表单数据。
 * @vue-props {Array} pFields - 表单项列表
 * @vue-props {Object} pJsonModel - 表单数据结构
 * @vue-props {Boolean} pReadOnly - 表单是否为只读
 * @vue-data {Object} rules - 表单的验证规则
 */
import { RuntimeError } from 'jscom/core/exceptions';
import { objUtil } from 'jscom/utils/objutil';
import { typeDefaultWidgetMap, widgetMap } from './RegisterWidgets';

export default {
  props: {
    pFields: {
      type: Array,
      default() {
        return [];
      },
      validator: value => {
        for (let field of value) {
          for (let fieldName of ['name', 'label', 'type']) {
            if (field[fieldName] === undefined) {
              throw new RuntimeError(`field must have attr "${fieldName}": ${JSON.stringify(field)}`);
            }
          }
        }
        return true;
      }
    },
    pJsonModel: {
      type: Object,
      default() {
        return {};
      }
    },
    pReadonly: { type: Boolean, default: false }
  },
  watch: {
    jsonModel: {
      handler(val) {
        Object.assign(this.pJsonModel, val);
      },
      deep: true
    },
    pJsonModel: {
      handler(val) {
        this.initJsonModel(this.jsonModel, val);
      },
      deep: true
    },
    pReadonly(val) {
      this.$forceUpdate();
    }
  },
  data() {
    let jsonModel = { ...this.pJsonModel };
    let initialJsonModel = objUtil.clone(this.pJsonModel);
    this.initJsonModel(jsonModel, {});
    Object.assign(this.pJsonModel, jsonModel);
    return {
      initialJsonModel,
      jsonModel,
      rules: {}
    };
  },
  methods: {
    // 初始化表单数据结构
    initJsonModel(jsonModel, newJsonModel) {
      let tmpJsonModel = { ...jsonModel };
      // check jsonModel fields
      let fieldNames = [];
      for (let field of this.pFields) {
        fieldNames.push(field.name);
        if (field.name in newJsonModel) {
          tmpJsonModel[field.name] = objUtil.clone(newJsonModel[field.name]);
        } else if (tmpJsonModel[field.name] === undefined) {
          // else
          let widget = this.getWidgetByField(field);
          let defVal = '';
          if (widget.defaultValue) {
            defVal = widget.defaultValue();
          }
          tmpJsonModel[field.name] = field.initial === undefined ? defVal : field.initial;
          // throw new RuntimeError(`pJsonModel lack field ${field.name}`)
        }
      }
      // 将变化的 newJsonModel 其他字段也进行拷贝
      for (let [key, val] of Object.entries(newJsonModel)) {
        if (!fieldNames.includes(key)) {
          tmpJsonModel[key] = val;
        }
      }
      if (JSON.stringify(tmpJsonModel) === JSON.stringify(jsonModel)) {
        return;
      }
      Object.assign(jsonModel, tmpJsonModel);
    },
    // 获取表单组件
    getWidgetByField(field) {
      let widget = null;
      if (typeof field.type === 'string') {
        // 取得 type 默认控件
        if (!field.widget) {
          widget = typeDefaultWidgetMap[field.type];
        } else if (typeof field.widget === 'string') {
          widget = widgetMap[field.widget];
        } else {
          widget = field.widget;
        }
      }
      if (!widget) {
        throw new RuntimeError(`can not get widget by type "${field.type}" widget "${field.widget}"`);
      }
      return widget;
    },
    // 渲染表单组件
    renderField(h, ctx, field) {
      let widget = null;
      widget = this.getWidgetByField(field);

      let props = {
        pField: field,
        pJsonModel: this.jsonModel,
        pRules: this.rules
      };
      objUtil.merge(props, field.props);
      if (this.pReadonly && !field.readonly) {
        field.readonly = true;
      }
      if (field.readonly && field.renderRo) {
        return h(
          'div',
          {
            class: ctx.data.class,
            style: {
              ...ctx.data.style,
              display: 'inline-block',
              maxWidth: field.width || '320px',
              minWidth: '0px',
              'text-align': 'justify'
            },
            props: props
          },
          [field.renderRo(h, this.jsonModel[field.name], this.jsonModel)]
        );
      } else if (field.readonly && !widget.supportReadonly) {
        // 如果需要渲染 readonly 状态控件，且控件本身不支持 readonly 渲染模式，默认使用 span 渲染
        let text = this.jsonModel[field.name];

        if (typeof text !== 'string') {
          if (text === true) {
            text = '是';
          } else if (text === false) {
            text = '否';
          } else if (typeof text === 'boolean') {
            text = JSON.stringify(text);
          }
        }
        // eslint-disable-next-line no-inner-declarations
        function getLabelByVal(val) {
          for (let option of field.options) {
            if (option.value === val) {
              return option.label;
            }
          }
          return '';
        }
        if (field.options) {
          // 如果有 options 将值进行转换
          if (Array.isArray(text)) {
            let labels = [];
            for (let val of text) {
              let label = getLabelByVal(val);
              if (label) {
                labels.push(label);
              }
            }
            text = labels.join(', ');
          } else {
            let label = getLabelByVal(text);
            if (label) {
              text = label;
            }
          }
        }
        return h(
          'div',
          {
            class: ctx.data.class,
            style: {
              ...ctx.data.style,
              display: 'inline-block',
              maxWidth: field.width || '320px',
              minWidth: '0px',
              'text-align': 'justify'
            },
            attrs: {
              title: text
            },
            props: props
          },
          [text || '无']
        );
      } else {
        let style = { ...ctx.data.style };
        if (field.readonly) {
          style = {
            ...ctx.data.style,
            display: 'inline-block',
            maxWidth: field.width || '320px',
            minWidth: '0px',
            'text-align': 'justify'
          };
        }
        return h(
          widget,
          {
            class: ctx.data.class,
            style: style,
            attrs: {
              title: this.jsonModel[field.name]
            },
            props: props,
            on: {
              blur: () => {
                // console.log('blur')
                // console.log(this.$refs)
                // console.log(this.$refs[field.name])
                let formItem = this.getFormItemByFieldName(field.name);
                if (formItem) {
                  formItem.onFieldBlur();
                }
              },
              change: event => {
                // console.log('change')
                // console.log(this.$refs)
                // console.log(this.$refs[field.name])
                let formItem = this.getFormItemByFieldName(field.name);
                if (formItem) {
                  formItem.onFieldChange();
                }
              }
            }
          },
          []
        );
      }
    },
    // 获取表单项
    getFormItemByFieldName(name) {
      let formItem = this.$refs[name];
      if (formItem && formItem.length > 0) {
        formItem = formItem[0];
      } else {
        formItem = null;
        // console.error(`Can not get FormItem by ${name}`)
        console.log(this.$refs);
      }
      return formItem;
    },
    // 验证表单项
    validateField(fieldName) {
      this.$nextTick(() => {
        let formItem = this.getFormItemByFieldName(fieldName);
        if (formItem) {
          formItem.onFieldBlur();
          formItem.onFieldChange();
        }
      });
    },
    // 重置表单
    reset(force = false) {
      let jsonModel = {};
      if (force) {
        this.initJsonModel(jsonModel, this.initialJsonModel);
        this.jsonModel = jsonModel;
      } else {
        let newJsonModel = {};
        for (let field of this.pFields) {
          if (field.readonly) {
            // keep use jsonModel value
            newJsonModel[field.name] = this.jsonModel[field.name];
          } else if (this.initialJsonModel[field.name] !== undefined) {
            newJsonModel[field.name] = this.initialJsonModel[field.name] || '';
          }
          // NOTE: dirty code to clean from to date*_range
          let someFields = [`${field.name}From`, `${field.name}To`];
          if (field.name.endsWith('Long')) {
            // 序列号库 brandIdLong
            someFields.push(field.name.slice(0, field.name.length - 4));
          }
          for (let name of someFields) {
            if (name in this.jsonModel) {
              newJsonModel[name] = '';
            }
          }
        }
        this.initJsonModel(jsonModel, newJsonModel);
        this.jsonModel = jsonModel;
      }
      this.$nextTick(() => {
        for (let field of this.pFields) {
          if (field.onReset) {
            field.onReset();
          }
        }
      });
    }
  }
};
