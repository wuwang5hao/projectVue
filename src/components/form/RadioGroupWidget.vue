<template>
  <ARadioGroup
    v-model="widgetVal"
    :options="field.options"
    :defaultValue="widgetVal" />
</template>
<script>
import BaseWidget from './BaseWidget'

export default {
  name: 'RadioGroupWidget',
  extends: BaseWidget,
}
</script>
