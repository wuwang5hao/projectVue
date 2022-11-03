<template>
  <div class='tags-nav'>
    <div class='close-con'>
      <Dropdown translate @on-click='handleTagsOption' class='close-con-drop'>
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline" />
        </Button>
        <DropdownMenu slot='list'>
          <DropdownItem name='all'>关闭所有</DropdownItem>
          <DropdownItem name='other'>关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class='tn-button but-left'>
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class='tn-button but-right'>
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div ref='scrollOuter' class='tn-scroll-outer'>
      <div ref='scrollBody' :style="{left: tagBodyLeft + 'px'}" class='tn-scroll-body'>
        <transition-group name='taglist-moving-animation'>
          <Tag type='dot'
          ref='tagsPageOpened'
          v-for='(tag, index) in tagsList'
          :key="`${tag} + ${index}`"
          :data-route-item="tag"
          :color='isCurrentTag(tag)'
          :closable='isTabCloseable(tag)'
          @click.native="handleClick(tag)"
          @on-close='onClose(tag)'>{{ tag.subTitle }}</Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tagsNav',
  props: {
    value: {},
    tagsList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentRouteObj () {
      const { matched, path, query } = this.value
      return { matched, path, query }
    }
  },
  watch: {
    '$route' (route) {
      this.getTagElementByRoute(route)
    }
  },
  data () {
    return {
      tagBodyLeft: 0,
      outerPadding: 4
    }
  },
  mounted () {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  },
  methods: {
    handleTagsOption (name) {
      this.tagBodyLeft = 0
      this.$emit('on-drop-down', name)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    isCurrentTag (item) {
      if (this.currentRouteObj.path === item.to) {
        return 'primary'
      }
      return 'default'
    },
    isTabCloseable (item) {
      if (item.name === 'homePage') {
        return false
      }
      return true
    },
    onClose (item) {
      this.$emit('on-Close-tab', item)
    },
    handleClick (item) {
      this.$emit('input', item)
    },
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByRoute (route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        if (!this.refsTag) {
          return
        }
        this.refsTag.forEach((item, index) => {
          if (route.path === item.$attrs['data-route-item'].to) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }
  }
}
</script>
<style lang="less">
@import 'variables.less';
.tags-nav{
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
  width: 100%;
  height: 100%;
  .close-con{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 34px;
    text-align: center;
    background: @white;
    z-index: 10;
    &-drop{
      margin-top: @small-vert-space;
    }
  }
  .tn-button{
    position: absolute;
    height: 100%;
    background: @white;
    top:0;
    padding-top:@small-vert-space - 3;
    z-index: 10;
    button{
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
  }
  .but-left{
    left:0;
  }
  .but-right{
    right:34px;
    border-right: 1px solid @gray-dark;
  }
  .tn-scroll-outer{
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100,100,100,.1) inset;
    z-index: 1;
    .tn-scroll-body{
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .ivu-tag-dot-inner{
        transition: background .2s ease;
      }
    }
  }
}
</style>
