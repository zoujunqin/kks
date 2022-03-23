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

function setCtxBase(ctx, config) {
  const { width, height, tickBackground, tickLineColor, tickColor } = config

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = tickBackground
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = tickColor // 设置画笔属性
  ctx.strokeStyle = tickLineColor
  ctx.lineWidth = 1
  ctx.font = 12
}

export function drawHorizontalRuler(ctx, start, config) {
  const { width, height, scale, tickLine } = config
  const halfTickLine = tickLine / 2

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

  setCtxBase(ctx, config)

  ctx.beginPath()
  for (let i = initialIndex, count = 0; i <= ticks; i++, count++) {
    const x =
      count * scaleGapSize -
      offsetX +
      parseFloat((ctx.lineWidth / 2).toFixed(2))

    ctx.moveTo(x, height)
    ctx.save()

    if (i % 10 === 0) {
      ctx.fillText(
        i * gapSize,
        x + 4,
        height <= tickLine ? height - tickLine + 10 : height - 10
      )
      ctx.restore()
      ctx.lineTo(x, height - tickLine)
    } else if (i % 5 === 0) {
      ctx.restore()
      ctx.lineTo(x, height - halfTickLine)
    } else {
      ctx.restore()
      ctx.lineTo(x, height - 0.6 * halfTickLine)
    }
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

export function drawVerticalRuler(ctx, start, config) {
  const { width, height, scale, tickLine } = config
  const halfTickLine = tickLine / 2

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

  setCtxBase(ctx, config)

  ctx.beginPath()
  for (let i = initialIndex, count = 0; i <= ticks; i++, count++) {
    const y =
      count * scaleGapSize -
      offsetY +
      parseFloat((ctx.lineWidth / 2).toFixed(2))
    ctx.moveTo(width, y)
    ctx.save()
    if (i % 10 === 0) {
      ctx.rotate((90 * Math.PI) / 180)
      ctx.fillText(
        i * gapSize,
        y + 4,
        width <= tickLine ? width - tickLine - 4 : tickLine - width + 10
      )

      ctx.restore()
      ctx.lineTo(width - tickLine, y)
    } else if (i % 5 === 0) {
      ctx.restore()
      ctx.lineTo(width - halfTickLine, y)
    } else {
      ctx.restore()
      ctx.lineTo(width - 0.6 * halfTickLine, y)
    }
  }
  ctx.stroke()
  ctx.closePath()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

export function setBodyCursor(cursor) {
  document.body.style.cursor = cursor
}
