<template>
  <div>
    <video muted autoplay :loop="pLoop" :controls="pControls" :poster="pBgImg" class="bgVideo" ref="bgVideo">
      <source :src="pBgVideo" type="video/mp4">
    </video>
    <AeInfoMark
      ref="infoMarks"
      v-for="(mark, index) in this.aeInfoMarks"
      :key="index"
      :pMarkSpec="mark.markSpec"
      :pLineSpec="mark.lineSpec"
      :pInfoSpec="mark.infoSpec"
      :pDisableTimeline="true"
    >
    </AeInfoMark>
    <!-- <canvas ref="canvas"/> -->
  </div>
</template>
<script>
import AeInfoMark from "jspc/effect/AeInfoMark";
import {AeTimeline} from "jspc/effect/AeTimeline";
import gsap from 'gsap'
import {objUtil} from "jscom/utils/objutil";
// import { TimelineLite, TweenLite } from 'gsap'

export default {
  name: 'AeGroup',
  components: {AeInfoMark},
  props: {
    pAeInfoMarks: {type: Array, require: true},
    pBgVideo: String,
    pBgImg: String,
    pLoop: { type: Boolean, default: false },
    pControls: { type: Boolean, default: false },
  },
  data() {
    let aeInfoMarks = objUtil.clone(this.pAeInfoMarks)
    return {
      timeline: null,
      aeInfoMarks,
    }
  },
  mounted() {
    this.initTimeline(this.aeInfoMarks)
    this.hookTick()
  },
  methods: {
    initTimeline(aeInfoMarks) {
      this.timeline = new AeTimeline({paused: true})
      for (let infoMark of aeInfoMarks) {
        this.timeline.addInfoMark(infoMark)
      }
    },
    changeAeInfoMarks(aeInfoMarks) {
      // change timeline
      // this.aeInfoMarks = objUtil.clone(aeInfoMarks)
      for (let [index, mark] of Object.entries(aeInfoMarks)) {
        this.aeInfoMarks[index].markSpec = mark.markSpec
        this.aeInfoMarks[index].lineSpec = mark.lineSpec
        this.aeInfoMarks[index].infoSpec = mark.infoSpec
      }
      let oldTimeline = this.timeline
      let timeline = new AeTimeline({paused: true})
      for (let infoMark of this.aeInfoMarks) {
        timeline.addInfoMark(infoMark)
      }
      if (oldTimeline) {
        oldTimeline.paused()
        let progress = oldTimeline.totalProgress()
        // console.log(`progress to ${progress}`)
        timeline.totalProgress(progress)
        this.timeline = timeline
        if (!this.pBgVideo) {
          this.timeline.play()
        }
      }
      // objUtil.merge(this.aeInfoMarks, aeInfoMarks)
      // Object.assign(this.aeInfoMarks, aeInfoMarks)
      this.$forceUpdate()
    },
    hookTick() {
      if (!this.pBgVideo) {
        this.timeline.play()
        return
      }
      let video = this.$refs.bgVideo
      gsap.ticker.add((time, deltaTime, frame) => {
        let progress = video.currentTime/video.duration
        if (isNaN(progress)) { return }
        // console.log(`update progress ${progress}`)
        this.timeline.totalProgress(progress)
        // this.timeline.totalProgress(1)
        // for (let infoMark of this.$refs.infoMarks) {
        //   infoMark.flushCanvas()
        // }
      })
      gsap.ticker.fps(60)

      // NOTE: 这种方法 video 的事件速度太慢
      // video.ontimeupdate = () => {
      //   console.log(`update progress ${video.currentTime/video.duration}`)
      //   this.timeline.progress(video.currentTime/video.duration)
      // }
    }
  },
}
</script>
<style lang="less">
video.bgVideo {
  position: absolute;
  right: 0; bottom: 0;
  min-width: 100%; min-height: 100%;
  width: auto; height: auto;
  /*background: url(polina.jpg) no-repeat;*/
  background-size: cover;
}
</style>
