<script>

import { getBoundingRect } from '@/utils/group'
import { flatWidgets } from '@/utils/widget'
import { styleToCss, getShapeStyle } from '@/utils/style'

const props = {
    prev: Boolean,
    widgets: { type: Array, default: () => [] }
}
export default {

    props,

    methods: {
        getBoundingRect(widgets) {
            console.log(widgets)
            widgets = flatWidgets(widgets)
            return getBoundingRect(widgets.map(w => w.style))
        }
    },

    watch: {
        widgets() {
            // console.log(this.widgets)
        },
    },

    render() {
        return <div class='group-wrap'>
            {
                this.widgets.map(
                    item =>
                        item.isGroup && <div class={{ group: true, prev: this.prev }} style={styleToCss(getShapeStyle(this.getBoundingRect([item])))} />
                )
            }
        </div>
    }
}
</script>

<style lang="scss" scoped>
.group-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 1500;
}
.group {
    position: absolute;
    border: 1px dashed #000;
    margin-top: -1px;
    margin-left: -1px;
    pointer-events: none;
}

.group.prev {
    border: 2px solid #d2f9f8;
}
</style>