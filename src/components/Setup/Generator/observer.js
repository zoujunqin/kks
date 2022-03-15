import Vue from 'vue'
export const state = Vue.observable({})

export const mutations = {
  addProp(prop, value) {
    state[prop] = value
  }
}
