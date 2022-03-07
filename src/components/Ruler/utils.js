// // 不同缩放下的刻度值
function getGapSize(scale) {
  const initinalScale = 1
  const initinalGap = 10

  if (scale <= initinalScale / 5) {
    return initinalGap * 5 // 缩小为原来5倍
  }
  if (scale <= initinalScale / 4) {
    return initinalGap * 4 // 缩小为原来4倍
  }
  if (scale <= initinalScale / 2) {
    return initinalGap * 2 // 缩小为原来2倍
  }
  if (scale <= initinalScale / 1) {
    return initinalGap * 1 // 1倍
  }
  if (scale <= initinalScale * 2) {
    return initinalGap / 2 // 放大为原来2倍
  }
}

function setCtxBase(ctx, width, height) {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#F5DEB3'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#111' // 设置画笔属性
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1
  ctx.font = 13
}

export function drawHorizonRuler(ctx, config) {
  let {
    width,
    height,
    // beginX = 0,
    beginY = 20,
    // gap,
    tickLine = 10,
    scale = 1,
    start = -120 // px,
    // offset = 0
  } = config

  // 缩放倍数
  scale = Math.round(scale * 100) / 100
  // 刻度间距 px
  const gapSize = getGapSize(scale)
  // 缩放后的间距 px
  const scaleGapSize = gapSize * scale
  // 刻度个数
  const ticks = Math.ceil((width - start) / scaleGapSize)
  // 初始下标
  const initinalIndex = Math.floor(start / scaleGapSize)

  setCtxBase(ctx, width, height)

  ctx.beginPath()
  for (let i = -initinalIndex, count = 0; i <= ticks; i++, count++) {
    const x = count * scaleGapSize
    ctx.moveTo(x, beginY)
    if (i % 10 === 0) {
      ctx.fillText(i * gapSize, x + 4, 10)
      ctx.lineTo(x, 0)
    } else if (i % 5 === 0) ctx.lineTo(x, beginY - tickLine)
    else ctx.lineTo(x, beginY - 0.6 * tickLine)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

export function drawVerticalRuler(ctx, config) {
  let {
    width,
    height,
    // beginX = 0,
    beginX = 20,
    // gap,
    tickLine = 10,
    scale = 1,
    start = -120 // px,
    // offset = 0
  } = config

  // 缩放倍数
  scale = Math.round(scale * 100) / 100
  // 刻度间距 px
  const gapSize = getGapSize(scale)
  // 缩放后的间距 px
  const scaleGapSize = gapSize * scale
  // 刻度个数
  const ticks = Math.ceil((height - start) / scaleGapSize)
  // 初始下标
  const initinalIndex = Math.floor(start / scaleGapSize)

  setCtxBase(ctx, width, height)

  ctx.beginPath()
  for (let i = -initinalIndex, count = 0; i <= ticks; i++, count++) {
    const y = count * scaleGapSize
    ctx.moveTo(beginX, y)
    if (i % 10 === 0) {
      ctx.save()
      ctx.rotate((90 * Math.PI) / 180)
      ctx.fillText(i * gapSize, y + 4, -4)
      ctx.restore()
      ctx.lineTo(0, y)
    } else if (i % 5 === 0) ctx.lineTo(beginX - tickLine, y)
    else ctx.lineTo(beginX - 0.6 * tickLine, y)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
