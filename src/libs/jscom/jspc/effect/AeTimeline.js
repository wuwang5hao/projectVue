import { TimelineLite, TweenLite } from 'gsap'

export class AeTimeline extends TimelineLite {
  addInfoMark({markSpec, lineSpec, infoSpec}) {
    // mark
    if (markSpec.setupTimeline) {
      markSpec.setupTimeline(this, markSpec)
    }
    // line
    for (let line of lineSpec.lines) {
      let length = this.calcLineLength(line)
      if (!line.setupTimeline) continue
      line.setupTimeline(this, line, length)
    }
    // actions
    for (let action of infoSpec.actions) {
      if (!action.setupTimeline) continue
      action.setupTimeline(this, action, infoSpec)
    }
    return this
  }
  calcLineLength(line) {
    return Math.sqrt(Math.pow(line.x0 - line.x1, 2) + Math.pow(line.y0 - line.y1, 2))
  }
}
