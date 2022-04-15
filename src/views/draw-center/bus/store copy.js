import Vue from 'vue'
import { genGroupId, findGroup } from '@/utils/group'

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
        for (const item of state.widgets) { item.gid = id }

        const group = {
            id,
            isGroup: true,
            gid: state.curGroupId,
            children: state.widgets
        }

        this.setWidgets(group)

        let curGroup
        if (state.curGroupId) {
            for (const item of state.allWidgets) {
                curGroup = findGroup(item, state.curGroupId).children
                if (curGroup) break
            }
        } else curGroup = state.allWidgets

        curGroup.map(item => state.widgets.find(sub => sub.wid !== item.wid || sub.gid !== item.gid))
        curGroup.push(group)
    },
    cancelGroup() {
        for (const item of state.widgets) { item.groudIds = item.groudIds.map(id => id !== state.curGroupId) }
    },

    setCurGroupId(id) { state.curGroupId = id },
    setParentGroupId(id) { state.parentGroupId = id },

}
