import Vue from 'vue'
export const state = Vue.observable({
    curWidget: {}
})
export const mutations = {
    setCurWidget(widget) {
        state.curWidget = widget
    }
}
