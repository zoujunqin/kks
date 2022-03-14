<script>
import Line from '@/components/Widgets/Line/index'
import { state } from '@/components/Setup/Generator/observer'
export default {
  render() {
    console.log(state.form)
    return <Line attrs={state.form}></Line>
  }
}
</script>

<style></style>
