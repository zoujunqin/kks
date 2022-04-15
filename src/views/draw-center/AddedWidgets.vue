<script>
import { mutations } from './bus/store'
export default {

    methods: {
        createGroup() {
            console.log('createGroup')
            mutations.createGroup()
        }
    },

    render() {
        return <div class='wrap'>
            <el-button vOn:click={this.createGroup}>组合</el-button>
        </div>
    }
}
</script>

<style scoped lang="scss">
.wrap {
    width: 200px;
    height: 100%;
}
</style>
