<script>
import { getBoundingRect } from '@/utils/group'
import { styleToCss } from '@/utils/style'

import { state } from '../bus/store'

const props = {
    conforms: { type: Array, default: () => [] }
}
export default {

    props,

    data() {
        return {
            lineList: ['vl', 'vc', 'vr', 'ht', 'hc', 'hb']
        }
    },

    computed: {
        widgetsInCanvas() { return state.widgetsInCanvas },
        curWidgets() { return state.curWidgets }
    },

    methods: {

        getLineStyle(lineType) {
            let style = {}
            const beyond = 20
            const hasV = /v/.test(lineType)
            const rect = getBoundingRect(this.conforms)
            const { top, left, width, height } = rect

            if (hasV) style = { ...styleToCss({ top, left: this.getLeft(lineType, rect), height: height + beyond, 'margin-top': -beyond / 2 }), 'border-left': '1px dashed red' }
            else style = { ...styleToCss({ left, top: this.getTop(lineType, rect), width: width + beyond, 'margin-left': -beyond / 2 }), 'border-top': '1px dashed red' }

            return style
        },

        getLeft(lineType, rect) {
            if (lineType === 'vl') return rect.left
            if (lineType === 'vc') return rect.right - (rect.width / 2)
            if (lineType === 'vr') return rect.right
        },

        getTop(lineType, rect) {
            if (lineType === 'ht') return rect.top
            if (lineType === 'hc') return rect.bottom - (rect.height / 2)
            if (lineType === 'hb') return rect.bottom
        }

    },

    render() {
        return <div class='mark-line-wrap'>
            {
                this.lineList.map(line => <div class='mark-line' style={this.getLineStyle(line)} />)
            }
        </div>
    }
}
</script>

<style lang="scss" scoped>
.mark-line-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .mark-line {
        position: absolute;
    }
}
</style>