<template>
  <svg :class="svgClass" :style="svgStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: [String],
      default: '1em'
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : 'svg-icon'
    },
    svgStyle() {
      return {
        width: this.size,
        height: this.size
      }
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
