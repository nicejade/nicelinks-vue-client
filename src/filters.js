export default {
  reverseStr (sourceStr) {
    return sourceStr.split('').reverse().join('')
  },

  dateConvert (time) {
    return time ? new Date(time).Format('yyyy-MM-dd hh:mm:ss') : ''
  },

  dayConvert (time) {
    return time ? new Date(time).Format('yyyy-MM-dd') : ''
  },

  dateOffset (thatTime, nowTime) {
    if (!arguments.length) return ''
    var arg = arguments
    var now = arg[1] ? arg[1] : new Date().getTime()
    var offsetValue = now - new Date(arg[0]).getTime()
    var result = ''
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    var year = month * 12

    let unitArr = ['年前', '月前', '周前', '天前', '小时前', '分钟前', '刚刚']
    let offsetArr = [year, month, halfamonth, day, hour, minute].map((item, index) => {
      return {
        value: offsetValue / item,
        unit: unitArr[index]
      }
    })

    for (let key in offsetArr) {
      if (parseInt(offsetArr[key].value) >= 1) {
        result = parseInt(offsetArr[key].value) + ' ' + offsetArr[key].unit
        return result
      }
    }

    return unitArr[6]
  }
}
