<script>

import { styleToCss, getShapeStyle } from '@/utils/style'

export default {

    props: {
        active: Boolean,
        widgets: { type: Array, default: () => [] }
    },

    render() {
        return <div class='highlight-wrap'>
            {
                this.widgets.map(
                    item =>
                        <div
                            class={{ box: true, 'active-box': this.active }}
                            style={styleToCss(getShapeStyle({ ...item.style, left: item.style.left - 1, top: item.style.top - 1 }))}
                        />)
            }
        </div>
    }
}
</script>

<style lang="scss" scoped>
.highlight-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 1000;
    .box {
        position: absolute;
        border: 1px solid red;
        pointer-events: none;
    }
    .active-box {
        position: absolute;
        border: 1px solid #0eddd6;
        pointer-events: none;
    }
}
</style>