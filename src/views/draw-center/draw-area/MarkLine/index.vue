<script>
import { getBoundingRect } from '@/utils/group'

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

    methods: {

        getLineStyle(lineType) {
            let style = {}
            const isV = /v/.test(lineType)
            const rect = getBoundingRect(this.conforms)

            if (isV) style = { top: 0, left: rect[lineType] + 'px', height: rect.height + 20 + 'px', 'margin-top': '-10px', 'border-left': '1px dashed red' }
            else style = { left: 0, top: rect[lineType] + 'px', width: rect.width + 20 + 'px', 'margin-left': '-10px', 'border-top': '1px dashed red' }

            return style
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