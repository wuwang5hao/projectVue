<template>
  <div>
    <template
      v-for="(action, index) in pActions"
    >
      <AButton
        :key="index"
        v-if="!action.children || action.children.length === 0"
        :class="{
          'action-button': true,
          'action-button-primary': action.type === 'primary',
          'action-button-normal': action.type !== 'primary'
        }"
        :type="action.type || 'primary'"
        :ghost="action.type !== 'primary' && action.type !== 'danger'"
        :disabled="typeof action.disabled === 'function' ? action.disabled() : action.disabled"
        @click="(event) => { action.click && action.click(event) }"
      >
        {{ action.title }}
      </AButton>
      <ADropdown
        v-else :key="index"
      >
        <AMenu slot="overlay" @click="(event) => { action.click && action.click(event) }">
          <AMenuItem v-for="(subAction, index) of action.children" :key="index" @click="(event) => { subAction.click && subAction.click(event) }">
            {{subAction.title}}
          </AMenuItem>
        </AMenu>
        <AButton
          type="primary"
          class="action-button"
          :ghost="action.type !== 'primary'"
          :disabled="typeof action.disabled === 'function' ? action.disabled() : action.disabled"
        >{{ action.title }}<AIcon type="down" /></AButton>
      </ADropdown>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ActionBar',
  props: {
    pActions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
  },
}
</script>
<style lang="less" scoped>
.action-button {
  margin-left: 16px;
}
.action-button-normal {
  box-shadow: 0px 0px 0px 0px;
}
.action-dropdown {
  height:36px;
  box-shadow:0px 4px 20px -11px rgba(2,197,224,0.87);
  border-radius:4px;
  margin-right: 30px;
}
</style>
