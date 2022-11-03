<template>
  <div
    :style="{
      visibility: pVisible ? '' : 'hidden',
      position: 'fixed',
      top: `${pPos ? pPos[0] : 0}px`,
      left: `${pPos ? pPos[1] : 0}px`,
    }"
    @mousedown.prevent
  >
    <ul class="keyboard">
      <li
        @mousedown.prevent
        v-for="(key,index) in keyList"
        :key="index"
        :class="{delete: key === 'Delete', tab: key === 'Tab', capslock: key === 'Caps', enter: key === 'Enter', shift: key === 'Shift', space: key === 'Space', shifted: (key === 'Shift') && hasShifted, capsed: (key === 'Caps') && hasCapsed }"
        @click="clickKey(key)"
      >
        {{key}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Keyboard',
  props: {
    value: {type: String, default() { return '' }},
    pPos: {type: Array, default() { return [0, 0] }},
    pVisible: {type: Boolean, default() { return false }},
  },
  data() {
    return {
      keyList: [],
      normalKeyList: [],
      shiftedKeyList: [],
      capsedKeyList: [],
      hasShifted: false,
      hasCapsed: false,
      keyvalue: this.value
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    clickKey(key) {
      switch(key) {
        case "Delete":
          this.keyvalue = this.keyvalue.length ?
            this.keyvalue.substring(0, this.keyvalue.length - 1) : this.keyvalue;
          break;

        case "Tab":
          this.keyvalue += "\t";
          break;

        case "Enter":
          this.keyvalue += "\n";
          break;

        case "Space":
          this.keyvalue += " ";
          break;

        case "Caps":
          this.hasCapsed = !this.hasCapsed;
          this.keyList = this.hasCapsed ? this.capsedKeyList : this.normalKeyList;
          break;

        case "Shift":
          this.hasShifted = !this.hasShifted;
          this.keyList = this.hasShifted ? this.shiftedKeyList : this.normalKeyList;
          break;

        default:
          this.keyvalue += key;
          break;
      }
      // console.log(this.keyvalue)
      this.$emit("input", this.keyvalue)
    },
    init() {
      let normalKeyList = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete',
          'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
          'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
          'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift',
          'Space'],

        shiftedKeyList = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Delete',
          'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
          'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
          'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift',
          'Space'],

        capsedKeyList = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete',
          'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
          'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter',
          'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift',
          'Space'];

      this.keyList = this.normalKeyList = normalKeyList;
      this.shiftedKeyList = shiftedKeyList;
      this.capsedKeyList = capsedKeyList;
    },
  },

}
</script>

<style lang="less" scoped>
.keyboard {
  width: 688px;
  margin: 0;
  padding: 0;
  list-style: none;
  user-select: none;

  li {
    float: left;
    margin: 0 5px 5px 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 5px;

    &:hover {
      position: relative;
      border-color: gray;
      cursor: pointer;
    }
    &:active {
      top: 1px;
      left: 1px;
    }
  }

  .tab, .delete {
    width: 70px;
  }
  .capslock {
    width: 80px;
  }
  .enter {
    width: 77px;
  }
  .shift {
    width: 102px;
  }
  .space {
    clear: left;
    width: 658px;
  }
  .shifted {
    position: relative;
    top: 1px;
    left: 1px;
    border-color: #e5e5e5;
    cursor: pointer;
  }
  .capsed {
    position: relative;
    top: 1px;
    left: 1px;
    border-color: #e5e5e5;
    cursor: pointer;
  }
}
</style>
