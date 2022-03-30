<script>
/**
 * @property {Number} styles
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

const props = {
  styles: {
    type: Object,
    default: () => {}
  },
  scale: Number,
  parentWidth: Number,
  parentHeight: Number,
  active: {
    type: Boolean,
    default: true
  },
  rotate: {
    type: Number,
    default: 0
  },
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
    default: 6
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
}

import { calcWidgetPosition, calcPosAtScale } from '@/utils/widgets'

// 八个点
const points = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']

function genMaskStyle() {
  return {
    border: this.maskBorder,
    background: this.maskBackgrounds
  }
}

function genPointStyle(point) {
  console.log(point)
  return {
    width: this.stretchPointThick + 'px',
    height: this.stretchPointThick + 'px',
    background: this.stretchPointBackground,
    'border-radius': this.stretchPointThick / 2 + 'px'
  }
}
export default {
  props,
  data() {
    return {
      // 存储事件信息
      mousedown: null,
      pointMousedown: null,

      points
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
      const { clientX, clientY } = e

      // 以下计算都是基于物理像素
      const left = calcPosAtScale(clientX - this.offsetX, this.scale)
      const top = calcPosAtScale(clientY - this.offsetY, this.scale)
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
      this.$emit('mousedown')

      const { offsetWidth, offsetHeight } = this.$el
      this.mousedown = { e, width: offsetWidth, height: offsetHeight }
      window.addEventListener('mousemove', this.moveListener)
      window.addEventListener('mouseup', this.upListener)
    },

    // 旋转
    handleRotate(e) {
      e.preventDefault()
      e.stopPropagation()
      // 初始坐标和初始角度
      const startY = e.clientY
      const startX = e.clientX
      const startRotate = this.usedRotate

      // 获取元素中心点位置
      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // 旋转前的角度
      const rotateDegreeBefore =
        Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

      const move = (moveEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        // 旋转后的角度
        const rotateDegreeAfter =
          Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
        // 获取旋转的角度值
        this.usedRotate =
          startRotate + Math.ceil(rotateDegreeAfter - rotateDegreeBefore)
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  },

  render() {
    return (
      <div
        class="draggable-wrap"
        style={this.styles}
        vOn:mousedown_prevent={this.handleMousedown}
      >
        <div
          class="draggable-rotate"
          vOn:mousedown_stop_prevent={this.handleRotate}
        >
          <svg-icon icon-class="rotate" size="16" />
        </div>

        {points.map((point) => (
          <i
            class="stretch-point"
            style={genPointStyle.call(this, point)}
            vOn:mousedown_stop_prevent={this.handlePointMousedown.bind(
              this,
              point
            )}
          />
        ))}

        {this.active && (
          <div class="tip">
            <div>x: {this.usedLeft}</div>
            <div>y: {this.usedTop}</div>
            <div>r: {this.usedRotate}</div>
          </div>
        )}

        {this.active && (
          <div class="draggable-mask" style={genMaskStyle.call(this)} />
        )}

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

  .tip {
    padding: 6px;
    position: absolute;
    right: -4px;
    bottom: 0;
    transform: translateX(100%);
    pointer-events: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 1px 0 gray;
  }

  .draggable-rotate {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }

  .draggable-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 2023;
  }

  .stretch-point {
    position: absolute;
    z-index: 2024;
  }
}
</style>
