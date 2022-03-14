import Vue from 'vue'
export const state = Vue.observable({
  form: {}
})

export const mutations = {
  addProp(value) {
    console.log('observer', value)
    state.form = value
  }
}
