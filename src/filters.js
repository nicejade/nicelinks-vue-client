export default {
  dateConvert(time) {
    return time ? new Date(time).Format('yyyy-MM-dd hh:mm') : ''
  },

  dateOffset(datetime = '', nowTime = '') {
    if (!arguments.length) return ''

    let now = nowTime ? new Date(nowTime).getTime() : new Date().getTime()
    let offsetValue = now - new Date(datetime).getTime()
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let week = day * 7
    let month = day * 30
    let year = month * 12

    let unitArr = ['年前', '月前', '周前', '天前', '小时前', '分钟前', '刚刚']
    let offsetArr = [year, month, week, day, hour, minute].map((item, index) => {
      return {
        value: offsetValue / item,
        unit: unitArr[index],
      }
    })

    for (let key in offsetArr) {
      if (offsetArr[key].value >= 1) {
        return parseInt(offsetArr[key].value) + ' ' + offsetArr[key].unit
      }
    }
    return unitArr[6]
  },
}
