// // 不同缩放下的刻度值
export function getGapSize(scale) {
  const initialScale = 1
  const initialGap = 10

  if (scale <= initialScale / 5) {
    return initialGap * 5 // 缩小为原来5倍
  }
  if (scale <= initialScale / 4) {
    return initialGap * 4 // 缩小为原来4倍
  }
  if (scale <= initialScale / 2) {
    return initialGap * 2 // 缩小为原来2倍
  }
  if (scale <= initialScale / 1) {
    return initialGap * 1 // 1倍
  }
  if (scale <= initialScale * 2) {
    return initialGap / 2 // 放大为原来2倍
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
  const {
    width,
    height,
    scale = 1,
    start = 0 // px
  } = config
  const y = height
  const tickLine = 10

  // 刻度间距 px
  const gapSize = getGapSize(scale)
  // 缩放后的间距 px
  const scaleGapSize = gapSize * scale
  // 刻度个数
  const ticks = Math.ceil((width + start) / scaleGapSize)
  // 初始下标
  const initialIndex =
    start < 0
      ? Math.ceil(start / scaleGapSize)
      : Math.floor(start / scaleGapSize)
  const offsetX = start % scaleGapSize

  setCtxBase(ctx, width, height)

  ctx.beginPath()
  for (let i = initialIndex, count = 0; i <= ticks; i++, count++) {
    const x = count * scaleGapSize - offsetX
    ctx.moveTo(x, y)
    ctx.save()
    if (i % 10 === 0) {
      ctx.fillText(i * gapSize, x + 4, 10)
      ctx.restore()
      ctx.lineTo(x, 0)
    } else if (i % 5 === 0) {
      ctx.restore()
      ctx.lineTo(x, y - tickLine)
    } else {
      ctx.restore()
      ctx.lineTo(x, y - 0.6 * tickLine)
    }
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

export function drawVerticalRuler(ctx, config) {
  const {
    width,
    height,
    scale = 1,
    start = 0 // px
  } = config

  const x = width
  const tickLine = 10

  // 刻度间距 px
  const gapSize = getGapSize(scale)
  // 缩放后的间距 px
  const scaleGapSize = gapSize * scale
  // 刻度个数
  const ticks = Math.ceil((height + start) / scaleGapSize)
  // 初始下标
  const initialIndex =
    start < 0
      ? Math.ceil(start / scaleGapSize)
      : Math.floor(start / scaleGapSize)
  const offsetY = start % scaleGapSize

  setCtxBase(ctx, width, height)

  ctx.beginPath()
  for (let i = initialIndex, count = 0; i <= ticks; i++, count++) {
    const y = count * scaleGapSize - offsetY
    ctx.moveTo(x, y)
    ctx.save()
    if (i % 10 === 0) {
      ctx.rotate((90 * Math.PI) / 180)
      ctx.fillText(i * gapSize, y + 4, -4)
      ctx.restore()
      ctx.lineTo(0, y)
    } else if (i % 5 === 0) {
      ctx.restore()
      ctx.lineTo(x - tickLine, y)
    } else {
      ctx.restore()
      ctx.lineTo(x - 0.6 * tickLine, y)
    }
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
