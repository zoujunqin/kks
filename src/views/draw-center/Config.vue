<script>
import Generator from '@/components/Setup/Generator'
import { state } from './bus/store'
export default {
    data() {
        return {}
    },

    computed: {
        option() {
            return state.activedWidget
        }
    },

    methods: {},

    render() {
        return (
            <div class="config-panel">
                <Generator setup={this.option?.setup || []} />
            </div>
        )
    }
}
</script>

<style scoped lang="scss">
.config-panel {
    width: 400px;
    height: 100%;
    background-color: #242a30;
}
</style>
