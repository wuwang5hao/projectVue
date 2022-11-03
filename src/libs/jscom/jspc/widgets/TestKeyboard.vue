<template>
  <div id="container">
    <h1>父组件</h1>
    <AInput type="text" v-model="keyboards" @focus="onFocus" @blur="onBlur"></AInput>
    <Keyboard
      v-model="keyboards"
      :pVisible="visible"
      :pPos="position"
    ></Keyboard>
  </div>
</template>

<script>
import Keyboard from './Keyboard'

export default {
  data() {
    return {
      visible: false,
      position: [0, 0],
      keyboards: "",
    }
  },
  components: {
    KeyBoard
  },
  methods: {
    onFocus(event) {
      let top = event.target.getBoundingClientRect().bottom
      let left = event.target.getBoundingClientRect().left
      this.visible = true
      this.position = [top, left]
    },
    onBlur(event) {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 680px;
  margin: 20px auto;
  font-family: Verdana, Sans-Serif;

  h1 {
    color: #42b983;
    font-weight: bold;

  }

  textarea {
    display: block;
    width: 100%;
    min-height: 100px;
    padding: 0;
    margin: 20px 0;
    font-size: 16px;
  }
}
</style>
