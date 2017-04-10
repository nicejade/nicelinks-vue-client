export default {
  reverseStr (sourceStr) {
    return sourceStr.split('').reverse().join('')
  },

  dateConvert (time) {
    return time ? new Date(time).Format('yyyy-MM-dd hh:mm:ss') : ''
  },

  dayConvert (time) {
    return time ? new Date(time).Format('yyyy-MM-dd') : ''
  }
}
