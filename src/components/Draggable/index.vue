<script>
/**
 * @property {Number} top 定位 top
 * @property {Number} left 定位 left
 * @property {Number} width 组件宽度
 * @property {Number} height 组件高度
 * @property {Number} offsetX 当前组件所在的父级容器距离可视窗口的 x
 * @property {Number} offsetY 当前组件所在的父级容器距离可视窗口的 Y
 * @property {Number} scale 缩放值
 * @property {Number} gap 当前组件移动时限制 gap px 在父级容器中
 * @property {Number} parentWidth 当前组件所在的父级容器的宽度
 * @property {Number} parentHeight 当前组件所在的父级容器的高度
 * @property {Number} stretchPointThick 拉伸点的宽高
 * @property {String} stretchPointBackground 拉伸点背景色
 * @property {String} maskBorder 蒙层边框
 * @property {String} maskBackground 蒙层背景
 * @property {String} guardLineBackground 辅助线背景
 * @property {String} guardIndicatorColor 辅助线文字颜色
 * @property {Number} guardIndicatorFontSize 辅助线文字大小
 * @property {Array}  adsorpLefts 需要左吸附的位置
 * @property {Array}  adsorpTops 需要上吸附的位置
 * @property {Number} adsorptionDistance 距离吸附位置多少距离会被吸附
 */

import { calcWidgetPosition, calcPosAtScale } from '@/utils/widgets'
export default {
  props: {
    top: Number,
    left: Number,
    width: Number,
    height: Number,
    scale: Number,
    parentWidth: Number,
    parentHeight: Number,
    offsetX: {
      type: Number,
      default: 220
    },
    offsetY: {
      type: Number,
      default: 80
    },
    gap: {
      type: Number,
      default: 5
    },
    stretchPointThick: {
      type: Number,
      default: 10
    },
    stretchPointBackground: {
      type: String,
      default: '#09f'
    },
    maskBorder: {
      type: String,
      default: '1px dashed #09f'
    },
    maskBackground: {
      type: String,
      default: 'transparent'
    },
    guardLineBackground: {
      type: String,
      default: '#09f'
    },
    guardIndicatorColor: {
      type: String,
      default: '#09f'
    },
    guardIndicatorFontSize: {
      type: Number,
      default: 12
    },
    adsorpLefts: {
      type: Array,
      default: () => []
    },
    adsorpTops: {
      type: Array,
      default: () => []
    },
    adsorptionDistance: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      usedLeft: this.left,
      usedTop: this.top,
      usedWidth: this.width,
      usedHeight: this.height,

      // 存储事件信息
      mousedown: null,
      pointMousedown: null
    }
  },

  computed: {
    styles() {
      return {
        left: this.usedLeft + 'px',
        top: this.usedTop + 'px',
        width: this.usedWidth + 'px',
        height: this.usedHeight + 'px'
      }
    },
    maskStyles() {
      return {
        border: this.maskBorder,
        background: this.maskBackground
      }
    },
    stretchPointStyles() {
      return {
        width: this.stretchPointThick + 'px',
        height: this.stretchPointThick + 'px',
        background: this.stretchPointBackground,
        'border-radius': this.stretchPointThick / 2 + 'px'
      }
    },
    guardHorizontalStyles() {
      return {
        width: this.usedLeft + 'px',
        left: -Math.abs(this.usedLeft) + 'px',
        'border-top': `1px dotted ${this.guardLineBackground}`
      }
    },
    guardVertialStyles() {
      return {
        height: this.usedTop + 'px',
        top: -Math.abs(this.usedTop) + 'px',
        'border-left': `1px dotted ${this.guardLineBackground}`
      }
    },
    guardIndicatorStyles() {
      return {
        color: this.guardIndicatorColor,
        'font-size': this.guardIndicatorFontSize + 'px'
      }
    }
  },

  watch: {
    left(v) {
      this.usedLeft = v
    },
    top(v) {
      this.usedTop = v
    },
    width(v) {
      this.usedWidth = v
    },
    height(v) {
      this.usedHeight = v
    }
  },

  methods: {
    pointUpListener() {
      this.pointMousedown = null
      window.removeEventListener('mousemove', this.pointMoveListener)
      window.removeEventListener('mouseup', this.pointUpListener)
    },
    pointMoveListener(e) {
      e.preventDefault()
      const {
        sd,
        width: owidth,
        height: oheight,
        left: oleft,
        top: otop
      } = this.pointMousedown
      const { pageX, pageY } = e

      // 以下计算都是基于物理像素
      const left = calcPosAtScale(pageX - this.offsetX, this.scale)
      const top = calcPosAtScale(pageY - this.offsetY, this.scale)
      const diffWidth = left - oleft
      const diffHeight = top - otop

      switch (sd) {
        case 'left-top-stretch-point':
          this.usedLeft = left
          this.usedTop = top
          this.usedWidth = owidth - diffWidth
          this.usedHeight = oheight - diffHeight
          break
        case 'top-stretch-point':
          this.usedTop = top
          this.usedHeight = oheight - diffHeight
          break
        case 'right-top-stretch-point':
          this.usedTop = top
          this.usedWidth = diffWidth
          this.usedHeight = oheight - diffHeight
          break
        case 'left-stretch-point':
          this.usedLeft = left
          this.usedWidth = owidth - diffWidth
          break
        case 'right-stretch-point':
          this.usedWidth = diffWidth
          break
        case 'left-bottom-stretch-point':
          this.usedLeft = left
          this.usedWidth = owidth - diffWidth
          this.usedHeight = diffHeight
          break
        case 'bottom-stretch-point':
          this.usedHeight = diffHeight
          break
        case 'right-bottom-stretch-point':
          this.usedWidth = diffWidth
          this.usedHeight = diffHeight
          break
      }
    },
    handlePointMousedown(sd, e) {
      e.stopPropagation()
      e.preventDefault()
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = this.$el
      this.pointMousedown = {
        e,
        sd,
        width: offsetWidth,
        height: offsetHeight,
        left: offsetLeft,
        top: offsetTop
      }
      window.addEventListener('mousemove', this.pointMoveListener)
      window.addEventListener('mouseup', this.pointUpListener)
    },
    // 创建拉伸点
    createStretchPoint() {
      const points = [
        'left-top-stretch-point',
        'top-stretch-point',
        'right-top-stretch-point',
        'left-stretch-point',
        'right-stretch-point',
        'left-bottom-stretch-point',
        'bottom-stretch-point',
        'right-bottom-stretch-point'
      ]
      return points.map((point) => (
        <i
          class={['stretch-point', point]}
          style={this.stretchPointStyles}
          onMousedown={this.handlePointMousedown.bind(this, point)}
        />
      ))
    },

    upListener() {
      this.mousedown = null
      window.removeEventListener('mousemove', this.moveListener)
      window.removeEventListener('mouseup', this.upListener)
    },
    moveListener(e) {
      e.preventDefault()
      const { e: oe, width, height } = this.mousedown
      const { offsetX: cursorOffsetX, offsetY: cursorOffsetY } = oe

      const { left, top } = calcWidgetPosition({
        e,
        width,
        height,
        parentWidth: this.parentWidth,
        parentHeight: this.parentHeight,
        gap: this.gap,
        parentOffsetX: this.offsetX,
        parentOffsetY: this.offsetY,
        addis: this.adsorptionDistance,
        adsorpLefts: this.adsorpLefts,
        adsorpTops: this.adsorpTops,
        scale: this.scale,
        cursorOffsetX,
        cursorOffsetY
      })
      this.usedLeft = left
      this.usedTop = top
    },
    handleMousedown(e) {
      e.preventDefault()
      const { offsetWidth, offsetHeight } = this.$el
      this.mousedown = { e, width: offsetWidth, height: offsetHeight }
      window.addEventListener('mousemove', this.moveListener)
      window.addEventListener('mouseup', this.upListener)
    }
  },

  render() {
    return (
      <div
        class="draggable-wrap"
        style={this.styles}
        onMousedown={this.handleMousedown}
      >
        {this.createStretchPoint()}

        <div class="draggable-mask" style={this.maskStyles} />

        <div class="guard guard-horizontal" style={this.guardHorizontalStyles}>
          <span class="guard-indicator" style={this.guardIndicatorStyles}>
            {this.usedLeft}
          </span>
        </div>
        <div class="guard guard-vertical" style={this.guardVertialStyles}>
          <span class="guard-indicator" style={this.guardIndicatorStyles}>
            {this.usedTop}
          </span>
        </div>

        {this.$slots.default}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.draggable-wrap {
  position: absolute;
  // background: rgba(0, 0, 0, 0.4);
  cursor: move;
  min-width: 5px;
  min-height: 5px;

  .guard {
    position: absolute;
    display: none;
    pointer-events: none;
  }
  .guard-horizontal {
    top: 0;
    .guard-indicator {
      position: absolute;
      top: 0;
      right: 50px;
      transform: translateY(-100%);
    }
  }
  .guard-vertical {
    left: 0;
    .guard-indicator {
      position: absolute;
      left: 0;
      bottom: 50px;
      transform: translateX(-100%);
    }
  }

  .draggable-mask {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    pointer-events: none;
  }

  .stretch-point {
    display: none;
    position: absolute;
  }
  .left-top-stretch-point {
    top: 0;
    left: 0;
    cursor: nwse-resize;
    transform: translate(-50%, -50%);
  }
  .top-stretch-point {
    top: 0;
    left: 50%;
    cursor: ns-resize;
    transform: translate(-50%, -50%);
  }
  .right-top-stretch-point {
    top: 0;
    right: 0;
    cursor: nesw-resize;
    transform: translate(50%, -50%);
  }
  .left-stretch-point {
    left: 0;
    top: 50%;
    cursor: ew-resize;
    transform: translate(-50%, -50%);
  }
  .right-stretch-point {
    right: 0;
    top: 50%;
    cursor: ew-resize;
    transform: translate(50%, -50%);
  }
  .left-bottom-stretch-point {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
    transform: translate(-50%, 50%);
  }
  .bottom-stretch-point {
    bottom: 0;
    left: 50%;
    cursor: ns-resize;
    transform: translate(-50%, 50%);
  }
  .right-bottom-stretch-point {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
    transform: translate(50%, 50%);
  }
}
.draggable-wrap:hover {
  .draggable-mask,
  .stretch-point {
    display: unset;
  }
  .guard {
    display: unset;
  }
}
</style>
