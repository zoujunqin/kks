<script>
import Line from '@/components/Widgets/Line/index'
export default {
  props: {
    option: Object
  },
  render() {
    return <Line value={this.option}></Line>
  }
}
</script>

<style></style>
