import Vue from 'vue'
import { genGroupId } from '@/utils/group'

export const state = Vue.observable({
    // 当前选中激活的部件，包含组
    widgets: [],
    // 当前选中激活的部件，不包含组
    flatWidgets: [],
    // 添加到画布上的所有 widgets, 不包含组
    allWidgets: [],

    curGroupId: null,
    parentGroupId: null,
})

export const mutations = {

    setWidgets(widget, clear = true) {
        clear ? state.widgets = widget : state.widgets.push(widget)
    },
    setFlatWidgets(widget, clear = true) {
        clear ? state.flatWidgets = widget : state.flatWidgets.push(widget)
    },

    setAllWidgets(widget) {
        state.allWidgets.push(widget)
    },

    createGroup() {
        const id = genGroupId()
        for (const item of state.flatWidgets) { item.groupIds.push(id) }
        this.setParentGroupId(state.curGroupId)
        this.setCurGroupId(id)
    },
    cancelGroup() {
        for (const item of state.widgets) { item.groudIds = item.groudIds.map(id => id !== state.curGroupId) }
    },

    setCurGroupId(id) { state.curGroupId = id },
    setParentGroupId(id) { state.parentGroupId = id },

}
