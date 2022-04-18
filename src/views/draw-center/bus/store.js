import Vue from 'vue'
import { genGroupId, findGroupInList, initGroup, getIntersectionOfArrs, rootGroupId } from '@/utils/group'
import { execEveryWidgets } from '@/utils/widget'

export const state = Vue.observable({
    // 当前选中激活的部件，包含组
    widgets: [],
    // 添加到画布上的所有 widgets, 包含组
    allWidgets: [],

    curGroupId: rootGroupId,
    prevGroupId: rootGroupId,

    rootGroupId
})

export const mutations = {

    setWidgets(widget, clear = true) {
        clear ? state.widgets = widget : state.widgets.push(widget)
    },

    setAllWidgets(widget) {
        state.allWidgets.push(widget)
    },

    createGroup() {
        // 一个 widget 或者 group 不能成组，至少有两个元素才能成组
        if (state.widgets.length <= 1) return

        const id = genGroupId()
        // 改变选中的 group , widget 的 gid, gids
        state.widgets.forEach(item => { item.gid = id })
        execEveryWidgets(state.widgets, (item) => { item.gids.splice(item.gids.findIndex(sub => sub === state.prevGroupId), 0, id) })

        const newGroup = initGroup({
            id,
            gid: state.prevGroupId,
            gids: state.widgets[0].gids.slice(state.widgets[0].gids.findIndex(item => item === id)),
            children: state.widgets
        })

        const intersection = getIntersectionOfArrs(...state.widgets.map(item => item.gids))
        const nearId = intersection[0]
        let group = findGroupInList(state.allWidgets, nearId) || { children: state.allWidgets }
        // 从删除选中的元素
        for (const item of state.widgets) {
            group.children.splice((group.children.findIndex(sub => item.isGroup ? item.gid === sub.gid : item.wid === sub.wid)), 1)
        }

        this.setCurGroupId(id)

        this.setAllWidgets(newGroup)
        // 设置当前选中的是新的组
        this.setWidgets([newGroup])

    },

    cancelGroup() {
        for (const item of state.widgets) { item.groudIds = item.groudIds.map(id => id !== state.curGroupId) }
    },

    setCurGroupId(id) { state.curGroupId = id },
    setPrevGroupId(id) { state.prevGroupId = id },

}
