<template>
  <div id="app">
    <AConfigProvider :locale="locale">
      <router-view/>
    </AConfigProvider>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'App',
  data() {
    return {
      locale: zh_CN
    }
  }
};
</script>

<style lang="less">
@import 'variables.less';
body::-webkit-scrollbar {
  width: 0px;
}
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'SourceHanSansCN-Regular,SourceHanSansCN','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @text-color;
  min-width: 1280px;
  height: 100%;
  width: 100%;
}
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  background-color: #D8D8D8;
  border-radius: 5px;
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  background: transparent;
}
</style>
