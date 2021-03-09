/* 
    包含n个日期事件处理的工具函数模块
*/

// 格式化日期
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}
    \xa0 ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `
}