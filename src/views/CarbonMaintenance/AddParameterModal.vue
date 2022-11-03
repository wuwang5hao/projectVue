<template>
  <ModalForm
    v-model="visible"
    ref="modalForm"
    :pTitle="modalTitle"
    :pFields="fields"
    :pJsonModel="jsonModel"
    :pReadonly="pReadonly"
    @confirm="onConfirm"
  >
    <span slot="pointNum-suffix" style="margin-left: 5px">个</span>
  </ModalForm>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MutationTypes from '@/store/MutationTypes';
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';

export default {
  name: 'AddParameterModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pReadonly: Boolean,
    pRow: Object,
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: type => ['add', 'update', 'view'].indexOf(type) !== -1
    }
  },

  data() {
    return {
      jsonModel: {
        type: '',
        level2CategoryName: '',
        level3CategoryName: '',
        level4CategoryName: ''
      },
      visible: this.pVisible
    };
  },
  computed: {
    fields() {
      let fields = [
        { label: '一级分类', type: 'str', name: 'type', placeholder: '请输入一级分类', required: true, maxLength: 50 },
        { label: '二级分类', type: 'str', name: 'level2CategoryName', placeholder: '请输入二级分类', maxLength: 30 },
        {
          label: '三级分类',
          type: 'str',
          name: 'level3CategoryName',
          placeholder: '请输入三级分类',
          maxLength: 30,
          disabled: this.jsonModel.level2CategoryName.trim() === ''
        },
        {
          label: '四级分类',
          type: 'str',
          name: 'level4CategoryName',
          placeholder: '请输入四级分类',
          maxLength: 30,
          disabled: this.jsonModel.level2CategoryName.trim() === '' || this.jsonModel.level3CategoryName === ''
        }
      ];
      return fields;
    }
  },
  created() {
    if (this.pType === 'update' || this.pType === 'view') {
      for (const key in this.pRow) {
        if (this.pRow[key] === '-') {
          this.pRow[key] = '';
        }
      }
      this.jsonModel = {
        ...this.pRow
      };
    }
  },
  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    onConfirm() {
      this.SET_LOADING({ loading: true });
      let jsonModel = { ...this.jsonModel };
      if (!jsonModel.level2CategoryName.trim()) {
        jsonModel.level3CategoryName = '';
        jsonModel.level4CategoryName = '';
      }
      if (!jsonModel.level3CategoryName.trim()) {
        jsonModel.level4CategoryName = '';
      }
      if (this.pType === 'add') {
        this.$apiUtil
          .getCarbonMaintenanceApi()
          .add_parameter_types(jsonModel)
          .then(({ data }) => {
            this.$emit('on-hide');
            this.$emit('success', data);
          })
          .catch(() => {
            this.SET_LOADING({ loading: false });
          });
      } else if (this.pType === 'update') {
        this.$apiUtil
          .getCarbonMaintenanceApi()
          .edit_parameter_types({ ...jsonModel, parameter_type_id: this.pRow.id, version: this.pRow.version })
          .then(({ data }) => {
            this.$emit('on-hide');
            this.$emit('success', data);
          })
          .catch(() => {
            this.SET_LOADING({ loading: false });
          });
      }
    }
  }
};
</script>

<style lang="less"></style>
