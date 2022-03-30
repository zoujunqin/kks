<script>
import Ruler from '@/components/Ruler/index'
import Contextmenu from '@/components/Contextmenu/index'
import Draggable from '@/components/Draggable/index'
import { state, mutations } from './observer'
import { noop } from '@/utils'
import { calcWidgetPosition } from '@/utils/widgets'

import ClipboardJs from 'clipboard'

export default {
  data() {
    return {
      rulerTick: 20,
      rootWidth: 0,
      rootHeight: 0,

      scale: 1,
      cx: 0, // content 距离父容器的 x
      cy: 0, // content 距离父容器的 y
      contentWidth: 1600,
      contentHeight: 800,

      draggableGap: 5,
      adsorptionDistance: 5,

      adsorpLefts: [], // 左吸附位置，根据标尺参考线生成
      adsorpTops: [], // 上吸附位置，根据标尺参考线生成

      widgets: [], // 存放添加到拖拽区域的部件

      seizeSeatStyles: {},

      // 右键菜单
      showContextmenu: false,
      contextmenuStyles: {},

      clipboard: null,
      clipText: 'text'
    }
  },

  computed: {
    contentStyles() {
      return {
        width: this.contentWidth + 'px',
        height: this.contentHeight + 'px'
      }
    },

    isWidgetSelected() {
      return state.isWidgetSelected
    }
  },

  methods: {
    handleCopy() {
      this.clipText = state.activedWidget || ''
    },
    handlePaste() {
      // TODO:
      navigator.clipboard
        .readText()
        .then((clipText) => {
          this.widgets.push(clipText)
        })
        .catch(() => {})
    },
    createClipboard() {
      this.clipboard = new ClipboardJs('.copy', {
        text: () => {
          return this.clipText
        }
      })
    },

    // 标尺参考线更新触发
    getHeightWidth() {
      this.rootWidth = this.$el.clientWidth
      this.rootHeight = this.$el.clientHeight
    },

    // 标尺滚动和缩放触发
    handleTransform({ sx, sy, scale }) {
      this.cx = sx
      this.cy = sy
      this.scale = scale
    },
    handleRulerLineUpdate(lines) {
      this.adsorpLefts = []
      this.adsorpTops = []
      for (const line of lines) {
        if (line.vertical) {
          this.adsorpLefts.push(line.value)
        } else this.adsorpTops.push(line.value)
      }
    },
    handleContentMouseenter() {
      mutations.setInCanvasArea(true)
      const rawMousemove = document.onmousemove
      document.onmousemove = (e) => {
        console.log(e)
        rawMousemove && rawMousemove.call(document, e)
        if (!state.isInCanvasArea) return
        const { left, top } = calcWidgetPosition({
          e,
          width: 300,
          height: 200,
          parentWidth: this.contentWidth,
          parentHeight: this.contentHeight,
          gap: this.draggableGap,
          parentOffsetX: this.cx + 220,
          parentOffsetY: this.cy + 80,
          addis: this.adsorptionDistance,
          adsorpLefts: this.adsorpLefts,
          adsorpTops: this.adsorpTops,
          scale: this.scale,
          cursorOffsetX: 0,
          cursorOffsetY: 0
        })

        this.seizeSeatStyles = {
          left: left + 'px',
          top: top + 'px',
          opacity: 1
        }
      }
    },
    handleContentMouseleave() {
      mutations.setInCanvasArea(false)
      this.seizeSeatStyles.opacity = 0
    },
    handleContentMouseup() {
      this.seizeSeatStyles.opacity = 0
      this.widgets.push({
        style: {
          left: parseFloat(this.seizeSeatStyles.left),
          top: parseFloat(this.seizeSeatStyles.top),
          width: 200,
          height: 200
        },
        ...state.widgetOption
      })
    },

    // 拖拽组件右键菜单
    handleDraggableContextmenu(e) {
      e.preventDefault()
      this.contextmenuStyles = {
        left: e.pageX + 'px',
        top: e.pageY + 'px'
      }
      this.showContextmenu = true
    },
    draggableMousedown(widget) {
      mutations.setActivatedWidget(widget)
    },
    handleDraggableMove(index, style) {
      this.widgets[index].style = { ...this.widgets[index].style, ...style }
    },
    handleDraggableRotate(index, rotate) {
      this.widgets[index].style = { ...this.widgets[index].style, rotate }
    },

    resize() {
      this.getHeightWidth()
    }
  },

  mounted() {
    this.resize()
    this.createClipboard()
  },

  beforeDestroy() {
    this.clipboard.destroy()
  },

  render() {
    return (
      <div class="canvas-area" vOn:contextmenu_prevent={noop}>
        <Ruler
          cid="canvas-content"
          thick={this.rulerThick}
          width={this.rootWidth}
          height={this.rootHeight}
          slotWidth={1610}
          slotHeight={1000}
          contentWidth={this.contentWidth}
          contentHeight={this.contentHeight}
          onTransform={this.handleTransform}
          onLineUpdate={this.handleRulerLineUpdate}
        >
          <div
            class="content-wrap"
            onMouseenter={
              this.isWidgetSelected ? this.handleContentMouseenter : noop
            }
            onMouseup={this.isWidgetSelected ? this.handleContentMouseup : noop}
            onMouseleave={
              state.isInCanvasArea ? this.handleContentMouseleave : noop
            }
          >
            <div id="canvas-content" class="content" style={this.contentStyles}>
              {this.widgets.map((widget, index) => (
                <Draggable
                  style={{
                    left: widget.style.left + 'px',
                    top: widget.style.top + 'px',
                    transform: `rotate(${widget.style.rotate}deg)`
                  }}
                  styles={widget.style}
                  gap={this.draggableGap}
                  scale={this.scale}
                  adsorptionDistance={this.adsorptionDistance}
                  parentWidth={this.contentWidth}
                  parentHeight={this.contentHeight}
                  adsorpLefts={this.adsorpLefts}
                  adsorpTops={this.adsorpTops}
                  vOn:contextmenu_native={this.handleDraggableContextmenu}
                  vOn:move={this.handleDraggableMove.bind(this, index)}
                  vOn:rotate={this.handleDraggableRotate.bind(this, index)}
                  onMousedown={this.draggableMousedown.bind(this, widget)}
                >
                  <widget.component></widget.component>
                </Draggable>
              ))}

              {/* 占位 */}
              <div class="seize-seat" style={this.seizeSeatStyles}></div>
            </div>
          </div>
        </Ruler>

        {/* 右键菜单 */}
        <Contextmenu
          vModel={this.showContextmenu}
          style={this.contextmenuStyles}
        >
          <div class="copy" onClick={this.handleCopy}>
            复制
          </div>
          <div class="paste" onClick={this.handlePaste}>
            黏贴
          </div>
        </Contextmenu>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.canvas-area {
  position: relative;
  width: calc(100vw - 600px);
  .content-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .content {
      background-color: #a4d3e1;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      .seize-seat {
        opacity: 0;
        position: absolute;
        width: 300px;
        height: 200px;
        pointer-events: none;
        background: #e3e6e8;
        box-shadow: 0px 0px 4px -2px grey;
        transition: opacity 0.5s ease;
      }
    }
  }
}
</style>
