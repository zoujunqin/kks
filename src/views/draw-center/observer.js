import Vue from 'vue'
export const state = Vue.observable({
  // 要添加的部件是否选中
  isWidgetSelected: false,

  // 鼠标是否进入了 CanvasArea 组件
  isInCanvasArea: false
})
export const mutations = {
  setWidgetSelected(status) {
    state.isWidgetSelected = status
  },

  setInCanvasArea(status) {
    state.isInCanvasArea = status
  }
}
