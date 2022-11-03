<template>
  <AConfigProvider :locale="locale">
    <AModal
      ref="modal"
      id="sslc-form"
      :class="{ form: true, [pClass]: pClass }"
      :bodyStyle="{ maxHeight: modalMaxHeight, minHeight: `${pMinHeight}px` }"
      :width="parseInt(pWidth)"
      :title="pTitle"
      centered
      :visible="value"
      @input="
        value => {
          $emit('input', value);
        }
      "
      @cancel="onCancel"
      :maskClosable="false"
    >
      <div class="message" v-if="pMessage">{{pMessage}}</div>
      <Expand :pRender="renderForm"></Expand>
      <!--    <BaseForm v-bind="wrappedProps()"></BaseForm>-->
      <div :class="pHintClass">{{ pHint }}</div>
      <div ref="footer" slot="footer" class="footer">
        <template v-if="pReadonly">
          <AButton class="cancel" @click="onCancel">关闭</AButton>
        </template>
        <template v-else>
          <AButton class="cancel" @click="onCancel">取消</AButton>
          <AButton class="confirm" type="primary" @click="onConfirm" :loading="loading">确定</AButton>
        </template>
      </div>
    </AModal>
  </AConfigProvider>
</template>
<script>
/**
 * 弹出表单的基础组件
 *
 */
import { mapState, mapMutations } from 'vuex';
import { objUtil } from 'jscom/utils/objutil';
import { arrUtil } from 'jscom/utils/arrutil';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import MutationTypes from '@/store/MutationTypes';
import BaseForm from './BaseForm';

/**
 * 组件透传封装器
 * @param component
 * @returns {{}|{methods: {wrappedProps(): {}}, props: {}}}
 */
function wrapComponent(component) {
  let props = {};
  objUtil.merge(props, component.props);
  if (component.extends) {
    objUtil.merge(props, component.extends.props);
  }
  if (component.mixins) {
    for (let mixin of component.mixins) {
      objUtil.merge(props, mixin.props);
    }
  }
  return {
    props: props,
    methods: {
      wrappedProps() {
        let result = {};
        for (let propName of Object.keys(props)) {
          result[propName] = this[propName];
        }
        return result;
      }
    }
  };
}

export default {
  name: 'ModalForm',
  mixins: [wrapComponent(BaseForm)],
  props: {
    value: { type: Boolean, default: false },
    pTitle: { type: String, default: '' },
    pWidth: { type: [Number, String], default: 598 },
    pClass: { type: String, default: '' },
    pMessage: { type: String, default: '' },
    pHintClass: String,
    pHint: String,
    pMinHeight: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      locale: zh_CN
    };
  },
  computed: {
    ...mapState(['modalArr', 'loading']),
    modalMaxHeight() {
      // return `${window.screen.height - 62 - 68 - 140}px`
      return `${window.screen.height * 0.55}px`;
    }
  },
  mounted() {
    this.modalArr.push(this);
    this.SET_LOADING({ loading: false });
  },
  beforeDestroy() {
    let index = 0;
    for (let modal of this.modalArr) {
      if (modal === this) {
        this.modalArr.splice(index, 1);
        break;
      }
      index += 1;
    }
  },
  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    /**
     * 渲染form逻辑
     */
    renderForm(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self;
          // 原本可以直接返回 vnode, 但具名 slot 不能工作，因此使用 template 包裹
          return h('template', { slot: vnode.data.slot }, [vnode]);
        });
      let scopedSlots = { ...this.$scopedSlots };
      return h(BaseForm, { ref: 'form', props: this.wrappedProps(), scopedSlots }, slots);
    },
    /**
     * 确认回调
     */
    onConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('confirm');
          // this.SET_LOADING({loading: true})
        }
        return valid;
      });
    },
    /**
     * 取消触发，关闭窗口
     */
    onCancel() {
      this.$emit('cancel');
      this.$emit('input', false);
    },
    /**
     * 重置逻辑
     * @param force
     */
    reset(force = false) {
      this.$refs.form.reset(force);
    }
  },

  /**
   * 注入控件容器
   * @returns {{popupContainer: popupContainer}}
   */
  provide() {
    let vm = this;
    return {
      popupContainer: () => {
        let modalBody = vm.$refs.footer.parentElement.previousElementSibling;
        if (!modalBody) {
          return document.body;
        }
        return modalBody;
      }
    };
  }
};
</script>

<style lang="less">
.form {
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background: #d8d8d8;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: transparent;
  }
  .ant-modal-body {
    min-height: 166px;
    // position: relative;
  }
}
.form {
  .message  {
      height: 43px;
      line-height: 43px;
      color: #EE722E;
      font-size: 12px;
      background: #FCECDF;
      border-radius: 4px;
      padding-left: 22px;
      margin-bottom: 24px;
  }
  .confirm,
  .cancel {
    /*width: 73px;*/
    height: 36px;
    padding: 0 20px;
  }
  .cancel {
    margin-left: 16px;
  }
  .footer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 0px;
  }
  .ant-cascader-menus {
    /*width:320px*/
  }
  .ant-cascader-menus ul {
    width: 135px;
  }
}
</style>
