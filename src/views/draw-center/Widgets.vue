<script>
import { eventBus, eventName } from './bus/event'
import { genArrayARC } from '@/utils/traver.js'

// TODO: 后期要做局部组件自动引入
const optionFiles = require.context('@/components/Widgets', true, /setup\.js$/)
const options = genArrayARC(optionFiles)

export default {
    props: {
        option: Object
    },

    data() {
        return {}
    },

    methods: {
        // 加载有权限的部件（包括本地和线上）
        fetchWidgets() {
            this.fetchLocalWidgets()
            this.fetchOnlineWidgets()
        },
        // 加载本地部件
        fetchLocalWidgets() { },
        // 加载在线部件
        fetchOnlineWidgets() { },

        handleMousedown(option, e) {
            console.log('downs')
            const html = e.target.outerHTML
            eventBus.$emit(eventName.dragWidget, option, html)
        }
    },

    render() {
        return (
            <div class="widgets-wrap">
                {
                    options.map(op => <div class="test-widget" vOn:mousedown={this.handleMousedown.bind(this, op)}>{op.name}</div>)
                }
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
.widgets-wrap {
    display: flex;
}
.test-widget {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background-color: green;
}
</style>
