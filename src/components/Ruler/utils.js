// // 不同缩放下的刻度值
function scaleMapGap(scale) {
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
  const {
    width,
    height,
    // beginX = 0,
    beginY = 20,
    // gap,
    tickLine = 10,
    scale = 1,
    start = -120 // px
  } = config

  const usedWidth = width + start
  // 缩放倍数
  const usedScale = Math.round(scale * 100) / 100
  console.log('usedScale', usedScale)
  // 刻度间距 px
  const usedGap = scaleMapGap(usedScale)
  console.log('usedGap', usedGap)
  // 缩放后的间距 px
  const usedScaleGap = usedGap * usedScale
  console.log('usedScaleGap', usedScaleGap)
  // 刻度个数
  const ticks = Math.ceil(usedWidth / usedScaleGap)
  console.log('ticks', ticks)
  // 初始下标
  const usedStart = Math.floor(start / usedGap)
  console.log('usedStart', usedStart)

  setCtxBase(ctx, usedWidth, height)

  ctx.beginPath()
  for (let i = usedStart, count = 0; i <= ticks; i++, count++) {
    const x = count * usedScaleGap
    ctx.moveTo(x, beginY)
    if (i % 10 === 0) {
      ctx.fillText(i * usedGap, x + 4, 10)
      ctx.lineTo(x, 0)
    } else if (i % 5 === 0) ctx.lineTo(x, beginY - tickLine)
    else ctx.lineTo(x, beginY - 0.6 * tickLine)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

export function drawVerticalRuler(ctx, config) {
  const {
    width,
    height,
    beginX = 0,
    beginY = 20,
    // gap,
    tickLine = 10,
    scale = 1,
    start = 0
  } = config

  const usedHeight = height - beginY
  const normalScale = Math.round(scale * 100) / 100
  // console.log('scale', scale)
  const scaledGap = scaleMapGap(normalScale)
  // console.log('scaledGap', scaledGap)
  const tickHeight = scaledGap * normalScale
  // console.log('tickHeight', tickHeight)
  const ticks = Math.ceil(usedHeight / (scaledGap * normalScale))
  // console.log('ticks', ticks)
  let startI = Math.floor(start / scaledGap)

  setCtxBase(ctx, width, usedHeight)

  ctx.beginPath()
  let y = beginY
  for (startI; startI <= ticks; startI++) {
    ctx.moveTo(beginX, y)
    ctx.save()
    if (startI % 10 === 0) {
      ctx.rotate((90 * Math.PI) / 180)
      ctx.fillText(startI * scaledGap, y + 4, -4)
      ctx.restore()
      ctx.lineTo(0, y)
    } else if (startI % 5 === 0) ctx.lineTo(beginX - tickLine, y)
    else ctx.lineTo(beginX - 0.6 * tickLine, y)
    y += tickHeight
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
