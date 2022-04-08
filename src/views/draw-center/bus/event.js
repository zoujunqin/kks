import Vue from 'vue'
export const eventBus = new Vue()

// 保证事件名唯一
const namePrefix = 'draw-center' + new Date().getTime()

export const eventName = {
    'dragWidget': namePrefix + 'dragWidget'
}