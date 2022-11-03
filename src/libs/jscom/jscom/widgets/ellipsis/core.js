// const getLengthByCanvas = (ctx, font = {}) => {
//    const weight = font.fontWeight;
//    const size = font.fontSize;
//    const family = font.fontFamily;
//    ctx.font = `${weight} ${size} ${family}`;
//
//    return ctx.measureText(font.value).width;
// };
const getLengthByDom = (span, font = {}) => {
  // TODO 增加style样式
  span.innerHTML = font.value;
  return span.offsetWidth;
};

export default (font = {}, span) => {
  let beginLine = 1
  let index = 0
  let idx0 = 0
  const line = []
  let hasLeft = false

  for (idx0 = 0; idx0 <= font.text.length; idx0++) {
    if (beginLine > font.lineNum) break;
    const left = beginLine === font.lineNum ? font.left : ''
    const str = font.text.substr(index, idx0 - index) + left
    const len = getLengthByDom(
      span,
      Object.assign({ value: str }, font),
    )
    // console.log(str, len);
    if (len <= parseInt(font.width, 10)) {
      if (beginLine === font.lineNum) {
        line[beginLine - 1] = str.substr(0, str.length - left.length)
        hasLeft = true
      } else {
        line[beginLine - 1] = str
      }
    } else {
      idx0--
      beginLine++
      index = idx0
    }
  }

  if (idx0 > font.text.length && hasLeft) {
    // 可以全部渲染
    hasLeft = false
  }

  return [line, hasLeft]
};
