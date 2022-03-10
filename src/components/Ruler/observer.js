import Vue from 'vue'
export const state = Vue.observable({
  rulerOffsetX: 0,
  rulerOffsetY: 0
})

export const mutations = {
  setRulerOffsetX(offset) {
    state.rulerOffsetX = offset
  },
  setRulerOffsetY(offset) {
    state.rulerOffsetY = offset
  }
}
