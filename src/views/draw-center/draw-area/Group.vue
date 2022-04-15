<script>
const props = {
    groupStyle: { type: Object, default: () => ({}) }
}
export default {

    props,

    render() {
        return <div class='group' style={this.groupStyle} />
    }
}
</script>

<style lang="scss" scoped>
.group {
    position: absolute;
    border: 2px solid #d2f9f8;
    pointer-events: none;
}
</style>