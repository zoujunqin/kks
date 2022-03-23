<script>
import RulerTick from './RulerTick.vue'
import RulerLine from './RulerLine'
/**
 * @desc 标尺组件 默认的 slot 只能是一个子节点
 * @property {Number} thick 标尺左上角交叉处的宽度和高度
 * @property {Number} slotWidth slot容器的宽度，略大于 content
 * @property {Number} slotHeight slot容器的高度，略大于 content
 * @property {String} slotBackground slot容器的背景色
 * @property {Number} contentWidth 内容宽度
 * @property {Number} contentHeight 内容高度
 * @property {Number} width 整个标尺组件的宽度
 * @property {Number} height 整个标尺组件的高度
 * @property {Number} startX 水平标尺从 startX px 开始计算
 * @property {Number} startY 垂直标尺从 startY px 开始计算
 * @property {Number} scaleMax 最大放大倍数
 * @property {Number} scaleMin 最小的缩放倍数
 * @property {String} tickBackground 标尺背景色
 * @property {String} tickLineColor 刻度线颜色
 * @property {String} tickLine 满10刻度线长度
 * @property {String} tickColor 刻度值颜色
 * @property {String} indicatorBackground 参考线显示值背景色
 * @property {String} indicatorColor 参考线显示值字体颜色
 * @property {String} lineColor 参考线颜色
 * @property {Number} lineThick 参考线厚度
 * @property {String} movableLineColor 移动参考线颜色
 * @property {Number} movableLineThick 移动参考线厚度
 * @property {String} mlIndicatorBackground 移动参考线显示值背景色
 * @property {String} mlIndicatorColor 移动参考线显示值字体颜色
 * @property {String} cornerBackground 标尺左上角交叉背景色
 */
export default {
  props: {
    thick: {
      type: Number,
      default: 20
    },
    slotWidth: {
      type: Number,
      default: 2000
    },
    slotHeight: {
      type: Number,
      default: 1000
    },
    slotBackground: {
      type: String,
      default: '#dedddd'
    },
    contentWidth: {
      type: Number,
      default: 1600
    },
    contentHeight: {
      type: Number,
      default: 800
    },
    width: {
      type: Number,
      default: 1320
    },
    height: {
      type: Number,
      default: 813
    },
    startX: {
      type: Number,
      default: 0
    },
    startY: {
      type: Number,
      default: 0
    },
    scaleMax: {
      type: Number,
      default: 2
    },
    scaleMin: {
      type: Number,
      default: 0.2
    },
    tickBackground: {
      type: String,
      default: '#F5DEB3'
    },
    tickLineColor: {
      type: String,
      default: '#000'
    },
    tickLine: {
      type: Number,
      default: 20
    },
    tickColor: {
      type: String,
      default: '#000'
    },
    indicatorBackground: {
      type: String,
      default: 'green'
    },
    indicatorColor: {
      type: String,
      default: '#fff'
    },
    lineColor: {
      type: String,
      default: 'green'
    },
    lineThick: {
      type: Number,
      default: 1
    },
    movableLineColor: {
      type: String,
      default: '#FE323C'
    },
    movableLineThick: {
      type: Number,
      default: 1
    },
    mlIndicatorBackground: {
      type: String,
      default: '#FE323C'
    },
    mlIndicatorColor: {
      type: String,
      default: '#fff'
    },
    cornerBackground: {
      type: String,
      default: '#dedddd'
    }
  },

  data() {
    return {
      sx: 0,
      sy: 0,

      scale: 1,

      lines: [],
      showLines: true,
      movableLine: {},
      showMovableLine: false,
      movableLineIsVertical: false,

      pointerEvents: 'unset'
    }
  },

  computed: {
    // 水平刻度尺宽度
    tickWidth() {
      return this.width - this.thick
    },
    // 垂直刻度尺高度
    tickHeight() {
      return this.height - this.thick
    },
    slotWrapStyles() {
      return {
        width: `${this.slotWidth}px`,
        height: `${this.slotHeight}px`,
        background: this.slotBackground
      }
    },
    cornerIcon() {
      return this.showLines ? 'visible' : 'invisible'
    },
    cornerIconSize() {
      return this.thick / 2 + 5 + 'px'
    },
    cornerIconStyles() {
      return {
        color: this.showLines ? '#055AF9' : '#3e3d3d'
      }
    },
    cornerStyles() {
      return {
        width: `${this.thick}px`,
        height: `${this.thick}px`,
        'line-height': `${this.thick}px`,
        background: this.cornerBackground
      }
    },
    styles() {
      return {
        'padding-left': `${this.thick}px`,
        'padding-top': `${this.thick}px`
      }
    }
  },

  methods: {
    // mouted 钩子执行
    setScroll() {
      const rulerContent = this.$refs.rc
      // 滚动使内容左上角跟容器左上角对齐
      rulerContent.scrollTop =
        (this.slotHeight - this.contentHeight) / 2 + this.startY
      rulerContent.scrollLeft =
        (this.slotWidth - this.contentWidth) / 2 + this.startX
    },

    handleCornerClick() {
      this.showLines = !this.showLines
    },

    // 滚动和放大缩小执行
    handleScroll() {
      const rc = this.$refs.rc
      const scrollTop = rc.scrollTop
      const scrollLeft = rc.scrollLeft

      this.sx =
        scrollLeft - (this.slotWidth - this.contentWidth * this.scale) / 2
      this.sy =
        scrollTop - (this.slotHeight - this.contentHeight * this.scale) / 2

      this.$emit('transform', {
        sx: this.sx,
        sy: this.sy,
        scale: this.scale
      })
    },
    // 放大缩小执行
    handleWheel(e) {
      if (e.metaKey) {
        e.preventDefault()

        const ss = 0.02
        this.scale = +(e.wheelDelta > 0
          ? Math.min(this.scaleMax, this.scale + ss)
          : Math.max(this.scaleMin, this.scale - ss)
        ).toFixed(2)

        this.$slots.default[0].elm.style.transform = `scale(${this.scale})`
        this.handleScroll()
      }
    },

    // 从刻度区域按下鼠标执行
    handleDown() {
      this.showMovableLine = true
    },
    // 移动参考线执行
    handleMove(line) {
      this.movableLine = { ...line, value: this.getValue(line) }
    },
    // 刻度区域按下后释放鼠标执行
    handleUp(line) {
      this.showLines = true
      if (line.canAdded) {
        this.lines.push(this.movableLine)
        this.$emit('lineUpdate', this.lines)
      }

      this.showMovableLine = false
      this.movableLine = { ...this.movableLine, left: -100, top: -100 }
    },

    // 根据线一些信息计算刻度值
    getValue(line) {
      const { left, top, vertical, start } = line
      const startValue = start / this.scale
      const value =
        ((vertical ? left : top) - this.thick) / this.scale + startValue
      return Math.round((value * 10).toFixed(1)) / 10
    },

    // 参考线鼠标按下执行
    handleLineDown(line) {
      this.movableLine = line
      this.showMovableLine = true
    },
    // 参考线鼠标抬起执行
    handleLineUp(line, index) {
      this.showLines = true
      if (line.canRemoved) this.lines.splice(index, 1)
      else this.lines.splice(index, 1, this.movableLine)
      this.$emit('lineUpdate', this.lines)

      this.showMovableLine = false
      this.movableLine = { ...this.movableLine, left: -100, top: -100 }
    }
  },

  mounted() {
    this.$nextTick(this.setScroll)

    const rawKeydown = document.onkeydown
    document.onkeydown = (e) => {
      // 移除参考线的事件，防止缩放事件副作用
      if (e.key === 'Meta') this.pointerEvents = 'none'
      rawKeydown?.call(this, document)
    }

    const rawKeyup = document.onkeyup
    document.onkeyup = (e) => {
      // 移除参考线的事件，防止缩放事件副作用
      if (e.key === 'Meta') this.pointerEvents = 'unset'
      rawKeyup?.call(this, document)
    }
  },

  beforeDestroy() {
    document.onkeyup = null
    document.onkeydown = null
  },

  render() {
    return (
      <div class="ruler" style={this.styles}>
        <div
          class="corner"
          style={this.cornerStyles}
          vOn:click={this.handleCornerClick}
        >
          <SvgIcon
            iconClass={this.cornerIcon}
            size={this.cornerIconSize}
            style={this.cornerIconStyles}
          />
        </div>

        <RulerTick
          class="horizontal-ruler-tick"
          width={this.tickWidth}
          height={this.thick}
          startX={this.sx}
          startY={this.sy}
          scale={this.scale}
          thick={this.thick}
          tickBackground={this.tickBackground}
          tickLineColor={this.tickLineColor}
          tickLine={this.tickLine}
          tickColor={this.tickColor}
          vOn:down={this.handleDown}
          vOn:move={this.handleMove}
          vOn:up={this.handleUp}
        />
        <RulerTick
          class="vertical-ruler-tick"
          vertical
          width={this.thick}
          height={this.tickHeight}
          startX={this.sx}
          startY={this.sy}
          scale={this.scale}
          thick={this.thick}
          tickBackground={this.tickBackground}
          tickLineColor={this.tickLineColor}
          tickLine={this.tickLine}
          tickColor={this.tickColor}
          vOn:down={this.handleDown}
          vOn:move={this.handleMove}
          vOn:up={this.handleUp}
        />

        {this.lines.map((line, index) => (
          <RulerLine
            vShow={this.showLines}
            key={'rl' + index}
            line={line}
            id={index}
            value={line.value}
            vertical={line.vertical}
            scale={this.scale}
            startX={this.sx}
            startY={this.sy}
            thick={this.thick}
            pointerEvents={this.pointerEvents}
            indicatorBackground={this.indicatorBackground}
            indicatorColor={this.indicatorColor}
            lineColor={this.lineColor}
            lineThick={this.lineThick}
            vOn:down={this.handleLineDown}
            vOn:move={this.handleMove}
            vOn:up={this.handleLineUp}
          />
        ))}
        <RulerLine
          movable
          vertical={this.movableLine.vertical}
          vShow={this.showMovableLine}
          scale={this.scale}
          line={this.movableLine}
          startX={this.sx}
          startY={this.sy}
          thick={this.thick}
          movableLineColor={this.movableLineColor}
          movableLineThick={this.movableLineThick}
          mlIndicatorBackground={this.mlIndicatorBackground}
          mlIndicatorColor={this.mlIndicatorColor}
          value={this.movableLine.value}
        />

        <div
          ref="rc"
          class="ruler-content"
          vOn:wheel={this.handleWheel}
          vOn:scroll={this.handleScroll}
        >
          <div class="slot-wrap" style={this.slotWrapStyles}>
            {this.$slots.default}
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.ruler {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  .corner {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2023;
    cursor: pointer;
    text-align: center;
  }
  .horizontal-ruler-tick {
    position: absolute;
    z-index: 2023;
  }
  .vertical-ruler-tick {
    position: absolute;
    z-index: 2023;
  }

  .ruler-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    & > div {
      position: relative;
      & > div {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
