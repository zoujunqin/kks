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

import {
  calcPosAtScale,
  calcWidgetPosition
  // getRotatedStyle
} from '@/utils/widgets'

// 八个点
const points = ['lt', 'tm', 'rt', 'rc', 'rb', 'bm', 'lb', 'lc']

function genMaskStyle() {
  return {
    border: this.maskBorder,
    background: this.maskBackgrounds
  }
}

function getPointStyle(point) {
  let left = 0
  let top = 0
  const isT = /t/.test(point)
  const isL = /l/.test(point)
  const isR = /r/.test(point)
  const isB = /b/.test(point)
  const isC = /c/.test(point)
  const isM = /m/.test(point)

  const { width, height } = this.styles
  const halfPointThick = this.stretchPointThick / 2

  if (isL) left = 0
  if (isR) left = width
  if (isM) left = width / 2
  if (isT) top = 0
  if (isB) top = height
  if (isC) top = height / 2

  return {
    left: left + 'px',
    top: top + 'px',
    width: this.stretchPointThick + 'px',
    height: this.stretchPointThick + 'px',
    background: this.stretchPointBackground,
    'margin-left': -halfPointThick + 'px',
    'margin-top': -halfPointThick + 'px',
    'border-radius': halfPointThick + 'px'
  }
}
export default {
  props,
  data() {
    return {
      // 存储事件信息
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
    handlePointDown(sd, e) {
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

    // root 鼠标按下
    handleDown(e) {
      this.$emit('mousedown')

      const { width, height, left, top } = this.styles

      const start = {
        x: e.clientX,
        y: e.clientY
      }

      const origin = {
        left: left * this.scale,
        top: top * this.scale
      }

      const style = {}

      const move = (me) => {
        me.preventDefault()

        const current = {
          x: me.clientX,
          y: me.clientY
        }

        const diff = {
          x: current.x - start.x,
          y: current.y - start.y
        }

        const left = calcPosAtScale(origin.left + diff.x, this.scale)
        const top = calcPosAtScale(origin.top + diff.y, this.scale)

        this.$emit('move', style)

        const { left: newLeft, top: newTop } = calcWidgetPosition({
          top,
          left,
          width,
          height,
          parentWidth: this.parentWidth,
          parentHeight: this.parentHeight,
          gap: this.gap,
          addis: this.adsorptionDistance,
          adsorpLefts: this.adsorpLefts,
          adsorpTops: this.adsorpTops,
          scale: this.scale
        })
        style.left = newLeft
        style.top = newTop
      }

      const up = () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
      }

      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    },

    // 旋转
    handleRotate(e) {
      e.preventDefault()
      e.stopPropagation()
      // 初始坐标和初始角度
      const startY = e.clientY
      const startX = e.clientX
      const startRotate = this.styles.rotate || 0

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

        this.$emit(
          'rotate',
          startRotate + Math.ceil(rotateDegreeAfter - rotateDegreeBefore)
        )
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
      <div class="draggable-wrap" vOn:mousedown_prevent={this.handleDown}>
        <div
          class="draggable-rotate"
          vOn:mousedown_stop_prevent={this.handleRotate}
        >
          <svg-icon icon-class="rotate" size="16" />
        </div>

        {points.map((point) => (
          <i
            class="stretch-point"
            style={getPointStyle.call(this, point)}
            vOn:mousedown_stop_prevent={this.handlePointDown.bind(this, point)}
          />
        ))}

        {this.active && (
          <div class="tip">
            <div>x: {this.styles.left}</div>
            <div>y: {this.styles.top}</div>
            <div>r: {this.styles.rotate}</div>
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
