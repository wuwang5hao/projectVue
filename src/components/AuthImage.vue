<template>
  <img ref="img" @click="onClick" @mouseover="onMouseOver" @mouseleave="onMouseLeave" :style="authStyle" />
</template>
<script>
export default {
  name: "AuthImage",
  props: {
    authSrc: {
      type: String,
      required: false,
      default: "",
    },
    authStyle: {
      type: String,
      required: false,
      default: "",
    }
  },
  watch: {
    authSrc() {
      this.reload()
    }
  },
  mounted () {
    this.reload()
  },
  methods: {
    reload() {
      let token = this.$store.state.userOauth.token;
      Object.defineProperty(Image.prototype, 'authsrc', {
        writable: true,
        enumerable: true,
        configurable: true
      })
      let img = this.$refs.img
      let request = new XMLHttpRequest();
      request.responseType = 'blob';
      request.open('get', this.authSrc, true);
      request.setRequestHeader('token', token);
      request.onreadystatechange = (e) => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          img.src = URL.createObjectURL(request.response);
          img.onload = () => {
            URL.revokeObjectURL(img.src);
          }
        }
      };
      request.send(null);
    },
    onClick() {
      this.$emit('click')
    },
    onMouseOver(e) {
      this.$emit('mouseover', e)
    },
    onMouseLeave(e) {
      this.$emit('mouseleave', e)
    },
  },
}
</script>
