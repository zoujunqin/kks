export default {
  props: {
    data: {
      type: [Array, Object, null, void 0],
      default: void 0
    },

    styles: {
      type: Object,
      default: () => {}
    },

    dataSource: {
      type: Object,
      default: () => {}
    }
  },

  mounted() {}
}
