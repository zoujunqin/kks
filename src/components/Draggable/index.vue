<script>
export default {
  props: {
    offsetX: {
      // draggable 父级容器距离可视窗口的 x
      type: Number,
      default: 220
    },
    offsetY: {
      // draggable 父级容器距离可视窗口的 Y
      type: Number,
      default: 80
    },
    scale: Number,
    gap: {
      type: Number,
      default: 5
    },
    parentWidth: Number,
    parentHeight: Number
  },

  data() {
    return {
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      mousedown: null,
      pointMousedown: null
    }
  },

  computed: {
    styles() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },

  methods: {
    pxDivideScale(px) {
      return px / this.scale
    },
    pointUpListener() {
      const { stretchDirection } = this.pointMousedown
      window.removeEventListener(
        'mousemove',
        this[stretchDirection + 'PointMoveListener']
      )
      window.removeEventListener('mouseup', this.pointUpListener)
      this.pointMousedown = null
    },
    leftTopPointMoveListener(e) {
      e.preventDefault()

      const {
        width: owidth,
        height: oheight,
        left: oleft,
        top: otop
      } = this.pointMousedown
      const { pageX, pageY } = e

      // 以下计算都是基于物理像素
      const left = this.pxDivideScale(pageX - this.offsetX)
      const top = this.pxDivideScale(pageY - this.offsetY)
      const diffWidth = oleft - left
      const diffHeight = otop - top

      this.left = left
      this.top = top
      this.width = owidth + diffWidth
      this.height = oheight + diffHeight
    },
    topPointMoveListener(e) {
      e.preventDefault()

      const { height: oheight, top: otop } = this.pointMousedown
      const { pageY } = e
      // 以下计算都是基于物理像素
      const top = this.pxDivideScale(pageY - this.offsetY)
      const diffHeight = otop - top
      this.top = top
      this.height = oheight + diffHeight
    },
    rightTopPointMoveListener(e) {
      e.preventDefault()

      const {
        width: owidth,
        height: oheight,
        left: oleft,
        top: otop
      } = this.pointMousedown
      const { pageX, pageY } = e

      // 以下计算都是基于物理像素
      const left = this.pxDivideScale(pageX - this.offsetX) - owidth
      const top = this.pxDivideScale(pageY - this.offsetY)
      const diffWidth = oleft - left
      const diffHeight = otop - top

      this.top = top
      this.width = owidth - diffWidth
      this.height = oheight + diffHeight
    },
    leftPointMoveListener(e) {
      e.preventDefault()

      const { width: owidth, left: oleft } = this.pointMousedown
      const { pageX } = e

      // 以下计算都是基于物理像素
      const left = this.pxDivideScale(pageX - this.offsetX)
      const diffWidth = oleft - left
      this.left = left
      this.width = owidth + diffWidth
    },
    rightPointMoveListener(e) {
      e.preventDefault()

      const { width: owidth, left: oleft } = this.pointMousedown
      const { pageX } = e

      // 以下计算都是基于物理像素
      const left = this.pxDivideScale(pageX - this.offsetX) - owidth
      const diffWidth = oleft - left
      this.width = owidth - diffWidth
    },
    leftBottomPointMoveListener(e) {
      e.preventDefault()

      const {
        width: owidth,
        height: oheight,
        left: oleft,
        top: otop
      } = this.pointMousedown
      const { pageX, pageY } = e
      // 以下计算都是基于物理像素
      const left = this.pxDivideScale(pageX - this.offsetX)
      const top = this.pxDivideScale(pageY - this.offsetY) - oheight
      const diffWidth = oleft - left
      const diffHeight = otop - top
      this.left = left
      this.width = owidth + diffWidth
      this.height = oheight - diffHeight
    },
    bottomPointMoveListener(e) {
      e.preventDefault()

      const { height: oheight, top: otop } = this.pointMousedown
      const { pageY } = e
      // 以下计算都是基于物理像素
      const top = this.pxDivideScale(pageY - this.offsetY) - oheight
      const diffHeight = otop - top
      this.height = oheight - diffHeight
    },
    rightBottomPointMoveListener(e) {
      e.preventDefault()

      const {
        width: owidth,
        height: oheight,
        left: oleft,
        top: otop
      } = this.pointMousedown
      const { pageX, pageY } = e
      // 以下计算都是基于物理像素
      const left = this.pxDivideScale(pageX - this.offsetX) - owidth
      const top = this.pxDivideScale(pageY - this.offsetY) - oheight
      const diffWidth = oleft - left
      const diffHeight = otop - top
      this.width = owidth - diffWidth
      this.height = oheight - diffHeight
    },
    handlePointMousedown(stretchDirection, e) {
      e.stopPropagation()
      e.preventDefault()
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = this.$el
      this.pointMousedown = {
        e,
        stretchDirection,
        width: offsetWidth,
        height: offsetHeight,
        left: offsetLeft,
        top: offsetTop
      }
      window.addEventListener(
        'mousemove',
        this[stretchDirection + 'PointMoveListener']
      )
      window.addEventListener('mouseup', this.pointUpListener)
    },
    // 创建拉伸点
    createStretchPoint() {
      const points = [
        {
          class: 'left-top-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'leftTop')
        },
        {
          class: 'top-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'top')
        },
        {
          class: 'right-top-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'rightTop')
        },
        {
          class: 'left-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'left')
        },
        {
          class: 'right-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'right')
        },
        {
          class: 'left-bottom-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'leftBottom')
        },
        {
          class: 'bottom-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'bottom')
        },
        {
          class: 'right-bottom-stretch-point',
          mousedown: this.handlePointMousedown.bind(this, 'rightBottom')
        }
      ]
      return points.map((point) => (
        <i
          class={['stretch-point', point.class]}
          onMousedown={point.mousedown}
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
      const { e: oe, width: owidth, height: oheight } = this.mousedown
      const { offsetX: ooffsetX, offsetY: ooffsetY } = oe
      const { pageX, pageY } = e
      const leftLimit = this.gap - owidth
      const rightLimit = this.parentWidth - this.gap
      const topLimit = this.gap - oheight
      const bottomLimit = this.parentHeight - this.gap
      // 在缩放下，offset表示的是真实的 px， 。然后转成真实的 px
      const left = this.pxDivideScale(
        pageX - ooffsetX * this.scale - this.offsetX
      )
      this.left =
        left <= leftLimit ? leftLimit : left >= rightLimit ? rightLimit : left

      const top = this.pxDivideScale(
        pageY - ooffsetY * this.scale - this.offsetY
      )
      this.top =
        top <= topLimit ? topLimit : top >= bottomLimit ? bottomLimit : top
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
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.draggable-wrap {
  position: absolute;
  background: #000;
  cursor: move;

  .stretch-point {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #0890fa;
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
</style>
