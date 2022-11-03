<template>
  <a-layout-header class="ch-header">
    <div class="ch-header-left">
      <slot name="left"></slot>
    </div>
    <div class="ch-header-right">
      <slot name="right">
        <slot name="right-extend" />
        <img v-if="pIsShowAvatar" class='ch-header-avatar' :src="pAvatarUrl"/>
        <a-dropdown>
          <a class="ch-header-link" @click="e => e.preventDefault()">
            {{pUsername}} <a-icon type="caret-down" /> </a>
          <a-menu slot="overlay" @click="onClickMenu">
            <a-menu-item class="ch-header-item" v-for="menuItem in pMenuItems" :key="menuItem.key">
              <a href="javascript:;">
                  <!-- <img :src="menuItem.icon" />{{ menuItem.title }} -->
                  <a-icon :type="menuItem.type" />{{ menuItem.title }}
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </slot>
    </div>
  </a-layout-header>
</template>

<script>
/**
 * @vue-props {String} avatarUrl - 用户头像
 * @vue-props {String} username - 用户名
 * @vue-props {Array} pMenuItems - 下拉菜单项
 * @vue-event {String} on-select - 下拉菜单选择消息，参数为菜单的Key
*/
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ContentHeader',

  props: {
    pMenuItems: {
      type: Array,
      default () {
        return []
      }
    },
    pUsername: String,
    pAvatarUrl: String,
    pIsShowAvatar: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
    }
  },

  methods: {
    onClickMenu ({ key }) {
      this.$emit('on-menu-action', key)
    }
  }
}
</script>

<style lang="less">
@import "variables.less";
.ch-header {
  justify-content: space-between;
  align-items: center;
  display: flex;
  height: 48px;
  box-shadow: 0px 0px 8px 0px rgba(224, 224, 224, 1);
  z-index: 1000;
  padding: 0px 24px;
  background: @white;
  border-bottom: 1px @divider-color solid;
  &-link {
    color: @text-color;
    margin: 0px @space-size-tiny;
    line-height: 48px;
    &:hover{
        text-decoration: none;
    }
  }
  &-avatar {
    display: inline-block;
    width: 24px;
    // height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  &-item {
    height: 45px;
    line-height: 45px;
    width: 148px;
    padding: 0px 12px;
    color: #595959;
    a{
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      &:hover{
        text-decoration: none;
      }
      // img{
      //   width: 22px;
      //   height: 22px;
      //   margin-right: 6px;
      //   margin-bottom: 2px
      // }
      .anticon {
        color: @primary;
        margin-right: @space-size-tiny;
        font-size: 18px;
        margin-top: -2px;
      }
    }
  }
  &-item:not(:last-child) {
    border-bottom: 1px @divider-color solid;
  }
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>
