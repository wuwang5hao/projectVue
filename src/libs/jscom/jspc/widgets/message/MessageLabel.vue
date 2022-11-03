<template>
  <div v-show="message" class="alert" v-bind:class="style">
    <slot>
      <p>{{ message }}</p>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    propMessage: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      message: this.propMessage,
      style: 'alert-info',
    }
  },
  methods: {
    primary(msg) {
      this.message = msg
      this.style = 'alert-primary'
    },
    secondary(msg) {
      this.message = msg
      this.style = 'alert-secondary'
    },
    info(msg) {
      this.message = msg
      this.style = 'alert-info'
    },
    success(msg) {
      this.message = msg
      this.style = 'alert-success'
    },
    failed(msg) {
      this.danger(msg)
    },
    error(msg) {
      this.danger(msg)
    },
    danger(msg) {
      this.message = msg
      this.style = 'alert-danger'
    },
    warn(msg) {
      this.warning(msg)
    },
    warning(msg) {
      this.message = msg
      this.style = 'alert-warning'
    },
    light(msg) {
      this.message= msg
      this.style = 'alert-light'
    },
    dark(msg) {
      this.message = msg
      this.style = 'alert-dark'
    }
  }
}

</script>
